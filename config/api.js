// Update this to your deployed Supabase backend URL
// For local development, use: http://localhost:3000
// For production, use your deployed URL (e.g., https://your-app.vercel.app)
// export const API_BASE_URL = 'http://localhost:3000';
export const API_BASE_URL = 'https://jaslyn-food-order.vercel.app';

export const SERVICE_TYPES = {
    FOOD: 'food',
    SHOPPING: 'shopping',
};

export function buildApiUrl(path) {
    if (!API_BASE_URL) {
        return path;
    }
    return `${API_BASE_URL}${path}`;
}

export const API_ENDPOINTS = {
    validateAddress: () => buildApiUrl('/api/validate-address'),
    submitOrder: () => buildApiUrl('/api/submit-order'),
    supportedCountries: (serviceType) => {
        if (serviceType === SERVICE_TYPES.SHOPPING) {
            return buildApiUrl('/api/supported-countries/shopping');
        }
        return buildApiUrl('/api/supported-countries');
    },
};
