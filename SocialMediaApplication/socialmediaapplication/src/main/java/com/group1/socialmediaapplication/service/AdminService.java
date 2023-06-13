package com.group1.socialmediaapplication.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.group1.socialmediaapplication.entity.Admin;
import com.group1.socialmediaapplication.repository.AdminRepository;

@Service
public class AdminService {
	
	private AdminRepository admin_repo;
	
	public AdminService(AdminRepository a_repo) {
		super();
		this.admin_repo = a_repo;
	}
	
	//View List
	public List<Admin> viewAdminRepo(){
		return admin_repo.findAll();
	}
	
	//Create Action
	public void createAdminToRepo(String name, String email, String password, Date createdDate, Date lastLogin) {
		admin_repo.save((new Admin(name,email,password,createdDate,lastLogin)));
	}
	
	//Read Action
	public Optional<Admin> readAdminFromRepo(int id) {
		return admin_repo.findById(id);
	}
	
	//Update Action
	public void updateAdminInRepo(Admin admin) {
		admin_repo.save(admin);
	}
	
	//Delete ACtion
	public void deleteAdminFromRepo(int id) {
		admin_repo.deleteById(id);
	}

}
