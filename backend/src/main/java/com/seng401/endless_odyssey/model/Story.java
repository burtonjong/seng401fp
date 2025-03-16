package com.seng401.endless_odyssey.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "stories")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "story")
    @Column(nullable = false)
    private List<Message> messages;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public Story() {}
    public Story(User user) { this.user = user; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<Message> getMessages() { return messages; }
    public void setMessages(List<Message> messages) { this.messages = messages;}

}
