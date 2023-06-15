package com.socialmediaapp.socialmediaapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.socialmediaapp.socialmediaapp.model.Post;
import com.socialmediaapp.socialmediaapp.model.User;
import com.socialmediaapp.socialmediaapp.service.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
	
	private AdminService adminservice; 
	
	public AdminController()
	{
		
	}
	
	@Autowired
	public AdminController(AdminService adminservice)
	{
		this.adminservice = adminservice;
	}
	
	@PostMapping("/admin/delete/post")
	public ResponseEntity<String> deletePost(@RequestBody Post post){
		adminservice.deletePostbyID(post.getPostId());
		//System.out.println(post);
		return new ResponseEntity<>("Delete Complete",HttpStatus.OK);
	}
	
	@PostMapping("/admin/delete/user")
	public ResponseEntity<String> deleteUser(@RequestBody User user){
		adminservice.deleteUser(user);
		//System.out.println(post);
		return new ResponseEntity<>("Delete User Complete",HttpStatus.OK);
	}

	
	@PostMapping("/admin/update/post")
	public ResponseEntity<String> updatePost(@RequestBody Post post){
		
		adminservice.updatePostByID(post.getPostId(),post);
		return new ResponseEntity<>("Update Complete",HttpStatus.OK);
	}
	
	@PostMapping("/admin/update/user")
	public ResponseEntity<String> updateUser(@RequestBody User user){
		
		adminservice.updateUserByID(user.getUser_id(),user);
		return new ResponseEntity<>("Update Complete",HttpStatus.OK);
	}
	
	

	@GetMapping("/admin/allposts")
    public ResponseEntity<List<Post>> getAllPosts()
    {
		return new ResponseEntity<>(adminservice.getAllPosts(),HttpStatus.OK);
    }
	
	@GetMapping("/admin/allusers")
	public ResponseEntity<List<User>> getAllUsers()
	{
		return new ResponseEntity<>(adminservice.getAllUsers(),HttpStatus.OK);
	}
}
