import {
  Dialog, DialogTitle, DialogActions,
  Button
} from '@material-ui/core';

function DeleteClientDialog({ open, onClose, onConfirm, client }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        ¿Eliminar cliente {client?.nombre}?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="secondary" onClick={onConfirm}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteClientDialog;
