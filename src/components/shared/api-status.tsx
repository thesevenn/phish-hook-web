import {FC} from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropType {}
const APIStatus: FC<PropType> = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="rounded-2xl">
					<div className="flex items-center gap-2 bg-transparent md:bg-subtle-light rounded-2xl px-2 md:px-3 py-2">
						<p className="text-sm font-medium text-surface-primary hidden md:inline-block">
							Status
						</p>
						<p className="w-3 aspect-square rounded-full bg-status-success inset-shadow-sm inset-shadow-green-200"></p>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>API Status: OK</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default APIStatus;
