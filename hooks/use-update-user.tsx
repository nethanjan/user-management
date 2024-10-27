// hooks/use-update-user.js
import { User } from "@/types/user";
import { useState } from "react";

export const useUpdateUser = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateUser = async (id: string, userData: Partial<User>) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/users/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error("Failed to update user");
			}

			const updatedUser = await response.json();
			setLoading(false);
			return updatedUser;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			setLoading(false);
			setError("Failed to update user");
		}
	};

	return { updateUser, loading, error };
};
