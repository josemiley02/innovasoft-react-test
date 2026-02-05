import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#1a1a1a',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#FF9900',
    textDecoration: 'none',
    flexGrow: 1,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  username: {
    color: '#ffffff',
    fontWeight: 500,
  },
  navButton: {
    color: '#ffffff',
    marginLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgba(255, 153, 0, 0.1)',
      color: '#FF9900',
    },
  },
  logoutButton: {
    color: '#ffffff',
    marginLeft: theme.spacing(1),
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(211, 47, 47, 0.2)',
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/home" className={classes.logo}>
          🏢 Innovasoft
        </Link>

        {user && (
          <Box className={classes.userInfo}>
            <Typography className={classes.username}>
              Bienvenido, {user?.username}
            </Typography>

            <Button 
              color="inherit" 
              component={Link} 
              to="/clientes"
              className={classes.navButton}
            >
              Clientes
            </Button>

            <Button 
              color="inherit" 
              onClick={logout}
              className={classes.logoutButton}
            >
              Cerrar sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
