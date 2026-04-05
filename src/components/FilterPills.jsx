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
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
