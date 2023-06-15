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
   
    //=============================================================
    //Functions in login/register
    
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
        if(userService.verifyUsername(newUser)) {
        	//If the username already exists, return a conflict error
        	return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        }
    	newUser.setRole("USER");
        userService.createUser(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
    
    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    User user = userService.getUserByUsername(username);
    if(user != null) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    	}
    	return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    
    //=============================================================
    //Functions in welcome (feed of all posts, sorted in ??)
    
    //=============================================================
    //Functions in Admin Page 
    //Check the GetMapping/PostMapping if correct
    
    //Get List of Posts (not tested)
	@GetMapping("/admin/posts")
    public ResponseEntity<List<Post>> getAllPosts()
    {
		return new ResponseEntity<>(userService.getAllPosts(),HttpStatus.OK);
    }

	//Get List of Users (not tested)
	@GetMapping("/admin/users")
	public ResponseEntity<List<User>> getAllUsers()
	{
		return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
	}
   
//	//Update a post by its postID (not tested)
//	@PostMapping("/admin/posts/{post_id}/update")
//	public ResponseEntity<String> updatePostFromPosts(@RequestBody Post post,@PathVariable int post_id){
//		Optional<Post> post2 = userService.getPostByPostId(post.getPostId());
//		userService.updatePostByPostId(post2);
//		return new ResponseEntity<>("Update Complete",HttpStatus.OK);
//	}
//	//Update a user by its username (not tested)
//	@PostMapping("/admin/users/{username}/update")
//	public ResponseEntity<String> updateUserFromUsers(@RequestBody User user,@PathVariable String username){
//		User user2 = userService.getUserByUsername(user.getUsername());
//		userService.updateUser(user2);
//		return new ResponseEntity<>("Update Complete",HttpStatus.OK);
//	}


	
	@PostMapping("/admin/update/post")
	public ResponseEntity<String> updatePost(@RequestBody Post post){
//		Optional<Post> post2 = userService.getPostByPostId(post.getPostId());
//		userService.updatePostByPostId(post);
		userService.updatePostByID(post.getPostId(),post);
		
		return new ResponseEntity<>("Update Complete",HttpStatus.OK);
	}
	
	//Delete a post in Admin Dashboard (tested)
	@PostMapping("/admin/delete/post")
	public ResponseEntity<String> deletePostFromPosts(@RequestBody Post post){
		userService.deletePostByPostId(post.getPostId());
		return new ResponseEntity<>("Delete Complete",HttpStatus.OK);
	}

//	@PostMapping("/admin/update/user")
//	public ResponseEntity<String> updateUser(@RequestBody User user){
//		userService.updateUser(user.getUser_id(),user);
//		return new ResponseEntity<>("Update Complete",HttpStatus.OK);
//	}

	@PostMapping("/admin/update/user")
	public ResponseEntity<String> updateUser(@RequestBody User user) {
	    userService.updateUser(user.getUser_id(), user);
	    return new ResponseEntity<>("Update Complete", HttpStatus.OK);
	}
	
	//Delete a user in Admin Dashboard (tested)
	@PostMapping("/admin/delete/user")
	public ResponseEntity<String> deleteUserFromUsers(@RequestBody User user) {
	    userService.deleteUser(user.getUser_id());
	    return new ResponseEntity<>("Delete User Complete", HttpStatus.OK);
	}
    
    //=============================================================
    //Functions in userposts/username (profile)
    
    //Get List of Posts by Username (tested)
    @GetMapping("/userposts/{username}")
    public ResponseEntity<List<Post>> getUserPosts(@PathVariable String username) {
        List<Post> posts = userService.getAllPostByUser(username);
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
        List<Post> posts = userService.getAllPostByUser(username);
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
        List<Post> posts = userService.getAllPostByUser(username);
        if(posts != null) {
        	//Delete action
        	userService.deletePostByPostId(post_id);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    



}

