/**
 * Local Services - No backend required
 * All data and logic handled in the mini program
 */

import { FOOD_REGIONS } from '../config/regions_food';
import { SHOPPING_REGIONS } from '../config/regions_shopping';
import { sendOrderNotification } from './wechat-notification';

/**
 * Get supported countries for a service type
 * @param {String} serviceType - 'food' or 'shopping'
 * @returns {Array} - Array of country objects
 */
export function getSupportedCountries(serviceType) {
  const regions = serviceType === 'shopping' ? SHOPPING_REGIONS : FOOD_REGIONS;
  
  return regions.map(region => ({
    displayName: region.country,
    displayNameEn: region.countryEn,
    flag: region.flag,
    countryCode: region.countryCode,
    cities: region.cities
  }));
}

/**
 * Validate address (basic client-side validation)
 * @param {Object} addressData - Address data to validate
 * @returns {Object} - Validation result
 */
export function validateAddress(addressData) {
  const { country, city, detailAddress } = addressData;
  
  // Basic validation
  if (!country || !city || !detailAddress) {
    return {
      valid: false,
      message: '请填写完整的地址信息'
    };
  }
  
  if (detailAddress.length < 10) {
    return {
      valid: false,
      message: '详细地址至少需要10个字符'
    };
  }
  
  // All validations passed
  return {
    valid: true,
    message: '地址验证通过'
  };
}

/**
 * Submit order (send via WeChat notification)
 * @param {Object} orderData - Order data to submit
 * @returns {Promise} - Promise that resolves when order is submitted
 */
export function submitOrder(orderData) {
  return new Promise((resolve, reject) => {
    // Add timestamp
    const orderWithTimestamp = {
      ...orderData,
      timestamp: new Date().toISOString(),
      orderId: generateOrderId()
    };
    
    // Save to local storage as backup
    saveOrderToLocal(orderWithTimestamp);
    
    // Send notification via WeChat
    sendOrderNotification(orderWithTimestamp)
      .then(() => {
        resolve({
          success: true,
          message: '订单提交成功',
          orderId: orderWithTimestamp.orderId
        });
      })
      .catch((error) => {
        reject({
          success: false,
          message: '订单提交失败',
          error: error
        });
      });
  });
}

/**
 * Generate a unique order ID
 * @returns {String} - Order ID
 */
function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD${timestamp}${random}`;
}

/**
 * Save order to local storage
 * @param {Object} orderData - Order data to save
 */
function saveOrderToLocal(orderData) {
  try {
    // Get existing orders
    const existingOrders = wx.getStorageSync('orders') || [];
    
    // Add new order
    existingOrders.unshift(orderData);
    
    // Keep only last 50 orders
    const ordersToSave = existingOrders.slice(0, 50);
    
    // Save back to storage
    wx.setStorageSync('orders', ordersToSave);
    
    console.log('Order saved to local storage:', orderData.orderId);
  } catch (error) {
    console.error('Failed to save order to local storage:', error);
  }
}

/**
 * Get order history from local storage
 * @returns {Array} - Array of orders
 */
export function getOrderHistory() {
  try {
    return wx.getStorageSync('orders') || [];
  } catch (error) {
    console.error('Failed to get order history:', error);
    return [];
  }
}

/**
 * Clear order history
 */
export function clearOrderHistory() {
  try {
    wx.removeStorageSync('orders');
    console.log('Order history cleared');
  } catch (error) {
    console.error('Failed to clear order history:', error);
  }
}

