"use strict";
const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-item');
const button = document.querySelector('button');
const list = document.querySelector('#list-todo');
const todos = [];
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("add");
    if ((input === null || input === void 0 ? void 0 : input.value) == '' || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        title: input.value,
        complete: false,
        id: new Date().valueOf().toString()
    };
    todos.push(newTask);
    addToList(newTask);
    input.value = '';
});
function addToList(task) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.complete;
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete');
    deleteButton.innerText = 'delete';
    label.append(checkbox, task.title, deleteButton);
    li.append(label);
    list === null || list === void 0 ? void 0 : list.append(li);
}
