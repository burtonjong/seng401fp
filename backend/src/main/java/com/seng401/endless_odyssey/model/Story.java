package com.seng401.endless_odyssey.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private String name;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "story")
    @Column(nullable = false)
    @JsonManagedReference
    private List<Message> messages;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public Story() {}
    public Story(User user) { this.user = user; }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<Message> getMessages() { return messages; }
    public void setMessages(List<Message> messages) { this.messages = messages;}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
