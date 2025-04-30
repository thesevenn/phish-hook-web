import {FC} from "react";

import {Separator} from "@/components/ui/separator";
import PhishookLogo from "../shared/phishook";

interface PropType {}
const Footer: FC<PropType> = () => {
	return (
		<footer className="bg-brand-primary px-4 lg:px-24 py-4">
			<div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0 md:justify-between py-4">
				<div className="flex items-center gap-2 md:gap-3">
					<div className="w-8 lg:w-12 aspect-square text-white">
						<PhishookLogo />
					</div>
					<p className="md:text-xl font-medium">PhisHook</p>
				</div>
				<ul className="flex flex-col md:flex-row md:items-center gap-5 md:gap-10 text-sm">
					<li>Disclaimer</li>
					<li>See it in action</li>
				</ul>
			</div>
			<Separator />
			<div className="flex items-center justify-between pt-4 text-sm">
				<p>Built by Sevenn</p>
				<p>Source code - GitHub</p>
			</div>
		</footer>
	);
};

export default Footer;
