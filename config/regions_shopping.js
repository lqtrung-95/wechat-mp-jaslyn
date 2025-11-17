export const SHOPPING_REGIONS = [
    {
        country: '泰国',
        countryEn: 'Thailand',
        countryCode: 'TH',
        flag: '🇹🇭',
        cities: ['曼谷 Bangkok', '普吉 Phuket', '清迈 Chiang Mai', '芭提雅 Pattaya', '春武里 Hat Yai', '苏梅岛 Samui', '甲米 Krabi', '尖竹汶 Chonburi', '华欣 Hua Hin', '素叻他尼 Surat Thani', '清莱 Chiang Rai'],
    },
    {
        country: '新加坡',
        countryEn: 'Singapore',
        countryCode: 'SG',
        flag: '🇸🇬',
        cities: ['新加坡 Singapore'],
    },
    {
        country: '马来西亚',
        countryEn: 'Malaysia',
        countryCode: 'MY',
        flag: '🇲🇾',
        cities: ['吉隆坡 Kuala Lumpur', '新山 Johor Bahru', '巴生谷 Klang Valley', '槟城 Penang', '马六甲 Melaka', '怡保 Ipoh', '亚庇 Kota Kinabalu', '兰卡威 Langkawi', '斗湖 Tawau', '古晋 Kuching'],
    },
    {
        country: '印度尼西亚',
        countryEn: 'Indonesia',
        countryCode: 'ID',
        flag: '🇮🇩',
        cities: ['雅加达 Jakarta', '巴厘岛 Bali', '北干巴鲁 Pekanbaru', '巴淡岛 Batam', '泗水 Surabaya', '龙目岛 Mataram', '日惹 Yogyakarta', '林巴之下 Labuan Bajo', '万隆 Bandung', '玛琅 Malang', '棉兰 Medan', '三宝垄 Semarang', '望加锡 Makassar'],
    },
    {
        country: '越南',
        countryEn: 'Vietnam',
        countryCode: 'VN',
        flag: '🇻🇳',
        cities: ['胡志明市 Hồ Chí Minh', '河内 Hanoi', '岘港 Da Nang', '海防 Hai Phong', '芹苴 Can Tho', '芽庄 Nha Trang', '大叻 Da Lat', '顺化 Hue', '富国岛 Phu Quoc', '头顿 Vung Tau'],
    },
    {
        country: '柬埔寨',
        countryEn: 'Cambodia',
        countryCode: 'KH',
        flag: '🇰🇭',
        cities: ['金边 Phnom Penh', '暹粒 Siem Reap', '西哈努克 Sihanoukville'],
    },
    {
        country: '菲律宾',
        countryEn: 'Philippines',
        countryCode: 'PH',
        flag: '🇵🇭',
        cities: ['马尼拉 Manila', '宿务 Cebu', '达沃 Davao', '长滩岛 Boracay'],
    },
];

export const SHOPPING_SUPPORTED_COUNTRIES = SHOPPING_REGIONS.map((item) => item.country);
