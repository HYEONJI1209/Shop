import React from "react";
import {
    Mainpage,
    Register,
    Registration,
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
            </Routes>
        </div>
    );
};
export default MainRoute;
