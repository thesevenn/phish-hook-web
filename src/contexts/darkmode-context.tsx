import {
	FC,
	Dispatch,
	ReactNode,
	useContext,
	createContext,
	SetStateAction,
} from "react";

import {useDarkMode} from "@/hooks/use-darkmode";

interface DarkModeContextType {
	darkMode: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
}
const DarkModeContext = createContext<DarkModeContextType | undefined>(
	undefined
);

const DarkModeProvider: FC<{children: ReactNode}> = ({children}) => {
	const [darkMode, setDarkMode] = useDarkMode();

	return (
		<DarkModeContext.Provider value={{darkMode, setDarkMode}}>
			{children}
		</DarkModeContext.Provider>
	);
};

const useDarkModeContext = () => {
	const context = useContext(DarkModeContext);
	if (context == undefined) {
		throw new Error("useDarkMode must be used within a DarkModeProvider");
	}
	return context;
};
export {useDarkModeContext, DarkModeProvider};
