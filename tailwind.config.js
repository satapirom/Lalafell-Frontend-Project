/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ], darkMode: 'class',
    theme: {
        screens: {
            mobile: "375px",
            tablet: "768px",
            laptop: "1024px",
            desktop: "1280px",
            laptopl: "1440px",
        },
        extend: {
            colors: {
                'light': '#E9E4D6',
                'dark': '#04001e',
                'primary-color': '#5C6BC0',
                'secondary-color': '#7986CB',
            },
            keyframes: {
                bounceHorizontal: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(5px)' },
                },
            },
            animation: {
                'bounce-horizontal': 'bounceHorizontal 1s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
