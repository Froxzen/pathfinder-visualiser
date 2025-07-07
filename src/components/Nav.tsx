import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import {
	EXTENDED_SLEEP_TIME,
	MAZES,
	PATHFINDING_ALGORITHMS,
	SLEEP_TIME,
	SPEEDS,
} from "../utils/constants";
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
			resetGrid({ grid: grid.slice(), startTile, endTile });
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
		<div className="w-full flex items-center justify-center py-4 px-2 sm:px-6 z-20">
			<div className="w-full max-w-4xl flex items-center justify-between bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 px-4 py-3 gap-4">
				<div className="flex items-center gap-3">
					<span
						className="text-3xl select-none"
						aria-label="Pathfinder"
					>
						🧭
					</span>
					<h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
						Pathfinding Visualizer
					</h1>
				</div>
				<div className="flex flex-col sm:flex-row sm:items-end items-center gap-2 sm:gap-4">
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
						label="Graph"
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
