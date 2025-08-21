import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./themes";

function Login() {
  const { theme } = useTheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    console.log("Logging in:", { email, password });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor:  'var(--color-primary)'}}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">Login</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
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
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary)',
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
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
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary)',
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: 'var(--color-primary)',
              color: theme.textColor
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid>
              <Link style={{ color: theme.textColor}} to="/register">Don't have an account? <span>Register</span></Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
