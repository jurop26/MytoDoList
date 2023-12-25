type Task = {
    title: string,
    complete: boolean,
    id: string
}

const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement>('#new-task-item')
const button = document.querySelector<HTMLButtonElement>('button')
const list = document.querySelector<HTMLUListElement>('#list-todo')

const todos: Task[] = []

form?.addEventListener('submit', (e): void => {
    e.preventDefault()
console.log("add")
    if(input?.value == '' || input?.value == null) return
    
    const newTask = {
        title: input.value, 
        complete: false, 
        id: new Date().valueOf().toString()
    }
    todos.push(newTask)
    addToList(newTask)
    input.value = ''
})

function addToList(task: Task): void{
    const li = document.createElement('li')
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.complete
    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete')
    deleteButton.innerText = 'delete'

    label.append(checkbox, task.title, deleteButton)
    li.append(label)
    list?.append(li)
}

