const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    },

    async post<T>(endpoint: string, body: unknown): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    },

    async put<T>(endpoint: string, body: unknown): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    },

    async delete(endpoint: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },
};
