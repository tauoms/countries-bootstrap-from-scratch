import { useState } from "react";
import { Button, Container } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center 100vh"
      style={{ minHeight: "100vh" }}
    >
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
        <Button>Log in</Button>
      </div>
    </Container>
  );
};

export default Login;
