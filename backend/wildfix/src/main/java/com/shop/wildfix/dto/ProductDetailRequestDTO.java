package com.shop.wildfix.dto;

import java.util.List;

public class ProductDetailRequestDTO {
    private List<String> selectedOptions;
    private String headerOptionClick;

    // Getters and Setters
    public List<String> getSelectedOptions() {
        return selectedOptions;
    }

    public void setSelectedOptions(List<String> selectedOptions) {
        this.selectedOptions = selectedOptions;
    }

    public String getHeaderOptionClick() {
        return headerOptionClick;
    }

    public void setHeaderOptionClick(String headerOptionClick) {
        this.headerOptionClick = headerOptionClick;
    }
}
