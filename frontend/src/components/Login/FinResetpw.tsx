import React from "react";
import { ResetpwIcon } from "../../assets/image/index";
import { Link } from "react-router-dom";

const FinResetpw = () => {
    return (
        <div className="Login">
            <div className="LoginHeader">
                <img src={ResetpwIcon} alt="Login Icon" />
                <span className="LoginTitle">비밀번호 재설정</span>
            </div>

            <span className="FinishReset">새로운 비밀번호로 변경되었습니다.</span>
            <Link to="/login">
                <button className="LoginBtn">로그인 하러 가기</button>
            </Link>
        </div>
    )
}

export default FinResetpw;