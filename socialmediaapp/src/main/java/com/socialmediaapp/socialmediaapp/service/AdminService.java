package com.socialmediaapp.socialmediaapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

import com.socialmediaapp.socialmediaapp.model.Post;
import com.socialmediaapp.socialmediaapp.model.User;
import com.socialmediaapp.socialmediaapp.repository.PostRepository;
import com.socialmediaapp.socialmediaapp.repository.UserRepository;

@Service
public class AdminService {
	
	private PostRepository postRepository;
	private UserRepository userRepository;
	
	public AdminService(PostRepository postRepository, UserRepository userRepository)
	{
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}
	
	public void deleteUser(User user)
	{
		userRepository.delete(user);
	}
	public void deletePostbyID(int id)
	{
		postRepository.deleteById(id);
	}
	
	public void updatePostByID(int id, Post post)
	{
		Optional<Post> tempPost = postRepository.findById(id);
		if(tempPost!=null)
		{
			Post updatePost = tempPost.orElse(new Post());
			updatePost.setCaption(post.getCaption());
			//System.out.println(post.getCaption());
			updatePost.setContent(post.getContent());
			updatePost.setMediaUrl(post.getMediaUrl());
			updatePost.setUser(post.getUser());	
			
			postRepository.save(updatePost);			
		}
		
	}
	
	public void updateUserByID(int id,User user)
	{
		Optional<User> tempUser = userRepository.findById(id);
		if(tempUser!=null)
		{
			User updateUser = tempUser.orElse(new User());
			updateUser.setUsername(user.getUsername());
			//System.out.println(post.getCaption());
			updateUser.setPassword(user.getPassword());
			updateUser.setEmail(user.getEmail());
			updateUser.setRole(user.getRole());	
			
			userRepository.save(updateUser);			
		}
	}
	
	public List<Post> getAllPosts()
	{
		List<Post> list = StreamSupport.stream(postRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
		return list;
	}
	
	public List<User> getAllUsers()
	{
		List<User> list = StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
		return list;
	}
}
