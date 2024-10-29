import Link from "next/link";
import { useState } from "react";
import ReactPaginate from "react-paginate";

import { User } from "@/types/user";

import styles from "./pagination.module.css";

interface UsersTableProps {
	usersData: User[];
}

// To fix the eslint error, add the prop types for the UsersTable component
// eslint-disable-next-line react/prop-types
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
		<div>
			<table className="min-w-full w-full bg-white shadow-md rounded-lg overflow-hidden">
				<thead className="bg-gray-100 text-black">
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
						<th className="text-left py-2 px-4 font-medium text-gray-600 cursor-pointer">
							Country
						</th>
					</tr>
				</thead>
				<tbody>
					{currentUsers.map((user) => (
						<tr key={user.id} className="border-b text-black">
							<td className="py-2 px-4">
								<Link href={`/users/edit/${user.id}`}>{user.id}</Link>
							</td>
							<td className="py-2 px-4">
								<Link href={`/users/edit/${user.id}`}>{user.name}</Link>
							</td>
							<td className="py-2 px-4">
								<Link href={`/users/edit/${user.id}`}>{user.email}</Link>
							</td>
							<td className="py-2 px-4">{user.country}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="w-full mt-4 flex justify-center">
				<ReactPaginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					breakLabel={"..."}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={3}
					onPageChange={handlePageClick}
					containerClassName={styles.paginationContainer}
					pageClassName={styles.pageItem}
					previousClassName={styles.previousItem}
					nextClassName={styles.nextItem}
					activeClassName={styles.activePage}
					disabledClassName={styles.disabledPage}
				/>
			</div>
		</div>
	);
};

export default UsersTable;
