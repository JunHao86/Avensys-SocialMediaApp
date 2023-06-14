package com.group1.socialmediaapplication.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.group1.socialmediaapplication.entity.Post;
import com.group1.socialmediaapplication.service.PostService;

@Controller
public class PostController {

	private PostService post_s;
	
	public PostController(PostService ps) {
		super();
		this.post_s = ps;
	}
	
	//See all posts
	@RequestMapping("list-post")
	public String viewAllPost(ModelMap model) {
		List<Post> posts = post_s.viewPostRepo();
	
		model.addAttribute("posts",posts);
		return "redirect:list-post";
	}
	
	
	
	//Create Post
	@RequestMapping(value="create-post",method=RequestMethod.POST)
	public String createPost(ModelMap model, Post p) {
		post_s.createPostToRepo(p.getCaption(), p.getPosttype(), p.getUrl(), LocalDateTime.now());
		
		return "redirect:create-post"; 
	}
}
