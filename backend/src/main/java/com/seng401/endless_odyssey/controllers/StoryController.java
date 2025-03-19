package com.seng401.endless_odyssey.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.seng401.endless_odyssey.model.Story;
import com.seng401.endless_odyssey.repository.StoryRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/stories")
public class StoryController {

    @Autowired
    private final StoryRepository storyRepository;

    public StoryController(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @GetMapping
    public List<Story> getStories() {
        return storyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable UUID id) {
        Optional<Story> story = storyRepository.findById(id);
        if (story.isPresent()) {
            return ResponseEntity.ok(story.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    } 

    @PostMapping
    public Story createStory(@RequestBody Story story) {
        return storyRepository.save(story);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable UUID id) {
        if (storyRepository.existsById(id)) {
            storyRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // ok no content
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
