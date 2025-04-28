import {FC} from "react";

import {Sun, Moon} from "lucide-react";

import PhishookLogo from "../shared/phishook";
import {useDarkMode} from "../../hooks/use-dark-mode";
import APIStatus from "../shared/api-status";

interface PropType {}
const Header: FC<PropType> = () => {
	const [darkMode, setDarkMode] = useDarkMode();
	return (
		<header className="bg-brand-primary px-4 lg:px-24 py-4 flex items-center justify-between sticky top-0 z-10">
			<div className="w-10 lg:w-14 aspect-square text-white">
				<PhishookLogo iswhite />
			</div>
			<div className="flex items-center gap-4 lg:gap-8">
				<APIStatus />
				<div className="cursor-pointer text-brand-body">
					{darkMode && <Sun onClick={() => setDarkMode(false)} />}
					{!darkMode && <Moon onClick={() => setDarkMode(true)} />}
				</div>
			</div>
		</header>
	);
};

export default Header;
