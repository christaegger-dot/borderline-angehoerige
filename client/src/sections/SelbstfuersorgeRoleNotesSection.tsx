import { Heart, UserCircle, Users } from "lucide-react";
import ContentSection from "@/components/ContentSection";
import { roleNotes } from "@/content/selbstfuersorge-page";

function RoleNoteIcon({
  icon,
  className,
}: {
  icon: "heart" | "users" | "user-circle";
  className: string;
}) {
  if (icon === "heart") return <Heart className={className} />;
  if (icon === "users") return <Users className={className} />;
  return <UserCircle className={className} />;
}

export function SelbstfuersorgeRoleNotesSection() {
  const bodyStyle = {
    fontSize: "var(--text-sm)",
    lineHeight: "var(--lh-relaxed)",
    color: "var(--fg-secondary)",
  };

  const titleStyle = {
    fontSize: "var(--text-md)",
    fontWeight: 600,
    color: "var(--fg-primary)",
  };

  return (
    <ContentSection
      variant="editorial"
      title="Hinweise für Ihre Situation"
      id="ihre-situation"
      preview="Spezifische Hinweise für Partner/innen, Elternteile und erwachsene Kinder."
    >
      <div>
        {roleNotes.map(note => {
          return (
            <article
              key={note.title}
              className="border-t pt-4"
              style={{ borderColor: "var(--rule-color)" }}
            >
              <div className="flex items-start gap-3">
                <RoleNoteIcon
                  icon={note.icon}
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--accent-label)]"
                />
                <div>
                  <h3 style={titleStyle}>{note.title}</h3>
                  <p className="mt-2" style={bodyStyle}>
                    {note.text}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </ContentSection>
  );
}
