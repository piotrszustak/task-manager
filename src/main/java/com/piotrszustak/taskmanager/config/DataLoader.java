package com.piotrszustak.taskmanager.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.piotrszustak.taskmanager.tasks.Task;
import com.piotrszustak.taskmanager.tasks.TaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);

    private final TaskRepository taskRepository;
    private final ObjectMapper objectMapper;

    public DataLoader(TaskRepository taskRepository, ObjectMapper objectMapper) {
        this.taskRepository = taskRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        insertSampleTasks();
    }

    private void insertSampleTasks() {
        if (taskRepository.count() != 0) {
            log.info("Skipped inserting sample tasks: tasks table already contains data.");
            return;
        }

        List<Task> tasks = loadSampleTasks();

        if (tasks.isEmpty()) {
            log.warn("Skipped inserting sample tasks: no sample tasks found.");
            return;
        }

        taskRepository.saveAll(tasks);
        log.info("Inserted {} sample tasks into tasks table.", tasks.size());
    }

    private List<Task> loadSampleTasks() {
        List<Task> tasks = new ArrayList<>();

        try (InputStream inputStream = new ClassPathResource("sampledata/tasks.json").getInputStream()) {
            tasks = objectMapper.readValue(inputStream, new TypeReference<List<Task>>() {});

            if (!tasks.isEmpty()) {
                log.info("Loaded {} sample tasks from file.", tasks.size());
            } else {
                log.warn("No sample tasks found in file.");
            }
        } catch (Exception e) {
            log.warn("Failed to load sample tasks from file.", e);
        }

        return tasks;
    }
}
