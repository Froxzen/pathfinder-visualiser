import { useRef } from "react";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import { Nav } from "./components/Nav";

function App() {
	const isVisualisationRunningRef = useRef(false);

	return (
		<PathfindingProvider>
			<TileProvider>
				<SpeedProvider>
					<div className="h-screen w-screen flex flex-col">
						<Nav
							isVisualisationRunningRef={
								isVisualisationRunningRef
							}
						/>
						<Grid
							isVisualisationRunningRef={
								isVisualisationRunningRef
							}
						/>
					</div>
				</SpeedProvider>
			</TileProvider>
		</PathfindingProvider>
	);
}

export default App;
// 46:45