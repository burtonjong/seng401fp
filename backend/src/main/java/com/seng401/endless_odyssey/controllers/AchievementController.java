package com.seng401.endless_odyssey.controllers;

import com.seng401.endless_odyssey.model.Achievement;
import com.seng401.endless_odyssey.model.User;
import com.seng401.endless_odyssey.repository.AchievementRepository;
import com.seng401.endless_odyssey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AchievementController {

  @Autowired
  private AchievementRepository achievementRepository;

  @Autowired
  private UserRepository userRepository;

  // Get all achievements for a user
  @GetMapping("/{userId}")
  public ResponseEntity<List<Achievement>> getUserAchievements(@PathVariable String userId) {
    List<Achievement> achievements = achievementRepository.findByUserId(UUID.fromString(userId));
    return ResponseEntity.ok(achievements);
  }
  
  // Add a new achievement for a user
  @PostMapping
  public ResponseEntity<?> addAchievement(@RequestBody Map<String, String> payload) {
    String userId = payload.get("userId");
    String achievementName = payload.get("achievement");
    
    if (userId == null || achievementName == null) {
      return ResponseEntity
        .badRequest()
        .body(Map.of("error", "User ID and achievement name are required"));
    }
    
    // Fetch the user object
    UUID userUUID = UUID.fromString(userId);
    Optional<User> userOptional = userRepository.findById(userUUID);
    if (userOptional.isEmpty()) {
      return ResponseEntity
        .badRequest()
        .body(Map.of("error", "User not found"));
    }
    User user = userOptional.get();
    
    // Check if achievement already exists for this user
    Optional<Achievement> existingAchievement = 
      achievementRepository.findByUserIdAndAchievement(userUUID, achievementName);
    
    if (existingAchievement.isPresent()) {
      return ResponseEntity
        .ok()
        .body(Map.of("message", "Achievement already exists", "achievement", existingAchievement.get()));
    }
    
    // Create and save new achievement
    Achievement newAchievement = new Achievement(user, achievementName);
    Achievement savedAchievement = achievementRepository.save(newAchievement);
    
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(savedAchievement);
  }
  
  // Check if a user has a specific achievement
  @GetMapping("/{userId}/check")
  public ResponseEntity<Map<String, Object>> checkAchievement(
      @PathVariable String userId,
      @RequestParam String achievement) {
    
    Optional<Achievement> existingAchievement = 
      achievementRepository.findByUserIdAndAchievement(UUID.fromString(userId), achievement);
    
    Map<String, Object> response = new HashMap<>();
    response.put("exists", existingAchievement.isPresent());
    
    if (existingAchievement.isPresent()) {
      response.put("achievement", existingAchievement.get());
    }
    
    return ResponseEntity.ok(response);
  }
}
