import { SERVICE_TYPES } from '../../config/api';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, getLanguagePack } from '../../config/i18n';
import { SHOPPING_REGIONS } from '../../config/regions_shopping';
import { submitOrder, validateAddress } from '../../utils/services';

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
        selectedCountryIndex: -1,
        selectedCityIndex: -1,
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
        const options = this.data.countries.map((item) => item.displayName || '');
        options.push(this.data.globalCopy.customOptionLabel);
        this.setData({ countryOptions: options });
    },
    handleCountryChange(event) {
        const index = Number(event.detail.value);
        const { countryOptions } = this.data;
        const isCustom = index === countryOptions.length - 1;
        if (isCustom) {
            this.setData({
                selectedCountryIndex: index,
                isCustomCountry: true,
                cityOptions: [],
                selectedCityIndex: -1,
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
        this.setData({
            selectedCountryIndex: index,
            isCustomCountry: false,
            cityOptions,
            selectedCityIndex: -1,
            validationResult: null,
            submitResult: null,
            formData: {
                ...this.data.formData,
                country: country?.displayName || '',
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
        validateAddress(SERVICE_TYPES.SHOPPING, {
            country,
            city,
            district: this.data.formData.district,
        })
            .then((response) => {
                const success = !!(response && (response.valid || response.supported));
                const message = response?.message || (success ? globalCopy.validationManualMessage : globalCopy.validationErrorMessage);
                this.setValidationResult(success ? 'success' : 'error', message);
            })
            .catch(() => {
                this.setValidationResult('error', globalCopy.validationErrorMessage);
            })
            .finally(() => {
                this.setData({ validating: false });
            });
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
            serviceType: SERVICE_TYPES.SHOPPING,
            customerName: formData.customerName.trim(),
            customerPhone: formData.customerPhone.trim(),
            customerWechat: formData.customerWechat.trim(),
            country: isCustomCountry ? formData.customCountry.trim() : formData.country.trim(),
            city: isCustomCountry ? formData.customCity.trim() : formData.city.trim(),
            district: formData.district.trim(),
            detailedAddress: formData.detailAddress.trim(),
            foodType: formData.foodType.trim(),
            notes: formData.notes.trim(),
        };
    },
    resetForm() {
        this.setData({
            formData: { ...defaultFormState },
            selectedCountryIndex: -1,
            selectedCityIndex: -1,
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
