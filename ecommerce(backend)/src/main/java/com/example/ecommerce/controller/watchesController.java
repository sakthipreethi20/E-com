package com.example.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.model.watches;
import com.example.ecommerce.service.watchesService;





@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class watchesController {
	@Autowired
	watchesService services;
	
	@PostMapping("/saveWatches")
	public ResponseEntity<watches> saveWatches(@RequestBody watches s){

		 try {
	            watches watchesResponse = services.saveWatches(s);
	            return ResponseEntity.ok(watchesResponse); // Return the saved sign-up data with 200 OK
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 Internal Server Error if there's an exception
	        }
	}
	
	@GetMapping("/watches/{id}")
	public ResponseEntity<watches>getCustomerById(@PathVariable("id") int id ){
		Optional<watches>  value=services.getWatchesById(id);
			if(value.isPresent()) {
			return new ResponseEntity<watches>(value.get(),HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/allwatches")
	public ResponseEntity<List<watches>>getAllCustomer(){
	
		List<watches> values= services.getAllWatches();
		return new ResponseEntity<>(values,HttpStatus.OK);
	}

}
