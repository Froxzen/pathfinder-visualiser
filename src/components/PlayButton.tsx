import { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

export function PlayButton({
	handlerRunVisualiser,
	isDisabled,
	isGraphVisualised,
}: {
	handlerRunVisualiser: MouseEventHandler<HTMLButtonElement>;
	isDisabled: boolean;
	isGraphVisualised: boolean;
}) {
	return (
		<button
			disabled={isDisabled}
			onClick={handlerRunVisualiser}
			aria-label={isGraphVisualised ? "Reset" : "Start Visualisation"}
			className={`disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 rounded-full p-4 shadow-lg border border-canvas-accent-dim/50 focus:outline-none focus:ring-2 focus:ring-canvas-accent/50 text-canvas-deep
				${
					!isDisabled
						? "bg-canvas-accent hover:brightness-110 hover:shadow-[0_0_18px_rgba(34,211,238,0.4)]"
						: "bg-canvas-border"
				}
			`}
		>
			{isGraphVisualised ? (
				<GrPowerReset className="w-7 h-7" />
			) : (
				<BsFillPlayFill className="w-7 h-7 animate-pulse" />
			)}
		</button>
	);
}
