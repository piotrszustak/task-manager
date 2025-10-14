loadAllCategories();
loadAllTasks();

async function loadAllCategories() {
    try {
        const response = await fetch("/api/categories");

        if(!response.ok) {
            throw new Error("Could not fetch categories");
        }

        const data = await response.json();
        const ul = document.getElementById("categoryList");

        data.forEach(category => {
            const li = document.createElement("li");
            li.textContent = category.name;
            ul.appendChild(li);
        });
    } catch(error) {
        console.error(error);
    }
}

async function loadAllTasks() {
    try {
        const response = await fetch("/api/tasks");

        if(!response.ok) {
            throw new Error("Could not fetch tasks");
        }

        const data = await response.json();
        const ul = document.getElementById("taskList");

        data.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.title + ": " + task.description;
            ul.appendChild(li);
        });
    } catch(error) {
        console.error(error);
    }
}