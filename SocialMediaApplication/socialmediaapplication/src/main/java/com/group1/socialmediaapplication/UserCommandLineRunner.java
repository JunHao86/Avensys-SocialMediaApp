package com.group1.socialmediaapplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.group1.socialmediaapplication.repository.UserRepository;


@Component
public class UserCommandLineRunner implements CommandLineRunner{

	@Autowired
	private UserRepository user_repo;
	
	
	@Override
	public void run(String... args) throws Exception{
				
		System.out.println("From User CLR");
	}
	
}