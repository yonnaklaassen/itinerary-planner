import {
    Avatar,
    Button,
    TextField,
    Typography
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../themes/theme-context";
import { useUser } from "../hooks/user-context";
import { PageBox, PageContainer } from "../components/page-container";

function Register() {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await fetch(`http://localhost:3080/auth/register`, {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) {
                alert(`Registration failed: ${data.error}`);
            } else {
                setUser(data.user);
                setName("");
                setEmail("");
                setPassword("");
                navigate("/");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <PageContainer>
            <PageBox lg={"70%"}>
                <Avatar sx={{ m: 1, backgroundColor: 'var(--color-primary)' }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h3" component="h3">Register</Typography>
                <PageBox>
                    <TextField
                        name="name"
                        required
                        id="name"
                        label="Name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                            mt: 3, mb: 2,
                            color: theme.textColor,
                        }}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Link style={{ color: theme.textColor, }} to="/login">Already have an account? <span className="highlight">Login</span></Link>
                </PageBox>
            </PageBox>
        </PageContainer>
    );
}

export default Register;
