package com.piotrszustak.taskmanager.tasks;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TasksPageController {

    @GetMapping("/tasks")
    public String viewTasksPage() {
        return "forward:/tasks.html";
    }
}
