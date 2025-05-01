import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {VerdictType} from "./types/results.type";

// export function cn(...inputs: ClassValue[]) {
// 	return twMerge(clsx(inputs));
// }

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const titleCase = (text?: string): string => {
	if (!text) return "";
	return text[0].toUpperCase() + text.substring(1);
};

const mapColorToVerdict = (verdict: VerdictType) => {
	switch (verdict) {
		case "safe":
			return "var(--color-safe)";
		case "caution":
			return "var(--color-caution)";
		case "suspicious":
			return "var(--color-suspicious)";
		case "critical":
			return "var(--color-critical)";
		default:
			return undefined;
	}
};

const formatReadableVerdict = (verdict: VerdictType, confidence: number) => {
	switch (verdict) {
		case "safe":
			return confidence > 0.8 ? "appears to be safe." : "is likely safe";
		case "caution":
			return confidence > 0.8
				? "may be safe, but avoid clicking links unless you're sure of the sender."
				: "shows signs of caution — don't interact unless you're certain it's trusted.";
		case "suspicious":
			return confidence > 0.8
				? "is likely unsafe. Avoid clicking or replying."
				: "looks suspicious. Do not engage or click any links.";
		case "critical":
			return confidence > 0.8
				? "is malicious. Do not open, click, or respond."
				: "is most likely malicious. Avoid entirely.";
		default:
			return "has an unknown verdict.";
	}
};
export {cn, titleCase, mapColorToVerdict, formatReadableVerdict};
