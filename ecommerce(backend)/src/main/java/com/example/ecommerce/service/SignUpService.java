package com.example.ecommerce.service;

import java.util.List;

import com.example.ecommerce.model.SignUp;


public interface SignUpService {
	public SignUp saveSignUp(SignUp s);
	public List<SignUp> getAllSignUp();
	 public List<SignUp>findByUsernameAndPassword(String username,String password);
}
