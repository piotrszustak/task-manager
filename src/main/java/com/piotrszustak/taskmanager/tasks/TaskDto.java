package com.piotrszustak.taskmanager.tasks;

public record TaskDto(Long id, String title, String description, boolean completed, Long categoryId) {
}
