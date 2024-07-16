package com.example.ecommerce.repository;


import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ecommerce.model.SignUp;


 

@Repository
public interface SignUpRepository extends JpaRepository<SignUp, Integer>{
	@Query("select u from SignUp u where u.username = :username and u.password = :password")
	List<SignUp> fetchDataUsernameAndPassword(String username,String password);
}
