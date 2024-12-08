import { PathfindingProvider } from "./context/PathfindingContext";
import { TileProvider } from "./context/TileContext";

function App() {
	return (
		<PathfindingProvider>
			<TileProvider>
				<h1 className="text-3xl font-bold underline">Hello world!</h1>;
			</TileProvider>
		</PathfindingProvider>
	);
}

export default App;
