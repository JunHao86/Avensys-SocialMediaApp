package com.socialmediaapp.socialmediaapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.socialmediaapp.socialmediaapp.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
    User findByUsernameAndPassword(String username, String password);
}