import CreateNewPoll from "@/components/admin/CreatePollForm";
import ExistingPolls from "@/components/admin/ExistingPolls";

export default function AdminDashboard() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">
				Bus Ticket Poll Admin Dashboard
			</h1>
			<CreateNewPoll />
			<ExistingPolls />
		</div>
	);
}
