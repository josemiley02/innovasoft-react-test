import { useState } from "react";
import { registerRequest } from "../services/authService";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Link as MuiLink,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

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

function Register (){
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const history = useHistory();

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/.test(password);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!username || !email || !password){
            setError('Por favor rellene todos los campos');
            return;
        }
        if (!isValidEmail(email)){
            setError('Introduzca una dirección de correo válida.');
            return;
        }
        if (!isValidPassword(password)){
            setError('La contraseña debe tener entre 8 y 20 caracteres, incluir al menos una letra mayúscula, una letra minúscula y un número.');
            return;
        }
        try{
            setLoading(true);
            await registerRequest(username, password, email);
            setSuccess(true);
            setTimeout(()=>{
                history.push('/');
            }, 1500)
        }catch{
            setError('Error al registrar el usuario. Inténtelo de nuevo.');
        } finally{
            setLoading(false);
        }
    };

    return(
        <Box className={classes.container}>
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h4" className={classes.logo}>
                            🏢 Innovasoft
                        </Typography>
                        <Typography variant="h5" className={classes.title}>
                            Crear Cuenta
                        </Typography>

                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                label="Nombre de usuario*"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                variant="outlined"
                                disabled={loading}
                            />
                            <TextField
                                label="Correo Electrónico*"
                                fullWidth
                                margin="normal"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                disabled={loading}
                            />
                            <TextField
                                label="Contraseña*"
                                fullWidth
                                margin="normal"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                disabled={loading}
                                helperText="Mín. 8 caracteres: mayúscula, minúscula y número"
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
                                    "CREAR CUENTA"
                                )}
                            </Button>
                            <Typography className={classes.linkText}>
                                ¿Ya tiene una cuenta?{' '}
                                <MuiLink 
                                    href="/" 
                                    underline="none"
                                >
                                    Inicie sesión
                                </MuiLink>
                            </Typography>
                        </form>
                    </CardContent>
                </Card>
            </Container>

            {/* ERROR */}
            <Snackbar
                open={!!error}
                autoHideDuration={4000}
                onClose={() => setError('')}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>

            {/* SUCCESS */}
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success">
                    Usuario creado correctamente. Redirigiendo...
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Register;