package com.group1.socialmediaapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.socialmediaapplication.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{

}
