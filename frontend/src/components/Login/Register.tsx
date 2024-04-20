import React, { useState, useEffect } from "react";
import { RegisterServices, GetRegisterServices } from "../../services/Login/RegiServices";

interface UserData {
    username: string;
    email: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [registeredData, setRegisteredData] = useState<UserData[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetRegisterServices();
                setRegisteredData(response.data);
            } catch (error) {
                console.error("데이터 가져오기 실패:", error);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await RegisterServices(formData);
            console.log("등록 성공!");
            // 성공적으로 등록된 데이터 가져오기
            const response = await GetRegisterServices();
            setRegisteredData(response.data);
        } catch (error) {
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

            <div>
                <h2>회원가입된 기록</h2>
                <ul>
                    {registeredData.map((data, index) => (
                        <li key={index}>{data.username} - {data.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Register;
