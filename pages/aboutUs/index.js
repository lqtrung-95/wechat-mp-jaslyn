import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, getLanguagePack } from '../../config/i18n';

Page({
    data: {
        language: DEFAULT_LANGUAGE,
        content: getLanguagePack(DEFAULT_LANGUAGE, 'about').pageCopy,
    },
    onLoad() {
        this.initLanguage();
    },
    initLanguage() {
        const stored = wx.getStorageSync(LANGUAGE_STORAGE_KEY);
        const pack = getLanguagePack(stored || DEFAULT_LANGUAGE, 'about');
        this.setData({
            language: pack.language,
            content: pack.pageCopy,
        });
    },
    toggleLanguage() {
        const next = this.data.language === 'zh' ? 'en' : 'zh';
        const pack = getLanguagePack(next, 'about');
        this.setData({
            language: pack.language,
            content: pack.pageCopy,
        });
        wx.setStorageSync(LANGUAGE_STORAGE_KEY, next);
    },
});
