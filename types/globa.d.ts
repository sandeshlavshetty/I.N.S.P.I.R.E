interface Poll {
	_id: number;
	name: string;
	timings: string[];
	status: "pending" | "active" | "ended";
	votes: { [key: string]: number };
	date: Date | undefined;
}
