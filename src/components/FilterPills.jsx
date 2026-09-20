export default function FilterPills({ items, activeItem, onSelect }) {
  return (
    <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5 -mx-1 px-1">
      {items.map((item) => {
        const isActive = item === activeItem;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-bold transition duration-200 ${
              isActive
                ? "border-amber-700 bg-amber-700 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-amber-400 hover:text-amber-800"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
