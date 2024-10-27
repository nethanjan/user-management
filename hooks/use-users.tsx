import { User } from "@/types/user";
import { useState, useEffect } from "react";

export function useUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	useEffect(() => {
		fetch("/api/users")
			.then((response) => response.json())
			.then((json) => setUsers(json.users))
			.catch(() => setError("Failed to fetch users"))
			.finally(() => setLoading(false));
	}, []);

	return { users, loading, error };
}
