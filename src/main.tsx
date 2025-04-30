import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import {BrowserRouter, Routes, Route, Navigate} from "react-router";

import "./index.css";
import App from "./App.tsx";
import Verdict from "./components/verdict.tsx";
import Layout from "./layout.tsx";
import {Tooltip} from "@/components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
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
	</StrictMode>
);
