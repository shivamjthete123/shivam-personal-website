export default function FilterPills({ items, activeItem, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = item === activeItem;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition duration-200 ${
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
