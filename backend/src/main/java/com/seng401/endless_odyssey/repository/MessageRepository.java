package com.seng401.endless_odyssey.repository;

import com.seng401.endless_odyssey.model.Message;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, UUID> {
    List<Message> findByStoryId(UUID storyId);
}

