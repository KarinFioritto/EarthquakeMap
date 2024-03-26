import React, { useState } from "react";
import Map from "./Map";

function Dashboard() {
	const [minMagnitude, setMinMagnitude] = useState(0);
	const [timePeriod, setTimePeriod] = useState("day");

	const handleChange = (e) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value) && value >= 0 && value <= 10) {
			setMinMagnitude(value);
		}
	};

	return (
		<div className="flex flex-col items-center justify-between">
			<div className="flex flex-row mb-4 mt-4 items-center">
				<label htmlFor="magnitude" className="mr-2">
					Magnitudine Minima:
				</label>
				<div>
					<select
						id="magnitude"
						value={minMagnitude}
						onChange={handleChange}
						className="border rounded-md p-2 ml-12"
					>
						{[...Array(11).keys()].map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex flex-row mb-4 items-center">
				<label htmlFor="time-period" className="mr-2">
					Periodo Temporale:
				</label>
				<div>
					<select
						id="time-period"
						value={timePeriod}
						onChange={(e) => setTimePeriod(e.target.value)}
						className="border rounded-md p-2"
					>
						<option value="day">1 giorno</option>
						<option value="week">1 settimana</option>
						<option value="month">1 mese</option>
						<option value="year">1 anno</option>
						<option value="decade">10 anni</option>
					</select>
				</div>
			</div>
			<Map minMagnitude={minMagnitude} timePeriod={timePeriod} />
		</div>
	);
}

export default Dashboard;
