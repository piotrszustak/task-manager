package com.piotrszustak.taskmanager.tasks;

import com.piotrszustak.taskmanager.BaseEntity;
import com.piotrszustak.taskmanager.categories.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

    @NotBlank
    private String title;
    private String description;
    private boolean completed;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @Column(name = "creation_date", nullable = false, updatable = false)
    private LocalDateTime creationDate;
    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    public Task() {
        this.creationDate = LocalDateTime.now();
        this.updateDate = this.creationDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }
}
