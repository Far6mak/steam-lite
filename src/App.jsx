import { Routes, Route } from "react-router-dom";
import Store from "./pages/Store";
import Library from "./pages/Library";
import Statistics from "./pages/Statistics";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/library" element={<Library />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  );
}