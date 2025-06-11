/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./sections/**/*.{js,ts,jsx,tsx}", "./assets/**/*.svg", "./data/**/*.ts", "./hooks/**/*.ts", "./public/**/*.svg"],
	theme: {
		extend: {
			fontFamily: {
				montserrat: ["Montserrat", "sans-serif"],
				poppins: ["Poppins", "sans-serif"]
			},
			fontSize: {
				mega: "4.5rem"
			},
            animation: {
                "draw": "dash 0.8s linear forwards",
            },
            keyframes: {
                'dash': {
                    '0%': {
                        'stroke': 'white',
                        'fill': 'transparent'
                    },
                    '85%': {          
                        'stroke-dashoffset': 0,
                        'fill': 'transparent',
                        'stroke': 'white',
                    },
                    '100%': {
                        'stroke-dashoffset': 0,
                        'stroke': 'transparent',
                        'fill': 'currentColor'
                    }
                },
            }
		}
	},
	plugins: []
};
