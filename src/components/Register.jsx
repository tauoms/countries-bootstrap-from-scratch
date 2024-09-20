import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Below handles the auth state from Firebase
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name) {
      alert("Name is required");
    } else {
      registerWithEmailAndPassword(name, email, password);
    }
  };

  // TODO: Add a check to see if user is logged in and navigate to countries if logged in

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center 100vh"
      style={{ minHeight: "100vh" }}
    >
      <div className="d-flex flex-column gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
        <Button onClick={handleRegister}>Register</Button>
      </div>
    </Container>
  );
};

export default Register;
