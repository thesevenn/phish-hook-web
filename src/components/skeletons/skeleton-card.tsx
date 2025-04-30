import {FC, HTMLAttributes} from "react";

import {cn} from "@/lib/utils";

interface PropType extends HTMLAttributes<HTMLDivElement> {}
const SkeletonCard: FC<PropType> = ({className, children}) => {
	return (
		<div
			className={cn(
				"dark:bg-ring-default bg-slate-200 max-w-[690px] max-h-[380px] w-full h-full rounded-xl animate-pulse",
				className
			)}
		>
			{children}
		</div>
	);
};

export default SkeletonCard;
