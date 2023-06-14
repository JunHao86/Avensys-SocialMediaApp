package com.group1.socialmediaapplication.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Post {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name="caption")
	private String caption;
	
	@Column(name="posttype")
	private String posttype;
	
	@Column(name="url")
	private String url;
	
	@Column(name="createdDate")
	private LocalDateTime createdDate;

	public Post() {}
	
	public Post(int id, String caption, String posttype, String url, LocalDateTime createdDate) {
		super();
		this.id = id;
		this.caption = caption;
		this.posttype = posttype;
		this.url = url;
		this.createdDate = createdDate;
	}
	
	public Post(String caption, String posttype, String url, LocalDateTime createdDate) {
		super();
		this.caption = caption;
		this.posttype = posttype;
		this.url = url;
		this.createdDate = createdDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getPosttype() {
		return posttype;
	}

	public void setPosttype(String posttype) {
		this.posttype = posttype;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public LocalDateTime getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "Post [id=" + id + ", caption=" + caption + ", posttype=" + posttype + ", url=" + url + ", createdDate="
				+ createdDate + "]";
	}


	 
	
}
