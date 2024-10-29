import CardLink from "@/components/card/card-link";
import DefaultLayout from "@/components/layouts/default-layout";

const analyticsLinks = [
	{ href: "/analytics/bar-chart", text: "Age" },
	{ href: "/analytics/pie-chart", text: "Departments" },
	{ href: "/analytics/geo-chart", text: "Geo Map" },
];

export default function Analytics() {
	return (
		<DefaultLayout showSidebar={true}>
			{analyticsLinks.map((link) => (
				<CardLink key={link.href} href={link.href} text={link.text} />
			))}
		</DefaultLayout>
	);
}
