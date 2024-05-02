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
}

const MainRoute: React.FC<RouteProps> = ({ HeaderOptionClick }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/WildFixManagerRegistrarion" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/resetpass" element={<Resetpassword />} />
                <Route path="/finresetpw" element={<FinResetpw />} />
                <Route path="/productDetail" element={<ProductDetail HeaderOptionClick={HeaderOptionClick} />} />
            </Routes>
        </div>
    );
};
export default MainRoute;
