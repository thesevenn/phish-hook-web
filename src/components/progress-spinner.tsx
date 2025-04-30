import {FC} from "react";

interface PropType {
	arcColor: string;
	ringColor: string;
}
const ProgressSpinner: FC<PropType> = ({arcColor, ringColor}) => {
	return (
		<svg width="200" height="200" viewBox="0 0 200 200">
			<circle
				cx="100"
				cy="100"
				r="90"
				stroke={ringColor}
				strokeWidth="20"
				fill="none"
			/>
			<circle
				cx="100"
				cy="100"
				r="90"
				stroke={arcColor}
				strokeWidth="20"
				fill="none"
				strokeDasharray="100 420"
				strokeDashoffset="0"
				strokeLinecap="round"
				style={{
					transformOrigin: "center",
					animation: "spin 1.6s linear infinite",
					transition: "stroke-dasharray 0.4s ease-in-out",
				}}
			/>
			<style>
				{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
			</style>
		</svg>
	);
};

export default ProgressSpinner;
