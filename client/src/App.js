import React from "react";
import Q1 from "./screens/Q1.js";
import Q2 from "./screens/Q2.js";
import Q3 from "./screens/Q3.js";
import Q4 from "./screens/Q4.js";
import Q5 from "./screens/Q5.js";
import Signin from "./screens/Signin.js";
import Verifyotp from "./screens/Verifyotp.js";
import Dashboard from "./screens/Dashboard.js";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route exact path = "/" element = {<Signin />} />
            <Route path = "/verifyotp" element  = {<Verifyotp />} />
            <Route path = "/q1" element  = {<Q1 />} />
            <Route path = "/q2" element  = {<Q2 />} />
            <Route path = "/q3" element  = {<Q3 />} />
            <Route path = "/q4" element  = {<Q4 />} />
            <Route path = "/q5" element  = {<Q5 />} />
            <Route path = "/dashboard" element  = {<Dashboard />} />
        </Routes>
    );
}

export default App;