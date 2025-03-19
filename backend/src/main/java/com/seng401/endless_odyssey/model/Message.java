package com.seng401.endless_odyssey.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "story_id", referencedColumnName = "id", nullable = false)
    private Story story;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String content;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public Message() {}

    public Message(Story story, String role, String content) {
        this.story = story;
        this.role = role;
        this.content = content;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Story getStory() { return story; }
    public void setStory(Story story) { this.story = story; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

}
