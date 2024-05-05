package com.shop.wildfix.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.shop.wildfix.model.Product;
import com.shop.wildfix.service.ProductService;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    // 헤더 옵션에 따른 제품 목록을 프론트엔드로 반환
    @GetMapping("/api/productDetail")
    public ResponseEntity<List<Product>> getProductsByHeaderOption(@RequestParam String headerOptionClick) {
        List<Product> products = productService.getProductsByHeaderOption(headerOptionClick);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/api/postregistration")
    public Product createProduct(
        @RequestParam("file") MultipartFile file,
        @RequestParam("size") String size,
        @RequestParam("price") String price,
        @RequestParam("explanation") String explanation,
        @RequestParam("productName") String productName
   ) throws IOException {
    
       try {
           // 파일 저장 로직
           String filePath = "uploads/" + file.getOriginalFilename();
           file.transferTo(new File(filePath));

           // 상품 객체 생성
           Product product = new Product();
           product.setProductName(productName);
           product.setExplanation(explanation);
           product.setSize(size);
           product.setPrice(Double.parseDouble(price));
           product.setFilePath(filePath);

           // 데이터베이스에 저장
           return productService.saveProduct(product);
    } catch (IOException e) {
        System.err.println("File error: " + e.getMessage());
        throw new IOException("Failed to save product data", e);
    } catch (Exception e) {
        System.err.println("Unexpected error: " + e.getMessage());
        throw new RuntimeException("An unexpected error occurred", e);
    }
   }
}