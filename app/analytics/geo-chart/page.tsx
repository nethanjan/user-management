"use client";

import React from "react";

import DefaultLayout from "@/components/layouts/default-layout";
import GeoMapChart from "@/features/charts/geo-map";
import ErrorView from "@/features/intermediate-views/error-view";
import LoadingView from "@/features/intermediate-views/loading-view";
import { useUsers } from "@/hooks/use-fetch-users";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { makeServer } from "@/utils/mirage-server";

if (process.env.NEXT_PUBLIC_ENV === "development") {
	makeServer();
}

export default function GeoChartPage() {
	useUsers();

	const { users, loading, error } = useAppSelector(
		(state: RootState) => state.users
	);

	if (loading) return <LoadingView />;
	if (error) return <ErrorView errorMessage={error} />;

	return (
		<DefaultLayout showSidebar={true}>
			<GeoMapChart users={users} />
		</DefaultLayout>
	);
}
