// === Imports ===

import { showErrorMessage, cleanErrorMessage } from './utils.js';

// === Variables ===

const addCategoryDialog = document.getElementById('addCategoryDialog');
const addCategoryForm = document.getElementById('addCategoryForm');

const showAddCategoryDialogBtn = document.getElementById('showAddCategoryDialog');
const closeAddCategoryDialogBtn = document.getElementById('closeAddCategoryDialog');

// === Function definitions ===

async function fetchCategories() {
    const response = await fetch('/api/categories');
    if (!response.ok) throw new Error('Could not fetch categories.');
    return await response.json();
}

export async function loadAllCategories() {
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

function cleanAddCategoryForm() {
    cleanErrorMessage(addCategoryForm);
    addCategoryForm.reset();
}

function handleShowAddCategoryDialog() {
    cleanAddCategoryForm();
    addCategoryDialog.showModal();
}

function handleCloseAddCategoryDialog() {
    addCategoryDialog.close();
}

function handleAddCategoryDialogKeydown(event) {
    if (event.key === 'Escape') {
        handleCloseAddCategoryDialog();
    }
}

function isCategoryNameUnique(newName, existingCategoryNames) {
    const lowerCaseNewName = newName.toLowerCase();
    return !existingCategoryNames.some(
        existingName => existingName.toLowerCase() === lowerCaseNewName
    );
}

async function handleAddCategoryFormSubmit(event) {
    event.preventDefault();

    const newCategoryName = document.getElementById('categoryName').value.trim();

    if (newCategoryName === '') {
        showErrorMessage(addCategoryForm, 'Task list name cannot be empty');
        return;
    }

    try {
        const categories = await fetchCategories();
        const existingCategoryNames = categories.map(category => category.name);

        if (!isCategoryNameUnique(newCategoryName, existingCategoryNames)) {
            showErrorMessage(addCategoryForm, 'This task list already exists');
            return;
        }

        const data = {
            name: newCategoryName,
            taskIds: []
        }

        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            showErrorMessage(addCategoryForm, 'Could not create new task list - please try again');
            throw new Error('Could not create new task list.');
        }

        const createdTaskList = await response.json();
        console.log(createdTaskList);

        addCategoryDialog.close();

        loadAllCategories();
    } catch (error) {
        console.error(error);
        showErrorMessage(addCategoryForm, 'Network error. Please try again.');
    }
}

// === Event handling ===

showAddCategoryDialogBtn.addEventListener('click', handleShowAddCategoryDialog);

closeAddCategoryDialogBtn.addEventListener('click', handleCloseAddCategoryDialog);

addCategoryDialog.addEventListener('keydown', handleAddCategoryDialogKeydown);

addCategoryForm.addEventListener('submit', handleAddCategoryFormSubmit);