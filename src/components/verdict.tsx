import {FC, useState, useEffect} from "react";

import {FileWarning} from "lucide-react";
import {useLocation, Link} from "react-router";

import Card from "./ui/card";
import {analyzeEmail} from "@/lib/api";

interface PropType {}
const Verdict: FC<PropType> = () => {
	const location = useLocation();
	const formData = location.state?.formData;
	const [verdict, setVerdict] = useState<any>({});

	useEffect(() => {
		const handleSubmit = async () => {
			try {
				const response = await analyzeEmail("/analyze", formData);
				if (response) {
					console.log(response);
					setVerdict(response);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (formData) handleSubmit();
	}, []);

	if (!formData) {
		return (
			<>
				<Card className="flex flex-col items-center justify-center gap-2">
					<FileWarning className="dark:text-red-400 text-red-500" size={72} />
					<p className="text-red-500 dark:text-red-400 max-w-[24ch] text-center">
						No email file found. Email file is needed to scan for threats
					</p>
				</Card>
				<p className="text-sm lg:text-base text-surface-primary dark:text-brand-body max-w-prose text-center mt-2">
					Please upload an email file to get verdict.{" "}
					<Link
						to="/upload"
						className="dark:text-brand-light text-brand-primary dark:hover:text-brand-primary hover:text-brand-light"
					>
						Upload here
					</Link>
				</p>
			</>
		);
	}
	return (
		<div>
			<p>Verdict:{verdict?.result?.verdict}</p>
			<p>Score:{verdict?.result?.score}</p>
		</div>
	);
};

export default Verdict;
