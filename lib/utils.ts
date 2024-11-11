import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateTimeOptions = () => {
	const options = [];
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			options.push(
				`${hour.toString().padStart(2, "0")}:${minute
					.toString()
					.padStart(2, "0")}`
			);
		}
	}
	return options;
};
