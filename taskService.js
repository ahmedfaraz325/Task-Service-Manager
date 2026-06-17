// taskService.js

// 1. Add a new task
function addTask(tasks, title, priority = 'Medium') {
    if (!title || title.trim() === '') {
        throw new Error("Task title cannot be empty");
    }
    const newTask = {
        id: tasks.length + 1,
        title: title,
        priority: priority,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
}

// 2. Delete a task by ID
function deleteTask(tasks, id) {
    const initialLength = tasks.length;
    const filtered = tasks.filter(task => task.id !== id);
    if (filtered.length === initialLength) {
        throw new Error("Task not found");
    }
    return filtered;
}

// 3. Update task status
function updateTaskStatus(tasks, id, completed) {
    const task = tasks.find(t => t.id === id);
    if (!task) {
        throw new Error("Task not found");
    }
    task.completed = completed;
    return task;
}

// 4. Clear all completed tasks
function clearCompletedTasks(tasks) {
    return tasks.filter(task => !task.completed);
}

// 5. Get Task By ID (Old/Crude Version - We will refactor this)
// function getTaskById(tasks, id) {
//     // Old implementation using an unoptimized for-loop without proper type validation
//     for (let i = 0; i < tasks.length; i++) {
//         if (tasks[i].id == id) {
//             return tasks[i];
//         }
//     }
//     return null; 
// }

// 5. Refactored Get Task By ID (Improved readability and error handling)
function getTaskById(tasks, id) {
    if (typeof id !== 'number' || id <= 0) {
        throw new Error("Invalid ID provided");
    }
    
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
        throw new Error("Task with the given ID does not exist");
    }
    
    return task;
}

module.exports = {
    addTask,
    deleteTask,
    updateTaskStatus,
    clearCompletedTasks,
    getTaskById
};