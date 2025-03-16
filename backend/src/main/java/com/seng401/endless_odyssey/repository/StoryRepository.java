package com.seng401.endless_odyssey.repository;

import com.seng401.endless_odyssey.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {}
