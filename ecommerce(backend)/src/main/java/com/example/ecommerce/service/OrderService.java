package com.example.ecommerce.service;

import java.util.List;

import com.example.ecommerce.model.Order;

public interface OrderService {
    Order placeOrder(Order order);
    List<Order> getAllOrders();
    Order getOrderById(Long id);
	
	void deleteOrder(Long orderId);
	
	List<Order> getUserOrderHistory(long userId);
}