import React, { useState, useEffect } from "react";
import { RegisterServices, GetRegisterServices, checkEmailDuplicate } from "../../services/Login/RegiServices";
import DaumPostcode from 'react-daum-postcode';
import Modal from "react-modal";
import { CheckBoxBlank, CheckBoxChecked, closeEye, openEye } from "../../assets/image/index";
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
    const [showpassword, setShowpassword] = useState<boolean>(false);
    const [showpasswordcehck, setShowpasswordcheck] = useState<boolean>(false);

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
        // 입력이 변경될 때마다 유효성 검사 및 오류 상태 설정
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // 입력이 변경될 때마다 유효성 검사 및 오류 상태 설정
        validateInput(name, value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 각 입력 필드의 유효성을 확인하고 오류 메시지를 표시
        validateInput("username", formData.username);
        validateInput("email", formData.email);
        validateInput("password", formData.password);
        validateInput("checkpassword", formData.checkpassword);
        validateInput("phone", formData.phone);

        // 오류가 있거나 체크박스가 선택되지 않았을 경우 종료
        if (!FirstCheck || Object.values(error).some(errorMessage => errorMessage !== "")) {
            return;
        }

        // 주소 부분을 폼 데이터에 추가
        const updatedFormData = { ...formData, address: `${roadAddress} ${detailAddress}` };

        // checkpassword 필드를 폼 데이터에서 제외
        const { checkpassword, ...formDataWithoutCheckPassword } = updatedFormData;

        try {
            await RegisterServices(formDataWithoutCheckPassword);
            console.log("등록 성공!");
            // 성공적으로 등록된 데이터 가져오기
            const response = await GetRegisterServices();
            setRegisteredData(response.data);
        } catch (error) {
            console.error("등록 실패:", error);
        }
    };


    const handleCheckDuplicate = async () => {
        try {
            const isDuplicate = await checkEmailDuplicate(formData.email);
            if (isDuplicate) {
                setError(prevState => ({ ...prevState, email: "중복된 이메일 주소입니다." }));
            } else {
                setError(prevState => ({ ...prevState, email: "" }));
            }
        } catch (error) {
            console.error("중복 확인 실패:", error);
        }
    };

    const validateInput = (name: string, value: string) => {
        let errorMessage = "";
        switch (name) {
            case "email":
                errorMessage = !isValidEmail(value) ? "올바른 이메일 주소를 입력하세요." : "";
                break;
            case "password":
                errorMessage = !isValidPassword(value) ? "비밀번호는 6~20자의 영문자, 숫자, 특수 문자(!@#$%^&*?)를 포함해야 합니다." : "";
                break;
            case "checkpassword":
                errorMessage = formData.password !== value ? "비밀번호가 일치하지 않습니다." : "";
                break;
            case "phone":
                errorMessage = !isValidPhoneNumber(value) ? "올바른 전화번호를 입력하세요." : "";
                break;
            default:
                break;
        }
        setError(prevState => ({ ...prevState, [name]: errorMessage }));
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
        const phoneRegex = /^010\d{8}$/;
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

    const isAnyFieldEmpty = () => {
        return (
            Object.values(formData).some(value => value === '') ||
            !isValidEmail(formData.email) ||
            !isValidPassword(formData.password) ||
            formData.password !== formData.checkpassword ||
            !isValidPhoneNumber(formData.phone)
        );
    };

    const OpenEyefuction = () => {
        const passwordInput = document.getElementById('password');
        if (passwordInput instanceof HTMLInputElement) {
            passwordInput.type = showpassword ? 'password' : 'text';
            setShowpassword(!showpassword);
        }
    }

    const OpenEyecheckfuction = () => {
        const passwordInput = document.getElementById('checkpassword');
        if (passwordInput instanceof HTMLInputElement) {
            passwordInput.type = showpasswordcehck ? 'password' : 'text';
            setShowpasswordcheck(!showpasswordcehck);
        }
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
                    <div className="ShortBoxs">
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
                            <button className="CheckBtn" onClick={handleCheckDuplicate}>중복확인</button>
                        </div>
                        {error && <div className="ErrorMessage">{error.email}</div>}
                    </div>
                </div>
                <div className="InputBox">
                    <label className="InputName" htmlFor="password">비밀번호</label>
                    <div className="PwBox">
                        <input
                            className="PwInput"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <img src={showpassword ? openEye : closeEye} onClick={OpenEyefuction} />
                    </div>
                    {error ? <div className="ErrorMessage">{error.password}</div> : <span className="Commant">6~20자의 영문자, 숫자, 특수 문자(!@#$%^&*?)가 포함</span>}
                </div>
                <div className="InputBox">
                    <label className="InputName" htmlFor="checkpassword">비밀번호 확인</label>
                    <div className="PwBox">
                        <input
                            type="password"
                            className="PwInput"
                            id="checkpassword"
                            name="checkpassword"
                            onChange={handleChange}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <img src={showpasswordcehck ? openEye : closeEye} onClick={OpenEyecheckfuction} />
                    </div>
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
                        <img src={FirstCheck ? CheckBoxChecked : CheckBoxBlank} onClick={FirstCheckClick} />
                    </div>
                </div>
                <div className="AggrementBtm">
                    <div>
                        <span className="GrayAgree">마케팅 정보 동의</span> <span className="RedAgree">(선택)</span>
                    </div>
                    <div>
                        <img src={SecCheck ? CheckBoxChecked : CheckBoxBlank} onClick={SecCheckClick} />
                    </div>
                </div>

                {/* <button className={!FirstCheck || isAnyFieldEmpty() ? 'DisResBtn' : 'ResBtn'} type="submit" disabled={!FirstCheck || isAnyFieldEmpty()}>회원가입</button> */}
                <button className="ResBtn" type="submit">회원가입</button>
            </form>
            <span className="AskToLogin">회원이신가요? <Link to="/login" className="ToLogin">로그인</Link></span>
        </div>
    );
};

export default Register;
