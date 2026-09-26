let buttonEl=document.querySelectorAll(".keys button")
const displayEl=document.getElementById("result")

let displayExpression=""
let expression=""

buttonEl.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.textContent);
        let value=button.textContent
        if(value==="AC")
        {
            clearAll()
        }
        else if(value==="⌫")
        {
            back()
        }
        else if(value==="=")
        {
            calculate()
            
        }
        else
        {
            if(value==="x")
            {
                expression+="*"
            }
            else if(value==="÷")
            {
                expression+="/"
            }
            else
                expression+=value
            displayExpression+=value
            console.log(expression)
            displayEl.textContent=displayExpression
        }
        
    });
});

function clearAll()
{
    expression = "";
    displayExpression=""
    displayEl.textContent = "";
}


function calculate()
{
    let tokens=[]
    let number=""

    for(let i=0;i<expression.length;i++)
    {
        let char=expression[i]
        if(char==="+" || char==="-" || char==="*" || char==="/")
        {
            tokens.push(number)
            number=""
            tokens.push(char)
        }
        else
        {
            number+=char;
        }
    }
    if(number!=="")
    {
        tokens.push(number);
    }
    console.log(tokens)

    

    let newTokens=[]
    for(let i=0;i<tokens.length;i++)
    {

        let currNum=tokens[i]
        
        if(currNum==="*" || currNum==="/")
        {
            let prevNum=Number(newTokens[newTokens.length-1])
            let nextNum=Number(tokens[i+1])
            //how to place the result in right position 
            let result;
            if(currNum==="*")
                result=prevNum * nextNum
            else 
            {
                if(nextNum===0)
                {
                    displayEl.textContent="Error"
                    return;
                }
                else
                    result=prevNum / nextNum

            }
                

            newTokens[newTokens.length-1] = result;

            i++;
        }
        else{
            newTokens.push(currNum)
        }
    }
    console.log("new Tokens after * /:",newTokens)
    let result=Number(newTokens[0])
    for(let i=1;i<newTokens.length;i+=2)
    {
        let operator=newTokens[i]
        let nextNum=Number(newTokens[i+1])
            if(operator==="+")
                result+=nextNum
            else if(operator==='-')
                result -=nextNum

    }
    console.log("final result:",result)
    expression=String(result);
    displayExpression=String(result);

    displayEl.textContent=displayExpression

}
function back()
{
    expression=expression.slice(0,-1)
    displayExpression = displayExpression.slice(0,-1)
    displayEl.textContent=displayExpression
}