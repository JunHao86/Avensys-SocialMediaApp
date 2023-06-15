package com.group1.socialmediaapplication.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.group1.socialmediaapplication.service.UserService;

@Controller
@SessionAttributes("user")
public class UserController {

	private UserService user_svc;
	
	public UserController(UserService u_svc) {
		super();
		this.user_svc = u_svc;
	}
}
