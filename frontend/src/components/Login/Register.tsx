import React, { useState, useEffect } from "react";
import { RegisterServices, GetRegisterServices } from "../../services/Login/RegiServices";
import DaumPostcode from 'react-daum-postcode';
import Modal from "react-modal";
import { CheckBoxBlank, CheckBoxChecked } from "../../assets/image/index";
import { Link } from "react-router-dom";
interface UserData {
    username: string;
    email: string;
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        checkpassword: "",
        phone: "",
    });
    const [registeredData, setRegisteredData] = useState<UserData[]>([]);
    const [error, setError] = useState({
        username: "",
        email: "",
        password: "",
        checkpassword: "",
        phone: "",
    });
    const [zipCode, setZipcode] = useState<string>("");
    const [roadAddress, setRoadAddress] = useState<string>("");
    const [detailAddress, setDetailAddress] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [FirstCheck, setFirstCheck] = useState<boolean>(false);
    const [SecCheck, setSecCheck] = useState<boolean>(false);

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
        if (!validateForm() || !FirstCheck) {
            return;
        }
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

    const validateForm = () => {
        let formIsValid = true;
        const newErrorState = {
            username: "",
            email: "",
            password: "",
            checkpassword: "",
            phone: "",
        };

        if (!isValidEmail(formData.email)) {
            newErrorState.email = "올바른 이메일 주소를 입력하세요.";
            formIsValid = false;
        }

        if (!isValidPassword(formData.password)) {
            newErrorState.password = "비밀번호는 6~20자의 영문자, 숫자, 특수 문자(!@#$%^&*?)를 포함해야 합니다.";
            formIsValid = false;
        }

        if (formData.password !== formData.checkpassword) {
            newErrorState.checkpassword = "비밀번호가 일치하지 않습니다.";
            formIsValid = false;
        }

        if (!isValidPhoneNumber(formData.phone)) {
            newErrorState.phone = "올바른 전화번호를 입력하세요.";
            formIsValid = false;
        }

        setError(newErrorState);
        return formIsValid;
    };

    const isValidEmail = (email: string) => {
        // 이메일 형식 확인 로직
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password: string) => {
        // 비밀번호 유효성 확인 로직
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/;
        return passwordRegex.test(password);
    };

    const isValidPhoneNumber = (phone: string) => {
        // 전화번호 유효성 확인 로직
        const phoneRegex = /^[0-9]+$/;
        return phoneRegex.test(phone);
    };


    const completeHandler = (data: any) => {
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false);
    }

    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    // 검색 클릭
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    // 상세 주소검색 event
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetailAddress(e.target.value);
    }

    const FirstCheckClick = () => {
        setFirstCheck(!FirstCheck);
    }

    const SecCheckClick = () => {
        setSecCheck(!SecCheck);
    }

    return (
        <div className="Register">
            <div className="RegisterTitle">회원가입</div>
            <form className="ResDataForm" onSubmit={handleSubmit}>
                <div className="InputBox">
                    <label className="InputName" htmlFor="username">이름</label>
                    <input
                        className="LongInput"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="이름을 입력해주세요."
                    />
                </div>
                <div className="InputBox">
                    <label className="InputName" htmlFor="email">이메일</label>
                    <div className="ShortBox">
                        <input
                            className="ShortInput"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일 주소를 입력해주세요."
                        />
                        <button className="CheckBtn">중복확인</button>
                        {error && <div className="ErrorMessage">{error.email}</div>}
                    </div>
                </div>
                <div className="InputBox">
                    <label className="InputName" htmlFor="password">비밀번호</label>
                    <input
                        className="LongInput"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력해주세요."
                    />
                    {error ? <div className="ErrorMessage">{error.password}</div> : <span className="Commant">6~20자의 영문자, 숫자, 특수 문자(!@#$%^&*?)가 포함</span>}
                </div>
                <div className="InputBox">
                    <label className="InputName" htmlFor="checkpassword">비밀번호 확인</label>
                    <input
                        type="password"
                        className="LongInput"
                        id="checkpassword"
                        name="checkpassword"
                        onChange={handleChange}
                        placeholder="비밀번호를 입력해주세요."
                    />
                    {error && <div className="ErrorMessage">{error.checkpassword}</div>}
                </div>
                <div className="InputBox">
                    <label className="InputName" htmlFor="phone">전화번호</label>
                    <input
                        type="phone"
                        className="LongInput"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="전화번호를 -없이 입력해주세요."
                    />
                    {error && <div className="ErrorMessage">{error.phone}</div>}
                </div>

                <div className="InputBox">
                    <label className="InputName" htmlFor="address">주소</label>
                    <div className="ShortBox">
                        <input className="ShortInput" value={zipCode} readOnly placeholder="우편번호" />
                        <button className="CheckBtn" onClick={toggle}>우편번호<br />검색</button>
                    </div>
                    <input
                        id="AddressType"
                        value={roadAddress}
                        className="LongInput"
                        readOnly
                        placeholder="도로명 주소"
                    />
                    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                        <DaumPostcode onComplete={completeHandler} />
                    </Modal>
                    <input
                        id="AddressType"
                        type="text"
                        className="LongInput"
                        onChange={changeHandler}
                        value={detailAddress}
                        placeholder="상세주소"
                    />
                </div>

                <div className="AggrementTop">
                    <div>
                        <span className="GrayAgree">개인정보 수집 및 이용약관 동의</span> <span className="RedAgree">(필수)</span>
                    </div>
                    <div>
                        <img src={FirstCheck ? CheckBoxBlank : CheckBoxChecked} onClick={FirstCheckClick} />
                    </div>
                </div>
                <div className="AggrementBtm">
                    <div>
                        <span className="GrayAgree">마케팅 정보 동의</span> <span className="RedAgree">(선택)</span>
                    </div>
                    <div>
                        <img src={SecCheck ? CheckBoxBlank : CheckBoxChecked} onClick={SecCheckClick} />
                    </div>
                </div>

                <button className={!FirstCheck || !validateForm() ? 'DisResBtn' : 'ResBtn'} type="submit" disabled={!FirstCheck || !validateForm()}>회원가입</button>
            </form>
            <span className="AskToLogin">회원이신가요? <Link to="/login" className="ToLogin">로그인</Link></span>
        </div>
    );
};

export default Register;
