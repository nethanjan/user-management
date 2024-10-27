import { User } from "@/types/user";
import { useState } from "react";

export const useCreateUser = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createUser = async (userData: Partial<User>) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error("Failed to create user");
			}

			const data = await response.json();
			setLoading(false);
			return data;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			// console.log(error);
			setError("Failed to create user");
			setLoading(false);
		}
	};

	return { createUser, loading, error };
};
