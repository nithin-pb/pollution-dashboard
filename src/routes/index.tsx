import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../pages";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
        </Routes>
    )
}