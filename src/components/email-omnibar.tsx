import {FC} from "react";

import UploadEmail from "./upload-email";
import PasteEmail from "./paste-email";
import {Separator} from "@radix-ui/react-separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Card from "./ui/card";

interface PropType {}
const UploadOmniBar: FC<PropType> = () => {
	return (
		<Card className="">
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
		</Card>
	);
};

export default UploadOmniBar;
