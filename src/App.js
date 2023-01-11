import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./pages/Table";
import Form from "./pages/Form";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
