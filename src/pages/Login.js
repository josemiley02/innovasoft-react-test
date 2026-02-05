import { useEffect, useState } from "react";
import { loginRequest } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  Button,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Checkbox,
  Snackbar,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  card: {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    borderRadius: "8px",
  },
  logo: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#FF9900",
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    color: "#1a1a1a",
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  submitButton: {
    backgroundColor: "#FF9900",
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#E68900",
    },
    "&:disabled": {
      backgroundColor: "#ccc",
    },
  },
  linkText: {
    marginTop: theme.spacing(2),
    textAlign: "center",
    color: "#555555",
    "& a": {
      color: "#FF9900",
      fontWeight: 600,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
}));

function Login(){
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const history = useHistory();

    useEffect(() => {
        const rememberUser = localStorage.getItem('rememberUser');
        if (rememberUser){
            setUsername(rememberUser);
            setRemember(true);
        }
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!username || !password){
            setError('Por favor ingrese usuario y contraseña.');
            return;
        }
        
        try{
            setLoading(true);
            const data = await loginRequest(username, password);
            login(data);
            if (remember){
                localStorage.setItem('rememberUser', username);
            } else {
                localStorage.removeItem('rememberUser');
            }
            history.push('/home')
        } catch {
            setError('Credenciales inválidas o error del servidor');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box className={classes.container}>
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h4" className={classes.logo}>
                            🏢 Innovasoft
                        </Typography>
                        <Typography variant="h5" className={classes.title}>
                            Iniciar Sesión
                        </Typography>

                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                label="Usuario*"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                variant="outlined"
                                disabled={loading}
                            />
                            <TextField
                                label="Contraseña*"
                                fullWidth
                                type="password"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                disabled={loading}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                        disabled={loading}
                                    />
                                }
                                label="Recuérdame"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                className={classes.submitButton}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "INICIAR SESIÓN"
                                )}
                            </Button>
                            <Typography className={classes.linkText}>
                                ¿No tiene una cuenta?{' '}
                                <Link to="/register">
                                    Regístrese aquí
                                </Link>
                            </Typography>
                        </form>
                    </CardContent>
                </Card>
            </Container>

            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={() => setError('')}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Box>
    );
}

export default Login;