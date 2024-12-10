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
			className="disabled:pointer-events-none disabled:opactity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus: ring-opacity-30"
		>
			{isGraphVisualised ? (
				<GrPowerReset className="w-5 h-5" />
			) : (
				<BsFillPlayFill className="w-5 h-5" />
			)}
		</button>
	);
}
