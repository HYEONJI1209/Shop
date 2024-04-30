import React, { useState } from "react";
import { ResetpwIcon, closeEye, openEye } from "../../assets/image/index";
import {ResetPassServices} from "../../services/Login/ResetpassServices";

const Resetpassword = () => {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState({ password: false, passwordConfirmation: false });
    const [errors, setErrors] = useState({ password: "", passwordConfirmation: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/;

    const togglePasswordVisibility = (field: 'password' | 'passwordConfirmation') => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const validatePassword = (value: string) => {
        if (!passwordRegex.test(value)) {
            return "비밀번호는 최소 6자 이상이며, 영문, 숫자, 특수 문자를 포함해야 합니다.";
        }
        return "";
    };

    const validatePasswordConfirmation = (value: string) => {
        if (value !== password) {
            return "비밀번호가 일치하지 않습니다.";
        }
        return "";
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (isSubmitted) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: validatePassword(value)
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                passwordConfirmation: validatePasswordConfirmation(passwordConfirmation)
            }));
        }
    };

    const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordConfirmation(value);
        if (isSubmitted) {
            setErrors(prevErrors => ({
                ...prevErrors,
                passwordConfirmation: validatePasswordConfirmation(value)
            }));
        }
    };

    const handleResetPw = async () => {
        setIsSubmitted(true);
        const passwordError = validatePassword(password);
        const passwordConfirmationError = validatePasswordConfirmation(passwordConfirmation);
    
        setErrors({
            password: passwordError,
            passwordConfirmation: passwordConfirmationError
        });
    
        if (!passwordError && !passwordConfirmationError) {
            try {
                const response = await ResetPassServices(password);
                console.log("Password reset successful", response);
            } catch (error) {
                console.error("Password reset failed", error);
            }
        }
    };
    return (
        <div className="Login">
            <div className="LoginHeader">
                <img src={ResetpwIcon} alt="Login Icon" />
                <span className="LoginTitle">비밀번호 재설정</span>
            </div>

            <div className="InputBox">
                <div className="resetPasswordInputBox">
                <div className="PasswordInputBox">
                    <input
                        id="Password"
                        className="PassInput"
                        type={showPassword.password ? "text" : "password"}
                        placeholder="비밀번호"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <img src={showPassword.password ? openEye : closeEye} alt="Eye Icon" onClick={() => togglePasswordVisibility('password')} />
                </div>
                {isSubmitted && <div className="ErrorMessage">{errors.password}</div>}
                </div>

                <div className="PasswordInputBox">
                    <input
                        id="Passwordcheck"
                        className="PassInput"
                        type={showPassword.passwordConfirmation ? "text" : "password"}
                        placeholder="비밀번호 확인"
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                    />
                    <img src={showPassword.passwordConfirmation ? openEye : closeEye} alt="Eye Icon" onClick={() => togglePasswordVisibility('passwordConfirmation')} />
                </div>
                {isSubmitted && <div className="ErrorMessage">{errors.passwordConfirmation}</div>}
            </div>

            <button className="LoginBtn" onClick={handleResetPw}>비밀번호 재설정</button>
            <div className="GoRegister">
                회원이신가요? <span>로그인</span>
            </div>
        </div>
    );
};

export default Resetpassword;
