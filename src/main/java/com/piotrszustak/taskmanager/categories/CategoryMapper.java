package com.piotrszustak.taskmanager.categories;

import com.piotrszustak.taskmanager.BaseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryMapper {

    public CategoryDto toDto(Category category) {
        List<Long> taskIds = category.getTasks()
                .stream()
                .map(BaseEntity::getId)
                .toList();
        return new CategoryDto(
                category.getId(),
                category.getName(),
                taskIds);
    }
}
