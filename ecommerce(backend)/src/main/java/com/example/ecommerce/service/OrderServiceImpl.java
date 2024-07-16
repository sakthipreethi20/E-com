package com.example.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order placeOrder(Order order) {
        // You can perform any business logic here before saving the order
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    


    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
	public void deleteOrder(Long orderId) {
    	orderRepository.deleteById(orderId);
		
	}

    @Override
    public List<Order> getUserOrderHistory(long userId) {
        return orderRepository.findByUserId(userId);
    }
}