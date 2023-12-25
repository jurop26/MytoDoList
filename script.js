"use strict";
const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-item');
const button = document.querySelector('button');
const list = document.querySelector('#list-todo');
let tasks = loadTasks();
tasks.forEach(addToList);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == '' || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        title: input.value,
        complete: false,
        id: new Date().valueOf().toString()
    };
    tasks.push(newTask);
    addToList(newTask);
    saveTasks();
    input.value = '';
});
function addToList(task) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    checkbox.type = 'checkbox';
    checkbox.checked = task.complete;
    checkbox.addEventListener('change', () => {
        task.complete = checkbox.checked;
        saveTasks();
    });
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.innerText = task.title;
    taskDiv.dataset.id = task.id;
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete');
    deleteButton.innerText = 'delete';
    deleteButton.addEventListener('click', (e) => {
        var _a;
        const target = e.target;
        (_a = target === null || target === void 0 ? void 0 : target.closest('li')) === null || _a === void 0 ? void 0 : _a.remove();
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
    });
    label.append(checkbox, taskDiv, deleteButton);
    li.append(label);
    list === null || list === void 0 ? void 0 : list.append(li);
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks == null)
        return [];
    return JSON.parse(tasks);
}
