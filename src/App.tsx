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
					<div className="min-h-screen w-full flex flex-col items-center justify-start bg-grid relative overflow-x-hidden overflow-y-hidden">
						<div className="relative z-10 w-full max-w-6xl px-2 sm:px-6 flex flex-col items-center">
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
					</div>
				</SpeedProvider>
			</TileProvider>
		</PathfindingProvider>
	);
}

export default App;
// 46:45
