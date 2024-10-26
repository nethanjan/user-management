import Header from "../header/header";
import Footer from "../footer/footer";

export default function DefaultLayout({
	children,
	showSidebar,
}: Readonly<{
	showSidebar: boolean;
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full flex h-svh max-h-svh">
			{/* Conditionally render left sidebar */}
			{showSidebar && (
				<div className="hidden h-full flex-[0.3] lg:flex-[0.2] md:block">
					<div className="grid h-full place-content-center bg-blue-400">
						<h1 className="text-xl">Left</h1>
						<h2 className="text-xl">Sidebar</h2>
					</div>
				</div>
			)}

			<div className={`h-full flex-1`}>
				<div className="flex h-full flex-col justify-between overflow-y-scroll">
					<Header />
					<main className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-6 md:space-y-0 p-4">
						{children}
					</main>
					<Footer />
				</div>
			</div>
		</div>
	);
}
