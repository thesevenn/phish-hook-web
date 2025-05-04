import {useCallback} from "react";

interface DownloadHookOptionsType {
	dataHandler: (...args: any) => string | Blob;
	filename?: string;
}
const useDownload = ({
	dataHandler,
	filename = "download.txt",
}: DownloadHookOptionsType) => {
	const downloader = useCallback(
		(...args: any) => {
			const data = dataHandler(...args);
			let url: string;
			if (typeof data == "string") {
				url = data;
			} else if (data instanceof Blob) {
				url = URL.createObjectURL(data);
			} else {
				throw new Error(
					"Invalid type returned from dataHanlder: only string or Blob type accepted"
				);
			}
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = filename;
			anchor.style.display = "none";
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);

			if (data instanceof Blob) {
				URL.revokeObjectURL(url);
			}
		},
		[filename, dataHandler]
	);
	return downloader;
};
export {useDownload};
