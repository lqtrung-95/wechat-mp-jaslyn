export const SHOPPING_REGIONS = [
    {
        country: 'Thailand',
        cities: ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Samui', 'Krabi', 'Chonburi', 'Hua Hin', 'Surat Thani', 'Chiang Rai'],
    },
    {
        country: 'Singapore',
        cities: ['Singapore'],
    },
    {
        country: 'Malaysia',
        cities: ['Kuala Lumpur', 'Johor Bahru', 'Klang Valley', 'Penang', 'Malacca', 'Ipoh', 'Kota Kinabalu', 'Kuching'],
    },
    {
        country: 'Indonesia',
        cities: ['Jakarta', 'Bali', 'Surabaya', 'Medan', 'Bandung', 'Yogyakarta', 'Batam'],
    },
    {
        country: 'Vietnam',
        cities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho', 'Nha Trang', 'Da Lat', 'Hue', 'Phu Quoc', 'Vung Tau'],
    },
    {
        country: 'Cambodia',
        cities: ['Phnom Penh', 'Siem Reap', 'Sihanoukville'],
    },
    {
        country: 'Philippines',
        cities: ['Manila', 'Cebu', 'Davao', 'Boracay'],
    },
];

export const SHOPPING_SUPPORTED_COUNTRIES = SHOPPING_REGIONS.map((item) => item.country);
