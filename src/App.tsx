import React from 'react';
import MainRoutes from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter basename={'/pollution-dashboard'}>
            <MainRoutes/>
        </BrowserRouter>
    );
}

export default App;
