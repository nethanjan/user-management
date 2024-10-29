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
					<ul className="ml-4 mt-2 space-y-2">
						<li>
							<Link
								href="/users/add"
								className={`block py-2 px-4 rounded-lg text-white ${
									isActive("/users/add") ? "bg-blue-500" : "hover:bg-gray-700"
								}`}
							>
								Add User
							</Link>
						</li>
					</ul>
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
					<ul className="ml-4 mt-2 space-y-2">
						<li>
							<Link
								href="/analytics/bar-chart"
								className={`block py-2 px-4 rounded-lg text-white ${
									isActive("/analytics/bar-chart")
										? "bg-blue-500"
										: "hover:bg-gray-700"
								}`}
							>
								Bar Chart
							</Link>
						</li>
						<li>
							<Link
								href="/analytics/pie-chart"
								className={`block py-2 px-4 rounded-lg text-white ${
									isActive("/analytics/pie-chart")
										? "bg-blue-500"
										: "hover:bg-gray-700"
								}`}
							>
								Pie Chart
							</Link>
						</li>
						<li>
							<Link
								href="/analytics/geo-chart"
								className={`block py-2 px-4 rounded-lg text-white ${
									isActive("/analytics/geo-chart")
										? "bg-blue-500"
										: "hover:bg-gray-700"
								}`}
							>
								Geo Chart
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
}
