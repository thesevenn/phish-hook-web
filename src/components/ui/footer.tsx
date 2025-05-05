import {FC} from "react";

import {Separator} from "@/components/ui/separator";
import PhishookLogo from "../shared/phishook";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

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
					<li>
						<Dialog>
							<DialogTrigger className="cursor-pointer">
								Disclaimer
							</DialogTrigger>
							<DialogContent className="text-gray-800 dark:text-gray-100">
								<DialogHeader>
									<DialogTitle className="text-gray-800 dark:text-gray-100">
										Disclaimer
									</DialogTitle>
									<DialogDescription>
										This tool provides automated analysis based on known
										phishing patterns and lightweight models. It is a proof of
										concept developed for academic purposes and is not intended
										as a full-fledged or enterprise-grade security solution.
										While it can help flag suspicious emails, no detection
										system is perfect. Mistakes can occur. Always use your
										judgment and verify critical communications independently
										before engaging with any email content.
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</li>
					<li className="cursor-not-allowed text-brand-muted">
						See it in action
					</li>
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
