import {Dispatch, SetStateAction} from "react";

const getApiStatus = async () => {
	const response = await fetch("https://api-phishook.onrender.com/api/status");
	return response;
};

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
		xhr.setRequestHeader("Access-Allow-Origin", "http://localhost:8000");
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

export {getApiStatus, analyzeEmail};
