import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

export function Select({
	value,
	onChange,
	options,
	label,
	isDisabled,
}: {
	value: string | number;
	label: string;
	onChange: (e: { target: { value: string | number } }) => void;
	options: { value: string | number; name: string }[];
	isDisabled?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

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

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") setOpen(false);
	}

	const selected = options.find((o) => o.value === value);

	return (
		<div className="flex flex-col min-w-[148px] w-full gap-1.5 relative z-30">
			<label className="text-[10px] font-semibold text-canvas-muted/90 ml-0.5 tracking-[0.14em] uppercase select-none">
				{label}
			</label>
			<button
				ref={buttonRef}
				type="button"
				disabled={isDisabled}
				className={twMerge(
					"group flex items-center justify-between w-full rounded-lg border px-3.5 py-2 text-sm font-medium text-canvas-text transition-all duration-200",
					"bg-canvas-surface border-canvas-border shadow-select-trigger",
					"hover:border-canvas-accent-dim/60 hover:bg-[#161f2c]",
					"focus:outline-none focus-visible:ring-2 focus-visible:ring-canvas-accent/30",
					"disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:border-canvas-border",
					open &&
						"border-canvas-accent/50 bg-[#161f2c] shadow-select-trigger-open"
				)}
				onClick={() => !isDisabled && setOpen((v) => !v)}
				onKeyDown={handleKeyDown}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={label}
			>
				<span className="truncate text-left pr-2">
					{selected ? selected.name : "Select..."}
				</span>
				<span
					className={twMerge(
						"flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-canvas-border/80 bg-canvas-deep/60 text-canvas-muted transition-colors duration-200",
						"group-hover:border-canvas-accent-dim/50 group-hover:text-canvas-accent",
						open && "border-canvas-accent/40 text-canvas-accent"
					)}
				>
					<FiChevronDown
						className={twMerge(
							"h-3.5 w-3.5 transition-transform duration-200",
							open && "rotate-180"
						)}
					/>
				</span>
			</button>
			{open && !isDisabled && (
				<div
					ref={menuRef}
					tabIndex={-1}
					className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-lg border border-canvas-border/90 bg-canvas-elevated/95 shadow-dropdown-panel backdrop-blur-md animate-dropdown-in"
					role="listbox"
					onKeyDown={handleKeyDown}
				>
					<div className="h-px bg-gradient-to-r from-transparent via-canvas-accent/50 to-transparent" />
					<ul className="p-1.5">
						{options.map((option) => {
							const isSelected = value === option.value;
							return (
								<li key={option.value}>
									<button
										type="button"
										className={twMerge(
											"relative flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-150",
											isSelected
												? "bg-canvas-accent/10 text-canvas-text font-medium"
												: "text-canvas-muted hover:bg-canvas-border/40 hover:text-canvas-text"
										)}
										onClick={() => {
											onChange({
												target: { value: option.value },
											});
											setOpen(false);
										}}
										role="option"
										aria-selected={isSelected}
									>
										{isSelected && (
											<span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-canvas-accent shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
										)}
										<span className={isSelected ? "pl-2" : ""}>
											{option.name}
										</span>
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
