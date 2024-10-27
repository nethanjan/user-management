"use client";

import { FormEvent, useState } from "react";
import DefaultLayout from "@/components/layouts/default-layout";
import { useCreateUser } from "@/hooks/use-create-user";
import { makeServer } from "@/utils/mirage-server";

if (process.env.NEXT_PUBLIC_ENV === "development") {
	makeServer();
}

export default function AddUser() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const { createUser, loading, error } = useCreateUser();
	const [messsage, setMessage] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name || !email) return;

		const userData = { name, email };

		const result = await createUser(userData);
		if (result) setMessage("User added successfully");
		if (error) setMessage("Failed to add user");
	};

	return (
		<DefaultLayout showSidebar={true}>
			<div className="container mx-auto py-6">
				<h1 className="text-2xl font-bold mb-4">Add New User</h1>
				<form onSubmit={handleSubmit} className="max-w-md mx-auto">
					<div className="mb-4">
						<label className="block mb-2" htmlFor="name">
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="border border-gray-300 px-4 py-2 rounded-lg w-full text-black"
							placeholder="Enter user's name"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="border border-gray-300 px-4 py-2 rounded-lg w-full text-black"
							placeholder="Enter user's email"
							required
						/>
					</div>

					{error && <p className="text-red-500 mb-4">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ${
							loading ? "opacity-50" : ""
						}`}
					>
						{loading ? "Adding..." : "Add User"}
					</button>

					{messsage && (
						<p className={`mt-4 ${error ? "text-red-500" : "text-green-500"}`}>
							{messsage}
						</p>
					)}
				</form>
			</div>
		</DefaultLayout>
	);
}
