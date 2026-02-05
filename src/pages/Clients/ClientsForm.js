import Layout from '../../components/Layout';
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  createClient, 
  updateClient, 
  getClient,
  getInterests 
} from '../../services/clientsService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  card: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  formSection: {
    marginBottom: theme.spacing(3),
  },
  sectionTitle: {
    color: '#FF9900',
    marginBottom: theme.spacing(2),
    fontWeight: 700,
  },
  imagePreview: {
    marginTop: theme.spacing(2),
    maxWidth: '200px',
    maxHeight: '200px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  buttonGroup: {
    marginTop: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(2),
  },
  saveButton: {
    backgroundColor: '#FF9900',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#E68900',
    },
  },
  cancelButton: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000',
    },
  },
}));

function ClientForm() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const [client, setClient] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    telefonoCelular: '',
    telefonoOtros: '',
    direccion: '',
    fechaNacimiento: '',
    fechaAfiliacion: '',
    sexo: '',
    resena: '',
    intereses: '',
    imagen: null,
    imagenPreview: null,
    usuarioId: user?.id || '',
  });

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar lista de intereses
        const interestData = await getInterests();
        console.log('Intereses cargados:', interestData);
        setInterests(Array.isArray(interestData) ? interestData : []);

        // Si es edición, cargar datos del cliente
        if (isEdit && id) {
          const clientData = await getClient(id);
          console.log('Datos del cliente cargados:', clientData);
          
          // Mapear los datos del cliente correctamente
          setClient((prev) => ({
            ...prev,
            id: clientData.id,
            nombre: clientData.nombre || '',
            apellidos: clientData.apellidos || '',
            identificacion: clientData.identificacion || '',
            telefonoCelular: clientData.telefonoCelular || '',
            telefonoOtros: clientData.telefonoOtros || '',
            direccion: clientData.direccion || '',
            fechaNacimiento: clientData.fechaNacimiento ? clientData.fechaNacimiento.split('T')[0] : '',
            fechaAfiliacion: clientData.fechaAfiliacion ? clientData.fechaAfiliacion.split('T')[0] : '',
            sexo: clientData.sexo || '',
            resena: clientData.resena || '',
            intereses: clientData.intereses || '',
            imagen: clientData.imagen || null,
            imagenPreview: clientData.imagen || null,
            usuarioId: user?.id || clientData.usuarioId || '',
          }));
        }
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError('Error al cargar los datos. Inténtelo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isEdit, user?.id]);

  const validateForm = () => {
    const newErrors = {};

    if (!client.nombre?.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    if (!client.apellidos?.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    }
    if (!client.identificacion?.trim()) {
      newErrors.identificacion = 'La identificación es requerida';
    }
    if (!client.telefonoCelular?.trim()) {
      newErrors.telefonoCelular = 'El teléfono celular es requerido';
    }
    if (!client.direccion?.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }
    if (!client.fechaNacimiento?.trim()) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    }
    if (!client.fechaAfiliacion?.trim()) {
      newErrors.fechaAfiliacion = 'La fecha de afiliación es requerida';
    }
    if (!client.sexo?.trim()) {
      newErrors.sexo = 'El sexo es requerido';
    }
    if (!client.intereses?.trim()) {
      newErrors.intereses = 'Debe seleccionar al menos un interés';
    }
    if (!client.resena?.trim()) {
      newErrors.resena = 'La reseña personal es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setClient({ ...client, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClient({
          ...client,
          imagen: reader.result, // Base64
          imagenPreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Por favor complete todos los campos requeridos');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      const dataToSend = {
        nombre: client.nombre,
        apellidos: client.apellidos,
        identificacion: client.identificacion,
        telefonoCelular: client.telefonoCelular,
        telefonoOtros: client.telefonoOtros || '',
        direccion: client.direccion,
        fechaNacimiento: client.fechaNacimiento,
        fechaAfiliacion: client.fechaAfiliacion,
        sexo: client.sexo,
        resena: client.resena,
        intereses: client.intereses,
        imagen: client.imagen,
        usuarioId: client.usuarioId,
      };

      if (isEdit) {
        dataToSend.id = id;
        await updateClient(dataToSend);
        setSuccess('Cliente actualizado exitosamente');
      } else {
        await createClient(dataToSend);
        setSuccess('Cliente creado exitosamente');
      }

      setTimeout(() => {
        history.push('/clientes');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar el cliente. Inténtelo de nuevo.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress style={{ color: '#FF9900' }} />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4" gutterBottom style={{ color: '#1a1a1a' }}>
              {isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Sección: Información Personal */}
              <Box className={classes.formSection}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Información Personal
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre*"
                      value={client.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      error={!!errors.nombre}
                      helperText={errors.nombre}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Apellidos*"
                      value={client.apellidos}
                      onChange={(e) => handleChange('apellidos', e.target.value)}
                      error={!!errors.apellidos}
                      helperText={errors.apellidos}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Identificación*"
                      value={client.identificacion}
                      onChange={(e) => handleChange('identificacion', e.target.value)}
                      error={!!errors.identificacion}
                      helperText={errors.identificacion}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Sexo*"
                      value={client.sexo}
                      onChange={(e) => handleChange('sexo', e.target.value)}
                      error={!!errors.sexo}
                      helperText={errors.sexo}
                      variant="outlined"
                    >
                      <MenuItem value="M">Masculino</MenuItem>
                      <MenuItem value="F">Femenino</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Fecha de Nacimiento*"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={client.fechaNacimiento}
                      onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                      error={!!errors.fechaNacimiento}
                      helperText={errors.fechaNacimiento}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Fecha de Afiliación*"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={client.fechaAfiliacion}
                      onChange={(e) => handleChange('fechaAfiliacion', e.target.value)}
                      error={!!errors.fechaAfiliacion}
                      helperText={errors.fechaAfiliacion}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Sección: Contacto */}
              <Box className={classes.formSection}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Información de Contacto
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono Celular*"
                      value={client.telefonoCelular}
                      onChange={(e) => handleChange('telefonoCelular', e.target.value)}
                      error={!!errors.telefonoCelular}
                      helperText={errors.telefonoCelular}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono Otros"
                      value={client.telefonoOtros}
                      onChange={(e) => handleChange('telefonoOtros', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección*"
                      value={client.direccion}
                      onChange={(e) => handleChange('direccion', e.target.value)}
                      error={!!errors.direccion}
                      helperText={errors.direccion}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Sección: Intereses y Reseña */}
              <Box className={classes.formSection}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Intereses y Reseña
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Intereses*"
                      value={client.intereses}
                      onChange={(e) => handleChange('intereses', e.target.value)}
                      error={!!errors.intereses}
                      helperText={errors.intereses}
                      variant="outlined"
                    >
                      {interests.map((interest) => (
                        <MenuItem 
                          key={interest.id} 
                          value={interest.id}
                        >
                          {interest.descripcion}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography variant="body2" style={{ marginBottom: '8px' }}>
                        Imagen del Cliente*
                      </Typography>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'block', marginBottom: '8px' }}
                      />
                      {client.imagenPreview && (
                        <img 
                          src={client.imagenPreview} 
                          alt="Preview" 
                          className={classes.imagePreview}
                        />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Reseña Personal*"
                      multiline
                      rows={4}
                      value={client.resena}
                      onChange={(e) => handleChange('resena', e.target.value)}
                      error={!!errors.resena}
                      helperText={errors.resena}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Botones de acción */}
              <Box className={classes.buttonGroup}>
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.saveButton}
                  disabled={submitting}
                  style={{ minWidth: '150px' }}
                >
                  {submitting ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.cancelButton}
                  disabled={submitting}
                  onClick={() => history.push('/clientes')}
                  style={{ minWidth: '150px' }}
                >
                  Cancelar
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Notificación de Error */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError('')}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      {/* Notificación de Éxito */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess('')}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>
    </Layout>
  );
}

export default ClientForm;
