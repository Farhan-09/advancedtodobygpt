document.getElementById('add-btn').addEventListener('click', addTask);
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const completedTasks = document.getElementById('completed-tasks');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let tasks = [];

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        todoInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    todoList.innerHTML = '';
    completedTasks.innerHTML = '';

    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'bg-white bg-opacity-30 rounded-lg p-4 flex items-center justify-between backdrop-blur-lg';
        taskItem.innerHTML = `
            <span class="text-white">${task.text}</span>
            <div class="flex space-x-2">
                <button onclick="toggleTask(${index})" class="text-green-500  transition-all">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="deleteTask(${index})" class="text-red-500 transition-all">Delete</button>
            </div>
        `;

        if (task.completed) {
            completedTasks.appendChild(taskItem);
        } else {
            todoList.appendChild(taskItem);
        }
    });

    updateProgress();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateProgress() {
    const completedTasksCount = tasks.filter(task => task.completed).length;
    const progress = tasks.length ? (completedTasksCount / tasks.length) * 100 : 0;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
}   ///function
