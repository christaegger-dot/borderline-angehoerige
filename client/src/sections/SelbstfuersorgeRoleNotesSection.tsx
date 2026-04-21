import { Heart, UserCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  return (
    <ContentSection
      title="Hinweise für Ihre Situation"
      icon={<UserCircle className="w-6 h-6 text-slate-mid" />}
      id="ihre-situation"
      preview="Spezifische Hinweise für Partner/innen, Elternteile und erwachsene Kinder."
    >
      <div className="space-y-4">
        {roleNotes.map(note => {
          const cardClass =
            note.tone === "terracotta"
              ? "border-l-4 border-l-terracotta-mid bg-terracotta-wash"
              : note.tone === "slate"
                ? "border-l-4 border-l-slate-mid bg-slate-pale"
                : "border-l-4 border-l-sage-mid bg-sage-pale";
          const iconWrapperClass =
            note.tone === "terracotta"
              ? "bg-terracotta-lighter"
              : note.tone === "slate"
                ? "bg-slate-lighter"
                : "bg-sage-lighter";
          const iconClass =
            note.tone === "terracotta"
              ? "text-terracotta-mid"
              : note.tone === "slate"
                ? "text-slate-mid"
                : "text-sage-mid";

          return (
            <Card key={note.title} className={cardClass}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${iconWrapperClass} flex items-center justify-center flex-shrink-0`}
                  >
                    <RoleNoteIcon
                      icon={note.icon}
                      className={`w-5 h-5 ${iconClass}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {note.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {note.text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ContentSection>
  );
}
