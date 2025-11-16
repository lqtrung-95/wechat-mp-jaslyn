import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from '../../config/i18n';
import { aboutContent } from '../../config/about';

Page({
    data: {
        language: DEFAULT_LANGUAGE,
        content: aboutContent[DEFAULT_LANGUAGE],
    },
    onLoad() {
        const stored = wx.getStorageSync(LANGUAGE_STORAGE_KEY);
        const lang = stored || DEFAULT_LANGUAGE;
        this.setLanguage(lang);
    },
    setLanguage(lang) {
        const safeLang = aboutContent[lang] ? lang : DEFAULT_LANGUAGE;
        this.setData({
            language: safeLang,
            content: aboutContent[safeLang],
        });
        wx.setStorageSync(LANGUAGE_STORAGE_KEY, safeLang);
    },
    toggleLanguage() {
        const next = this.data.language === 'zh' ? 'en' : 'zh';
        this.setLanguage(next);
    },
});
