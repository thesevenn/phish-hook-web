export interface AnalysisResponseType {
	filename: string;
	email_size: string;
	result: AnalysisResultType;
}

export type VerdictType = "safe" | "caution" | "suspicious" | "critical";

export interface AnalysisResultType {
	verdict: VerdictType;
	score: number;
	confidence: number;
	filters: RiskAssessmentType[];
	critical: unknown[];
}

interface RiskAssessmentType {
	name: string;
	preview: string;
	clues: Record<string, string>[];
	type: string;
}
