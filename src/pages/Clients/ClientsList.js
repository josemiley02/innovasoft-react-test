import { searchClients, deleteClient } from "../../services/clientsService";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Layout from "../../components/Layout";
import {
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Snackbar,
  Card,
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Search as SearchIcon } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  searchSection: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  searchFields: {
    display: "flex",
    gap: theme.spacing(2),
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  tableContainer: {
    marginBottom: theme.spacing(3),
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  tableHead: {
    backgroundColor: "#1a1a1a",
    "& th": {
      color: "#ffffff",
      fontWeight: 700,
    },
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  actionButtons: {
    display: "flex",
    gap: theme.spacing(1),
  },
  editButton: {
    color: "#FF9900",
    "&:hover": {
      backgroundColor: "rgba(255, 153, 0, 0.1)",
    },
  },
  deleteButton: {
    color: "#d32f2f",
    "&:hover": {
      backgroundColor: "rgba(211, 47, 47, 0.1)",
    },
  },
  addButton: {
    backgroundColor: "#FF9900",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#E68900",
    },
  },
  backButton: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  noResults: {
    textAlign: "center",
    padding: theme.spacing(4),
    color: "#555555",
  },
  buttonGroup: {
    display: "flex",
    gap: theme.spacing(2),
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
}));

function ClientsList() {
  const classes = useStyles();
  const { user } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const history = useHistory();

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await searchClients({
        identificacion: identifier,
        nombre: name,
        usuarioId: user.id,
      });
      setClients(data || []);
    } catch (error) {
      setError("Error al buscar clientes. Inténtelo de nuevo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      handleSearch();
    }
  }, [user]);

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      setError("");
      await deleteClient(clientToDelete.id);
      setSuccess("Cliente eliminado exitosamente");
      setDeleteDialogOpen(false);
      setClientToDelete(null);
      await handleSearch();
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar el cliente. Inténtelo de nuevo.");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    if (!deleting) {
      setDeleteDialogOpen(false);
      setClientToDelete(null);
    }
  };

  return (
    <Layout>
      <Box className={classes.container}>
        {/* Encabezado */}
        <Typography variant="h4" gutterBottom style={{ color: "#1a1a1a", marginBottom: "24px" }}>
          Gestión de Clientes
        </Typography>

        {/* Sección de búsqueda */}
        <Card className={classes.searchSection}>
          <Box component="form" onSubmit={handleSearch}>
            <Typography variant="h6" gutterBottom style={{ color: "#FF9900", fontWeight: 700 }}>
              Buscar Clientes
            </Typography>
            <Box className={classes.searchFields}>
              <TextField
                label="Identificación"
                placeholder="Ej: 123456789"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                variant="outlined"
                size="small"
                style={{ minWidth: "200px" }}
              />
              <TextField
                label="Nombre"
                placeholder="Ej: Juan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                size="small"
                style={{ minWidth: "200px" }}
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.addButton}
                startIcon={<SearchIcon />}
                disabled={loading}
              >
                Buscar
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Botón de nuevo cliente */}
        <Box className={classes.buttonGroup}>
          <Button
            variant="contained"
            className={classes.addButton}
            startIcon={<AddIcon />}
            onClick={() => history.push("/clientes/new")}
          >
            Nuevo Cliente
          </Button>
          <Button
            variant="contained"
            className={classes.backButton}
            onClick={() => history.push("/home")}
          >
            ← Regresar
          </Button>
        </Box>

        {/* Mensajes de error y éxito */}
        {error && (
          <Snackbar
            open={!!error}
            autoHideDuration={4000}
            onClose={() => setError("")}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar
            open={!!success}
            autoHideDuration={4000}
            onClose={() => setSuccess("")}
          >
            <Alert severity="success">{success}</Alert>
          </Snackbar>
        )}

        {/* Tabla de clientes */}
        {loading && !clients.length ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress style={{ color: "#FF9900" }} />
          </Box>
        ) : clients.length === 0 ? (
          <Paper className={classes.noResults}>
            <Typography variant="h6">No hay clientes para mostrar</Typography>
            <Typography variant="body2" style={{ marginTop: "8px" }}>
              Cree su primer cliente haciendo clic en "Nuevo Cliente"
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>Identificación</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellidos</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id} className={classes.tableRow}>
                    <TableCell>{client.identificacion}</TableCell>
                    <TableCell>{client.nombre}</TableCell>
                    <TableCell>{client.apellidos}</TableCell>
                    <TableCell>{client.telefonoCelular}</TableCell>
                    <TableCell align="center">
                      <Box className={classes.actionButtons}>
                        <IconButton
                          size="small"
                          className={classes.editButton}
                          onClick={() => history.push(`/clientes/${client.id}`)}
                          title="Editar"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          className={classes.deleteButton}
                          onClick={() => handleDeleteClick(client)}
                          title="Eliminar"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ color: "#1a1a1a", fontWeight: 700 }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de que desea eliminar al cliente{" "}
            <strong>{clientToDelete?.nombre} {clientToDelete?.apellidos}</strong>? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={deleting}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            autoFocus
            variant="contained"
            style={{ backgroundColor: "#d32f2f", color: "#fff" }}
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={24} color="inherit" /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

export default ClientsList;