import api from '../api/axiosConfig';
import { CLIENTS } from '../api/endpoints';

/**
 * Buscar / listar clientes
 * POST api/Cliente/Listado
 */
export const searchClients = async ({
  identificacion,
  nombre,
  usuarioId
}) => {
  const response = await api.post(CLIENTS.SEARCH, {
    identificacion: identificacion || '',
    nombre: nombre || '',
    usuarioId
  });

  return response.data;
};

/**
 * Obtener un cliente específico por ID
 * GET api/Cliente/Obtener/{IdCliente}
 */
export const getClient = async (clientId) => {
  const url = CLIENTS.GET.replace('{IdCliente}', clientId);
  const response = await api.get(url);
  return response.data;
};

/**
 * Crear un nuevo cliente
 * POST api/Cliente/Crear
 */
export const createClient = async (clientData) => {
  const response = await api.post(CLIENTS.POST, clientData);
  return response.data;
};

/**
 * Actualizar un cliente existente
 * PUT api/Cliente/Actualizar
 */
export const updateClient = async (clientData) => {
  const response = await api.put(CLIENTS.PUT, clientData);
  return response.data;
};

/**
 * Eliminar un cliente
 * DELETE api/Cliente/Eliminar/{IdCliente}
 */
export const deleteClient = async (clientId) => {
  const url = CLIENTS.DELETE.replace('{IdCliente}', clientId);
  const response = await api.delete(url);
  return response.data;
};

/**
 * Obtener lista de intereses
 * GET api/Intereses/Listado
 */
export const getInterests = async () => {
  try {
    const response = await api.get(CLIENTS.INTERESTS);
    console.log('Respuesta del API de Intereses:', response);
    console.log('Datos:', response.data);
    // Asegurar que siempre devuelve un array
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (response.data && Array.isArray(response.data.intereses)) {
      return response.data.intereses;
    }
    console.warn('No se pudo mapear la respuesta de intereses:', response.data);
    return [];
  } catch (err) {
    console.error('Error al obtener intereses:', err);
    return [];
  }
};
