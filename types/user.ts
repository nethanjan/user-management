export type User = {
	id: string;
	name: string;
	age: number;
	email: string;
	country: string;
	department: "Engineering" | "Marketing" | "Sales" | "HR";
};

export type UserFormProps = {
	initialData?: { name: string; email: string };
	onSubmit: (data: { name: string; email: string }) => Promise<void>;
	loading: boolean;
	error: string | null;
	submitText: string;
};

export interface UserDataProps {
	users: User[];
}
