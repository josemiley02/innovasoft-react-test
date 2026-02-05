export const API_BASE = 'https://pruebareactjs.test-class.com/Api';

export const AUTH = {
  LOGIN: '/api/Authenticate/login',
};

export const REGISTER = {
  POST: '/api/Authenticate/register',
}

export const CLIENTS = {
  SEARCH: '/api/Cliente/Listado',
  DELETE: '/api/Cliente/Eliminar/{IdCliente}',
  INTERESTS: '/api/Intereses/Listado',
  GET: '/api/Cliente/Obtener/{IdCliente}',
  POST: '/api/Cliente/Crear',
  PUT: '/api/Cliente/Actualizar',
}