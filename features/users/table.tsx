import { User } from "@/types/user";
import { useState } from "react";
import ReactPaginate from "react-paginate";

interface UsersTableProps {
	usersData: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ usersData }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof User;
		direction: "ascending" | "descending";
	} | null>(null);
	const usersPerPage = 10;

	const sortedUsers = [...usersData].sort((a, b) => {
		if (sortConfig !== null) {
			if (a[sortConfig.key] < b[sortConfig.key]) {
				return sortConfig.direction === "ascending" ? -1 : 1;
			}
			if (a[sortConfig.key] > b[sortConfig.key]) {
				return sortConfig.direction === "ascending" ? 1 : -1;
			}
		}
		return 0;
	});

	const offset = currentPage * usersPerPage;
	const currentUsers = sortedUsers.length
		? sortedUsers.slice(offset, offset + usersPerPage)
		: [];
	const pageCount = Math.ceil(sortedUsers.length / usersPerPage);

	const handlePageClick = ({ selected }: { selected: number }) => {
		setCurrentPage(selected);
	};

	const requestSort = (key: keyof User) => {
		let direction: "ascending" | "descending" = "ascending";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
		) {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const getSortIndicator = (key: keyof User) => {
		if (!sortConfig || sortConfig.key !== key) {
			return null;
		}
		return sortConfig.direction === "ascending" ? "▲" : "▼";
	};

	return (
		<>
			<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
				<thead className="bg-gray-100">
					<tr>
						<th className="text-left py-2 px-4 font-medium text-gray-600">
							ID
						</th>
						<th
							className="text-left py-2 px-4 font-medium text-gray-600 cursor-pointer"
							onClick={() => requestSort("name")}
						>
							Name {getSortIndicator("name")}
						</th>
						<th
							className="text-left py-2 px-4 font-medium text-gray-600 cursor-pointer"
							onClick={() => requestSort("email")}
						>
							Email {getSortIndicator("email")}
						</th>
					</tr>
				</thead>
				<tbody>
					{currentUsers.map((user) => (
						<tr key={user.id} className="border-b text-black">
							<td className="py-2 px-4">{user.id}</td>
							<td className="py-2 px-4">{user.name}</td>
							<td className="py-2 px-4">{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<ReactPaginate
				previousLabel={"Previous"}
				nextLabel={"Next"}
				breakLabel={"..."}
				pageCount={pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={handlePageClick}
				containerClassName={"flex justify-center items-center mt-6"}
				pageClassName={"mx-2 px-3 py-1 rounded-md border border-gray-300"}
				previousClassName={"mx-2 px-3 py-1 rounded-md border border-gray-300"}
				nextClassName={"mx-2 px-3 py-1 rounded-md border border-gray-300"}
				activeClassName={"bg-blue-500 text-white"}
				disabledClassName={"text-gray-400 cursor-not-allowed"}
			/>
		</>
	);
};

export default UsersTable;
