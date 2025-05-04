import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";
import {VerdictType, AnalysisResultType} from "./types/results.type";

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

const mapFeaturesFilter = (filter: string, features: Array<string>) => {
	if (features.includes(filter)) {
		features.splice(features.indexOf(filter), 1);
		return true;
	} else return false;
};

const formatClue = (clue: {[key: string]: string}) => {
	const [key, value] = Object.entries(clue)[0];
	const tokens = key.split("_");
	tokens[0] = titleCase(tokens[0]);
	return [tokens.join(" "), value];
};

const formatPrintableReport = (
	report: AnalysisResultType | undefined
): string => {
	if (!report) {
		return "";
	}

	const {verdict, score, confidence, filters} = report;

	const lines: string[] = [];

	lines.push("=== Phishook Email Threat Analysis Report ===\n");

	lines.push(`Verdict     : ${verdict.toUpperCase()}`);
	lines.push(`Score       : ${score} / 100`);
	lines.push(`Confidence  : ${(confidence * 100).toFixed(1)}%`);
	lines.push("");

	const heuristicFilters = filters.filter(f => f.type === "filter");
	const classifierResults = filters.filter(f => f.type === "classifier");

	if (score === 0 && filters.length === 0) {
		lines.push("Result was clean. No threats or suspicious activity detected.");
	} else {
		if (heuristicFilters.length > 0) {
			lines.push("Signals Detected:\n");
			heuristicFilters.forEach((feature, index) => {
				lines.push(`  ${index + 1}. On: ${feature.name}`);
				lines.push(
					`     Preview: ${feature.preview || "(No preview available)"}`
				);
				if (feature.clues?.length) {
					feature.clues.forEach((clue, clueIndex) => {
						Object.entries(clue).forEach(([key, value]) => {
							lines.push(`     Reason ${clueIndex + 1} (${key}): ${value}`);
						});
					});
				}
			});
			lines.push("");
		}

		if (classifierResults.length > 0) {
			lines.push("ML Classifier Results:\n");
			classifierResults.forEach((classifier, index) => {
				lines.push(`  ${index + 1}. Classifier: ${classifier.name}`);
				lines.push(
					`     Preview: ${classifier.preview || "(No preview available)"}`
				);
				if (Array.isArray(classifier.clues)) {
					classifier.clues.forEach((clue, clueIndex) => {
						if (typeof clue === "string") {
							lines.push(`     Inference ${clueIndex + 1}: ${clue}`);
						} else if (typeof clue === "object") {
							Object.entries(clue).forEach(([key, value]) => {
								lines.push(
									`     Inference ${clueIndex + 1} (${key}): ${value}`
								);
							});
						}
					});
				}
			});
			lines.push("");
		}
	}

	lines.push("====================================");

	return lines.join("\n");
};

const createStringURI = (data: string) => {
	return "data:text/plain;charset=utf-8," + encodeURI(data);
};

export {
	cn,
	titleCase,
	mapColorToVerdict,
	formatReadableVerdict,
	mapFeaturesFilter,
	formatClue,
	formatPrintableReport,
	createStringURI,
};
