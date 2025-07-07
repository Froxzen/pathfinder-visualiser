import { MutableRefObject, useState, useRef, useEffect } from "react";
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
import locationIcon from "../assets/location.png";

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
	const [showBubble, setShowBubble] = useState(false);
	const iconRef = useRef<HTMLDivElement>(null);

	// Close bubble on outside click
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				iconRef.current &&
				!iconRef.current.contains(e.target as Node)
			) {
				setShowBubble(false);
			}
		}
		if (showBubble) document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [showBubble]);

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
		<div className="w-full flex items-center justify-center py-4 px-2 sm:px-6 z-20">
			<div className="w-full max-w-4xl flex items-center justify-between bg-white/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 px-4 py-3 gap-4">
				<div className="flex items-center gap-3">
					<div className="relative flex items-center justify-center">
						<div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-blue-600 p-0.5 flex items-center justify-center">
							<img
								src={locationIcon}
								alt="Location Icon"
								className="w-6 h-6 sm:w-8 sm:h-8 object-contain select-none filter brightness-0 invert"
							/>
						</div>
					</div>
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
			<style>{`
			@keyframes bubble-in {
				0% { opacity: 0; transform: translateX(-16px) scale(0.95); }
				100% { opacity: 1; transform: translateX(0) scale(1); }
			}
			.animate-bubble-in {
				animation: bubble-in 0.25s cubic-bezier(.4,0,.2,1);
			}
			`}</style>
		</div>
	);
}
