package com.socialmediaapp.socialmediaapp.controller;

import java.util.List;

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
import com.socialmediaapp.socialmediaapp.repository.UserRepository;
import com.socialmediaapp.socialmediaapp.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    UserRepository userRepository;

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
        userRepository.save(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/userposts/{username}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable String username) {
        List<Post> posts = userService.getUserPosts(username);
        if(posts != null) {
            return new ResponseEntity<>(posts, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    User user = userRepository.findByUsername(username);
    if(user != null) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    	}
    	return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/userrole/{username}")
    public ResponseEntity<String> getAdminUserByUsername(@PathVariable String username) {
    User user = userRepository.findByUsername(username);
    if(user != null) {
        return new ResponseEntity<>(user.getRole(), HttpStatus.OK);
    	}
    	return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    
    @PostMapping("/user/create")
	public ResponseEntity<String> createPost(@RequestBody Post post){
		
		userService.createPost(post);
		return new ResponseEntity<>("Insert Complete",HttpStatus.OK);
	}
    
    @PostMapping("/user/delete")
	public ResponseEntity<String> deletePost(@RequestBody Post post){
		
		userService.deletePost(post);
		return new ResponseEntity<>("Delete Complete",HttpStatus.OK);
	}
    
    @PostMapping("/user/update")
	public ResponseEntity<String> updatePost(@RequestBody Post post){
		
		userService.deletePost(post);
		return new ResponseEntity<>("Delete Complete",HttpStatus.OK);
	}
    
    //Create a post with postID, tied to username (not tested)
    @PostMapping("/userposts/{username}/post")
    public ResponseEntity<Post> createUserPostByUsername(@RequestBody Post newPost, @PathVariable String username){
        User user = userService.getUserByUsername(username);
        newPost.setUser(user);
        userService.createPost(newPost);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

}

