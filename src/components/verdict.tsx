import {FC, useState, useEffect} from "react";

import {FileWarning, Download, Info, LoaderCircle} from "lucide-react";
import {useLocation, Link} from "react-router";

import Card from "./ui/card";
import SkeletonCard from "./skeletons/skeleton-card";
import ProgressSpinner from "./progress-spinner";
import {analyzeEmail} from "@/lib/api";
import HintedIcon from "./shared/hinted-icon";
// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";

interface PropType {}
const Verdict: FC<PropType> = () => {
	const location = useLocation();
	const formData = location.state?.formData;
	const [verdict, setVerdict] = useState<any>({});
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		const handleSubmit = async () => {
			try {
				const response = await analyzeEmail("/analyze", formData);
				if (response) {
					console.log(response);
					setVerdict(response);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (formData) handleSubmit();
	}, []);

	useEffect(() => {
		let start = Date.now();
		const timer = setInterval(() => {
			let _time = Date.now();
			if ((_time - start) / 1000 >= 5) {
				clearInterval(timer);
			} else {
				setTime((_time - start) / 1000);
			}
		}, 1);
		return () => clearInterval(timer);
	}, []);

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
	return (
		<>
			<Card className="flex flex-col items-center p-4 lg:p-8 h-auto">
				<div className="flex items-center justify-between w-full">
					<HintedIcon
						hint="Confidence:0.98"
						icon={
							<span className="border-[1px] dark:border-brand-subtle dark:text-brand-subtle text-border-subtle border-border-subtle p-2 rounded-lg text-xs">
								Confidence: 0.98
							</span>
						}
					/>

					<div className="flex gap-5 ">
						<HintedIcon
							hint="Download report"
							icon={
								<Download
									size={24}
									className="dark:text-brand-subtle text-border-subtle"
								/>
							}
						/>
						<HintedIcon
							hint="How this works"
							icon={
								<Info
									size={24}
									className="dark:text-brand-subtle text-border-subtle"
								/>
							}
						/>
					</div>
				</div>
				<div className="relative w-full flex items-center justify-center mt-6">
					{/* <div
						className="absolute w-full border-8 aspect-square border-brand-primary rounded-full top-1/2 left-1/2"
						style={{translate: "-50% -50%", width: "calc(100% + 12%)"}}
					></div> */}
					<p
						style={{translate: "-50% -50%"}}
						className="absolute top-1/2 left-1/2"
					>
						{time.toFixed(1)}s
					</p>
					<ProgressSpinner
						ringColor="var(--color-ring-default)"
						arcColor="var(--color-brand-primary)"
					/>
				</div>
				<div className="flex justify-between items-center w-[200px] mt-10">
					<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-subtle max-w-prose">
						Processing email...
					</p>
					<LoaderCircle
						className="animate-spin text-surface-primary dark:text-brand-subtle"
						size={20}
					/>
				</div>
			</Card>
			<Card className="py-4 px-3 lg:p-5 mt-4 flex flex-col gap-[5px] h-auto">
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-prose mb-2 pl-1">
					Analysis details will be shown here once complete
				</p>
				{/* <FeatureResult /> */}
				{/* <SkeletonCard className="h-14" /> */}
				<SkeletonCard className="h-14" />
				<SkeletonCard className="h-14" />
				<SkeletonCard className="h-14" />
			</Card>
		</>
	);
};

export default Verdict;

// const FeatureResult: FC = () => {
// 	return (
// 		<Accordion
// 			type="single"
// 			collapsible
// 			className="px-4 dark:bg-ring-default bg-slate-200 rounded-xl"
// 		>
// 			<AccordionItem value="item-1">
// 				<AccordionTrigger hint="1 issue found">
// 					Is it accessible?
// 				</AccordionTrigger>
// 				<AccordionContent>
// 					Yes. It adheres to the WAI-ARIA design pattern.
// 				</AccordionContent>
// 			</AccordionItem>
// 		</Accordion>
// 	);
// };
