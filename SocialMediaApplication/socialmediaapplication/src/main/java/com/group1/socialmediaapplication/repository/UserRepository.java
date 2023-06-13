package com.group1.socialmediaapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.socialmediaapplication.user.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer>{

}
