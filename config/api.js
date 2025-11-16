export const API_BASE_URL = '';

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
    validateAddress: (serviceType) => buildApiUrl(`/api/address/validate?type=${serviceType}`),
    submitOrder: () => buildApiUrl('/api/order/submit'),
    supportedCountries: (serviceType) => {
        if (serviceType === SERVICE_TYPES.SHOPPING) {
            return buildApiUrl('/api/supported-countries/shopping');
        }
        return buildApiUrl('/api/supported-countries');
    },
};
