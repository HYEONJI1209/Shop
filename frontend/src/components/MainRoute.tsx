import React from "react";
import {
    Mainpage,
    Register,
    Registration,
    Login,
    Resetpassword,
    FinResetpw,
    ProductDetail,
} from "./index";
import { Routes, Route } from "react-router-dom";

interface RouteProps {
    HeaderOptionClick: string;
    setHeaderOptionClick: React.Dispatch<React.SetStateAction<string>>;
}

const MainRoute: React.FC<RouteProps> = ({ HeaderOptionClick, setHeaderOptionClick }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/WildFixManagerRegistrarion" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/resetpass" element={<Resetpassword />} />
                <Route path="/finresetpw" element={<FinResetpw />} />
                <Route path="/productDetail" element={<ProductDetail setHeaderOptionClick={setHeaderOptionClick} HeaderOptionClick={HeaderOptionClick} />} />
            </Routes>
        </div>
    );
};
export default MainRoute;
