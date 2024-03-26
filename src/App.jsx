import React from "react";
import "./index.css";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<div>
			<h1
				className="my-7 text-5xl font-bold text-center"
				style={{
					backgroundClip: "text",
					WebkitBackgroundClip: "text",
					color: "transparent",
					backgroundImage:
						"linear-gradient(25deg, #0163ff, #4797f2, #4ccae3, #23ffd2)",
				}}
			>
				Earthquakes Map
			</h1>

			<Dashboard />
		</div>
	);
}

export default App;
