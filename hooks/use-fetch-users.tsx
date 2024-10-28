import { User } from "@/types/user";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook";
import { setUsers } from "@/store/slices/user.slice";

export function useUsers() {
	const dispatch = useAppDispatch();

	let users: User[] = [];
	let loading = true;
	let error: null | string = null;

	useEffect(() => {
		fetch("/api/users")
			.then((response) => response.json())
			.then((json) => (users = json.users))
			.catch(() => (error = "Failed to fetch users"))
			.finally(() => {
				loading = false;
				dispatch(
					setUsers({
						users,
						loading,
						error,
					})
				);
			});
	}, [dispatch]);
}
