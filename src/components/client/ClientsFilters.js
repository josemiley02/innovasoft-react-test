import { TextField, Button, Box } from '@material-ui/core';

function ClientsFilters({ filters, onChange, onSearch }) {
  return (
    <Box display="flex" gap={16} marginY={3}>
      <TextField
        label="Identificación"
        value={filters.identificacion}
        onChange={(e) =>
          onChange({ ...filters, identificacion: e.target.value })
        }
      />

      <TextField
        label="Nombre"
        value={filters.nombre}
        onChange={(e) =>
          onChange({ ...filters, nombre: e.target.value })
        }
      />

      <Button
        variant="contained"
        color="primary"
        onClick={onSearch}
      >
        Buscar
      </Button>
    </Box>
  );
}

export default ClientsFilters;
