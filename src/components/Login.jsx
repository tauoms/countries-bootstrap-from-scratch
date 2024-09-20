import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithEmailAndPassword(email, password);
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center mt-5"
      style={{ minHeight: "100vh" }}
    >
      <div>Hello {user?.email}</div>
      <div className="d-flex flex-column gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button onClick={handleLogin}>Log in</Button>
        <Button onClick={() => navigate("/register")}>
          Don't have an account?
        </Button>
      </div>
    </Container>
  );
};

export default Login;
