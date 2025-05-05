import {FC, ReactNode} from "react";

import {Download, Info} from "lucide-react";

import HintedIcon from "@/components/shared/hinted-icon";
import SkeletonCard from "@/components/skeletons/skeleton-card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Separator} from "../ui/separator";

interface PropType {
	confidence?: number;
	trigger: () => void;
}
const ActionButtons: FC<PropType> = ({confidence, trigger}) => {
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
								onClick={trigger}
								size={24}
								className="dark:text-brand-subtle text-border-subtle"
							/>
						}
					/>
				) : (
					<SkeletonCard className="h-7 aspect-square" />
				)}
				{confidence ? (
					<HowItWorks
						trigger={
							<HintedIcon
								hint="How this works"
								icon={
									<Info
										size={24}
										className="dark:text-brand-subtle text-border-subtle"
									/>
								}
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

const HowItWorks: FC<{trigger: ReactNode}> = ({trigger}) => {
	return (
		<Popover>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent className="max-h-[500px] overflow-y-scroll lg:max-w-[400px]">
				<section className="p-4 text-sm text-gray-800 dark:text-gray-200 space-y-4 w-full">
					<h2 className="text-base font-semibold dark:text-white">
						How it works
					</h2>

					<p>
						We scan your email to check for warning signs of phishing or fraud:
					</p>

					<div>
						<h3 className="font-medium dark:text-white">Quick Checks First</h3>
						<p className="dark:text-gray-300">
							Known red flags like fake domains, risky links, or impersonated
							brands are flagged instantly.
						</p>
					</div>

					<div>
						<h3 className="font-medium dark:text-white">
							Smarter Review When Needed
						</h3>
						<p className="dark:text-gray-300">
							If it's unclear, we run a deeper scan using a trained model that
							looks at patterns and phrasing typical of scams.
						</p>
					</div>
					<Separator />
					<div className="">
						<h3 className="text-base font-semibold dark:text-white">
							Your Email Threat Score – What It Means
						</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<span className="inline-flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-green-500"></span>
									<span className="font-medium">Safe (0–30):</span>
								</span>
								<span className="ml-1 dark:text-gray-300">
									No strong signs of phishing. Still, always stay alert.
								</span>
							</li>
							<li>
								<span className="inline-flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-yellow-400"></span>
									<span className="font-medium">Caution (31–54):</span>
								</span>
								<span className="ml-1 dark:text-gray-300">
									Some suspicious traits found. Review before clicking links or
									replying.
								</span>
							</li>
							<li>
								<span className="inline-flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-orange-400"></span>
									<span className="font-medium">Suspicious (55–69):</span>
								</span>
								<span className="ml-1 dark:text-gray-300">
									Multiple red flags. Likely phishing. Avoid interaction.
								</span>
							</li>
							<li>
								<span className="inline-flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-red-500"></span>
									<span className="font-medium">Critical (70–100):</span>
								</span>
								<span className="ml-1 dark:text-gray-300">
									High-risk. Strong signs of a phishing attempt. Delete or
									report immediately.
								</span>
							</li>
						</ul>
					</div>
					<Separator />
					<p>
						<strong>Disclaimer:</strong> This tool provides automated analysis
						based on known phishing patterns and lightweight models. It is a
						proof of concept developed for academic purposes and is not intended
						as a full-fledged or enterprise-grade security solution. While it
						can help flag suspicious emails, no detection system is perfect.
						Mistakes can occur. Always use your judgment and verify critical
						communications independently before engaging with any email content.
					</p>
				</section>
			</PopoverContent>
		</Popover>
	);
};

export default ActionButtons;
