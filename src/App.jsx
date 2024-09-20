import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Countries from "./components/Countries";
import CountrySingle from "./components/CountrySingle";
import Favourites from "./components/Favourites";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* This is where other routes will go to allow Layout to be visible */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="countries/:single" element={<CountrySingle />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
