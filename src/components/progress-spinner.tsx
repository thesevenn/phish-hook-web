import {FC, useState, useEffect} from "react";

interface PropType {
	arcColor: string;
	ringColor: string;
	isLoading: boolean;
}

const r = 90;
const circumference = 2 * Math.PI * r;
const smallArc = 100;

const ProgressSpinner: FC<PropType> = ({arcColor, ringColor, isLoading}) => {
	// const [processing, setProcessing] = useState(true);
	const [dashArray, setDashArray] = useState(`${smallArc} ${circumference}`);
	const [rotating, setRotating] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			// setProcessing(false)
			setRotating(false);
			setDashArray(`${circumference} 0`);
		}
	}, [isLoading]);
	return (
		<svg width="200" height="200" viewBox="0 0 200 200">
			<circle
				cx="100"
				cy="100"
				r={r}
				stroke={ringColor}
				strokeWidth="20"
				fill="none"
			/>
			<circle
				cx="100"
				cy="100"
				r={r}
				stroke={arcColor}
				strokeWidth="20"
				fill="none"
				strokeDasharray={dashArray}
				strokeDashoffset="0"
				strokeLinecap="round"
				style={{
					transformOrigin: "center",
					animation: rotating ? "spin 2s linear infinite" : "none",
					transition: "stroke-dasharray 0.7s ease-in-out",
				}}
			/>
			<style>
				{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
		  circle {
            transition: stroke-dasharray 0.6s ease;
          }
        `}
			</style>
		</svg>
	);
};

export default ProgressSpinner;
