package com.socialmediaapp.socialmediaapp.repository;



import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.socialmediaapp.socialmediaapp.model.Post;
import com.socialmediaapp.socialmediaapp.model.User;

public interface PostRepository extends CrudRepository<Post, Integer> {
    //List<Post> findAllByUserId(User user);
    
    List<Post> findPostByUser(User user);
    List<Post> findAllByUser(User user);

    Post deleteById(int id);
    

}


