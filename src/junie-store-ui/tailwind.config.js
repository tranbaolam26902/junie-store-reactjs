/** @type {import('tailwindcss'.Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                red: 'var(--color-red)',
                green: 'var(--color-green)',
                gray: 'var(--color-gray)',
                black: 'var(--color-black)'
            }
        }
    },
    plugins: []
};
