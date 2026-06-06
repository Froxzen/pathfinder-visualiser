/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1600px",
			"2xl": "2000px",
		},
		extend: {
			colors: {
				canvas: {
					deep: "#0b0f14",
					surface: "#131a22",
					elevated: "#1a2332",
					border: "#2d3a4d",
					text: "#e2e8f0",
					muted: "#8899ad",
					accent: "#22d3ee",
					"accent-dim": "#0891b2",
					start: "#10b981",
					end: "#f43f5e",
					traversed: "#38bdf8",
					path: "#facc15",
					wall: "#475569",
					cell: "#151c26",
				},
			},
			fontFamily: {
				display: ["Syne", "system-ui", "sans-serif"],
				sans: ["DM Sans", "system-ui", "sans-serif"],
			},
			keyframes: {
				traversed: {
					"0%": {
						transform: "scale(0.3)",
						backgroundColor: "#1a2332bf",
						borderRadius: "100%",
					},
					"50%": {
						backgroundColor: "#0e7490bf",
					},
					"75%": {
						transform: "scale(1.2)",
						backgroundColor: "#38bdf8bf",
					},
					"100%": {
						transform: "scale(1)",
						backgroundColor: "#38bdf8",
					},
				},
				path: {
					"0%": {
						transform: "scale(0.3)",
						backgroundColor: "#ca8a04bf",
						borderRadius: "100%",
					},
					"50%": {
						backgroundColor: "#eab308bf",
					},
					"75%": {
						transform: "scale(1.2)",
						backgroundColor: "#facc15bf",
					},
					"90%": {
						transform: "scale(0.8)",
						backgroundColor: "#fde047",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				wall: {
					"0%": {
						transform: "scale(0.7)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
			},
			animation: {
				traversed: "traversed 0.5s cubic-bezier(0, 0, 0.2, 1)",
				path: "path 1.5s cubic-bezier(0, 0, 0.2, 1)",
				wall: "wall 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
			},
		},
	},
	plugins: [],
};
