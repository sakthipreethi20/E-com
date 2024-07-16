package com.example.ecommerce.service;

import java.util.List;
import java.util.Optional;

import com.example.ecommerce.model.watches;


public interface watchesService {

	watches saveWatches(watches s);

	Optional<watches> getWatchesById(int id);

	List<watches> getAllWatches();



}
