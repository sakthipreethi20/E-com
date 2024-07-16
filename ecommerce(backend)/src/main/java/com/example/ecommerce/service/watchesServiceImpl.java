package com.example.ecommerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.model.watches;
import com.example.ecommerce.repository.watchesRepository;

@Service
public class watchesServiceImpl implements watchesService {

	@Autowired
	watchesRepository watchesRepo;
	
	@Override
	public watches saveWatches(watches s) {
		return watchesRepo.save(s);
	}

	@Override
	public Optional<watches> getWatchesById(int id) {
		
		return watchesRepo.findById(id);
	}

	@Override
	public List<watches> getAllWatches() {
		
		return watchesRepo.findAll();
	}

}
