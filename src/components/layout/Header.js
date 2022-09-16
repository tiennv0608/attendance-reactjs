import logo from "../../assets/images/logo.svg";

const Header = () => {
  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Attendance app</p>
      </header>
    </>
  );
};

export default Header;
