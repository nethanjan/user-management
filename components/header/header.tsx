import Link from "next/link";

import Heart from "../icons/heart";

export default function Header() {
	return (
		<header className="sticky top-0 w-full">
			<div className="bg-blue-800 py-8 flex justify-center items-center">
				<Link href="/" className="flex items-center">
					<Heart aria-label="Heart logo" role="img" />
					<h1 className="text-center text-4xl font-bold text-white uppercase tracking-wide">
						Heartpace
					</h1>
				</Link>
			</div>
		</header>
	);
}
