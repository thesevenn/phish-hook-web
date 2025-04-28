import {FC} from "react";

import {Outlet} from "react-router";

import Header from "./components/ui/header";
import Toaster from "./components/ui/toaster";
import Footer from "./components/ui/footer";

interface PropType {}
const Layout: FC<PropType> = () => {
	return (
		<div className="font-rubik bg-brand-body dark:bg-surface-primary transition-colors">
			<Header />
			<Toaster />
			<main
				style={{height: "calc(100vh - 140px)"}}
				className="flex flex-col items-center justify-center mb-6 mt-10 px-2"
			>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
