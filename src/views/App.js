import "./App.scss";
import Navigation from "../components/layout/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import ListUser from "../components/users/ListUser";
import Header from "../components/layout/Header";
import { useStore } from "../store";

function App() {
  const [state, dispatch] = useStore();

  const { isLogin } = state;

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/accounts" element={<ListUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
