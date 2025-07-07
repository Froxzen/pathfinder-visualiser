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
			className={`disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 rounded-full p-4 shadow-xl border-none focus:outline-none focus:ring-4 focus:ring-blue-400/50
				${
					!isDisabled
						? "bg-gradient-to-tr from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 hover:shadow-green-400/30 hover:scale-105"
						: "bg-gray-700"
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
