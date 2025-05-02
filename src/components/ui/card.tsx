import {FC, HTMLAttributes} from "react";

import {cn} from "@/lib/utils";

interface PropType extends HTMLAttributes<HTMLDivElement> {}
const Card: FC<PropType> = ({className, children}) => {
	return (
		<div
			className={cn(
				"dark:bg-surface-card-dark bg-white max-w-[690px] w-full h-full rounded-xl transition-all",
				className
			)}
		>
			{children}
		</div>
	);
};

export default Card;
