import {FC} from "react";

import {CircleCheck} from "lucide-react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {Separator} from "@/components/ui/separator";
import {titleCase, formatClue} from "@/lib/utils";

const FeatureResult: FC<{
	label: string;
	content: React.ReactNode;
	numOfClues: number;
}> = ({label, content, numOfClues}) => {
	return (
		<Accordion
			type="single"
			collapsible
			className="px-4 dark:bg-ring-default bg-subtle-light rounded-xl"
		>
			<AccordionItem value="item-1">
				<AccordionTrigger
					hint={`${numOfClues} Issue${numOfClues > 1 ? "s" : ""} found`}
					className="text-sm text-surface-primary dark:text-brand-body font-normal"
				>
					{titleCase(label)}
				</AccordionTrigger>
				<AccordionContent>
					<Separator className="bg-gray-300 dark:bg-gray-700" />
					{content}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

const FeatureAnalysisClean: FC<{label: string}> = ({label}) => {
	return (
		<div className="dark:bg-ring-default bg-subtle-light rounded-xl px-4 py-4 flex w-full justify-between items-center">
			<p className="text-sm text-surface-primary dark:text-brand-body max-w-prose ">
				{titleCase(label)}
			</p>
			<p className="flex items-center gap-2 leading-0">
				<CircleCheck size={20} className="text-status-success" />
				<span className="text-xs text-border-subtle dark:text-brand-muted">
					CLEAN
				</span>{" "}
			</p>
		</div>
	);
};

const FeatureResultDetail: FC<{
	clues: Array<{[key: string]: string}>;
	preview: string;
	name: string;
}> = ({clues, preview, name}) => {
	return (
		<div className="py-2">
			<dl className="">
				<dt className="dark:bg-surface-card-dark bg-brand-subtle text-surface-primary dark:text-subtle-light px-2 py-1 rounded-md inline-block">
					Preview: {titleCase(name)}
				</dt>
				<dd className="text-border-subtle dark:text-brand-subtle ">
					{preview}
					{name == "body" && "..."}
				</dd>
			</dl>
			<Separator className="mt-2 bg-gray-300 dark:bg-gray-700" />
			<div className="py-2">
				<p className="text-surface-primary  dark:text-subtle-light">
					We found these suspicious items in {name}
				</p>
				<Separator className="my-2 bg-gray-300 dark:bg-gray-700" />
				{clues.map(clue => {
					const formattedClue = formatClue(clue);
					return (
						<dl className="pb-2">
							<dt className="dark:bg-surface-card-dark bg-brand-subtle text-surface-primary dark:text-subtle-light p-1 rounded-md inline-block">
								{formattedClue[0]}
							</dt>
							<dd className="inline pl-2 text-border-subtle dark:text-brand-subtle">
								{formattedClue[1]}
							</dd>
						</dl>
					);
				})}
			</div>
		</div>
	);
};

export {FeatureResult, FeatureAnalysisClean, FeatureResultDetail};
