import { TodoItem } from "../types/todo";
import { BrandBadge } from "./BrandBadge";
import { TodoCard } from "./TodoCard";

const CARD_COLORS = ["#FFD23F", "#8FD3FF", "#FFB4E0", "#C6F783"];

interface ScreenDashboardProps {
  items: TodoItem[];
  onOpenCreate: () => void;
  onToggle: (id: number) => void;
  onEdit: (item: TodoItem) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
}

export function ScreenDashboard({
  items,
  onOpenCreate,
  onToggle,
  onEdit,
  onDelete,
  onLogout,
}: ScreenDashboardProps) {
  const hasItems = items.length > 0;
  const completeCount = items.filter((item) => item.status === "complete").length;

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-[#141414] bg-white px-8 py-5">
        <BrandBadge size="sm" />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}
          className="text-sm font-bold"
        >
          Log out
        </a>
      </header>

      <main className="mx-auto w-full max-w-[960px] flex-1 px-8 pb-[60px] pt-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold font-[family-name:var(--font-space-grotesk)]">
              Your notes &amp; tasks
            </h1>
            {hasItems && (
              <p className="mt-0.5 text-sm font-semibold text-[#4A473E]">
                {items.length} item{items.length === 1 ? "" : "s"} · {completeCount} done
              </p>
            )}
          </div>
          {hasItems && (
            <button
              type="button"
              onClick={onOpenCreate}
              className="neo-border neo-shadow neo-shadow-active neo-focus cursor-pointer rounded-xl bg-[#3DDC84] px-[22px] py-[13px] text-sm font-extrabold hover:bg-[#5CE59B]"
            >
              + New
            </button>
          )}
        </div>

        {hasItems ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
            {items.map((item, index) => (
              <TodoCard
                key={item.id}
                item={item}
                bgHex={CARD_COLORS[index % CARD_COLORS.length]}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <div className="py-[60px] text-center">
            <EmptyIllustration />
            <h2 className="mb-2 text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
              Nothing here yet
            </h2>
            <p className="mb-6 text-[15px] font-semibold text-[#4A473E]">
              Create your first note or task to get started.
            </p>
            <button
              type="button"
              onClick={onOpenCreate}
              className="neo-border neo-shadow neo-shadow-active neo-focus cursor-pointer rounded-xl bg-[#3DDC84] px-[26px] py-3.5 text-sm font-extrabold hover:bg-[#5CE59B]"
            >
              + New note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyIllustration() {
  return (
    <svg width="100" height="90" viewBox="0 0 100 90" className="mx-auto mb-[22px]">
      <rect x="11" y="46" width="78" height="44" rx="10" fill="#FFD23F" stroke="#141414" strokeWidth="3" />
      <rect x="27" y="14" width="22" height="36" rx="10" fill="#3DDC84" stroke="#141414" strokeWidth="3" />
      <circle cx="26" cy="12" r="9" fill="#3DDC84" stroke="#141414" strokeWidth="3" />
      <circle cx="49" cy="14" r="7" fill="#3DDC84" stroke="#141414" strokeWidth="3" />
    </svg>
  );
}
