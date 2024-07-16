package com.example.ecommerce.service;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.model.SignUp;
import com.example.ecommerce.repository.SignUpRepository;

@Service
public class SignUpServiceImpl implements SignUpService {
	@Autowired
	SignUpRepository signUpRepo;
	@Override
	public SignUp saveSignUp(SignUp signup) {
		return signUpRepo.save(signup);
	}
	@Override
	public List<SignUp> getAllSignUp() {
		return signUpRepo.findAll();
	}

	@Override
	public List<SignUp> findByUsernameAndPassword(String username, String password) {
		return signUpRepo.fetchDataUsernameAndPassword(username, password);

	}
 
}
