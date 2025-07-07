import {
	EXTENDED_SLEEP_TIME,
	PATH_TILE_STYLE,
	SLEEP_TIME,
	SPEEDS,
	TRAVERSED_TILE_STYLE,
} from "./constants";
import { isEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const animatePath = (
	traversedTiles: TileType[],
	path: TileType[],
	startTile: TileType,
	endTile: TileType,
	speed: SpeedType,
	onComplete?: () => void
) => {
	const speedValue = SPEEDS.find((s) => s.value === speed)!.value;
	for (let i = 0; i < traversedTiles.length; i++) {
		setTimeout(() => {
			const tile = traversedTiles[i];
			if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
				document.getElementById(
					`${tile.row}-${tile.col}`
				)!.className = `${TRAVERSED_TILE_STYLE} animate-traversed`;
			}
		}, SLEEP_TIME * i * speedValue);
	}

	setTimeout(() => {
		for (let i = 0; i < path.length; i++) {
			setTimeout(() => {
				const tile = path[i];
				if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
					document.getElementById(
						`${tile.row}-${tile.col}`
					)!.className = `${PATH_TILE_STYLE} animate-path`;
				}
				// If this is the last tile, call onComplete
				if (onComplete && i === path.length - 1) {
					onComplete();
				}
			}, EXTENDED_SLEEP_TIME * i * speedValue);
		}
		// If there is no path, call onComplete immediately
		if (onComplete && path.length === 0) {
			onComplete();
		}
	}, SLEEP_TIME * traversedTiles.length * speedValue);
};
