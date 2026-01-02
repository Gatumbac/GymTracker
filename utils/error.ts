export const getErrorMessage = (error: any): string => {
  if (!error) return 'Ha ocurrido un error inesperado';

  // Si es un error de respuesta de axios/api
  if (error.response && error.response.data) {
    const data = error.response.data;

    // Caso: { detail: "Invalid credentials" } - Típico de DRF Authentication
    if (data.detail) {
      return data.detail;
    }

    // Caso: { non_field_errors: ["Error global"] }
    if (data.non_field_errors && Array.isArray(data.non_field_errors)) {
      return data.non_field_errors[0];
    }

    // Caso: Lista de errores { field: ["Error 1", "Error 2"] }
    // Tomamos el primer mensaje del primer campo que encontremos
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const firstKey = keys[0];
      const errors = data[firstKey];
      if (Array.isArray(errors) && errors.length > 0) {
        return `${firstKey}: ${errors[0]}`;
      }
      if (typeof errors === 'string') {
        return `${firstKey}: ${errors}`;
      }
    }
  }

  // Fallback para errores de red o desconocidos
  return error.message || 'No se pudo conectar con el servidor';
};
