// Select DOM elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create task list item
    const li = document.createElement("li");

    // Add task text
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;
    li.appendChild(taskTextSpan);

    // Create a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    };
    li.appendChild(deleteBtn);

    // Toggle completion on click
    li.onclick = function() {
        li.classList.toggle("completed");
    };

    // Add the task to the list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
}

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when pressing Enter
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
