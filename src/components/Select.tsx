import { useState, useRef, useEffect } from "react";
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
	onChange: (e: any) => void;
	options: { value: string | number; name: string }[];
	isDisabled?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	// Close dropdown on outside click
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);

	// Keyboard accessibility
	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") setOpen(false);
	}

	const selected = options.find((o) => o.value === value);

	return (
		<div className="flex flex-col min-w-[140px] w-full gap-1 relative">
			<label className="text-xs font-semibold text-blue-200 ml-1 mb-0.5 tracking-wide drop-shadow-sm">
				{label}
			</label>
			<button
				ref={buttonRef}
				type="button"
				disabled={isDisabled}
				className={`flex items-center justify-between w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-base text-gray-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 ${
					open ? "ring-2 ring-blue-400/60 border-blue-400" : ""
				}`}
				onClick={() => setOpen((v) => !v)}
				onKeyDown={handleKeyDown}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={label}
			>
				<span className="truncate text-left">
					{selected ? selected.name : "Select..."}
				</span>
				<FiChevronDown
					className={`ml-2 text-xl transition-transform ${
						open ? "rotate-180" : ""
					}`}
				/>
			</button>
			{open && !isDisabled && (
				<div
					ref={menuRef}
					tabIndex={-1}
					className="absolute z-50 mt-2 w-full rounded-xl bg-white/20 backdrop-blur-2xl shadow-2xl border border-white/30 py-1 animate-fadeIn"
					role="listbox"
					onKeyDown={handleKeyDown}
				>
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							className={`w-full text-left px-4 py-1 text-base rounded-lg transition font-medium ${
								value === option.value
									? "bg-blue-400/30 text-blue-100"
									: "hover:bg-white/30 text-gray-100"
							}`}
							onClick={(e) => {
								onChange({ target: { value: option.value } });
								setOpen(false);
							}}
							role="option"
							aria-selected={value === option.value}
						>
							{option.name}
						</button>
					))}
				</div>
			)}
			<style>{`
				.animate-fadeIn {
					animation: fadeInDropdown 0.18s cubic-bezier(.4,0,.2,1);
				}
				@keyframes fadeInDropdown {
					from { opacity: 0; transform: translateY(-8px) scale(0.98); }
					to { opacity: 1; transform: none; }
				}
			`}</style>
		</div>
	);
}
