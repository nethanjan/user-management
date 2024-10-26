import Link from "next/link";

import DefaultLayout from "@/components/layouts/default-layout";

export default function Home() {
	return (
		<DefaultLayout showSidebar={false}>
			<div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 h-32 m:h-42 lg:h-48 flex justify-center items-center">
				<Link
					href="/users"
					className="text-blue-800 text-2xl font-bold hover:underline block text-center focus:outline-none focus-visible:outline focus-visible:outline-blue-500"
				>
					Go to Users
				</Link>
			</div>
			<div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 h-32 m:h-42 lg:h-48 flex justify-center items-center">
				<Link
					href="/analytics"
					className="text-blue-800 text-2xl font-bold hover:underline block text-center focus:outline-none focus-visible:outline focus-visible:outline-blue-500"
				>
					Go to Analytics
				</Link>
			</div>
		</DefaultLayout>
	);
}
