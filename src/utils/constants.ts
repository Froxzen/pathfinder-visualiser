import { AlgorithmSelectType, MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROWS = 31;
export const MAX_COLS = 41;

export const START_TILE_CONFIGURATION = {
	row: Math.max(1, Math.min(MAX_ROWS - 2, 1)),
	col: Math.max(1, Math.min(MAX_COLS - 2, 1)),
	isEnd: false,
	isWall: false,
	isPath: false,
	distance: 0,
	isStart: false,
	isTraversed: false,
	parent: null,
};

export const END_TILE_CONFIGURATION = {
	row: Math.max(1, Math.min(MAX_ROWS - 2, MAX_ROWS - 2)),
	col: Math.max(1, Math.min(MAX_COLS - 2, MAX_COLS - 2)),
	isEnd: false,
	isWall: false,
	isPath: false,
	distance: 0,
	isStart: false,
	isTraversed: false,
	parent: null,
};

export const TILE_STYLE =
	"2xl:w-[32px] 2xl:h-[32px] xl:w-[24px] xl:h-[24px] lg:w-[17px] lg:h-[17px] md:w-[15px] md:h-[15px] xs:w-[8px] xs:h-[8px] w-[7px] h-[7px] border-t border-r border-white/10";
export const TRAVERSED_TILE_STYLE = TILE_STYLE + " bg-cyan-500";
export const START_TILE_STYLE = TILE_STYLE + " bg-green-500";
export const END_TILE_STYLE = TILE_STYLE + " bg-red-600";
export const WALL_TILE_STYLE = TILE_STYLE + " bg-gray-200";
export const PATH_TILE_STYLE = TILE_STYLE + " bg-green-600";

export const MAZES: MazeSelectType[] = [
	{ name: "No Maze", value: "NONE" },
	{ name: "Binary Tree", value: "BINARY_TREE" },
	{ name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];

export const PATHFINDING_ALGORITHMS: AlgorithmSelectType[] = [
	{ name: "Dijkstra", value: "DIJKSTRA" },
	{ name: "A-Star", value: "A_STAR" },
	{ name: "BFS", value: "BFS" },
	{ name: "DFS", value: "DFS" },
];

export const SPEEDS: SpeedSelectType[] = [
	{ name: "Slow", value: 2 },
	{ name: "Medium", value: 1 },
	{ name: "Fast", value: 0.5 },
];

export const SLEEP_TIME = 8;
export const EXTENDED_SLEEP_TIME = 30;
