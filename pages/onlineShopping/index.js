import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, getLanguagePack } from '../../config/i18n';
import { SHOPPING_REGIONS } from '../../config/regions_shopping';
import { getSupportedCountries, validateAddress, submitOrder } from '../../utils/local-services';

const defaultFormState = {
    customerName: '',
    customerPhone: '',
    customerWechat: '',
    country: '',
    city: '',
    district: '',
    detailAddress: '',
    foodType: '',
    notes: '',
    customCountry: '',
    customCity: '',
};

const productTypeOptions = [
    '👕 服装',
    '💄 美妆',
    '📱 电子产品',
    '🍫 食品',
    '🧴 日用品',
    '🎒 户外用品',
    '📦 其他',
];

function stripFlagEmoji(text = '') {
    return text.replace(/(?:\uD83C[\uDDE6-\uDDFF]){2}\s*/g, '').trim();
}

Page({
    data: {
        language: DEFAULT_LANGUAGE,
        globalCopy: getLanguagePack(DEFAULT_LANGUAGE, 'shopping').globalCopy,
        pageCopy: getLanguagePack(DEFAULT_LANGUAGE, 'shopping').pageCopy,
        countries: [],
        countryOptions: [],
        cityOptions: [],
        productTypeOptions: productTypeOptions,
        selectedCountryIndex: -1,
        selectedCityIndex: -1,
        selectedProductTypeIndex: -1,
        selectedCountry: null,
        isCustomCountry: false,
        formData: { ...defaultFormState },
        validationResult: null,
        submitResult: null,
        validating: false,
        submitting: false,
        loadingCountries: true,
        supportedSummary: '',
    },
    onLoad() {
        this.initLanguage();
        this.loadCountries();
    },
    initLanguage() {
        const stored = wx.getStorageSync(LANGUAGE_STORAGE_KEY);
        const pack = getLanguagePack(stored || DEFAULT_LANGUAGE, 'shopping');
        this.applyLanguagePack(pack);
    },
    applyLanguagePack(pack) {
        this.setData({
            language: pack.language,
            globalCopy: pack.globalCopy,
            pageCopy: pack.pageCopy,
        });
        wx.setStorageSync(LANGUAGE_STORAGE_KEY, pack.language);
        this.updateCountryOptions();
    },
    toggleLanguage() {
        const next = this.data.language === 'zh' ? 'en' : 'zh';
        const pack = getLanguagePack(next, 'shopping');
        this.applyLanguagePack(pack);
    },
    loadCountries() {
        const formatted = SHOPPING_REGIONS.map((item) => ({
            displayName: item.country,
            displayNameEn: item.countryEn,
            flag: item.flag,
            countryCode: item.countryCode,
            cities: item.cities,
        }));
        this.setData({
            countries: formatted,
            supportedSummary: formatted.map((item) => item.displayName).join(', '),
            loadingCountries: false,
        });
        this.updateCountryOptions();
    },
    updateCountryOptions() {
        const { language } = this.data;
        const options = this.data.countries.map((item) => {
            const name = language === 'zh' ? item.displayName : item.displayNameEn;
            return `${item.flag} ${name}`;
        });
        options.push(this.data.globalCopy.customOptionLabel);
        this.setData({ countryOptions: options });
    },
    handleCountryChange(event) {
        const index = Number(event.detail.value);
        const { countryOptions, language } = this.data;
        const isCustom = index === countryOptions.length - 1;
        if (isCustom) {
            this.setData({
                selectedCountryIndex: index,
                isCustomCountry: true,
                cityOptions: [],
                selectedCityIndex: -1,
                selectedCountry: null,
                validationResult: null,
                submitResult: null,
                formData: {
                    ...this.data.formData,
                    country: '',
                    city: '',
                    customCountry: '',
                    customCity: '',
                },
            });
            return;
        }
        const country = this.data.countries[index];
        const cityOptions = (country?.cities || []).map((city) => city);
        const countryName = language === 'zh' ? country?.displayName : country?.displayNameEn;
        this.setData({
            selectedCountryIndex: index,
            isCustomCountry: false,
            selectedCountry: country,
            cityOptions,
            selectedCityIndex: -1,
            validationResult: null,
            submitResult: null,
            formData: {
                ...this.data.formData,
                country: country?.displayName || '', // Always use Chinese name for backend
                customCountry: '',
                customCity: '',
                city: '',
            },
        });
    },
    handleCityChange(event) {
        const index = Number(event.detail.value);
        const city = this.data.cityOptions[index] || '';
        this.setData({
            selectedCityIndex: index,
            validationResult: null,
            submitResult: null,
            formData: {
                ...this.data.formData,
                city,
            },
        });
    },
    handleInput(event) {
        const { field } = event.currentTarget.dataset;
        const value = event.detail.value;
        this.setData({
            formData: {
                ...this.data.formData,
                [field]: value,
            },
        });
        if (['country', 'city', 'customCountry', 'customCity', 'district'].includes(field)) {
            this.setData({ validationResult: null, submitResult: null });
        }
    },
    handleProductTypeChange(event) {
        const index = Number(event.detail.value);
        const productType = productTypeOptions[index] || '';
        this.setData({
            selectedProductTypeIndex: index,
            formData: {
                ...this.data.formData,
                foodType: productType,
            },
        });
    },
    getLocationPayload() {
        const { formData, isCustomCountry } = this.data;
        const country = isCustomCountry ? formData.customCountry : formData.country;
        const city = isCustomCountry ? formData.customCity : formData.city;
        return {
            country: country.trim(),
            city: city.trim(),
            isCustomCountry,
        };
    },
    handleValidateAddress() {
        if (this.data.validating) {
            return;
        }
        const { globalCopy } = this.data;
        const { country, city, isCustomCountry } = this.getLocationPayload();
        if (!country || !city) {
            this.setValidationResult('error', globalCopy.validationMissingLocation);
            return;
        }
        if (isCustomCountry) {
            this.setValidationResult('success', globalCopy.validationManualMessage);
            return;
        }
        this.setData({ validating: true });
        const result = validateAddress({
            country,
            city,
            detailAddress: this.data.formData.detailAddress,
        });
        
        this.setValidationResult(result.valid ? 'success' : 'error', result.message);
        this.setData({ validating: false });
    },
    setValidationResult(state, message) {
        this.setData({
            validationResult: {
                state,
                message,
            },
            submitResult: null,
        });
    },
    setSubmitResult(state, message) {
        this.setData({
            submitResult: {
                state,
                message,
            },
        });
    },
    buildSubmitPayload() {
        const { formData, isCustomCountry } = this.data;
        return {
            serviceType: 'shopping',
            contactName: formData.customerName.trim(),
            contactPhone: formData.customerPhone.trim(),
            contactWechat: formData.customerWechat.trim(),
            country: isCustomCountry ? formData.customCountry.trim() : formData.country.trim(),
            city: isCustomCountry ? formData.customCity.trim() : formData.city.trim(),
            detailAddress: formData.detailAddress.trim(),
            productType: formData.productType.trim(),
            productLink: formData.productLink.trim(),
            productDescription: formData.productDescription.trim(),
            specialInstructions: formData.notes.trim(),
        };
    },
    resetForm() {
        this.setData({
            formData: { ...defaultFormState },
            selectedCountryIndex: -1,
            selectedCityIndex: -1,
            selectedProductTypeIndex: -1,
            isCustomCountry: false,
            cityOptions: [],
        });
    },
    handleSubmit() {
        if (this.data.submitting) {
            return;
        }
        const { validationResult, globalCopy } = this.data;
        if (!validationResult || validationResult.state !== 'success') {
            this.setSubmitResult('error', globalCopy.validationRequiredMessage);
            return;
        }
        this.setData({ submitting: true });
        const payload = this.buildSubmitPayload();
        submitOrder(payload)
            .then(() => {
                wx.showToast({ title: globalCopy.successToast, icon: 'success' });
                this.setSubmitResult('success', globalCopy.successToast);
                this.resetForm();
                this.setData({ validationResult: null });
            })
            .catch((error) => {
                console.error('Shopping submit failed', error);
                wx.showToast({ title: globalCopy.failureToast, icon: 'none' });
                this.setSubmitResult('error', globalCopy.submitErrorMessage);
            })
            .finally(() => {
                this.setData({ submitting: false });
            });
    },
});
