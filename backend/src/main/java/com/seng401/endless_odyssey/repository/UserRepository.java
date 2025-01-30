package com.seng401.endless_odyssey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.seng401.endless_odyssey.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
