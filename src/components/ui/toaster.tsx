import {useState, useEffect} from "react";

const Toaster = () => {
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (show) {
			timer = setTimeout(() => {
				setShow(false);
			}, 3000);
		}
		return () => clearTimeout(timer);
	}, [show]);
	if (!show) return null;
	return (
		<div className="fixed w-auto bg-white border-brand-subtle border-solid border-2 shadow-sm z-50 px-4 py-1 rounded-lg bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center animate-fade-in">
			<p className="h-full w-full text-surface-primary">Hello</p>
		</div>
	);
};
export default Toaster;
