import { AlgorithmType, MazeType, GridType } from "../utils/types";


interface PathfindingContextInterface {
    algorithm: AlgorithmType;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    maze: MazeType;
    setMaze: (maze: MazeType) => void;
    grid: GridType;
    setGrid: (grid: GridType) => void;
    isGraphVisualised: boolean;
    setIsGraphVisualised: (isGraphVisualised: boolean) => void;
}