import PhishookLogo from "./components/shared/phishook";
import {useDarkModeContext} from "./contexts/darkmode-context";
import UploadOmniBar from "./components/email-omnibar";

function App() {
	const {darkMode} = useDarkModeContext();
	return (
		<>
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
		</>
	);
}

export default App;
