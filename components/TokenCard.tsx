interface TokenCardProps {
    pollName: string;
    chosenOption: string;
    date: Date; // Added a date prop
}

export function TokenCard({ pollName, chosenOption, date }: TokenCardProps) {
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 w-full sm:w-1/3">
            <h2 className="text-lg font-semibold">{pollName}</h2>
            <p className="text-sm text-gray-500 italic">You voted for:</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-bold">{chosenOption}</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Voted for: {new Date(date).toLocaleDateString()}</p> {/* Added date display */}
        </div>
    );
}
