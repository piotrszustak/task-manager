package com.piotrszustak.taskmanager.categories;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

class CategoryMapperTest {

    private final CategoryMapper categoryMapper = new CategoryMapper();

    @Test
    void shouldReturnDto() {
        // given
        Category category = new Category();
        category.setName("foo");

        // when
        CategoryDto actual = categoryMapper.toDto(category);

        // then
        CategoryDto expected = new CategoryDto(null, "foo", new ArrayList<>());

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void shouldReturnEntity() {
        // given
        CategoryDto categoryDto = new CategoryDto(null, "foo", new ArrayList<>());

        // when
        Category actual = categoryMapper.toEntity(categoryDto);

        // than
        Category expected = new Category();
        expected.setName("foo");

        assertThat(actual.getId()).isEqualTo(expected.getId());
        assertThat(actual.getName()).isEqualTo(expected.getName());
        assertThat(actual.getTasks()).isEqualTo(expected.getTasks());
    }
}