import type {Config} from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						"font-smoothing": "antialiased",
						"-webkit-font-smoothing": "antialiased",
						"-moz-osx-font-smoothing": "grayscale",
					},
				},
			},
			fontFamily: {
				rubik: ["Rubik", "sans-serif"],
			},
			colors: {
				primary: "#214BA6",
				bg_dark: "#1F242E",
				primary_light: "#7296E3",
				bg_card_on_dark: "#1A1B1E",
				text_para: "#F2F5FC",
				line_dark: "#425275",
				text_muted: "#9EA9C2",
				text_secondary: "#C8D6F4",
				bg_ring: "#272D3A",
				status_ok: "#2ECC71",
				progress_done: "#75E0A3",
			},
		},
	},
	plugins: [],
} satisfies Config;
