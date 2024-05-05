package com.shop.wildfix.service;

import java.util.List;
import java.util.stream.Collectors;

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
      public List<Product> getProductsByHeaderOption(String headerOptionClick) {
        // 헤더 옵션에 따라 제품을 필터링
        List<Product> allProducts = productRepository.findAll();
        return allProducts.stream()
                .filter(product -> product.getSize().equalsIgnoreCase(headerOptionClick)) // 원하는 로직에 맞게 필터링 조건 변경
                .collect(Collectors.toList());
}
}