// Storing tasks in local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks(filter = "All") {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (filter === "All" || task.priority === filter) {
            const li = document.createElement('li');
            li.setAttribute('data-priority', task.priority);
            if (task.completed) {
                li.style.textDecoration = "line-through";
                li.style.opacity = "0.6";
            }
            li.innerHTML = `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <small>Due: ${task.date}</small>
                </div>
                <button onclick="toggleComplete(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        }
    });
}

function addTask(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const date = document.getElementById('task-date').value;
    const priority = document.getElementById('task-priority').value;

    if (title && date) {
        tasks.push({ title, description, date, priority, completed: false });
        saveTasks();
        displayTasks();
        showToast("Task added successfully!");
        document.getElementById('add-task-form').reset();
    } else {
        alert('Please fill out the required fields.');
    }
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
        showToast("Task deleted successfully!");
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function filterTasks() {
    const filter = document.getElementById('filter-priority').value;
    displayTasks(filter);
}

function sortTasks(by) {
    if (by === "date") {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (by === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    saveTasks();
    displayTasks();
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => (toast.className = ""), 3000);
}

// Load tasks on page load
window.onload = () => displayTasks();
