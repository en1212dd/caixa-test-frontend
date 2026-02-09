import CharacterTablePage from "@pages/CharacterTablePage";
import HomePage from "@pages/HomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/characters" element={<CharacterTablePage />} />
            </Routes>
        </BrowserRouter>
    );
}