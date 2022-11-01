import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";

import Home from "./pages/Home";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/*" element={<Register/>} />
          <Route path="/login/*" element={<Login/>} />
        </Routes>
      </Router>
      {/* <Container maxWidth="lg">
        <Register />
      </Container> */}
    </div>
  );
};

export default App;
