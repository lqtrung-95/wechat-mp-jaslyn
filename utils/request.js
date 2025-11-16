export function request({ url, method = 'GET', data = {}, header = {} }) {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            method,
            data,
            header: {
                'content-type': 'application/json',
                ...header,
            },
            success: (res) => {
                const { statusCode, data: responseData } = res;
                if (statusCode >= 200 && statusCode < 300) {
                    resolve(responseData);
                }
                else {
                    const message = responseData && responseData.message ? responseData.message : 'Request failed';
                    reject(new Error(message));
                }
            },
            fail: (err) => reject(err),
        });
    });
}
