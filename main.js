const taskForm = document.getElementById("task-form");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentData = {};

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
};

const deleteTask = (element) => {
    element.parentElement.remove();
    const itemToDelete = taskData.findIndex((item) => item.id === element.parentElement.id);
    taskData.splice(itemToDelete, 1);
};

const editTask = (element) => {
    const itemToEdit = taskData.findIndex((item) => item.id === element.parentElement.id);

    titleInput.value = taskData[itemToEdit].title;
    dateInput.value = taskData[itemToEdit].date;
    descriptionInput.value = taskData[itemToEdit].description;
    taskForm.classList.toggle("hidden");
    addOrUpdateTaskBtn.innerText = "Update Task";

    currentData.editItem = {
        "id":  taskData[itemToEdit].id,
        "title":  taskData[itemToEdit].title,
        "date":  taskData[itemToEdit].date,
        "description": taskData[itemToEdit].description,
    }
    taskData.splice(itemToEdit, 1);
};

openTaskFormBtn.addEventListener("click", () => {
    addOrUpdateTaskBtn.innerText = "Add Task";
    taskForm.classList.toggle("hidden")
});

closeTaskFormBtn.addEventListener("click", () => {
    if (!titleInput.value && !dateInput.value && !descriptionInput.value) {
        taskForm.classList.toggle("hidden");
        } else {confirmCloseDialog.showModal()}
});

discardBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
    reset();
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    tasksContainer.innerHTML = "";
    const newObj = {
        id: `${titleInput.value}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };  
    taskData.unshift(newObj);
    taskData.forEach((item) => {
    tasksContainer.innerHTML += `<div id="${item.id}"><p>Title: ${item.title}</p>
                                <p>Date: ${item.date}</p>
                                <p>Description: ${item.description}</p>
                                <button type="button" class="btn" onclick="editTask(this)">Edit</button>
                                <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
                                <hr/></div>`;
    });
    taskForm.classList.toggle("hidden");
    reset();
    
});
if (currentData.editItem) {
        taskData.unshift(currentData.editItem);

        delete currentData.editItem;
        
    }; 


// add localStorage
// sth about currentData and taskData and adding/removing data between them is wrong
// add regex to inputs
