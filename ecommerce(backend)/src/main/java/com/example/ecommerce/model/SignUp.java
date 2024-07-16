package com.example.ecommerce.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name="SignUp")
public class SignUp {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private int id;
	@Column(name="username")
	private String username;
	@Column(name="password")
	private String password;
	@Column(name="emailid")
	private String emailid;
	
	public SignUp() {
		super();
		
	}
	public SignUp(int id, String username, String password, String emailid, String city) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.emailid = emailid;
		
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getusername() {
		return username;
	}
	public void setusername(String username) {
		this.username = username;
	}
	public String getpassword() {
		return password;
	}
	public void setpassword(String password) {
		this.password = password;
	}

 

	public String getEmailid() {
		return emailid;
	}
 
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
 
	

}