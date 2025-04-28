import {FC, HTMLAttributes} from "react";

import {cn} from "@/lib/utils";

interface PropType extends HTMLAttributes<HTMLDivElement> {}
const Card: FC<PropType> = ({className, children}) => {
	return (
		<div
			className={cn(
				"dark:bg-surface-card-dark bg-white max-w-[690px] max-h-[380px] w-full h-full rounded-xl",
				className
			)}
		>
			{children}
		</div>
	);
};

export default Card;
