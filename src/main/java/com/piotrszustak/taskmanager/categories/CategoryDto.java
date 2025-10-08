package com.piotrszustak.taskmanager.categories;

import java.util.List;

public record CategoryDto(Long id, String name, List<Long> taskIds) {
}
