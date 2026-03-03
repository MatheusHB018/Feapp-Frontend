export const API_BASE_URL = import.meta.env.VITE_API_URL || "ttps://feapp-backend.onrender.com/api/health";

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
