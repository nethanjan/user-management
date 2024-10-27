"use client";

import DefaultLayout from "@/components/layouts/default-layout";
import UsersTable from "@/features/users/table";
import { useUsers } from "@/hooks/use-users";
import { makeServer } from "@/utils/mirage-server";
import { useState } from "react";

if (process.env.NEXT_PUBLIC_ENV === "development") {
	makeServer();
}

export default function Users() {
	const { users, loading, error } = useUsers();
	const [filterName, setFilterName] = useState("");
	const [filterEmail, setFilterEmail] = useState("");

	if (loading) {
		return (
			<DefaultLayout showSidebar={true}>
				<div className="container mx-auto py-6">
					<div className="flex justify-center items-center py-10">
						<div
							data-testid="loading-spinner"
							className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"
						></div>
					</div>
				</div>
			</DefaultLayout>
		);
	}

	if (error) {
		return (
			<DefaultLayout showSidebar={true}>
				<div className="container mx-auto py-6">
					<div className="flex justify-center items-center py-10">
						<p className="text-red-500">{error}</p>
					</div>
				</div>
			</DefaultLayout>
		);
	}

	const filteredUsers = users
		.filter((user) =>
			user.name.toLowerCase().includes(filterName.toLowerCase())
		)
		.filter((user) =>
			user.email.toLowerCase().includes(filterEmail.toLowerCase())
		);

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
						onClick={() => alert("Add user clicked")}
						className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
					>
						<span className="hidden lg:inline">Add User</span>
						<span className="inline lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								width="24px"
								height="24px"
							>
								<path d="M19 11H13V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5V11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13H11V19C11 19.55 11.45 20 12 20C12.55 20 13 19.55 13 19V13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" />
							</svg>
						</span>
					</button>
				</div>
				<UsersTable usersData={filteredUsers} />
			</div>
		</DefaultLayout>
	);
}
