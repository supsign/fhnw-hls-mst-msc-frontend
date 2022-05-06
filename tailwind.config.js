const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                hls: {
                    DEFAULT: '#FDE70E',
                    200: '#fef387',
                    700: '#ead20a',
                },
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },
    plugins: [],
};
