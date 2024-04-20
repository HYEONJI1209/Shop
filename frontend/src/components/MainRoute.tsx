import React from "react";
<<<<<<< HEAD
import { Mainpage } from "./index";
import { Routes, Route } from "react-router-dom";

interface RouteProps {
=======
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Register} from "./index";

const MainRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
>>>>>>> 6a54f524831f9b4c1275c1134efe2649e46dcbe9
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
