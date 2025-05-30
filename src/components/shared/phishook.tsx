import {FC} from "react";

type OnLight = {
	iswhite?: never;
	onlight?: boolean;
};
type OnWhite = {
	iswhite?: true;
	onlight?: never;
};
type PropType = OnLight | OnWhite;
const PhishookLogo: FC<PropType> = () => {
	// const fillColor = iswhite ? "#ffffff" : onlight ? "#214BA6" : "#7296E3";
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 113 90"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path fill="" d="M.104 0h112.168v89.277H.104z" />
			<path fill="currentColor" d="M61.911 0v42.349H51.61V0z" />
			<rect
				x="111.832"
				y="16.446"
				width="111.833"
				height="16.42"
				rx="4"
				transform="rotate(-179.987 111.832 16.446)"
				fill="currentColor"
			/>
			<rect
				x="111.938"
				y="89.258"
				width="111.833"
				height="10.257"
				rx="4"
				transform="rotate(-179.987 111.938 89.258)"
				fill="currentColor"
			/>
			<rect
				x="101.972"
				y="89.277"
				width="89.277"
				height="10.301"
				rx="4"
				transform="rotate(-90 101.972 89.277)"
				fill="currentColor"
			/>
			<rect
				x=".104"
				y="89.277"
				width="89.277"
				height="10.301"
				rx="4"
				transform="rotate(-90 .104 89.277)"
				fill="currentColor"
			/>
			<path
				d="M37.218 53.2a15.77 15.77 0 1 0 23.03-15.597c-2.76-1.453-5.547-1.982-8.649-1.657v7.44c1.53-.16 3.566.567 4.928 1.284a7.783 7.783 0 1 1-11.365 7.697z"
				fill="currentColor"
			/>
		</svg>
	);
};
export default PhishookLogo;
