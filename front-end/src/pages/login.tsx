import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../themes/theme-context";
import { useUser } from "../hooks/user-context";
import { PageBox, PageContainer } from "../components/page-container";

function Login() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3080/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`Login failed: ${data.error}`);
      } else {
        setUser(data.user);
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <PageContainer>
      <PageBox lg={"70%"}>
        <Avatar sx={{ m: 1, backgroundColor: 'var(--color-primary)' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h3" component="h3">Login</Typography>
        <PageBox>
          <TextField
            required
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            sx={{
              '& .MuiInputBase-input': {
                color: theme.textColor,
              },
              '& .MuiInputLabel-root': {
                color: theme.textColor,
              }
            }}
          />

          <TextField
            margin="normal"
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            sx={{
              '& .MuiInputBase-input': {
                color: theme.textColor,
              },
              '& .MuiInputLabel-root': {
                color: theme.textColor,
              }
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              color: theme.textColor,
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link style={{ color: theme.textColor, }} to="/register"> Don't have an account? <span className="highlight">Register</span> </Link>
        </PageBox>
      </PageBox>
    </PageContainer>
  );
}

export default Login;
