"use client";

import { useParams, useRouter } from "next/navigation";

import DefaultLayout from "@/components/layouts/default-layout";
import UserForm from "@/features/forms/user-form";
import ErrorView from "@/features/intermediate-views/error-view";
import LoadingView from "@/features/intermediate-views/loading-view";
import { useFetchUser } from "@/hooks/use-fetch-user";
import { useUpdateUser } from "@/hooks/use-update-user";
import { makeServer } from "@/utils/mirage-server";

if (process.env.NEXT_PUBLIC_ENV === "development") {
	makeServer();
}

export default function EditUser() {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();

	const {
		user,
		loading: loadingUser,
		error: userError,
	} = useFetchUser(id);
	const { updateUser, loading: updating, error: updateError } = useUpdateUser();

	const handleUpdateUser = async (data: { name: string; email: string }) => {
		const updatedUser = await updateUser(id, data);
		if (updatedUser) {
			alert("User updated successfully");
			router.push("/users");
		}
	};

	if (loadingUser) return <LoadingView />;
	if (userError) return <ErrorView errorMessage={userError} />;

	return (
		<DefaultLayout showSidebar={true}>
			<div className="container mx-auto py-6">
				<h1 className="text-2xl font-bold mb-4">Edit User</h1>
				<UserForm
					initialData={user ? { name: user.name, email: user.email } : undefined}
					onSubmit={handleUpdateUser}
					loading={updating}
					error={updateError}
					submitText="Update User"
				/>
			</div>
		</DefaultLayout>
	);
}
