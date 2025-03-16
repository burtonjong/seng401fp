package com.seng401.endless_odyssey.repository;

import com.seng401.endless_odyssey.model.User;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {}
 