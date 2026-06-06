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
			<label className="text-xs font-semibold text-canvas-muted ml-1 mb-0.5 tracking-wide uppercase">
				{label}
			</label>
			<button
				ref={buttonRef}
				type="button"
				disabled={isDisabled}
				className={`flex items-center justify-between w-full bg-canvas-surface border border-canvas-border rounded-lg px-4 py-2 text-base text-canvas-text focus:outline-none focus:ring-2 focus:ring-canvas-accent/40 focus:border-canvas-accent-dim transition disabled:opacity-50 disabled:cursor-not-allowed hover:border-canvas-accent-dim/70 ${
					open ? "ring-2 ring-canvas-accent/40 border-canvas-accent-dim" : ""
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
					className="absolute left-0 right-0 top-full z-50 w-full rounded-lg bg-canvas-elevated shadow-xl border border-canvas-border py-1 animate-fadeIn"
					role="listbox"
					onKeyDown={handleKeyDown}
				>
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							className={`w-full text-left px-4 py-1 text-sm sm:text-base rounded-md transition font-medium ${
								value === option.value
									? "bg-canvas-accent/15 text-canvas-accent"
									: "hover:bg-canvas-border text-canvas-text"
							}`}
							onClick={(_) => {
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
