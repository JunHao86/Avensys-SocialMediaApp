package com.socialmediaapp.socialmediaapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socialmediaapp.socialmediaapp.model.Post;
import com.socialmediaapp.socialmediaapp.model.User;
import com.socialmediaapp.socialmediaapp.repository.PostRepository;
import com.socialmediaapp.socialmediaapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    //=============================================================
    //User Service
    
    public User validateUser(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        return user;
    }
    
    public List<Post> getUserPosts(String username) {
        User user = userRepository.findByUsername(username);
        return postRepository.findAllByUser(user);
    }
    
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    
   //=============================================================
   //Post Service
    
	public void updatePostByPostId(Post post) {
		postRepository.save(post);
	}
    
	public void deletePostByPostId(int id) {
		postRepository.deleteById(id);
	}
}
