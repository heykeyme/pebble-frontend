import { TodoItem } from "../types/todo";

interface TodoCardProps {
  item: TodoItem;
  bgHex: string;
  onToggle: (id: number) => void;
  onEdit: (item: TodoItem) => void;
  onDelete: (id: number) => void;
}

export function TodoCard({ item, bgHex, onToggle, onEdit, onDelete }: TodoCardProps) {
  const isComplete = item.status === "complete";

  return (
    <div
      style={{ backgroundColor: isComplete ? "#EFEBDD" : bgHex }}
      className="neo-border rounded-2xl p-5 neo-shadow flex flex-col justify-between gap-4 transition-transform"
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          aria-label="Toggle complete"
          className={`neo-border neo-focus flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-extrabold transition-colors ${
            isComplete ? "bg-[#3DDC84]" : "bg-white"
          }`}
        >
          {isComplete && "✓"}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`break-words font-[family-name:var(--font-space-grotesk)] text-lg font-bold leading-snug ${
              isComplete ? "line-through text-[#8A8578]" : "text-[#141414]"
            }`}
          >
            {item.title}
          </h3>
          {item.description && (
            <p
              className={`text-sm mt-1 leading-relaxed break-words ${
                isComplete ? "text-[#A8A392]" : "text-[#3A3728]"
              }`}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t-2 border-[#141414]/10">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="neo-border neo-shadow-sm neo-shadow-active neo-focus cursor-pointer rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="neo-border neo-shadow-sm neo-shadow-active neo-focus cursor-pointer rounded-lg bg-[#FF5C5C] px-3.5 py-1.5 text-xs font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
}