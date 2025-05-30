import {ChangeEvent, FC, useState} from "react";

import {X, FileScan} from "lucide-react";
import {useNavigate} from "react-router";

import {Button} from "./ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import ScanIcon from "./shared/scan-icon";

interface PropType {}
const UploadEmail: FC<PropType> = () => {
	const navigate = useNavigate();
	const [emailFile, setEmailFile] = useState<File | null>(null);
	const [error, setError] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);

	const handleEmailFile = (event: ChangeEvent<HTMLInputElement>) => {
		setError("");
		setEmailFile(null);
		setProgress(0);
		const files = event.target.files;
		if (files && files[0].name.endsWith(".eml")) {
			const file = files[0];
			const formData = new FormData();
			formData.append("as_file", file);

			if (file.size / 100 > 50) {
				// limit email size at 50KB
				setError("Max file size allowed is 50KB");
			} else setEmailFile(file);
		} else {
			setError("Select email file to analyze");
		}
	};

	const handleUpload = async () => {
		if (!emailFile) {
			setError("Select a .eml file to analyze");
			return;
		}

		// const formData = new FormData();
		// formData.append("as_file", emailFile);
		try {
			navigate("/verdict", {state: {file: emailFile}});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex flex-col justify-evenly gap-6 pt-4 min-h-[256px]">
			<div className="flex flex-col items-center gap-3">
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-prose text-center">
					{emailFile
						? "Your selected email file"
						: "Select a .eml file to scan for threats"}
				</p>
				{emailFile ? (
					<>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="rounded-2xl flex flex-col items-center gap-2">
									<FileScan
										size={56}
										strokeWidth={1.5}
										className="text-brand-muted"
									/>
									<div
										onClick={() => setEmailFile(null)}
										className="border-[1px] border-solid border-border-subtle bg-transparent text-brand-light inset-shadow-sm inset-shadow-brand-light/20 hover:bg-transparent hover:text-brand-subtle hover:border-brand-subtle/60 rounded-lg flex items-center py-1 px-2 gap-1 "
									>
										<p className="truncate max-w-32">{emailFile.name}</p>
										<X className="scale-60" />
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>Clear selection</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</>
				) : (
					<ScanIcon />
				)}
			</div>
			<div className="flex flex-col items-center gap-4">
				{emailFile ? (
					<>
						{progress > 0 && (
							<progress
								className="w-40 h-1 rounded-full"
								value={progress}
								max={100}
							></progress>
						)}
						<Button
							onClick={handleUpload}
							className="bg-brand-primary text-subtle-light px-12 py-6 hover:bg-border-subtle font-medium cursor-pointer rounded-lg inset-shadow-xs inset-shadow-blue-200"
						>
							{progress > 0 ? `Uploading... ${progress}%` : "Confirm Upload"}
						</Button>
					</>
				) : (
					<>
						{error && (
							<p className="text-sm text-red-500 dark:text-red-400">{error}</p>
						)}
						<input
							type="file"
							accept=".eml"
							name="file"
							id="file"
							className="hidden"
							onChange={handleEmailFile}
						/>
						<label
							htmlFor="file"
							className="bg-brand-primary text-subtle-light px-12 py-3 hover:bg-border-subtle font-medium cursor-pointer rounded-lg inset-shadow-xs inset-shadow-blue-200"
						>
							Choose File
						</label>
					</>
				)}
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-[24ch] text-center">
					By continuing you agree to our Terms of Use
				</p>
			</div>
		</div>
	);
};

export default UploadEmail;
