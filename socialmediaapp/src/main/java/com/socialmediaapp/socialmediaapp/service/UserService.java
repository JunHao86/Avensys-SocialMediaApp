package com.socialmediaapp.socialmediaapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.socialmediaapp.socialmediaapp.model.Post;
import com.socialmediaapp.socialmediaapp.model.User;
import com.socialmediaapp.socialmediaapp.repository.PostRepository;
import com.socialmediaapp.socialmediaapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    public User validateUser(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        return user;
    }
    
    public List<Post> getUserPosts(String username) {
        User user = userRepository.findByUsername(username);
        return postRepository.findAllByUser(user);
    }
    
    //=============================================================
    //User Service
    
    //Create - used in @PostMapping("/register")
    public void createUser(User newUser){
    	userRepository.save(newUser);
    }
    
    //Read - used in ?? 
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    //Update - used by Admin in @PostMapping("??")
    public void updateUser(User user) {
    	userRepository.save(user);
    }
    
    //Delete - used by Admin in @PostMapping("??")
    public void deleteUser(int user_id) {
    	userRepository.deleteById(user_id);
    }
    
    
   //=============================================================
   //Post Service (CRUD)
    
    //Create - used in @PostMapping("/userposts/{username}/post/") (not tested)
    public void createPost(Post newPost) {
    	postRepository.save(newPost);    	
    }

    //Read - used in ??
	public Optional<Post> getPostByPostId(int post_id) {
		return postRepository.findById(post_id);
	}
    
	//Update - used in @GetMapping("/userposts/{username}/update/{post_id}/") (not tested)
	public void updatePostByPostId(Optional<Post> post) {
		postRepository.save(post);
	}
    
	//Delete - used in @GetMapping("/userposts/{username}/delete/{post_id}") (tested)
	public void deletePostByPostId(int id) {
		postRepository.deleteById(id);
	}

}
