// === Function definitions ===

async function fetchCategories() {
    const response = await fetch('/api/categories');
    if (!response.ok) throw new Error('Could not fetch categories.');
    return await response.json();
}

async function loadAllCategories() {
    try {
        const data = await fetchCategories();
        const ul = document.getElementById('categories');
        ul.innerHTML = '<li>All</li>';

        data.forEach(category => {
            const li = document.createElement('li');
            li.textContent = category.name;
            ul.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchTasks() {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Could not fetch tasks.');
    return await response.json();
}

async function loadAllTasks() {
    try {
        const data = await fetchTasks();
        const ul = document.getElementById('tasks');
        ul.innerHTML = '';

        data.forEach(task => {
            const li = document.createElement('li');
            const description = task.description === null ? '' : ': ' + task.description;
            li.textContent = task.title + description;
            ul.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

// === Initializations ===

loadAllCategories();
loadAllTasks();