const bcrypt = require("bcrypt")
const fs= require("fs/promises")


const express = require("express")
const session = require("express-session")
const path = require("path")

const app = express()
const PORT = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
    session({
        name: "authflow.sid",
        secret: process.env.SESSION_SECRET || "authflow-development-secret-change-me",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 30 * 60 * 1000
        }
    })
)

function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login.html")
    }

    next()
}

app.get("/dashboard.html", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"))
})

app.use(express.static(path.join(__dirname, "public")))

// Test route
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "AuthFlow server is running"
    })
})

const USERS_FILE = path.join(__dirname,"data","users.json")

async function readUsers(){
    const data = await fs.readFile(USERS_FILE,"utf8")
    return JSON.parse(data)
}

async function writeUsers(users) {
    await fs.writeFile(
        USERS_FILE,
        JSON.stringify(users,null,2),
        "utf8"
    )
}

app.post("/api/register",async (req,res)=>{
    try{
        const { username,email,password,confirmPassword} = req.body
        if(
            typeof username !=="string" ||
            typeof email !== "string" ||
            typeof password !=="string" ||
            typeof confirmPassword !== "string" ||
            !username.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword 
        )
        {
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        const cleanUsername = username.trim()
        const cleanEmail = email.trim().toLowerCase()

        if(cleanUsername.length> 50 || cleanEmail.length > 254)
        {
            return res.status(400) .json({
                message:"Username or email is too long."
            })
        }
        
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
        {
            return res.status(400) .json({
                message :"Enter a valid email address."
            })
        }

        if(password.length<8 || !/\d/.test(password))
        {
            return res.status(400).json({
                message:"Password must be 8 characters and 1 number"
            })
        }

        if(password!==confirmPassword){
            return res.status(400).json({
                message:"Passwords do not match"
            })
        }

        const users = await readUsers()

        const duplicateUSer = users.some(user => 
            user.username.toLowerCase() === cleanUsername.toLocaleLowerCase() || user.email === cleanEmail
        )

        if(duplicateUSer)
        {
            return res.status(409).json({
                message:"Username or email is already registered."
            })
        }
        const passwordHash = await bcrypt.hash(password,12)

        const newUser = {
            id:require("crypto").randomUUID(),
            username:cleanUsername,
            email:cleanEmail,
            passwordHash
        }

        users.push(newUser)
        await writeUsers(users)

        return res.status(201).json({
            message:"Registartion successful. You can now log in."
        })
    }
    catch(error)
    {
        console.error("Registation error:", error)

        return res.status(500).json({
            message:"Something went wrong. Please try again."
        })
    }

    

})

app.post("/api/login",async(req,res)=>{
    try{
        const {identifier,password} = req.body
        if(typeof identifier !=="string" ||
            typeof password !== "string" ||
            !identifier.trim() ||
            !password
        )
        {
            return res.status(400).json({
                message:"USername/email and password are required."
            })
        }

        const cleanIdentifier = identifier.trim().toLowerCase()

        const users = await readUsers()

        const user = users.find(account =>
            account.username.toLowerCase() === cleanIdentifier ||
            account.email === cleanIdentifier
        )

        if(!user)
        {
            return res.status(401).json({
                message:"Invalid username/email or password."
            })
        }

        const passwordMatches = await bcrypt.compare(
            password,user.passwordHash
        )
        if(!passwordMatches){
            return res.status(401).json({
                message:"Invalid username/email or password."
            })
        }

        req.session.regenerate(err=>{
            if(err)
            {
                console.error("Session error:", err)
                return res.status(500).json({
                    message:"Unable to log in.Please try again"
                })
            }

            req.session.userId = user.id
            req.session.save(err=>{
                if(err)
                {
                     console.error("Session save error:", err)

                    return res.status(500).json({
                        message: "Unable to log in. Please try again."
                    })
                }
                return res.status(200).json({
                    message:"Login Successful."
                })
            })

        } )
    }
    catch(error) {
        console.log("Login error:", error)
        return res.status(500).json({
            message: "Something went wrong. Please try again."
        })
    }
})

app.post("/api/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
        {
            console.error("Logout error:", err)

            return res.status(500).json({
                message: "Unable to log out. Please try again."
            })
        }
        res.clearCookie("authflow.sid")

        return res.status(200).json({
            message:"Logout successful."
        })
    })
})



app.get("/api/me", requireApiAuth, async (req, res) => {
    try {
        const users = await readUsers()

        const user = users.find(
            account => account.id === req.session.userId
        )

        if (!user) {
            return res.status(401).json({
                message: "Please log in again."
            })
        }

        return res.status(200).json({
            username: user.username,
            email: user.email
        })

    } catch (error) {
        console.error("Dashboard profile error:", error)

        return res.status(500).json({
            message: "Unable to load your profile."
        })
    }
})



function requireApiAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({
            message: "Please log in again."
        })
    }

    next()
}


app.listen(PORT, () => {
    console.log(`AuthFlow server running at http://localhost:${PORT}`)
})
