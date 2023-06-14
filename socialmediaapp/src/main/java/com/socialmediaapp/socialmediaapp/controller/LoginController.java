package com.socialmediaapp.socialmediaapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.socialmediaapp.socialmediaapp.model.Post;
import com.socialmediaapp.socialmediaapp.model.User;
import com.socialmediaapp.socialmediaapp.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:5555"})
public class LoginController {

    @Autowired
    UserService userService;
   
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        User user = userService.validateUser(loginUser.getUsername(), loginUser.getPassword());

        if(user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User newUser) {
        newUser.setRole("USER");
        userService.createUser(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    
    //=============================================================
    
    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    User user = userService.getUserByUsername(username);
    if(user != null) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    	}
    	return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    //=============================================================
    //Functions in userposts/username (profile)
    
    //Get List of Posts by Username (works)
    @GetMapping("/userposts/{username}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable String username) {
        List<Post> posts = userService.getUserPosts(username);
        if(posts != null) {
            return new ResponseEntity<>(posts, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    //Create a post with postID, tied to username (not tested)
    @PostMapping("/userposts/{username}/post/")
    public ResponseEntity<Post> createUserPostByUsername(@RequestBody Post newPost, @PathVariable String username){
    	userService.createPost(newPost);
    	return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }
        
    //Update a post by its postID, tied to username (not tested)
    @GetMapping("/userposts/{username}/update/{post_id}/")
    public ResponseEntity<List<Post>> updateUserPostByUsername(@PathVariable String username, @PathVariable int post_id) {
        List<Post> posts = userService.getUserPosts(username);
        if(posts != null) {      	
			Optional<Post> post = userService.getPostByPostId(post_id);
			if(post!=null){
				//update post using POST
        		userService.updatePostByPostId(post);
        		return new ResponseEntity<>(posts, HttpStatus.OK);
        	}
        	return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    //Delete a post by its postID, tied to username (tested)
    @GetMapping("/userposts/{username}/delete/{post_id}")
    public ResponseEntity<List<Post>> deleteUserPostByUsername(@PathVariable String username, @PathVariable int post_id) {
        List<Post> posts = userService.getUserPosts(username);
        if(posts != null) {
        	//Delete action
        	userService.deletePostByPostId(post_id);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    



}

