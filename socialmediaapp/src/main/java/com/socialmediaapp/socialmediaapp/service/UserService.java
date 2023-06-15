package com.socialmediaapp.socialmediaapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

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

    public User validateUser(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        return user;
    }
    
    
    
    //=============================================================
    //User Service (done)
    
    
    //Validation - used in @PostMapping("/register") (tested)
    public boolean verifyUsername(User newUser) {
    	return userRepository.existsByUsername(newUser.getUsername());
    }
    
    //Create - used in @PostMapping("/register") (tested)
    public void createUser(User newUser){
    	userRepository.save(newUser);
    }
    
    //Read singular user - used in @GetMapping("/user/{username}") (tested)
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    //Read list of user - used by Admin (tested)
    public List<User> getAllUsers(){
    	return (List<User>) userRepository.findAll();
    }

    //Update - used by Admin  (tested)
    public void updateUser(User user) {
    	userRepository.save(user);
    }
    
    //Delete - used by Admin (tested)
    public void deleteUser(int user_id) {
        User user = userRepository.findById(user_id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        List<Post> userPosts = postRepository.findAllByUser(user);
        for (Post post : userPosts) {
            postRepository.delete(post);
        }

        userRepository.delete(user);
    }
    
   //=============================================================
   //Post Service (CRUD)
    
    //Create - used by user to create Post  (tested)
    public void createPost(Post newPost) {
    	postRepository.save(newPost);    	
    }

    //Read singular post - used by user to update Post (tested)
	public Optional<Post> getPostByPostId(int post_id) {
		return postRepository.findById(post_id);
	}
	
	//Read list of post by userID - used by User/Admin (tested)
	public List<Post> getAllPostByUser(String username){
        User user = userRepository.findByUsername(username);
        return postRepository.findAllByUser(user);
	}
	
	//Read list of all posts - used by Admin (tested)
	public List<Post> getAllPosts(){
		return (List<Post>) postRepository.findAll();
	}
    
	//Update - used by ??
	public void updatePostByPostId(Optional<Post> post) {
		postRepository.save(post);
	}
    
	//Update - used by Admin (tested)
    public void updatePostByID(int id, Post post) {
        Optional<Post> tempPost = postRepository.findById(id);
        if (tempPost.isPresent()) {
            Post updatePost = tempPost.get();
            updatePost.setCaption(post.getCaption());
            updatePost.setContent(post.getContent());
            updatePost.setMediaUrl(post.getMediaUrl());
            updatePost.setUser(post.getUser());

            postRepository.save(updatePost);
        }
    }
	
	//Delete - used by User/Admin (tested)
	public void deletePostByPostId(int post_id) {
		postRepository.deleteById(post_id);
	}

} 
