package com.socialmediaapp.socialmediaapp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.socialmediaapp.socialmediaapp.model.User;

@Entity
@Table(name = "Post")
public class Post {
 
 @Id
 @GeneratedValue(strategy = GenerationType.AUTO)
 @Column(name = "post_id")
 private int postId;

 @ManyToOne
 @JoinColumn(name = "user_id", nullable = false)
 private User user;

 @Column(name = "content", nullable = false)
 private String content;

 @Column(name = "media_url")
 private String mediaUrl;

 @Column(name = "caption")
 private String caption;

 @Column(name = "created_at", nullable = false)
 private LocalDateTime createdAt;
 
 public Post() {}
 public Post(User user, String content, String mediaUrl, String caption, LocalDateTime createdAt) {
		super();		
		this.user = user;
		this.content = content;
		this.mediaUrl = mediaUrl;
		this.caption = caption;
		this.createdAt = createdAt;
}
 

public int getPostId() {
	return postId;
}

public void setPostId(int postId) {
	this.postId = postId;
}

public User getUser() {
	return user;
}

public void setUser(User user) {
	this.user = user;
}

public String getContent() {
	return content;
}

public void setContent(String content) {
	this.content = content;
}




public String getMediaUrl() {
	return mediaUrl;
}

public void setMediaUrl(String mediaUrl) {
	this.mediaUrl = mediaUrl;
}

public String getCaption() {
	return caption;
}

public void setCaption(String caption) {
	this.caption = caption;
}

public void postRepository(String caption) {
	this.caption = caption;
}

public LocalDateTime getCreatedAt() {
	return createdAt;
}

public void setCreatedAt(LocalDateTime createdAt) {
	this.createdAt = createdAt;
}



 // Constructors, getters, and setters omitted for brevity.
 
}
