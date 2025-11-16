import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, getLanguagePack } from '../../config/i18n';
import { instructionsContent } from '../../config/about';

Page({
    data: {
        language: DEFAULT_LANGUAGE,
        copy: instructionsContent[DEFAULT_LANGUAGE],
        globalCopy: getLanguagePack(DEFAULT_LANGUAGE, 'delivery').globalCopy,
    },
    onLoad() {
        const stored = wx.getStorageSync(LANGUAGE_STORAGE_KEY);
        const lang = stored || DEFAULT_LANGUAGE;
        this.setLanguage(lang);
    },
    setLanguage(lang) {
        const safeLang = instructionsContent[lang] ? lang : DEFAULT_LANGUAGE;
        this.setData({
            language: safeLang,
            copy: instructionsContent[safeLang],
        });
        wx.setStorageSync(LANGUAGE_STORAGE_KEY, safeLang);
    },
    toggleLanguage() {
        const next = this.data.language === 'zh' ? 'en' : 'zh';
        this.setLanguage(next);
    },
});
