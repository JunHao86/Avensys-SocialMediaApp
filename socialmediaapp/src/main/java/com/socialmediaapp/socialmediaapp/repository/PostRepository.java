package com.socialmediaapp.socialmediaapp.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.socialmediaapp.socialmediaapp.model.Post;
import com.socialmediaapp.socialmediaapp.model.User;

public interface PostRepository extends CrudRepository<Post, Integer> {
	List<Post> findPostByUser(User user);
	List<Post> findAllByUser(User user);

	Post deleteById(int id);
	void save(Optional<Post> post);
    
}
