
package com.shop.wildfix.dto;

public class RegisterRequest {
    private String username;
    private String password;
    private String email;

    // 기본 생성자
    public RegisterRequest() {}

    // 모든 필드를 포함하는 생성자 (선택적)
        public RegisterRequest(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    // Getter 메소드
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    // Setter 메소드
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
