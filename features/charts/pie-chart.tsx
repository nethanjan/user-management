import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import React, { useMemo } from "react";

import { UserDataProps } from "@/types/user";

const width = 400;
const height = 400;
const radius = Math.min(width, height) / 2 - 20; // Subtract padding

const colors = {
	Engineering: "#4f46e5",
	Marketing: "#f97316",
	Sales: "#10b981",
	HR: "#ef4444",
};

const PieChart = ({ users }: UserDataProps) => {
	const departmentCounts = useMemo(() => {
		return users.reduce((acc: Record<string, number>, user) => {
			acc[user.department] = (acc[user.department] || 0) + 1;
			return acc;
		}, {});
	}, [users]);

	const data = useMemo(
		() =>
			Object.keys(departmentCounts).map((department) => ({
				department,
				count: departmentCounts[department],
			})),
		[departmentCounts]
	);

	return (
		<>
			<svg width={width} height={height}>
				<Group top={height / 2} left={width / 2}>
					<Pie
						data={data}
						pieValue={(d) => d.count}
						outerRadius={radius}
						cornerRadius={3}
						padAngle={0.02}
					>
						{(pie) =>
							pie.arcs.map((arc, i) => {
								const [centroidX, centroidY] = pie.path.centroid(arc);
								const department = arc.data.department;
								const count = arc.data.count;

								return (
									<g key={`arc-${department}-${i}`}>
										<path
											d={pie.path(arc) ?? undefined}
											fill={colors[department as keyof typeof colors]}
											aria-label={`Department ${department} with ${count} users`}
										/>
										<Text
											x={centroidX}
											y={centroidY}
											dy=".33em"
											fontSize={12}
											textAnchor="middle"
											fill="white"
										>
											{count}
										</Text>
									</g>
								);
							})
						}
					</Pie>
				</Group>
			</svg>

			<div className="mt-4 flex flex-col items-start space-y-2">
				{data.map((d) => {
					const color = colors[d.department as keyof typeof colors] || "#000"; // Fallback color

					return (
						<div
							key={d.department}
							className="flex items-center rounded-lg"
							style={{ backgroundColor: color }}
						>
							<span className="text-white text-sm px-4 py-1 w-32 text-center rounded-full">
								{d.department}
							</span>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default PieChart;
