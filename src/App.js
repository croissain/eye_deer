import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import CssBaseline from "@mui/material/CssBaseline";

import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";

import Home from "./pages/Home";

import "./App.scss";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
