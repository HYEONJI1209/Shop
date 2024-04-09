import React from "react";
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
}
export default MainRoute;