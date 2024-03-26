import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

function Map({ minMagnitude, timePeriod }) {
	const [earthquakes, setEarthquakes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=${minMagnitude}&starttime=${getTimePeriodStartDate(
						timePeriod
					)}`
				);
				setEarthquakes(response.data.features);
				setError(null);
				console.log("Data fetched"); // Log quando i dati vengono caricati
			} catch (error) {
				console.error("Error fetching data:", error);
				setError(
					"Errore durante il recupero dei dati. Si prega di riprovare più tardi."
				);
			}
		};

		fetchData(); // Fetch data initially

		const interval = setInterval(() => {
			console.log("Interval triggered");
			fetchData(); // Fetch data every 5 minutes
		}, 300000);

		return () => clearInterval(interval);
	}, [minMagnitude, timePeriod]);

	const getTimePeriodStartDate = (period) => {
		const now = new Date();
		let startDate = new Date();

		switch (period) {
			case "week":
				startDate.setDate(now.getDate() - 7);
				break;
			case "month":
				startDate.setMonth(now.getMonth() - 1);
				break;
			case "year":
				startDate.setFullYear(now.getFullYear() - 1);
				break;
			case "decade":
				startDate.setFullYear(now.getFullYear() - 10);
				break;
			default:
				startDate.setDate(now.getDate() - 1);
		}

		return startDate.toISOString().split("T")[0];
	};

	return (
		<div className="w-9/12 mx-auto">
			{error && <p className="text-red-500">{error}</p>}
			<MapContainer
				center={[0, 0]}
				zoom={1}
				className="mt-5"
				style={{ height: "500px", width: "100%" }}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{earthquakes.map((quake) => (
					<Marker
						key={quake.id}
						position={[
							quake.geometry.coordinates[1],
							quake.geometry.coordinates[0],
						]}
					>
						<Popup>{quake.properties.title}</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Map;
