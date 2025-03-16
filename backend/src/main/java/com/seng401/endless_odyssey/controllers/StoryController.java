package com.seng401.endless_odyssey.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.seng401.endless_odyssey.model.Story;
import com.seng401.endless_odyssey.repository.StoryRepository;

import java.util.List;

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

    @PostMapping
    public Story createStory(@RequestBody Story story) {
        return storyRepository.save(story);
    }
}
