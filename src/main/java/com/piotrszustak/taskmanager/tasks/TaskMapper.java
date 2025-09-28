package com.piotrszustak.taskmanager.tasks;

import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskDto toDto(Task task) {
        return new TaskDto(task.getId(), task.getTitle(), task.getDescription(), task.isCompleted());
    }
}
