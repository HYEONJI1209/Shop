package com.shop.wildfix.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.wildfix.model.Product;
import com.shop.wildfix.repository.ProductRepository;

@Service
public class ProductService {
      @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
}
}