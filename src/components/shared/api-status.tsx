import {FC, useState, useEffect} from "react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {getApiStatus} from "@/lib/api";
import {cn} from "@/lib/utils";

interface PropType {}
const APIStatus: FC<PropType> = () => {
	const [status, setStatus] = useState<boolean>(false);
	useEffect(() => {
		const getStatus = async () => {
			const response = await getApiStatus();
			if (response.status == 200) {
				setStatus(true);
			}
		};
		getStatus();
		let timer: NodeJS.Timeout;
		let count = 0;
		if (!status) {
			timer = setInterval(() => {
				console.log("retrying...");
				getStatus();
				count++;
			}, 10000);
			if (count > 10) {
				clearInterval(timer);
			}
		}

		return () => clearInterval(timer);
	}, [status]);
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="rounded-2xl">
					<div className="flex items-center gap-2 bg-transparent md:bg-subtle-light rounded-2xl px-2 md:px-3 py-2">
						<p className="text-sm font-medium text-surface-primary hidden md:inline-block">
							Status
						</p>
						<p
							className={cn(
								"w-3 aspect-square rounded-full  inset-shadow-sm ",
								status
									? "bg-status-success inset-shadow-green-200"
									: "bg-red-500 inset-shadow-red-200"
							)}
						></p>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>API Status: {status ? "Active" : "Unactive"} </p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default APIStatus;
