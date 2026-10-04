# To-Do Web App

A responsive To-Do List web application developed using HTML, CSS, and JavaScript. The application allows users to add and manage daily tasks through a simple and interactive interface.

This project was developed as part of the OASIS INFOBYTE Web Development & Designing Level 2 internship.

## Features

- Add new tasks to the pending task list.
- Prevent empty tasks from being added.
- Automatically clear the input field after adding a task.
- Mark pending tasks as completed.
- Move completed tasks back to the pending list.
- Edit task content directly using inline editing.
- Delete tasks from the list.
- Display separate pending and completed task sections.
- Display the current number of pending and completed tasks.
- Show appropriate empty-state messages when there are no tasks.
- Apply different visual styles to pending and completed tasks.
- Handle long task text without breaking the layout.
- Responsive design for smaller screen sizes.
- Interactive button hover and focus effects.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Google Fonts

## Implementation

The application uses JavaScript DOM manipulation to dynamically create and manage task elements.

Event delegation is used on the main task container to handle actions such as:

- Completing a task
- Returning a task to the pending list
- Editing a task
- Deleting a task

The application also updates the task counts and empty-state messages dynamically whenever tasks are added, completed, moved, or deleted.

CSS Flexbox, responsive media queries, custom properties, transitions, shadows, and a structured color system are used to create a clean and responsive interface.

## Project Structure

```text
WebDev-L2-ToDoWebApp/
│
├── index.html
├── index.css
├── index.js
└── README.md