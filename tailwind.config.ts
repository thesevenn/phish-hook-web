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
				rubik: "var(--font-rubik)",
			},
		},
	},
	plugins: [],
} satisfies Config;
