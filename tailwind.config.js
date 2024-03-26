module.exports = {
	purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "media",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Arial", "sans-serif"],
			},
			colors: {
				ghostWhite: "#f8f8ff",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
