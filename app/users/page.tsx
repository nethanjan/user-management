"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AddIcon from "@/components/icons/add";
import DefaultLayout from "@/components/layouts/default-layout";
import ErrorView from "@/features/intermediate-views/error-view";
import LoadingView from "@/features/intermediate-views/loading-view";
import UsersTable from "@/features/tables/table";
import { useUsers } from "@/hooks/use-fetch-users";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { makeServer } from "@/utils/mirage-server";

if (process.env.NEXT_PUBLIC_ENV === "development") {
	makeServer();
}

export default function Users() {
	const [filterName, setFilterName] = useState("");
	const [filterEmail, setFilterEmail] = useState("");
	const router = useRouter();
	useUsers();

	const { users, loading, error } = useAppSelector(
		(state: RootState) => state.users
	);

	if (loading) return <LoadingView />;
	if (error) return <ErrorView errorMessage={error} />;

	const filteredUsers = users
		.filter((user) =>
			user.name.toLowerCase().includes(filterName.toLowerCase())
		)
		.filter((user) =>
			user.email.toLowerCase().includes(filterEmail.toLowerCase())
		);

	const handleAddUser = () => router.push("/users/add");

	return (
		<DefaultLayout showSidebar={true}>
			<div className="container mx-auto py-6">
				<h1 className="text-2xl font-bold mb-4">Users List</h1>
				<div className="flex justify-center items-center mb-4">
					<input
						type="text"
						placeholder="Search by name"
						value={filterName}
						onChange={(e) => setFilterName(e.target.value)}
						className="border border-gray-300 px-4 py-2 mr-4 rounded-lg w-full text-black max-w-xs"
					/>
					<input
						type="text"
						placeholder="Search by email"
						value={filterEmail}
						onChange={(e) => setFilterEmail(e.target.value)}
						className="border border-gray-300 px-4 py-2 mr-4 rounded-lg w-full text-black max-w-xs"
					/>
					<button
						type="button"
						onClick={handleAddUser}
						className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
					>
						<span className="hidden lg:inline">Add User</span>
						<span className="inline lg:hidden">
							<AddIcon />
						</span>
					</button>
				</div>

				<UsersTable usersData={filteredUsers} />
			</div>
		</DefaultLayout>
	);
}
