import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const useDarkMode = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
	const [darkMode, setDarkMode] = useState<boolean>(() => {
		return localStorage.getItem("mode") === "dark"
			? true
			: false || window.matchMedia("(prefers-color-scheme:dark)").matches;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		if (darkMode) {
			root.classList.add("dark");
			localStorage.setItem("mode", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("mode", "light");
		}
	}, [darkMode]);

	return [darkMode, setDarkMode];
};
