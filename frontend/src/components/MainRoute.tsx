import React from "react";
import {
    Mainpage,
    Register,
    Registration,
    Login,
} from "./index";
import { Routes, Route } from "react-router-dom";

interface RouteProps { }

const MainRoute: React.FC<RouteProps> = ({ }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/WildFixManagerRegistrarion" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};
export default MainRoute;
