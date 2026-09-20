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
            className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
              isActive
                ? "border-teal-700 bg-teal-700 text-white shadow-sm font-semibold"
                : "border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-teal-800"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
