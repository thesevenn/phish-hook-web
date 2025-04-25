import {render, screen} from "@testing-library/react";
import {test, expect} from "vitest";
import "@testing-library/jest-dom";

import APIStatus from "./api-status";

test("Status component is rendered", async () => {
	render(<APIStatus />);
	expect(await screen.findByText("Status")).toBeInTheDocument();
});
