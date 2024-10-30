import { UserFormProps } from "@/types/user";
import { FormEvent, useState, useEffect, useRef } from "react";

export default function UserForm({
	initialData = { name: "", email: "" },
	onSubmit,
	loading,
	error,
	submitText,
}: UserFormProps) {
	const [formData, setFormData] = useState(initialData);
	const initialDataRef = useRef(initialData);

	useEffect(() => {
		// Only update formData if initialData has changed
		if (
			initialData &&
			(initialData.name !== initialDataRef.current.name ||
				initialData.email !== initialDataRef.current.email)
		) {
			setFormData(initialData);
			initialDataRef.current = initialData;
		}
	}, [initialData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [id]: value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (formData.name && formData.email) {
			await onSubmit(formData);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full md:w-1/2 max-w-full mx-auto px-4"
		>
			<div className="mb-4">
				<label className="block mb-2" htmlFor="name">
					Name
				</label>
				<input
					type="text"
					id="name"
					value={formData.name}
					onChange={handleChange}
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
					value={formData.email}
					onChange={handleChange}
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
				{loading ? "Processing..." : submitText}
			</button>
		</form>
	);
}
