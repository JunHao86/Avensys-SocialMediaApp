package com.group1.socialmediaapplication.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;	
	
	@Column(name="createdDate")
	private Date createdDate;
	
	@Column(name="lastModifiedDate")
	private Date lastModifiedDate;
	
	@Column(name="posts")
	private List<Post> posts;

	public User(String name, String email, String password, Date createdDate, Date lastModifiedDate,
			List<Post> posts) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdDate = createdDate;
		this.lastModifiedDate = lastModifiedDate;
		this.posts = posts;
	}

	public User(int id, String name, String email, String password, Date createdDate, Date lastModifiedDate,
			List<Post> posts) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdDate = createdDate;
		this.lastModifiedDate = lastModifiedDate;
		this.posts = posts;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", createdDate="
				+ createdDate + ", lastModifiedDate=" + lastModifiedDate + ", posts=" + posts + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	
}

