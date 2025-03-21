package com.seng401.endless_odyssey.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seng401.endless_odyssey.model.Story;
import com.seng401.endless_odyssey.repository.StoryRepository;

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

    @GetMapping("/user/{userId}")
    public List<Story> getStoriesByUserId(@PathVariable UUID userId) {
        return storyRepository.findByUserId(userId);
    }

    @PostMapping
    public Story createStory(@RequestBody Story story) {
        return storyRepository.save(story);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Story> updateStoryName(@PathVariable UUID id, @RequestBody Story updatedStory) {
        Optional<Story> existingStory = storyRepository.findById(id);
        
        if (existingStory.isPresent()) {
            Story story = existingStory.get();
            story.setName(updatedStory.getName());
            storyRepository.save(story);  

            return ResponseEntity.ok(story);
        } else {
            return ResponseEntity.notFound().build(); 
        }
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


