package com.piotrszustak.taskmanager.categories;

import com.piotrszustak.taskmanager.BaseEntity;
import com.piotrszustak.taskmanager.tasks.Task;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {

    @NotBlank
    @Column(nullable = false, unique = true)
    private String name;
    @OneToMany(mappedBy = "category")
    private List<Task> tasks = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return tasks;
    }
}
