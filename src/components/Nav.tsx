import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { useSpeed } from "../hooks/useSpeed";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { PlayButton } from "./PlayButton";
import { runPathfindingAlgorithm } from "../utils/runPathfindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({
	isVisualisationRunningRef,
}: {
	isVisualisationRunningRef: MutableRefObject<boolean>;
}) {
	const [isDisabled, setIsDisabled] = useState(false);
	const {
		maze,
		setMaze,
		grid,
		setGrid,
		isGraphVisualised,
		setIsGraphVisualised,
		algorithm,
		setAlgorithm,
	} = usePathfinding();
	const { startTile, endTile } = useTile();
	const { speed, setSpeed } = useSpeed();

	const handleGenerateMaze = (maze: MazeType) => {
		if (maze === "NONE") {
			setMaze(maze);
			resetGrid({ grid, startTile, endTile });
			return;
		}

		setMaze(maze);
		resetGrid({ grid, startTile, endTile });
		setIsDisabled(true);
		runMazeAlgorithm({
			maze,
			grid,
			startTile,
			endTile,
			setIsDisabled,
			speed,
		});
		const newGrid = grid.slice();
		setGrid(newGrid);
		setIsGraphVisualised(false);
	};

	const handlerRunVisualiser = () => {
		if (isGraphVisualised) {
			setIsGraphVisualised(false);
			if (maze !== "NONE") {
				resetGrid({ grid: grid.slice(), startTile, endTile });
				handleGenerateMaze(maze);
			} else {
				resetGrid({ grid: grid.slice(), startTile, endTile });
			}
			return;
		}

		const { traversedTiles, path } = runPathfindingAlgorithm({
			algorithm,
			grid,
			startTile,
			endTile,
		});

		setIsDisabled(true);
		isVisualisationRunningRef.current = true;
		animatePath(traversedTiles, path, startTile, endTile, speed, () => {
			const newGrid = grid.slice();
			setGrid(newGrid);
			setIsGraphVisualised(true);
			setIsDisabled(false);
			isVisualisationRunningRef.current = false;
		});
	};

	return (
		<div className="w-full flex items-center justify-center py-4 shrink-0 z-20 overflow-visible">
			<div className="w-full max-w-4xl flex items-center justify-between bg-canvas-elevated rounded-xl border border-canvas-border px-4 py-3 gap-4 overflow-visible">
				<h1 className="font-display text-2xl sm:text-3xl font-bold text-canvas-text tracking-tight">
					Pathfinding Visualizer
				</h1>
				<div className="flex flex-col sm:flex-row sm:items-end items-center gap-2 sm:gap-4 overflow-visible">
					<Select
						label="Maze"
						value={maze}
						options={MAZES}
						isDisabled={isDisabled}
						onChange={(e) => {
							handleGenerateMaze(e.target.value as MazeType);
						}}
					/>
					<Select
						label="Algorithm"
						value={algorithm}
						isDisabled={isDisabled}
						options={PATHFINDING_ALGORITHMS}
						onChange={(e) => {
							setAlgorithm(e.target.value as AlgorithmType);
						}}
					/>
					<Select
						label="Speed"
						value={speed}
						options={SPEEDS}
						isDisabled={isDisabled}
						onChange={(e) => {
							setSpeed(parseInt(e.target.value) as SpeedType);
						}}
					/>
					<PlayButton
						isDisabled={isDisabled}
						isGraphVisualised={isGraphVisualised}
						handlerRunVisualiser={handlerRunVisualiser}
					/>
				</div>
			</div>
		</div>
	);
}
