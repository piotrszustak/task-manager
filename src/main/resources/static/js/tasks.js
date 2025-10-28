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

function showCategoryError(message) {
    let errorSpan = document.getElementById('categoryError');

    if (errorSpan === null) {
        errorSpan = document.createElement('span');
        errorSpan.id = 'categoryError';
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '0.8rem';
        addCategoryForm.appendChild(errorSpan);
    }

    errorSpan.textContent = message;
}

function isCategoryNameUnique(newName, existingCategoryNames) {
    const lowerCaseNewName = newName.toLowerCase();
    return !existingCategoryNames.some(
        existingName => existingName.toLowerCase() === lowerCaseNewName
    );
}

// === Dialog and form handling ===

const showAddCategoryDialog = document.getElementById('showAddCategoryDialog');
const addCategoryDialog = document.getElementById('addCategoryDialog');
const closeAddCategoryDialog = document.getElementById('closeAddCategoryDialog');
const addCategoryForm = document.getElementById('addCategoryForm');

showAddCategoryDialog.addEventListener('click', () => addCategoryDialog.showModal());

closeAddCategoryDialog.addEventListener('click', () => {
    addCategoryForm.reset();
    addCategoryDialog.close();
});

addCategoryDialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        addCategoryForm.reset();
        addCategoryDialog.close();
    }
});

addCategoryForm.addEventListener('submit', async event => {
    event.preventDefault();

    const newCategoryName = document.getElementById('categoryName').value.trim();

    if (newCategoryName === '') {
        showCategoryError('Task list name cannot be empty');
        return;
    }

    const categories = await fetchCategories();
    const existingCategoryNames = categories.map(category => category.name);

    if (!isCategoryNameUnique(newCategoryName, existingCategoryNames)) {
        showCategoryError('This task list already exists');
        return;
    }

    const data = {
        id: null,
        name: newCategoryName,
        taskIds: []
    }

    try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            showCategoryError('Could not create new task list - please try again');
            throw new Error('Could not create new task list.');
        }

        const createdTaskList = await response.json();
        console.log(createdTaskList);

        addCategoryForm.reset();
        addCategoryDialog.close();

        const ul = document.getElementById('categories');
        ul.innerHTML = '<li>All</li>';
        loadAllCategories();
    } catch (error) {
        console.error(error);
    }
});

// === Initializations ===

loadAllCategories();
loadAllTasks();