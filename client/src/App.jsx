import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layouts";
import Login from "./components/Login";
import Signup from "./components/SIgnup";
// import Layout from "./components/LayOut";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route index element={<Signup />} />
        <Route path="/home" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
