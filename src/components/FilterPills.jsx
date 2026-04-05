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
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-amber-700 bg-amber-700 text-white shadow-sm"
                : "border-stone-300 bg-white/90 text-slate-600 hover:border-amber-300 hover:text-slate-900"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
