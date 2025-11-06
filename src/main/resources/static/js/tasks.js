// === Function definitions ===

async function fetchTasks() {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Could not fetch tasks.');
    return await response.json();
}

export async function loadAllTasks() {
    try {
        const data = await fetchTasks();
        const ul = document.getElementById('tasks');
        ul.innerHTML = '';

        data.forEach(task => {
            const li = document.createElement('li');
            const description = task.description ? `: ${task.description}` : '';
            li.textContent = task.title + description;
            ul.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}