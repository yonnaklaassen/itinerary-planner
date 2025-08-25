import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./themes";

function Register() {
    const { theme } = useTheme();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => { 
        try {
            const response = await fetch('', {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!response.ok) {
                //
            }
        }catch(error) {
                //
        };
    };

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
                <Avatar sx={{ m: 1, backgroundColor: 'var(--color-primary)' }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Register</Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                name="name"
                                required
                                fullWidth
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
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
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
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
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
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, backgroundColor: 'var(--color-primary)',
                            color: theme.textColor
                        }}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link style={{ color: theme.textColor }} to="/login">Already have an account? <span>Login</span></Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;
