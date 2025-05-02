import {FC, useState, useEffect, useRef} from "react";

import {
	FileWarning,
	Download,
	Info,
	LoaderCircle,
	CircleCheck,
	CheckCircle2,
	Unplug,
} from "lucide-react";
import {useLocation, Link} from "react-router";
import {useQuery} from "@tanstack/react-query";

import Card from "./ui/card";
import SkeletonCard from "./skeletons/skeleton-card";
import ProgressSpinner from "./progress-spinner";
import {uploadFileAnalyze} from "@/lib/api";
import {mapColorToVerdict, titleCase, formatReadableVerdict} from "@/lib/utils";
import HintedIcon from "./shared/hinted-icon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import VerdictSheild from "./shared/verdict-shield";
import {Separator} from "./ui/separator";

interface PropType {}
const Verdict: FC<PropType> = () => {
	const location = useLocation();
	const formData = location.state?.formData;
	const features = ["sender", "subject", "body", "urls"];
	const [timeElapsed, setTimeElapsed] = useState<number>(0.0);
	const ref = useRef<number>(0);
	ref.current += 1;
	console.log(ref.current);
	const {data, isLoading, isFetching} = useQuery({
		queryKey: ["analysis"],
		queryFn: () => uploadFileAnalyze(formData),
	});
	useEffect(() => {
		if (!isFetching) {
			return;
		}

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
				<Card className="flex flex-col items-center justify-center gap-2">
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
				<ActionButtons confidence={data?.result?.confidence} />

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
							<span className="text-sm">/100</span>
							<p className="text-xs">Threat Score</p>
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
								fill="var(--color-brand-light)"
								className="text-surface-card-dark"
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
				{/* subject */}
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

interface propType {
	label: string;
	content: React.ReactNode;
	numOfClues: number;
}
const FeatureResult: FC<propType> = ({label, content, numOfClues}) => {
	return (
		<Accordion
			type="single"
			collapsible
			className="px-4 dark:bg-ring-default bg-slate-200 rounded-xl"
		>
			<AccordionItem value="item-1">
				<AccordionTrigger
					hint={`${numOfClues} Issue${numOfClues > 1 ? "s" : ""} found`}
					className="text-sm text-surface-primary dark:text-brand-subtle font-normal"
				>
					{titleCase(label)}
				</AccordionTrigger>
				<AccordionContent>
					<Separator />
					{content}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

const FeatureAnalysisClean: FC<{label: string}> = ({label}) => {
	return (
		<div className="dark:bg-ring-default bg-slate-200 rounded-xl px-4 py-4 flex w-full justify-between items-center">
			<p className="text-sm text-surface-primary dark:text-brand-subtle max-w-prose ">
				{titleCase(label)}
			</p>
			<p className="flex items-center gap-2 leading-0">
				<CircleCheck size={20} className="text-status-success" />
				<span className="text-xs">CLEAN</span>{" "}
			</p>
		</div>
	);
};

const ActionButtons: FC<{confidence?: number}> = ({confidence}) => {
	return (
		<div className="flex items-center justify-between w-full">
			{confidence ? (
				<HintedIcon
					hint={`Confidence: ${confidence}`}
					icon={
						<span className="border-[1px] dark:border-brand-subtle dark:text-brand-subtle text-border-subtle border-border-subtle p-2 rounded-lg text-xs">
							Confidence: {confidence}
						</span>
					}
				/>
			) : (
				<SkeletonCard className="h-8 w-24" />
			)}

			<div className="flex gap-5 ">
				{confidence ? (
					<HintedIcon
						hint="Download report"
						icon={
							<Download
								size={24}
								className="dark:text-brand-subtle text-border-subtle"
							/>
						}
					/>
				) : (
					<SkeletonCard className="h-7 aspect-square" />
				)}
				{confidence ? (
					<HintedIcon
						hint="How this works"
						icon={
							<Info
								size={24}
								className="dark:text-brand-subtle text-border-subtle"
							/>
						}
					/>
				) : (
					<SkeletonCard className="h-7 aspect-square" />
				)}
			</div>
		</div>
	);
};

const FeatureResultDetail: FC<{
	clues: Array<{[key: string]: string}>;
	preview: string;
	name: string;
}> = ({clues, preview, name}) => {
	return (
		<div className="py-2">
			<dl className="">
				<dt className="bg-surface-card-dark text-subtle-light px-2 py-1 rounded-md inline-block">
					Preview: {titleCase(name)}
				</dt>
				<dd>
					{preview}
					{name == "body" && "..."}
				</dd>
			</dl>
			<Separator className="mt-2" />
			<div className="py-2">
				<p>We found these suspicious items in {name}</p>
				<Separator className="my-2" />
				{clues.map(clue => {
					const formattedClue = formatClue(clue);
					return (
						<dl className="pb-2">
							<dt className="bg-surface-card-dark text-subtle-light p-1 rounded-md inline-block">
								{formattedClue[0]}
							</dt>
							<dd className="inline pl-2 text-surface-primary dark:text-brand-subtle">
								{formattedClue[1]}
							</dd>
						</dl>
					);
				})}
			</div>
		</div>
	);
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
