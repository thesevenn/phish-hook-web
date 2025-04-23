import {FC} from "react";

import {Separator} from "@/components/ui/separator";

interface PropType {}
const Footer: FC<PropType> = () => {
	return (
		<footer className="bg-brand-primary">
			<div>Footer</div>
			<Separator />
			<div>Dispatch</div>
		</footer>
	);
};

export default Footer;
