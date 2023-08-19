/** @type {import('tailwindcss'.Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#ffffff',
                secondary: '#282828',
                accent: '#ffe501',
                red: '#b01a0b',
                green: '#065f46',
                gray: '#e3e1db',
                black: '#1a1a1a'
            }
        }
    },
    plugins: []
};
