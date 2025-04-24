import Header from "./components/ui/header";
import Toaster from "./components/ui/toaster";
import Footer from "./components/ui/footer";
import PhishookLogo from "./components/shared/phishook";

import {useDarkMode} from "./hooks/use-dark-mode";
import UploadOmniBar from "./components/email-omnibar";

function App() {
	const [darkMode] = useDarkMode();
	return (
		<div className="font-rubik bg-brand-body dark:bg-surface-primary min-h-screen h-full text-text_para transition-colors">
			<Header />
			<Toaster />
			<main
				style={{height: "calc(100vh - 140px)"}}
				className="flex flex-col items-center justify-center mb-6 mt-10"
			>
				<div className="flex items-center gap-2 lg:gap-4">
					<div className="w-14 lg:w-28 aspect-sqaure text-brand-primary dark:text-brand-light">
						{darkMode ? <PhishookLogo /> : <PhishookLogo onlight />}
					</div>
					<p className="text-[32px] lg:text-[72px] tracking-tighter uppercase text-brand-primary dark:text-brand-light">
						phishook
					</p>
				</div>
				<p className="text-sm lg:text-base text-surface-primary dark:text-brand-body max-w-prose text-center mt-2 mb-3 lg:mb-6">
					Analyze suspicious emails, flag threats, and reduce false positives,
					without compromising speed or clarity.
				</p>
				<UploadOmniBar />
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-prose text-center mt-4">
					By uploading an email, you agree that it may be used to improve our
					detection system. Avoid uploading sensitive or personal information if
					you do not consent.
				</p>
			</main>
			<Footer />
		</div>
	);
}

export default App;
