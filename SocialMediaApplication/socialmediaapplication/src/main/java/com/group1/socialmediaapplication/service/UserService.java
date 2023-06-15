package com.group1.socialmediaapplication.service;

import com.group1.socialmediaapplication.repository.UserRepository;

public class UserService {

	private UserRepository user_repo;
	
	public UserService(UserRepository u_repo) {
		super();
		this.user_repo = u_repo;
	}
	
	
	
}
