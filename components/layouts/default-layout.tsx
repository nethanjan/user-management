"use client";

import { useState } from "react";

import Footer from "../footer/footer";
import Header from "../header/header";
import Sidebar from "../navigation/side-navigation";
import TopNavigation from "../navigation/top-navigation";

export default function DefaultLayout({
	children,
	showSidebar,
}: Readonly<{
	showSidebar: boolean;
	children: React.ReactNode;
}>) {
	const [showMobileNav, setShowMobileNav] = useState(false);

	return (
		<div className="w-full flex h-svh max-h-svh">
			{showSidebar && (
				<div className="hidden h-full flex-[0.3] lg:flex-[0.2] md:block">
					<Sidebar />
				</div>
			)}

			<div className={`h-full flex-1`}>
				<div className="flex h-full flex-col justify-between overflow-y-scroll">
					<Header />

					{showSidebar && (
						<div className="md:hidden pl-4">
							<button
								onClick={() => setShowMobileNav(!showMobileNav)}
								className="text-white bg-blue-500 px-4 py-2 rounded-md"
							>
								{showMobileNav ? "Close Menu" : "Open Menu"}
							</button>
						</div>
					)}

					{/* Mobile Navigation Menu */}
					{showMobileNav && showSidebar && <TopNavigation />}

					<main className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-6 md:space-y-0 p-4">
						{children}
					</main>
					<Footer />
				</div>
			</div>
		</div>
	);
}
