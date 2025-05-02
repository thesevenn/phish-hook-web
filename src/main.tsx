import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import Verdict from "./components/verdict.tsx";
import Layout from "./layout.tsx";
import {Tooltip} from "@/components/ui/tooltip";
import {DarkModeProvider} from "./contexts/darkmode-context.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<Tooltip>
					<BrowserRouter>
						<Routes>
							<Route element={<Layout />}>
								<Route path="/" element={<Navigate to="/upload" />} />
								<Route index path="/upload" element={<App />} />
								<Route path="/verdict" element={<Verdict />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</Tooltip>
			</QueryClientProvider>
		</DarkModeProvider>
	</StrictMode>
);
