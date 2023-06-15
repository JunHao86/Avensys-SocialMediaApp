package com.group1.socialmediaapplication.user;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class User {

	@Id
	@GeneratedValue
	private int id;
	
	@Column(name="username")
	private String username;
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;	
	
	@Column(name="createdBy")
	private User createdBy;
	
	@Column(name="createdDate")
	private Date createdDate;
	
	@Column(name="isAdmin")
	private boolean isAdmin;
	
	//not included: List<Posts>
	//not included: Admin as a child class

	public User() {}
	
	public User(int id, String username, String email, String password, User createdBy, Date createdDate,
			boolean isAdmin) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.isAdmin = isAdmin;
	}
	
	public User(String username, String email, String password, User createdBy, Date createdDate,
			boolean isAdmin) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.isAdmin = isAdmin;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
				+ ", createdBy=" + createdBy + ", createdDate=" + createdDate + ", isAdmin=" + isAdmin + "]";
	}


	
}
