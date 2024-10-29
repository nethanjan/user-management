import CardLink from "@/components/card/card-link";
import DefaultLayout from "@/components/layouts/default-layout";

export default function Home() {
	return (
		<DefaultLayout showSidebar={false}>
			<CardLink href="/users" text="Go to Users" />
			<CardLink href="/analytics" text="Go to Analytics" />
		</DefaultLayout>
	);
}
