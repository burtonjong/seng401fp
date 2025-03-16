package com.seng401.endless_odyssey.repository;

import com.seng401.endless_odyssey.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {}

