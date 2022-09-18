import "./App.scss";
// import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ListUser from "../components/users/ListUser";
import LoginPage from "../components/login/LoginPage";
import ListUser from "../components/users/ListUser";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<ListUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
