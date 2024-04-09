import React, { useState } from "react";
import { RegisterServices } from "../../services/Login/RegiServices";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await RegisterServices(formData); // 데이터를 서비스로 보냄
            // 성공적으로 등록되었을 때 수행할 동작 추가
            console.log("등록 성공!");
        } catch (error) {
            // 등록 실패 시 수행할 동작 추가
            console.error("등록 실패:", error);
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">사용자명:</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">가입</button>
            </form>
        </div>
    );
};

export default Register;
