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
					<div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#232526] via-[#2c3e50] to-[#141E30] relative overflow-x-hidden overflow-y-hidden">
						<div
							className="absolute inset-0 pointer-events-none z-0"
							aria-hidden="true"
						>
							{/* Abstract blurred shape for modern effect */}
							<div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-800 opacity-30 rounded-full blur-3xl" />
							<div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-700 opacity-20 rounded-full blur-3xl" />
						</div>
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
