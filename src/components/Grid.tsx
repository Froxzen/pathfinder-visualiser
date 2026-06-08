import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({
	tileSize,
	isVisualisationRunningRef,
}: {
	tileSize: number;
	isVisualisationRunningRef: MutableRefObject<boolean>;
}) {
	const { grid, setGrid } = usePathfinding();
	const [isMouseDown, setIsMouseDown] = useState(false);

	const handleMouseDown = (row: number, col: number) => {
		if (isVisualisationRunningRef.current) {
			return;
		}
		if (checkIfStartOrEnd(row, col)) {
			return;
		}
		setIsMouseDown(true);
		const newGrid = createNewGrid(grid, row, col);
		setGrid(newGrid);
	};

	const handleMouseUp = (row: number, col: number) => {
		if (isVisualisationRunningRef.current || checkIfStartOrEnd(row, col)) {
			return;
		}

		setIsMouseDown(false);
	};
	const handleMouseEnter = (row: number, col: number) => {
		if (isVisualisationRunningRef.current || checkIfStartOrEnd(row, col)) {
			return;
		}

		if (isMouseDown) {
			const newGrid = createNewGrid(grid, row, col);
			setGrid(newGrid);
		}
	};

	return (
		<div
			className="flex flex-col border border-canvas-border rounded-sm"
			style={{
				width: MAX_COLS * tileSize,
				height: MAX_ROWS * tileSize,
			}}
		>
			{grid.map((r, rowIndex) => (
				<div key={rowIndex} className="flex">
					{r.map((tile, tileIndex) => {
						const {
							row,
							col,
							isEnd,
							isStart,
							isPath,
							isTraversed,
							isWall,
						} = tile;
						return (
							<Tile
								key={tileIndex}
								row={tile.row}
								col={tile.col}
								tileSize={tileSize}
								isEnd={isEnd}
								isStart={isStart}
								isPath={isPath}
								isTraversed={isTraversed}
								isWall={isWall}
								handleMouseDown={() =>
									handleMouseDown(row, col)
								}
								handleMouseUp={() => handleMouseUp(row, col)}
								handleMouseEnter={() =>
									handleMouseEnter(row, col)
								}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}
