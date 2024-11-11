import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Home() {
	return (
		<>
			<div className="flex flex-col justify-center items-center h-screen">
				<h1>Welcome to INSPIRE</h1>
				<Link href={"/poll"} className="p-6">
					<Button>
						Get Started
						<MoveRight />
					</Button>
				</Link>
			</div>
		</>
	);
}
