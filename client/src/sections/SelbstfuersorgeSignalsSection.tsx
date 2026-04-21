import { AlertTriangle, Brain, Heart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ContentSection from "@/components/ContentSection";
import { warningSignalGroups } from "@/content/selbstfuersorge-page";

function WarningSignalIcon({ icon }: { icon: "brain" | "heart" | "users" }) {
  if (icon === "brain") return <Brain className="w-5 h-5 text-white" />;
  if (icon === "heart") return <Heart className="w-5 h-5 text-white" />;
  return <Users className="w-5 h-5 text-white" />;
}

export function SelbstfuersorgeSignalsSection() {
  return (
    <ContentSection
      title="Warnsignale für Überlastung"
      icon={<AlertTriangle className="w-6 h-6 text-terracotta-mid" />}
      id="warnsignale"
      preview="Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr Selbstfürsorge brauchen."
    >
      <p className="text-muted-foreground leading-relaxed mb-6">
        Achten Sie auf diese Anzeichen – sie zeigen, dass Sie dringend mehr
        Selbstfürsorge brauchen:
      </p>

      <div className="grid sm:grid-cols-3 gap-4 [&>*:first-child]:sm:col-span-2">
        {warningSignalGroups.map(group => {
          const accentClass =
            group.tone === "sand"
              ? "border-t-sand-mid bg-sand"
              : group.tone === "terracotta"
                ? "border-t-terracotta-mid bg-terracotta-wash"
                : "border-t-slate-mid bg-slate-pale";
          const iconBgClass =
            group.tone === "sand"
              ? "bg-sand-mid"
              : group.tone === "terracotta"
                ? "bg-terracotta-mid"
                : "bg-slate-mid";
          const alertClass =
            group.tone === "sand"
              ? "text-sand-mid"
              : group.tone === "terracotta"
                ? "text-terracotta-mid"
                : "text-slate-mid";

          return (
            <Card key={group.title} className={`border-t-4 ${accentClass}`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full ${iconBgClass} flex items-center justify-center`}
                  >
                    <WarningSignalIcon icon={group.icon} />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {group.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {group.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <AlertTriangle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${alertClass}`}
                      />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 bg-terracotta-mid/10 border-terracotta-mid">
        <CardContent className="p-5">
          <p className="text-foreground font-medium">
            Wenn Sie mehrere dieser Warnsignale bei sich bemerken, ist es Zeit
            zu handeln. Sprechen Sie mit Ihrem Hausarzt oder suchen Sie
            professionelle Unterstützung.
          </p>
        </CardContent>
      </Card>
    </ContentSection>
  );
}
