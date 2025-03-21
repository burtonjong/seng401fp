package com.seng401.endless_odyssey.repository;

import com.seng401.endless_odyssey.model.Story;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, UUID> {
    List<Story> findByUserId(UUID userId);
}
