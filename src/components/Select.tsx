import { ChangeEvent } from "react";
import { FiChevronDown } from "react-icons/fi";

export function Select({
	value,
	onChange,
	options,
	label,
	isDisabled,
}: {
	value: string | number;
	label: string;
	onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
	options: { value: string | number; name: string }[];
	isDisabled?: boolean;
}) {
	return (
		<div className="flex flex-col items-start gap-1 min-w-[140px]">
			<label
				className="text-xs font-semibold text-gray-200 ml-1 mb-0.5 tracking-wide"
				htmlFor={label}
			>
				{label}
			</label>
			<div className="relative w-full">
				<select
					disabled={isDisabled}
					className="appearance-none w-full bg-gray-800/80 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 focus:bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/40 transition p-2 pr-8 text-sm text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
					id={label}
					value={value}
					onChange={onChange}
				>
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							className="bg-gray-900 text-gray-100"
						>
							{option.name}
						</option>
					))}
				</select>
				<span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
					<FiChevronDown />
				</span>
			</div>
		</div>
	);
}
