import { ChangeEvent, FormEvent } from "react";
import { TodoStatus } from "../types/todo";
import { FormField } from "./FormField";

interface TodoModalProps {
  heading: string;
  formTitle: string;
  formDescription: string;
  formStatus: TodoStatus;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onStatusChange: (status: TodoStatus) => void;
  onCancel: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function TodoModal({
  heading,
  formTitle,
  formDescription,
  formStatus,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onCancel,
  onSubmit,
}: TodoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/55 p-5">
      <form
        onSubmit={onSubmit}
        className="neo-border neo-shadow-xl w-full max-w-[440px] rounded-2xl bg-white px-7 py-[30px]"
      >
        <h2 className="mb-5 text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
          {heading}
        </h2>

        <FormField
          label="Title"
          value={formTitle}
          onChange={onTitleChange}
          placeholder="e.g. Plan weekend trip"
          required
          className="mb-4"
        />

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-[#141414]">
            Description
          </label>
          <textarea
            value={formDescription}
            onChange={onDescriptionChange}
            placeholder="Add a few details..."
            rows={3}
            className="neo-focus w-full resize-y rounded-[10px] neo-border bg-[#F5F1E4] px-3.5 py-3 text-[15px] font-semibold text-[#141414] outline-none"
          />
        </div>

        <div className="mb-[26px]">
          <label className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-[#141414]">
            Status
          </label>
          <div className="flex gap-2.5">
            <button
              type="button"
              aria-pressed={formStatus === "incomplete"}
              onClick={() => onStatusChange("incomplete")}
              className={`neo-border neo-focus flex-1 cursor-pointer rounded-[10px] py-3 text-sm font-extrabold ${
                formStatus === "incomplete" ? "bg-[#3DDC84] text-[#141414]" : "bg-[#F5F1E4] text-[#4A473E]"
              }`}
            >
              To do
            </button>
            <button
              type="button"
              aria-pressed={formStatus === "complete"}
              onClick={() => onStatusChange("complete")}
              className={`neo-border neo-focus flex-1 cursor-pointer rounded-[10px] py-3 text-sm font-extrabold ${
                formStatus === "complete" ? "bg-[#3DDC84] text-[#141414]" : "bg-[#F5F1E4] text-[#4A473E]"
              }`}
            >
              Done
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="neo-focus cursor-pointer rounded-[10px] neo-border bg-[#F5F1E4] px-5 py-3.5 text-sm font-extrabold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="neo-border neo-shadow-sm neo-focus cursor-pointer rounded-[10px] bg-[#3DDC84] px-[22px] py-3.5 text-sm font-extrabold hover:bg-[#5CE59B] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
