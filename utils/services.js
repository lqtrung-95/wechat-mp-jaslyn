import { API_ENDPOINTS } from '../config/api';
import { request } from './request';

export function validateAddress(serviceType, payload) {
    return request({
        url: API_ENDPOINTS.validateAddress(),
        method: 'POST',
        data: payload,
    });
}

export function submitOrder(payload) {
    return request({
        url: API_ENDPOINTS.submitOrder(),
        method: 'POST',
        data: payload,
    });
}

export function fetchSupportedCountries(serviceType) {
    return request({
        url: API_ENDPOINTS.supportedCountries(serviceType),
        method: 'GET',
    });
}
