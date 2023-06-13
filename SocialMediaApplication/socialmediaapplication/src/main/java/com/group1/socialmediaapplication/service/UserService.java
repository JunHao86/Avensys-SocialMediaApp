package com.group1.socialmediaapplication.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.group1.socialmediaapplication.entity.Post;
import com.group1.socialmediaapplication.entity.User;
import com.group1.socialmediaapplication.repository.UserRepository;

@Service
public class UserService {

	private UserRepository user_repo;
	
	public UserService(UserRepository u_repo) {
		super();
		this.user_repo = u_repo;
	}
	
	//View List
	public List<User> viewUserRepo(){
		return user_repo.findAll();
	}
	
	//Create Action
	public void createUserToRepo(String name, String email, String password, Date createdDate, Date lastModifiedDate, List<Post> posts) {
		user_repo.save((new User(name,email,password,createdDate,lastModifiedDate,posts)));
	}
	
	//Read Action
	public Optional<User> readUserFromRepo(int id) {
		return user_repo.findById(id);
	}
	
	//Update Action
	public void updateUserInRepo(User user) {
		user_repo.save(user);
	}
	
	//Delete ACtion
	public void deleteUserFromRepo(int id) {
		user_repo.deleteById(id);
	}
	
}
