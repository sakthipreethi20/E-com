package com.example.ecommerce.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="watches")
public class watches {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private int id;
	@Column(name="brand")
	private String brand ;
	@Column(name="name")
	private String name;
	@Column(name="price")
	private String price;
	@Column(name="imageUrl")
	private String imageUrl;
	@Column(name="dialColor")
	private String dialColor;
	@Column(name="strapMaterial")
	private String strapMaterial;
	@Column(name="quantity")
	private String quantity;
	
	
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getDialColor() {
		return dialColor;
	}
	public void setDialColor(String dialColor) {
		this.dialColor = dialColor;
	}
	public String getStrapMaterial() {
		return strapMaterial;
	}
	public void setStrapMaterial(String strapMaterial) {
		this.strapMaterial = strapMaterial;
	}
	

}
