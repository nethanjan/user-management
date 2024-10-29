import Link from "next/link";

type CardLinkProps = {
	href: string;
	text: string;
};

export default function CardLink({ href, text }: CardLinkProps) {
	return (
		<div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 h-32 m:h-42 lg:h-48 flex justify-center items-center">
			<Link
				href={href}
				className="text-blue-800 text-2xl font-bold hover:underline block text-center focus:outline-none focus-visible:outline focus-visible:outline-blue-500"
			>
				{text}
			</Link>
		</div>
	);
}
