/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--bg-primary)',
                surface: 'var(--card-bg)',
                sidebar: 'var(--bg-soft)',
                primary: 'var(--primary)',
                text: 'var(--text)',
                muted: 'var(--muted)',
                border: 'var(--border)',
                input: 'var(--input-bg)',
            }
        },
    },
    plugins: [],
}
