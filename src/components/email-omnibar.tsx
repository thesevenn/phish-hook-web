import {FC} from "react";

import UploadEmail from "./upload-email";
import PasteEmail from "./paste-email";
import {Separator} from "@radix-ui/react-separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

interface PropType {}
const UploadOmniBar: FC<PropType> = () => {
	return (
		<div className="max-w-[690px] max-h-[380px] w-full h-full bg-white dark:bg-surface-card-dark rounded-xl border-[1px] border-brand-subtle/50 dark:border-border-subtle/30">
			<Tabs defaultValue="file" className="w-full h-full p-5 lg:pt-7 lg:px-14">
				<TabsList className="w-full border-b-border-subtle/40 border-b-[1px] bg-transparent border-solid rounded-none p-0">
					<TabsTrigger value="file">File</TabsTrigger>
					<Separator
						orientation="vertical"
						className="h-4 w-[1px] bg-border-subtle/40 dark:bg-border-subtle/40"
					/>
					<TabsTrigger value="raw">Raw</TabsTrigger>
				</TabsList>
				<TabsContent value="file" className="">
					<UploadEmail />
				</TabsContent>
				<TabsContent value="raw">
					<PasteEmail />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default UploadOmniBar;
