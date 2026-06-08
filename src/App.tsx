import { useRef } from "react";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import { Nav } from "./components/Nav";
import { useTileSize } from "./hooks/useTileSize";

function App() {
	const isVisualisationRunningRef = useRef(false);
	const gridAreaRef = useRef<HTMLDivElement>(null);
	const tileSize = useTileSize(gridAreaRef);

	return (
		<PathfindingProvider>
			<TileProvider>
				<SpeedProvider>
					<div className="h-screen w-full flex flex-col bg-canvas-deep overflow-hidden px-2 sm:px-6">
						<Nav
							isVisualisationRunningRef={
								isVisualisationRunningRef
							}
						/>
						<div
							ref={gridAreaRef}
							className="flex-1 min-h-0 w-full flex items-center justify-center"
						>
							<Grid
								tileSize={tileSize}
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
