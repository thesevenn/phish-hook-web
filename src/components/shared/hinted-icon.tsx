import {FC} from "react";

import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

interface PropType {
	hint: string;
	icon: React.ReactNode;
}
const HintedIcon: FC<PropType> = ({hint, icon}) => {
	return (
		// <TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>{icon}</TooltipTrigger>
			<TooltipContent>
				<p>{hint}</p>
			</TooltipContent>
		</Tooltip>
		// </TooltipProvider>
	);
};

export default HintedIcon;
