import React, { useState } from "react";
import { LoginIcon, closeEye, openEye } from "../../assets/image/index";
import {LoginServices} from "../../services/Login/LoginServices";
import { Link } from "react-router-dom";

const Login = () => {
    const [userInput, setUserInput] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        userInput: "",
        password: ""
    });
    const [showpassword, setShowpassword] = useState<boolean>(false);

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^010\d{8}$/;

        if (!userInput) {
            setErrorMessage(prevState => ({
                ...prevState,
                userInput: "전화번호 또는 이메일을 입력해주세요."
            }));
            return false;
        }

        if (!password) {
            setErrorMessage(prevState => ({
                ...prevState,
                password: "비밀번호를 입력해주세요."
            }));
            return false;
        }

        if (!emailRegex.test(userInput) && !phoneNumberRegex.test(userInput)) {
            setErrorMessage(prevState => ({
                ...prevState,
                userInput: "올바른 전화번호 또는 이메일을 입력하세요."
            }));
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
        }
    
        try {
            const { useremail, phonenumber } = getUserInfo();
    
            const formData = {
                useremail,
                phonenumber,
                password
            };
    
            const response = await LoginServices(formData);
    
            if (response.status >= 200 && response.status < 300) {
                // 성공적으로 응답을 받았을 때 처리
                const data = await response.data;
                console.log(data); // 받은 데이터 처리
            } else {
                throw new Error('로그인에 실패했습니다.');
            }
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    const getUserInfo = () => {
        let useremail: string | undefined;
        let phonenumber: string | undefined;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^\d+$/;

        if (emailRegex.test(userInput)) {
            useremail = userInput;
        } else if (phoneNumberRegex.test(userInput)) {
            phonenumber = userInput;
        }

        return { useremail, phonenumber };
    };

    const OpenEyefuction = () => {
        const passwordInput = document.getElementById('Password');
        if (passwordInput instanceof HTMLInputElement) {
            passwordInput.type = showpassword ? 'password' : 'text';
            setShowpassword(!showpassword);
        }
    }

    return (
        <div className="Login">
            <div className="LoginHeader">
                <img src={LoginIcon} alt="Login Icon" />
                <span className="LoginTitle">로그인</span>
            </div>

            <div className="InputBox">
                <div className="IdInputBox">
                    <input
                        className="IdInput"
                        type="text"
                        placeholder="전화번호 또는 이메일"
                        value={userInput}
                        onChange={(e) => {
                            setUserInput(e.target.value);
                            setErrorMessage(prevState => ({
                                ...prevState,
                                userInput: ""
                            }));
                        }}
                    />
                    <div className="ErrorMessage">{errorMessage.userInput}</div>
                </div>
                <div className="PasswordInputBox">
                    <input
                        id="Password"
                        className="PassInput"
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img src={showpassword ? openEye : closeEye} onClick={OpenEyefuction} />
                </div>
                <div className="ErrorMessage">{errorMessage.password}</div>
            </div>

            <button className="LoginBtn" onClick={handleLogin}>로그인</button>
            <div className="GoRegister">
                아직 회원이 아닌가요? <Link className="toRegis" to="/register">회원가입</Link>
            </div>
            <div className="ForgetPw">
                비밀번호를 잊으셨나요? <Link className="toRegis" to="/resetpass">비밀번호 찾기</Link>
            </div>
        </div>
    );
};

export default Login;
