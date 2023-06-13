package com.group1.socialmediaapplication.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.group1.socialmediaapplication.entity.Post;
import com.group1.socialmediaapplication.entity.User;
import com.group1.socialmediaapplication.repository.PostRepository;

@Service
public class PostService {

	private PostRepository post_repo;
	
	public PostService(PostRepository p_repo) {
		super();
		this.post_repo = p_repo;
	}
	
	//View List
	public List<Post> viewPostRepo(){
		return post_repo.findAll();
	}
	
	//Create Action
	public void createPostToRepo(String caption, String posttype, String url, User createdBy, Date createdDate) {
		post_repo.save((new Post(caption,posttype,posttype,createdBy,createdDate)));
	}
	
	//Read Action
	public Optional<Post> readPostFromRepo(int id) {
		return post_repo.findById(id);
	}
	
	//Update Action
	public void updatePostInRepo(Post post) {
		post_repo.save(post);
	}
	
	//Delete ACtion
	public void deletePostFromRepo(int id) {
		post_repo.deleteById(id);
	}

	
}
