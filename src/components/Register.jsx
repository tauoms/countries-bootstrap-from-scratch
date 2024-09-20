import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Below handles the auth state from Firebase
  const [user, loading, error] = useAuthState(auth);

  return <div>Register will be here</div>;
};

export default Register;
