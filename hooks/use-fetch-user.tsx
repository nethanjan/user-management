// hooks/use-fetch-user.js
import { User } from "@/types/user";
import { useState, useEffect } from "react";

export const useFetchUser = (id: string) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`/api/users/${id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch user");
				}
				const data = await response.json();
				setUser(data.user);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (err) {
				setError("Failed to fetch user");
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [id]);

	return { user, loading, error };
};
