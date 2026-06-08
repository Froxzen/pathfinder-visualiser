import { RefObject, useEffect, useState } from "react";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";

const MIN_TILE_SIZE = 4;
const GRID_GAP = 16;

export function useTileSize(containerRef: RefObject<HTMLElement | null>) {
	const [tileSize, setTileSize] = useState(17);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const update = () => {
			const { width, height } = container.getBoundingClientRect();
			const availableWidth = width - GRID_GAP * 2;
			const availableHeight = height - GRID_GAP * 2;
			const byWidth = Math.floor(availableWidth / MAX_COLS);
			const byHeight = Math.floor(availableHeight / MAX_ROWS);
			setTileSize(Math.max(MIN_TILE_SIZE, Math.min(byWidth, byHeight)));
		};

		const observer = new ResizeObserver(update);
		observer.observe(container);
		update();

		return () => observer.disconnect();
	}, [containerRef]);

	return tileSize;
}
