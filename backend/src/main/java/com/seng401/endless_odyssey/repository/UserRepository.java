package com.seng401.endless_odyssey.repository;

import com.seng401.endless_odyssey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
 