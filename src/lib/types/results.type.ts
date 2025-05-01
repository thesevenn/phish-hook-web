export interface AnalysisResponseType {
	filename: string;
	email_size: string;
	result: AnalysisResult;
}

export type VerdictType = "safe" | "caution" | "suspicious" | "critical";
interface AnalysisResult {
	verdict: VerdictType;
	score: number;
	confidence: number;
	filters: RiskAssessment[];
	critical: unknown[];
}

interface RiskAssessment {
	name: string;
	preview: string;
	clues: Record<string, string>[];
}
