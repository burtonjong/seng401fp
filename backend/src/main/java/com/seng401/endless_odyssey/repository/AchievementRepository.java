package com.seng401.endless_odyssey.repository;

import com.seng401.endless_odyssey.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, UUID> {
    // Change method to accept UUID instead of String
    List<Achievement> findByUserId(UUID userId);
    
    // Change first parameter to UUID
    Optional<Achievement> findByUserIdAndAchievement(UUID userId, String achievement);
}
