package com.group1.socialmediaapplication.login;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("user")
public class UserLoginController {
	
	private UserLoginAuth loginAuth_s;

	public UserLoginController(UserLoginAuth login_as) {
		super();
		this.loginAuth_s = login_as;
	}

	//==================================================================
	//Handling login page only
		
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String loginPage()
	{
		return "login"; 
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String welcomePage
	(@RequestParam String email, @RequestParam String password, ModelMap model)
	{
		if(loginAuth_s.authenticate(email, password)) {
			model.put("user",email);
			return "welcome";
		}
		model.put("errorMessage","Invalid Credentials, please try again!");
		return "login";
	}
}