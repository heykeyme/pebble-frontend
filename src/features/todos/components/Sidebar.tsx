import { DashboardSection } from "../types/todo";

const NAV_ITEMS: { id: DashboardSection; label: string; color: string }[] = [
  { id: "todos", label: "Notes & tasks", color: "#FFD23F" },
  { id: "study", label: "Study", color: "#8FD3FF" },
];

interface SidebarProps {
  active: DashboardSection;
  onSelect: (section: DashboardSection) => void;
}

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <nav
      aria-label="Sections"
      className="border-b-[3px] border-[#141414] bg-white px-4 py-3 md:w-[220px] md:shrink-0 md:border-b-0 md:border-r-[3px] md:py-6"
    >
      <ul className="flex gap-2.5 md:flex-col">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="flex-1 md:flex-none">
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={isActive ? "page" : undefined}
                style={{ backgroundColor: isActive ? item.color : undefined }}
                className={`neo-border neo-focus w-full cursor-pointer rounded-xl px-3.5 py-2.5 text-left text-sm font-extrabold ${
                  isActive ? "neo-shadow-sm" : "bg-[#F5F1E4] text-[#4A473E] hover:bg-[#EFEBDD]"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
