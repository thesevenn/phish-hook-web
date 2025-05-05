import {FC} from "react";

import {Download, Info} from "lucide-react";

import HintedIcon from "@/components/shared/hinted-icon";
import SkeletonCard from "@/components/skeletons/skeleton-card";

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

export default ActionButtons;
