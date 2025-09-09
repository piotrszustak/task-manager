# Task Manager

🛠️ Project under development

## Table of Contents

- [Project Description](#project-description)
- [Technologies](#technologies)
- [System Requirements](#system-requirements)
- [Configuration](#configuration)
- [Credits](#credits)
- [Author](#author)

## Project Description

Task Manager is a web application that allows users to manage tasks. The application enables:

- Adding new tasks
- Editing existing tasks
- Deleting tasks
- Marking tasks as completed
- Viewing the task list

## Technologies

- **Backend:** Java, Spring Boot
- **Frontend:** HTML, CSS, JavaScript
- **Database:** PostgreSQL
- **Build tool:** Maven

## System Requirements

- Java 17+
- Maven 3.8+
- PostgreSQL 14+

## Configuration

1. Clone the repository:
   ```sh
   git clone https://github.com/piotrszustak/task-manager.git
   ```

2. Create a PostgreSQL database (default name: `task_manager`).

3. Update `src/main/resources/application.properties` with your local credentials if needed. Default values:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```

## Credits

- Fonts: Inter and Montserrat from [Google Fonts](https://fonts.google.com/)

## Author

Created by Piotr Szustak

GitHub: <https://github.com/piotrszustak><br>
LinkedIn: <https://www.linkedin.com/in/piotrszustak/>