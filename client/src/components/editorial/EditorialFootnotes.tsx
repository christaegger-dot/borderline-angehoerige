import type { ReactNode } from "react";

export interface Footnote {
  id: string;
  content: ReactNode;
}

interface EditorialFootnotesProps {
  notes: Footnote[];
}

export function EditorialFootnotes({ notes }: EditorialFootnotesProps) {
  return (
    <div
      className="mt-12 pt-6 border-t"
      style={{ borderColor: "var(--rule-color)" }}
    >
      <ol
        className="list-decimal pl-6"
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--fg-tertiary)",
          lineHeight: "var(--lh-relaxed)",
        }}
      >
        {notes.map(note => (
          <li
            key={note.id}
            id={`footnote-${note.id}`}
            className="mt-2 first:mt-0"
          >
            {note.content}
          </li>
        ))}
      </ol>
    </div>
  );
}
