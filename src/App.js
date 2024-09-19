import InvoiceForm from "./components/InvoiceForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Transactions from "./Transactions";
import Register from "./register";
import { AuthProvider } from "./contexts/authcontexts";
import Login from "./login";
import Contactus from "./Contactus";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-gray-100">
                  <div className="mx-auto max-w-7xl">
                    <InvoiceForm />
                  </div>
                </div>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
