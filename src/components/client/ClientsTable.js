import {
  Table, TableHead, TableRow, TableCell,
  TableBody, IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function ClientsTable({ clients, onEdit, onDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Identificación</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellidos</TableCell>
          <TableCell align="right">Acciones</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {clients.map(c => (
          <TableRow key={c.id}>
            <TableCell>{c.identificacion}</TableCell>
            <TableCell>{c.nombre}</TableCell>
            <TableCell>{c.apellidos}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onEdit(c)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(c)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ClientsTable;
