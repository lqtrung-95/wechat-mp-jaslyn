import { API_BASE_URL } from './config/api';

let gulpErrorMessage = '';
try {
    // Optional dependency used by the original template; swallow if it no longer exists.
    const gulpErrorModule = require('./utils/gulpError.js');
    if (gulpErrorModule && typeof gulpErrorModule === 'object' && 'default' in gulpErrorModule) {
        gulpErrorMessage = gulpErrorModule.default;
    }
    else {
        gulpErrorMessage = gulpErrorModule || '';
    }
}
catch (error) {
    gulpErrorMessage = '';
}

App({
    globalData: {
        apiBaseUrl: API_BASE_URL,
        lastValidatedAddress: null,
    },
    onLaunch() {
        console.info(`J's Global Link ready. API base: ${API_BASE_URL || 'not configured'}`);
        if (gulpErrorMessage && gulpErrorMessage !== 'gulpErrorPlaceHolder') {
            wx.redirectTo({
                url: `/pages/gulp-error/index?gulpError=${gulpErrorMessage}`,
            });
        }
    },
    setLastValidatedAddress(payload) {
        this.globalData.lastValidatedAddress = payload;
    },
    getLastValidatedAddress() {
        return this.globalData.lastValidatedAddress;
    },
});
