"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import DefaultLayout from "@/components/layouts/default-layout";
import { useFetchUser } from "@/hooks/use-fetch-user";
import { useUpdateUser } from "@/hooks/use-update-user";
import { makeServer } from "@/utils/mirage-server";

if (process.env.NEXT_PUBLIC_ENV === "development") {
	makeServer();
}

export default function EditUser() {
	const params = useParams<{ id: string }>();
	const router = useRouter();

	const {
		user,
		loading: loadingUser,
		error: userError,
	} = useFetchUser(params.id);
	const { updateUser, loading: updating, error: updateError } = useUpdateUser();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const updatedData = { name, email };
		const updatedUser = await updateUser(params.id, updatedData);

		if (updatedUser) {
			alert("User updated successfully");
			router.push("/users"); // Redirect back to users list
		}
	};

	if (loadingUser) {
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

	if (userError) {
		return (
			<DefaultLayout showSidebar={true}>
				<div className="container mx-auto py-6">
					<div className="flex justify-center items-center py-10">
						<p className="text-red-500">{userError}</p>
					</div>
				</div>
			</DefaultLayout>
		);
	}

	return (
		<DefaultLayout showSidebar={true}>
			<div className="container mx-auto py-6">
				<h1 className="text-2xl font-bold mb-4">Edit User</h1>
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
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block  mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="border border-gray-300 px-4 py-2 rounded-lg w-full text-black"
							required
						/>
					</div>

					{updateError && <p className="text-red-500 mb-4">{updateError}</p>}

					<button
						type="submit"
						disabled={updating}
						className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ${
							updating ? "opacity-50" : ""
						}`}
					>
						{updating ? "Updating..." : "Update User"}
					</button>
				</form>
			</div>
		</DefaultLayout>
	);
}
