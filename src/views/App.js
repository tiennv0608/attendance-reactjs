import "./App.scss";
import Navigation from "../components/layout/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import ListUser from "../components/users/ListUser";
import Header from "../components/layout/Header";
import ListClasses from "../components/classes/ListClasses";
import ListTeachers from "../components/teachers/ListTeachers";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/accounts" element={<ListUser />} />
          <Route path="/classes" element={<ListClasses />} />
          <Route path="/teachers" element={<ListTeachers />}>
            {/* <Route path="/view/:id" element={<ListTeachers />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
