import React from "react";
import { Mainpage } from "./index";
import { Routes, Route } from "react-router-dom";

interface RouteProps {
}

const MainRoute: React.FC<RouteProps> = ({ }) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Mainpage />} />
            </Routes>
        </div>
    );
};
export default MainRoute;
