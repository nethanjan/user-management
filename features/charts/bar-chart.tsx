import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import { Tooltip, useTooltip, defaultStyles } from "@visx/tooltip";
import React from "react";

import useResizeObserver from "@/hooks/use-resize-observer";
import { UserDataProps } from "@/types/user";

interface DataPoint {
	age: number;
	count: number;
}

const margin = { top: 40, right: 30, bottom: 50, left: 40 };

const isDarkMode = () => document.documentElement.classList.contains("dark");

const BarChart = ({ users }: UserDataProps) => {
	const { refCallback, width } = useResizeObserver<HTMLDivElement>();
	const chartHeight = 400;

	// Prepare age data: count occurrences of each age
	const ageCounts = users.reduce((acc: Record<number, number>, user) => {
		acc[user.age] = (acc[user.age] || 0) + 1;
		return acc;
	}, {});

	const data: DataPoint[] = Object.keys(ageCounts).map((age) => ({
		age: Number(age),
		count: ageCounts[Number(age)],
	}));

	// Scales
	const xScale = scaleBand<number>({
		domain: data.map((d) => d.age),
		padding: 0.2,
		range: [0, width - margin.left - margin.right],
	});

	const yScale = scaleLinear<number>({
		domain: [0, Math.max(...data.map((d) => d.count))],
		nice: true,
		range: [chartHeight - margin.top - margin.bottom, 0],
	});

	const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
		useTooltip<DataPoint>();

	return (
		<div
			ref={refCallback}
			className="relative w-full max-w-full px-4 md:px-8 lg:px-12 pt-6"
		>
			<svg
				width={width}
				height={chartHeight}
				className="overflow-visible"
				role="img"
			>
				<Group left={margin.left} top={margin.top}>
					{data.map((d) => {
						const barWidth = xScale.bandwidth();
						const barHeight =
							chartHeight - margin.top - margin.bottom - (yScale(d.count) ?? 0);
						const barX = xScale(d.age);
						const barY = chartHeight - margin.top - margin.bottom - barHeight;

						return (
							<Bar
								key={`bar-${d.age}`}
								x={barX}
								y={barY}
								width={barWidth}
								height={barHeight}
								fill="#3b82f6"
								aria-label={`Age ${d.age}`}
								onMouseMove={(event) =>
									showTooltip({
										tooltipData: d,
										tooltipLeft: event.clientX,
										tooltipTop: event.clientY,
									})
								}
								onMouseLeave={() => hideTooltip()}
							/>
						);
					})}
					{/* Axes */}
					<AxisBottom
						top={chartHeight - margin.bottom - margin.top}
						scale={xScale}
						tickFormat={(value) => `Age ${value}`}
						tickLabelProps={() => ({
							fill: isDarkMode() ? "#000" : "#fff",
							fontSize: 10,
							textAnchor: "middle",
						})}
					/>
					<AxisLeft
						scale={yScale}
						tickLabelProps={() => ({
							fill: isDarkMode() ? "#000" : "#fff",
							fontSize: 10,
							textAnchor: "end",
							dx: "-0.25em",
							dy: "0.25em",
						})}
					/>
				</Group>
			</svg>

			{/* Tooltip */}
			{tooltipData && (
				<Tooltip
					top={tooltipTop}
					left={tooltipLeft}
					style={{
						...defaultStyles,
						backgroundColor: "rgba(0,0,0,0.8)",
						color: "white",
						padding: "8px",
						borderRadius: "4px",
					}}
					className="z-10 shadow-md"
				>
					<div className="text-xs font-semibold">Age: {tooltipData.age}</div>
					<div className="text-xs">Users: {tooltipData.count}</div>
				</Tooltip>
			)}
		</div>
	);
};

export default BarChart;
