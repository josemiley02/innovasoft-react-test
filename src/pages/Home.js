import Layout from '../components/Layout';
import { Typography, Card, CardContent, Box, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  welcomeCard: {
    background: 'linear-gradient(135deg, #FF9900 0%, #E68900 100%)',
    color: '#fff',
    marginBottom: theme.spacing(3),
    boxShadow: '0 4px 12px rgba(255, 153, 0, 0.3)',
  },
  welcomeText: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  gridContainer: {
    marginTop: theme.spacing(3),
  },
  card: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
      transform: 'translateY(-4px)',
    },
  },
  cardTitle: {
    color: '#FF9900',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  cardDescription: {
    color: '#555555',
    marginBottom: theme.spacing(2),
  },
  actionButton: {
    backgroundColor: '#FF9900',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#E68900',
    },
  },
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();

  return (
    <Layout>
      <Box className={classes.container}>
        {/* Welcome Card */}
        <Card className={classes.welcomeCard}>
          <CardContent>
            <Typography variant="h5" className={classes.welcomeText}>
              ¡Bienvenido, {user?.username}!
            </Typography>
            <Typography variant="body1">
              Gestione sus clientes de manera eficiente desde este dashboard
            </Typography>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <Grid container spacing={3} className={classes.gridContainer}>
          {/* Clientes Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.cardTitle}>
                  👥 Gestión de Clientes
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                  Cree, edite, busque y elimine clientes de su base de datos
                </Typography>
                <Button
                  variant="contained"
                  className={classes.actionButton}
                  fullWidth
                  onClick={() => history.push('/clientes')}
                >
                  Ir a Clientes
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Estadísticas Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.cardTitle}>
                  📊 Estadísticas
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                  Visualice información importante sobre sus clientes
                </Typography>
                <Button
                  variant="contained"
                  className={classes.actionButton}
                  fullWidth
                  disabled
                >
                  Próximamente
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Configuración Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.cardTitle}>
                  ⚙️ Configuración
                </Typography>
                <Typography variant="body2" className={classes.cardDescription}>
                  Administre la configuración de su cuenta y preferencias
                </Typography>
                <Button
                  variant="contained"
                  className={classes.actionButton}
                  fullWidth
                  disabled
                >
                  Próximamente
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default Home;
