import {FC, useState, useEffect} from "react";

import {FileWarning, LoaderCircle, CheckCircle2, Unplug} from "lucide-react";
import {useLocation, Link} from "react-router";
import {useQuery} from "@tanstack/react-query";

import Card from "../ui/card";
import {uploadFileAnalyze} from "@/lib/api";
import ProgressSpinner from "../progress-spinner";
import {useDownload} from "@/hooks/use-download";
import VerdictSheild from "../shared/verdict-shield";
import SkeletonCard from "../skeletons/skeleton-card";
import ActionButtons from "./action-buttons";
import {
	FeatureResult,
	FeatureAnalysisClean,
	FeatureResultDetail,
} from "./feature-result";
import {useDarkModeContext} from "@/contexts/darkmode-context";
import {
	mapColorToVerdict,
	titleCase,
	formatReadableVerdict,
	mapFeaturesFilter,
	formatPrintableReport,
	createStringURI,
} from "@/lib/utils";

interface PropType {}
const Verdict: FC<PropType> = () => {
	const {darkMode} = useDarkModeContext();
	const location = useLocation();
	const formData = location.state?.formData;
	const features = ["sender", "subject", "body", "urls"];
	const [timeElapsed, setTimeElapsed] = useState<number>(0.0);

	const reportDownloader = useDownload({
		dataHandler: createStringURI,
		filename: "phishook-analysis-report.txt",
	});

	const {data, isLoading, isFetching} = useQuery({
		queryKey: ["analysis"],
		queryFn: () => uploadFileAnalyze(formData),
	});

	useEffect(() => {
		if (!isFetching) {
			return;
		}

		// timer - tracking rough estimate for analysis
		const start = Date.now();

		const interval = setInterval(() => {
			const delta = (Date.now() - start) / 1000;
			setTimeElapsed(parseFloat(delta.toFixed(1))); // update in 0.1s steps
		}, 100);

		return () => clearInterval(interval);
	}, [isFetching]);

	if (!formData) {
		return (
			<>
				<Card className="flex flex-col items-center justify-center gap-2 h-[300px]">
					<FileWarning
						className="dark:text-red-400 text-red-500"
						size={72}
						strokeWidth={1.2}
					/>
					<p className="text-red-500 dark:text-red-400 max-w-[24ch] text-center">
						No email file found. Email file is needed to scan for threats
					</p>
				</Card>
				<p className="text-sm lg:text-base text-surface-primary dark:text-brand-body max-w-prose text-center mt-2">
					Please upload an email file to get verdict.{" "}
					<Link
						to="/upload"
						className="dark:text-brand-light text-brand-primary dark:hover:text-brand-primary hover:text-brand-light"
					>
						Upload here
					</Link>
				</p>
			</>
		);
	}

	if (!isLoading && !data?.result) {
		return (
			<Card className="flex flex-col items-center justify-center gap-2 w-full h-[300px]">
				<Unplug
					className="dark:text-red-400 text-red-500"
					size={72}
					strokeWidth={1.2}
				/>
				<p className="text-red-500 dark:text-red-400 max-w-[24ch] text-center">
					Analysis failed. Try again after sometime
				</p>
			</Card>
		);
	}

	return (
		<>
			<Card className="flex flex-col items-center p-4 lg:p-8 h-auto max-h-auto">
				<ActionButtons
					trigger={() => reportDownloader(formatPrintableReport(data?.result))}
					confidence={data?.result?.confidence}
				/>

				<div className="relative w-full flex items-center justify-center mt-6">
					{data ? (
						<div
							style={{translate: "-50% -50%"}}
							className="absolute top-1/2 left-1/2 text-center"
						>
							<p
								className="text-6xl font-semibold"
								style={{color: mapColorToVerdict(data?.result?.verdict)}}
							>
								{data?.result?.score}
							</p>
							<span className="text-sm text-surface-primary dark:text-brand-body">
								/100
							</span>
							<p className="text-xs text-surface-primary dark:text-brand-body font-medium">
								Threat Score
							</p>
						</div>
					) : (
						<p
							style={{translate: "-50% -50%"}}
							className="absolute top-1/2 left-1/2"
						>
							{timeElapsed}s
						</p>
					)}

					<ProgressSpinner
						ringColor="var(--color-ring-default)"
						arcColor="var(--color-brand-primary)"
						isLoading={isLoading}
					/>
				</div>
				{isFetching ? (
					<div className="flex justify-between items-center w-[200px] mt-10">
						<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-subtle max-w-prose">
							Processing email...
						</p>
						<LoaderCircle
							className="animate-spin text-surface-primary dark:text-brand-subtle"
							size={20}
						/>
					</div>
				) : (
					<div className="flex items-center gap-1 mt-2">
						<VerdictSheild verdict={data?.result?.verdict!} />
						<p
							className="text-4xl font-medium"
							style={{color: mapColorToVerdict(data?.result?.verdict!)}}
						>
							{titleCase(data?.result?.verdict)}
						</p>
					</div>
				)}

				{/* Verdict and analysis outcome */}
				{data && (
					<div className="flex flex-col items-center mt-2 gap-1">
						<p className="flex items-center gap-1 text-sm text-surface-primary dark:text-brand-subtle">
							Analysis complete in {timeElapsed}s{" "}
							<CheckCircle2
								size={24}
								fill={
									darkMode
										? "var(--color-brand-light)"
										: "var(--color-brand-primary)"
								}
								className="dark:text-surface-card-dark text-white"
							/>
						</p>
						<p className="text-sm lg:text-base text-surface-primary dark:text-brand-body max-w-[44ch] text-center ">
							According to our threat analysis your email{" "}
							{formatReadableVerdict(
								data?.result?.verdict,
								data.result.confidence
							)}
						</p>
					</div>
				)}
			</Card>
			<Card className="py-4 px-3 lg:p-5 mt-4 flex flex-col gap-[5px] h-auto max-h-auto">
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-prose mb-2 pl-1">
					{data
						? "Analysis report"
						: "Analysis details will be shown here once complete"}
				</p>
				{/* Render features and filters */}
				{data?.result?.filters.map(filter => {
					if (mapFeaturesFilter(filter.name, features)) {
						return (
							<FeatureResult
								label={filter.name}
								key={filter.name}
								numOfClues={filter.clues.length || 0}
								content={
									<FeatureResultDetail
										key={filter.name}
										preview={filter.preview}
										clues={filter.clues}
										name={filter.name}
									/>
								}
							/>
						);
					} else {
						return <FeatureAnalysisClean label={filter.name} />;
					}
				})}
				{/* Render clean features */}
				{data &&
					features.map(feature => (
						<FeatureAnalysisClean label={feature} key={feature} />
					))}

				{/* Skeleton loader  */}
				{!data &&
					features.map(feature => (
						<SkeletonCard className="h-14" key={feature} />
					))}
			</Card>
		</>
	);
};

export default Verdict;
