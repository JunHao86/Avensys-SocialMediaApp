package com.group1.socialmediaapplication.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Admin {

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
	
	@Column(name="lastLogin")
	private Date lastLogin;

	public Admin() {}

	public Admin(String name, String email, String password, Date createdDate, Date lastLogin) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdDate = createdDate;
		this.lastLogin = lastLogin;
	}

	public Admin(int id, String name, String email, String password, Date createdDate, Date lastLogin) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdDate = createdDate;
		this.lastLogin = lastLogin;
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

	public Date getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}

	@Override
	public String toString() {
		return "Admin [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", createdDate="
				+ createdDate + ", lastLogin=" + lastLogin + "]";
	}

	
	
}
