import Header from "./components/ui/header";
import Toaster from "./components/ui/toaster";
import Footer from "./components/ui/footer";
import PhishookLogo from "./components/shared/phishook";

import {useDarkMode} from "./hooks/use-dark-mode";
import UploadOmniBar from "./components/email-omnibar";

function App() {
	const [darkMode] = useDarkMode();
	return (
		<div className="font-rubik bg-brand-body dark:bg-surface-primary max-h-screen h-dvh text-text_para transition-colors">
			<Header />
			<Toaster />
			<main className="w-full h-full flex flex-col items-center p-4">
				<div className="flex items-center gap-2 lg:gap-4 mt-6 lg:mt-16">
					<div className="w-14 lg:w-28 aspect-sqaure text-brand-primary dark:text-brand-light">
						{darkMode ? <PhishookLogo /> : <PhishookLogo onlight />}
					</div>
					<p className="text-[32px] lg:text-[72px] tracking-tighter uppercase text-brand-primary dark:text-brand-light">
						phish hook
					</p>
				</div>
				<p className="text-sm lg:text-base text-surface-primary dark:text-brand-body max-w-prose text-center mt-4 mb-4 lg:mb-10">
					Analyze suspicious emails, flag threats, and reduce false positives,
					without compromising speed or clarity.
				</p>
				<UploadOmniBar />
				<p className="text-xs lg:text-sm text-surface-primary dark:text-brand-body max-w-prose text-center mt-6">
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
