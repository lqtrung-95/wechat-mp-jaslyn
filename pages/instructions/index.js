import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, getLanguagePack } from '../../config/i18n';

Page({
    data: {
        language: DEFAULT_LANGUAGE,
        copy: getLanguagePack(DEFAULT_LANGUAGE, 'instructions').pageCopy,
    },
    onLoad() {
        this.initLanguage();
    },
    initLanguage() {
        const stored = wx.getStorageSync(LANGUAGE_STORAGE_KEY);
        const pack = getLanguagePack(stored || DEFAULT_LANGUAGE, 'instructions');
        this.setData({
            language: pack.language,
            copy: pack.pageCopy,
        });
    },
    toggleLanguage() {
        const next = this.data.language === 'zh' ? 'en' : 'zh';
        const pack = getLanguagePack(next, 'instructions');
        this.setData({
            language: pack.language,
            copy: pack.pageCopy,
        });
        wx.setStorageSync(LANGUAGE_STORAGE_KEY, next);
    },
});
