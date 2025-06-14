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

const taskData = [];
const currentData = {};

const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
};

openTaskFormBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden")
});

closeTaskFormBtn.addEventListener("click", () => {
    confirmCloseDialog.showModal();
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
    tasksContainer.innerHTML += `<br/><p>Title: ${item.title}</p>
                                <p>Date: ${item.date}</p>
                                <p>Description: ${item.description}</p>
                                <button type="button" class="btn">Edit</button>
                                <button type="button" class="btn">Delete</button>
                                <br/><hr/><br/>`;
    });
    taskForm.classList.toggle("hidden");
    reset();
});