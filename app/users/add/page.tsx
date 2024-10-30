"use client";

import { useState } from "react";

import DefaultLayout from "@/components/layouts/default-layout";
import UserForm from "@/features/forms/user-form";
import { useCreateUser } from "@/hooks/use-create-user";
import { makeServer } from "@/utils/mirage-server";

if (process.env.NEXT_PUBLIC_ENV === "development") {
	makeServer();
}

export default function AddUser() {
	const { createUser, loading, error } = useCreateUser();
	const [messsage, setMessage] = useState("");

	const handleCreateUser = async (data: { name: string; email: string }) => {
		const result = await createUser(data);
		setMessage(result ? "User added successfully" : "Failed to add user");
	};

	return (
		<DefaultLayout showSidebar={true}>
			<div className="container max-w-screen-md mx-auto px-4 sm:px-6 py-6">
				<h1 className="text-2xl font-bold mb-4">Add New User</h1>

				<UserForm
					onSubmit={handleCreateUser}
					loading={loading}
					error={error}
					submitText="Add User"
				/>

				{messsage && (
					<p className={`mt-4 ${error ? "text-red-500" : "text-green-500"}`}>
						{messsage}
					</p>
				)}
			</div>
		</DefaultLayout>
	);
}
