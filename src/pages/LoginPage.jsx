import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { login } from "../auth/authService.js";
import logo from "../images/arkdesign-logo-horizontaal-white.png";


export default function LoginPage() {
  const [email, setEmail] = useState("admin@ark.nl");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const res = login(email, password);
    if (!res.ok) return setError(res.error);

    if (res.user.role === "client") navigate("/client");
    else navigate("/pm");
  };

  return (
    <div className="centerWrap">
      <div className="loginTitleRow">
        <div className="pageH1">Login – Client &amp; Admin</div>
      </div>

      <div className="loginCard">
        <Card title={null}>
          <div className="loginBrand">
            <div className="brandMini">
              <img src={logo} alt="Ark Design" className="brandLogo" />
            </div>

            <div className="loginH2">Ark Client Portal</div>
          </div>

          <form onSubmit={onSubmit} className="stack">
            <Input
              placeholder="E-mailadres"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              placeholder="Wachtwoord"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {error && <div className="error">{error}</div>}

            <Button type="submit">Inloggen</Button>

            <div className="muted">Na inloggen wordt je rol bepaald</div>
          </form>
        </Card>
      </div>
    </div>
  );
}
