import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Countries from "./components/Countries";
import CountrySingle from "./components/CountrySingle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* This is where other routes will go to allow Layout to be visible */}
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="countries/:single" element={<CountrySingle />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
