"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	return (
		<nav className="bg-gray-800 h-full min-h-screen p-4">
			<ul className="space-y-4">
				{/* Home Page Link */}
				<li>
					<Link
						href="/"
						className={`block py-2 px-4 rounded-lg text-white font-semibold ${
							isActive("/") ? "bg-blue-500" : "hover:bg-gray-700"
						}`}
					>
						Home
					</Link>
				</li>

				<li>
					<Link
						href="/users"
						className={`block py-2 px-4 rounded-lg text-white font-semibold ${
							isActive("/users") ? "bg-blue-500" : "hover:bg-gray-700"
						}`}
					>
						Users
					</Link>
				</li>

				<li>
					<Link
						href="/users/add"
						className={`block py-2 px-4 rounded-lg text-white font-semibold ${
							isActive("/users/add") ? "bg-blue-500" : "hover:bg-gray-700"
						}`}
					>
						Add User
					</Link>
				</li>

				<li>
					<Link
						href="/analytics"
						className={`block py-2 px-4 rounded-lg text-white font-semibold ${
							isActive("/analytics") ? "bg-blue-500" : "hover:bg-gray-700"
						}`}
					>
						Analytics
					</Link>
				</li>
			</ul>
		</nav>
	);
}
