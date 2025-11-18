/**
 * WeChat Notification Service
 * Handles sending order notifications via WeChat Customer Service Messages
 */

/**
 * Send order notification to admin via WeChat
 * @param {Object} orderData - The order data to send
 * @returns {Promise} - Promise that resolves when notification is sent
 */
export function sendOrderNotification(orderData) {
  return new Promise((resolve, reject) => {
    // Format the order message
    const message = formatOrderMessage(orderData);
    
    // Option 1: Use WeChat Customer Service Message (requires server)
    // This would need a backend endpoint to send customer service messages
    
    // Option 2: Use WeChat Template Message (recommended)
    // You'll need to configure this in WeChat Mini Program backend
    
    // Option 3: Simple approach - Copy to clipboard and prompt user
    wx.setClipboardData({
      data: message,
      success: () => {
        wx.showModal({
          title: '订单已复制',
          content: '订单信息已复制到剪贴板，请粘贴发送给客服',
          confirmText: '联系客服',
          success: (res) => {
            if (res.confirm) {
              // Open customer service chat
              wx.openCustomerServiceChat({
                extInfo: { url: 'your-customer-service-url' },
                corpId: 'your-corp-id',
                success: () => resolve(true),
                fail: (err) => reject(err)
              });
            } else {
              resolve(true);
            }
          }
        });
      },
      fail: (err) => reject(err)
    });
  });
}

/**
 * Format order data into a readable message
 * @param {Object} orderData - The order data
 * @returns {String} - Formatted message
 */
function formatOrderMessage(orderData) {
  const {
    serviceType,
    country,
    city,
    detailAddress,
    contactName,
    contactPhone,
    contactWechat,
    foodType,
    productType,
    productLink,
    productDescription,
    specialInstructions,
    timestamp
  } = orderData;

  let message = `📦 新订单通知\n\n`;
  message += `服务类型: ${serviceType === 'food' ? '外卖代点' : '网购代下'}\n`;
  message += `时间: ${new Date(timestamp).toLocaleString('zh-CN')}\n\n`;
  
  message += `📍 配送地址:\n`;
  message += `国家: ${country}\n`;
  message += `城市: ${city}\n`;
  message += `详细地址: ${detailAddress}\n\n`;
  
  message += `👤 联系信息:\n`;
  message += `姓名: ${contactName}\n`;
  message += `电话: ${contactPhone}\n`;
  if (contactWechat) {
    message += `微信: ${contactWechat}\n`;
  }
  message += `\n`;
  
  if (serviceType === 'food' && foodType) {
    message += `🍔 外卖类型: ${foodType}\n\n`;
  }
  
  if (serviceType === 'shopping') {
    if (productType) {
      message += `📦 商品类型: ${productType}\n`;
    }
    if (productLink) {
      message += `🔗 商品链接: ${productLink}\n`;
    }
    if (productDescription) {
      message += `📝 商品描述: ${productDescription}\n`;
    }
    message += `\n`;
  }
  
  if (specialInstructions) {
    message += `📋 特殊要求:\n${specialInstructions}\n`;
  }
  
  return message;
}

/**
 * Alternative: Send via WeChat Template Message (requires backend)
 * This is the recommended approach for production
 */
export function sendTemplateMessage(orderData) {
  // This would call your backend endpoint
  // which then uses WeChat API to send template message
  return wx.request({
    url: 'YOUR_BACKEND_URL/api/send-wechat-notification',
    method: 'POST',
    data: orderData,
    success: (res) => {
      console.log('Template message sent:', res);
      return res;
    },
    fail: (err) => {
      console.error('Failed to send template message:', err);
      throw err;
    }
  });
}

