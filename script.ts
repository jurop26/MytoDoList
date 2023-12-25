type Task = {
    title: string,
    complete: boolean,
    id: string
}

const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement>('#new-task-item')
const button = document.querySelector<HTMLButtonElement>('button')
const list = document.querySelector<HTMLUListElement>('#list-todo')

let tasks: Task[] = loadTasks()
tasks.forEach(addToList)

form?.addEventListener('submit', (e): void => {
    e.preventDefault()

    if(input?.value == '' || input?.value == null) return
    
    const newTask = {
        title: input.value, 
        complete: false, 
        id: new Date().valueOf().toString()
    }
    tasks.push(newTask)
    addToList(newTask)
    saveTasks()
    input.value = ''
})


function addToList(task: Task): void{
    const li = document.createElement('li')
    const checkbox = document.createElement('input')
    const label = document.createElement('label')
    checkbox.type = 'checkbox'
    checkbox.checked = task.complete
    checkbox.addEventListener('change', (): void => {
        task.complete = checkbox.checked
        saveTasks()
        })

    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    taskDiv.innerText = task.title
    taskDiv.dataset.id = task.id

    const deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'delete')
    deleteButton.innerText = 'delete'
    deleteButton.addEventListener('click', (e): void => {
        const target = e.target as HTMLButtonElement
        target?.closest('li')?.remove()
        tasks = tasks.filter(t => t.id !== task.id)
        
        saveTasks()
    })
    
    label.append(checkbox, taskDiv, deleteButton)
    li.append(label)
    list?.append(li)
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks(): Task[] {
    const tasks = localStorage.getItem('tasks')
    if(tasks == null) return []
    return JSON.parse(tasks)
}
