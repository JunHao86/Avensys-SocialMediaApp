package com.group1.socialmediaapplication.login;

import org.springframework.stereotype.Service;

@Service
public class UserLoginAuth {
	//probably not used because we have Firebase
	
	public boolean authenticate(String email, String password) {

		//Hard code tentatively
		boolean isValidEmail = email.equalsIgnoreCase("admin@gmail.com");
		boolean isValidPassWord = password.equalsIgnoreCase("Password");

		return isValidEmail && isValidPassWord;
	}
}
