import {FC} from "react";

import {VerdictType} from "@/lib/types/results.type";

interface PropType {
	verdict: VerdictType;
}
const VerdictSheild: FC<PropType> = ({verdict}) => {
	switch (verdict) {
		case "safe":
			return (
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#a)">
						<path
							d="M24 2 6 10v12c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V10z"
							fill="#C9F3DB"
						/>
						<path
							d="m22.6 25.8-2.175-2.175a.92.92 0 0 0-.675-.275q-.4 0-.7.3a.95.95 0 0 0-.275.7q0 .425.275.7l2.85 2.85a.95.95 0 0 0 .7.275.95.95 0 0 0 .7-.275l5.675-5.675a.92.92 0 0 0 .275-.675q0-.4-.3-.7a.95.95 0 0 0-.7-.275.95.95 0 0 0-.7.275zM24 34a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137q-1.35-1.35-2.137-3.175A9.7 9.7 0 0 1 14 24q0-2.075.788-3.9a10.1 10.1 0 0 1 2.137-3.175q1.35-1.35 3.175-2.138A9.7 9.7 0 0 1 24 14q2.075 0 3.9.787a10.1 10.1 0 0 1 3.175 2.138q1.35 1.35 2.137 3.175A9.7 9.7 0 0 1 34 24a9.7 9.7 0 0 1-.788 3.9 10.1 10.1 0 0 1-2.137 3.175q-1.35 1.35-3.175 2.137A9.7 9.7 0 0 1 24 34"
							fill="#2ECC71"
						/>
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M0 0h48v48H0z" />
						</clipPath>
					</defs>
				</svg>
			);
		case "caution":
			return (
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#a)">
						<path
							d="M24 2 6 10v12c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V10z"
							fill="#FCF4D4"
						/>
						<path
							d="M23 26.286V16h2v10.286zM23 32v-2.286h2V32z"
							fill="#F1C40F"
						/>
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M0 0h48v48H0z" />
						</clipPath>
					</defs>
				</svg>
			);
		case "suspicious":
			return (
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#a)">
						<path
							d="M24 2 6 10v12c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V10z"
							fill="#FAE7D6"
						/>
						<path
							d="M14 31h20L24 13zm10.91-2.842h-1.82v-1.895h1.82zm0-3.79h-1.82v-3.79h1.82z"
							fill="#E67E22"
						/>
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M0 0h48v48H0z" />
						</clipPath>
					</defs>
				</svg>
			);
		case "critical":
			return (
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#a)">
						<path
							d="M24 2 6 10v12c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V10z"
							fill="#FAD9D6"
						/>
						<path
							d="M20.425 35a2.42 2.42 0 0 1-1.711-.703l-5.011-5.01A2.42 2.42 0 0 1 13 27.575v-7.151a2.42 2.42 0 0 1 .703-1.711l5.01-5.011q.338-.336.78-.52.443-.183.932-.183h7.15a2.42 2.42 0 0 1 1.711.703l5.011 5.01q.336.338.52.78.183.443.183.932v7.15a2.42 2.42 0 0 1-.703 1.711l-5.01 5.011a2.42 2.42 0 0 1-1.711.703zM24 25.711l2.658 2.658q.337.336.825.337.489 0 .856-.367.336-.337.336-.856t-.336-.855L25.71 24l2.658-2.658q.336-.337.337-.825 0-.489-.367-.856-.337-.336-.856-.336t-.855.336L24 22.29l-2.658-2.658a1.12 1.12 0 0 0-.825-.337q-.489 0-.856.367-.336.337-.336.856t.336.855L22.29 24l-2.658 2.658q-.336.337-.337.825 0 .489.367.856.337.336.856.336t.855-.336z"
							fill="#E74C3C"
						/>
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M0 0h48v48H0z" />
						</clipPath>
					</defs>
				</svg>
			);
		default:
			return null;
	}
};

export default VerdictSheild;
