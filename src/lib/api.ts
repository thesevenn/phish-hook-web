import {Dispatch, SetStateAction} from "react";
import {AnalysisResponseType} from "./types/results.type";

const getApiStatus = async () => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/api/status`, {
		headers: {"Access-Allow-Origin": import.meta.env.VITE_API_URL},
	});
	return response;
};

const uploadFileAnalyze = async (
	formData: FormData
): Promise<AnalysisResponseType | null> => {
	// await new Promise(resolve => setTimeout(resolve, 3000));
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/analyze`,
			{
				method: "POST",
				headers: {
					"X-API-KEY": import.meta.env.VITE_API_KEY,
					"Access-Allow-Origin": import.meta.env.VITE_API_URL,
				},
				body: formData,
			}
		);
		return response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
};

// with progress when file are larger
const analyzeEmail = async (
	path: string,
	formData: FormData,
	setState?: Dispatch<SetStateAction<number>>
) => {
	const xhr = new XMLHttpRequest();
	const promise = new Promise((resolve, reject) => {
		xhr.upload.onprogress = event => {
			if (event.lengthComputable) {
				const progress = event.loaded / event.total;
				console.log(`Progress: ${progress * 100}`);
				if (setState) setState(Math.round(progress * 100));
			}
		};

		xhr.onerror = () => reject("Error occured during upload");
		xhr.open("POST", `${import.meta.env.VITE_API_URL}${path}`);
		xhr.responseType = "json";
		xhr.setRequestHeader("X-API-KEY", import.meta.env.VITE_API_KEY);
		xhr.setRequestHeader("Access-Allow-Origin", import.meta.env.VITE_API_URL);
		xhr.onload = () => {
			if (xhr.status == 200) {
				// reject(xhr);
				resolve(xhr.response);
			} else {
				reject(xhr.status);
			}
		};
		xhr.send(formData);
	});

	xhr.onerror = () => {
		console.log("Error");
	};
	xhr.onloadend = () => {
		console.log("Loaded");
	};

	return promise;
};

export {getApiStatus, analyzeEmail, uploadFileAnalyze};
