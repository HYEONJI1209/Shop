package com.shop.wildfix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.shop.wildfix.model.Product;
import com.shop.wildfix.service.ProductService;

import java.io.File;
import java.io.IOException;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/postregistration")
    public Product createProduct(
        @RequestParam("file") MultipartFile file,
        @RequestParam("size") String size,
        @RequestParam("price") String price,
        @RequestParam("explanation") String explanation,
        @RequestParam("productName") String productName
    ) throws IOException {
        // 파일 저장 로직
        String filePath = "uploads/" + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // 상품 객체 생성
        Product product = new Product();
        product.setProductName(productName);
        product.setExplanation(explanation);
        product.setSize(size);
        product.setPrice(Double.parseDouble(price));

        // 데이터베이스에 저장
        return productService.saveProduct(product);
    }
}