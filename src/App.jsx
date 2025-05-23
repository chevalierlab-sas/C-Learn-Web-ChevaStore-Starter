import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* <Route path="/" element={<HomePage />} /> */}
            {/* <Route path="/produk" element={<ProductPage />} /> */}
            {/* <Route path="/my/toko" element={<MyStorePage />} /> */}
            {/* <Route path="/my/toko/edit" element={<EditStorePage />} /> */}
            {/* <Route path="/toko/create" element={<CreateStorePage />} /> */}
            {/* <Route path="/toko" element={<StorePage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
