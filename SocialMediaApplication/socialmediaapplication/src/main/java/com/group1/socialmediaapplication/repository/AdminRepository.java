package com.group1.socialmediaapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.socialmediaapplication.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

}
