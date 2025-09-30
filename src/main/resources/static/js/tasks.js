loadAllTasks();

async function loadAllTasks() {
    try {
        const response = await fetch("/api/tasks");

        if(!response.ok) {
            throw new Error("Could not fetch resource");
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