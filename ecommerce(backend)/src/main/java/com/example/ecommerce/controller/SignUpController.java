package com.example.ecommerce.controller;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.model.SignUp;
import com.example.ecommerce.service.SignUpService;


 
 

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class SignUpController {
	@Autowired
	SignUpService signUpService;
	@PostMapping("/saveSignUpData")
	public ResponseEntity<SignUp> saveSignUp(@RequestBody SignUp s){
//		signUpService.saveSignUp(s);
//		return new ResponseEntity<>(HttpStatus.OK);
		 try {
	            SignUp signUpResponse = signUpService.saveSignUp(s);
	            return ResponseEntity.ok(signUpResponse); // Return the saved sign-up data with 200 OK
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 Internal Server Error if there's an exception
	        }
	}
	@GetMapping("/getAllSignUpData")
	public ResponseEntity<List<SignUp>> getAllSignUp(){
		List<SignUp> AllSignUpData = signUpService.getAllSignUp();
		return new ResponseEntity<>(AllSignUpData, HttpStatus.OK);
	}
	@GetMapping("/authenticateSignup")
    public ResponseEntity<List<SignUp>> authenticate(@RequestParam("username") String username,
                                              @RequestParam("password") String password) {
        List<SignUp> signup = signUpService.findByUsernameAndPassword(username, password);
        if (true)  //signup.size()>0
        {
            return new ResponseEntity<>(signup,HttpStatus.OK);
        } 
        else {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

}
