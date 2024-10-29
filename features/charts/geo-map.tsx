import { Mercator } from "@visx/geo";
import { FeatureCollection, Geometry } from "geojson";
import React, { useMemo } from "react";

import useResizeObserver from "@/hooks/use-resize-observer";
import { UserDataProps } from "@/types/user";

import worldGeoJson from "./geo.json";

const worldGeoData = worldGeoJson as FeatureCollection<Geometry>;

const GeoMapChart = ({ users }: UserDataProps) => {
	const { refCallback, width } = useResizeObserver<HTMLDivElement>();

	const userCountryData = useMemo(() => {
		return users.reduce((acc: Record<string, number>, user) => {
			acc[user.country] = (acc[user.country] || 0) + 1;
			return acc;
		}, {});
	}, [users]);

	// Determine the maximum user count for color scaling
	const maxUserCount = Math.max(...Object.values(userCountryData), 1);

	// Color scale for user count
	const colorScale = (userCount: number, maxUserCount: number) =>
		`rgba(93, 217, 4, ${0.1 + (0.9 * userCount) / maxUserCount})`;

	return (
		<div ref={refCallback} className="relative w-full h-full">
			<svg width={width} height={width}>
				<Mercator
					data={worldGeoData.features}
					fitExtent={[
						[
							[0, 0],
							[width, width],
						],
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						worldGeoData as any,
					]}
				>
					{(mercator) =>
						mercator.features.map(({ feature, path }) => {
							const countryName = feature?.properties?.name;
							const userCount = userCountryData[countryName] || 0;
							return (
								<path
									key={countryName}
									d={path ?? undefined}
									fill={
										userCount ? colorScale(userCount, maxUserCount) : "#89CFF0"
									}
									stroke="#000"
									strokeWidth={1}
									aria-label={
										userCount
											? `${countryName} with ${userCount} users`
											: `${countryName} without users`
									}
								/>
							);
						})
					}
				</Mercator>
			</svg>
		</div>
	);
};

export default GeoMapChart;
