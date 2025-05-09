export const getEnvVariables = () => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    ALMACENES_DISPONIBLES: import.meta.env.VITE_ALMACENES_DISPONIBLES,

  };
};
