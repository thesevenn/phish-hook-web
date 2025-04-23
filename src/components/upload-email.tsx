import {FC} from "react";

import {Button} from "@/components/ui/button";

interface PropType {}
const UploadEmail: FC<PropType> = () => {
	return (
		<div className="flex flex-col justify-evenly h-full">
			<div className="flex flex-col items-center gap-6">
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-prose text-center">
					Select a .eml file to scan for threats
				</p>
				<img
					src="/scan-icon.svg"
					alt="A page scanning with fingerprint icon"
					className="w-36"
				/>
			</div>
			<div className="flex flex-col items-center gap-4">
				<Button className="bg-brand-primary text-subtle-light px-12 py-6 hover:bg-border-subtle font-medium cursor-pointer rounded-lg">
					Choose File
				</Button>
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-[24ch] text-center">
					By continuing you agree to our Terms of Use
				</p>
			</div>
		</div>
	);
};

export default UploadEmail;
