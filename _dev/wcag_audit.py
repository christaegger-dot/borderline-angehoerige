"""
WCAG-AA-Kontrast-Audit
Prüft die wichtigsten Farbkombinationen des Editorial Design Systems
gegen WCAG 2.1 AA (Mindest-Kontrastverhältnis 4.5:1 für Normaltext, 3:1 für Grosstext).

Farben aus tailwind-theme.css (oklch → sRGB konvertiert).
"""
import math

# --- oklch → sRGB Konvertierung ---

def oklch_to_oklab(L, C, h_deg):
    h = math.radians(h_deg)
    a = C * math.cos(h)
    b = C * math.sin(h)
    return L, a, b

def oklab_to_linear_srgb(L, a, b):
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l = l_**3
    m = m_**3
    s = s_**3
    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    b_ = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, b_

def linear_to_srgb(c):
    c = max(0.0, min(1.0, c))
    if c <= 0.0031308:
        return 12.92 * c
    return 1.055 * (c ** (1/2.4)) - 0.055

def oklch_to_srgb(L, C, h):
    lab = oklch_to_oklab(L, C, h)
    lin = oklab_to_linear_srgb(*lab)
    return tuple(linear_to_srgb(c) for c in lin)

def relative_luminance(r, g, b):
    def f(c):
        if c <= 0.04045:
            return c / 12.92
        return ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)

def contrast_ratio(rgb1, rgb2):
    L1 = relative_luminance(*rgb1)
    L2 = relative_luminance(*rgb2)
    lighter = max(L1, L2)
    darker = min(L1, L2)
    return (lighter + 0.05) / (darker + 0.05)

# --- Farbtokens aus tailwind-theme.css ---
# Format: (L, C, h) in oklch

TOKENS = {
    # Backgrounds
    "background":       (0.97,  0.02,  85),   # warmer Cream (Phase 1)
    "cream":            (0.98,  0.01,  85),
    "sage-pale":        (0.96,  0.02, 160),
    "card":             (0.985, 0.005, 85),

    # Text
    "foreground":       (0.20,  0.01, 240),   # Charcoal
    "muted-foreground": (0.50,  0.01, 240),

    # Akzente
    "terracotta":       (0.55,  0.14,  35),   # WCAG-nachgedunkelt (Phase 1)
    "terracotta-mid":   (0.50,  0.13,  35),
    "sage-dark":        (0.42,  0.07, 160),   # Invitation-Button
    "sage-darker":      (0.37,  0.07, 160),
    "sage-mid":         (0.52,  0.09, 190),   # oklch(0.52 0.09 190) aus tailwind-theme.css
    "alert":            (0.52,  0.18,  30),   # Krise-Sektion

    # Weiss (für Buttons mit farbigem Hintergrund)
    "white":            (1.00,  0.00,   0),
}

def srgb(name):
    return oklch_to_srgb(*TOKENS[name])

# --- Zu prüfende Kombinationen ---
CHECKS = [
    # (Vordergrund, Hintergrund, Kontext, Grosstext?)
    ("foreground",       "background",    "Charcoal-Text auf Cream-BG",            False),
    ("foreground",       "card",          "Charcoal-Text auf Card-BG",             False),
    ("muted-foreground", "background",    "Muted-Text auf Cream-BG",               False),
    ("muted-foreground", "card",          "Muted-Text auf Card-BG",                False),
    ("terracotta",       "background",    "Terracotta auf Cream-BG",               True),   # Grosstext (h2)
    ("terracotta",       "card",          "Terracotta auf Card-BG",                True),
    ("terracotta-mid",   "background",    "Terracotta-Mid auf Cream-BG",           True),
    ("sage-dark",        "background",    "Sage-Dark auf Cream-BG",                True),
    ("sage-mid",         "background",    "sage-mid auf Cream-BG (kicker-Farbe)",  False),  # kicker nutzt muted-foreground, nicht sage-mid
    ("white",            "sage-dark",     "Weiss auf Sage-Dark (Invitation-Btn)",  False),
    ("white",            "terracotta",    "Weiss auf Terracotta (CTA-Button)",     False),
    ("white",            "alert",         "Weiss auf Alert-Rot (Krise-Sektion)",   False),
    ("foreground",       "sage-pale",     "Charcoal auf Sage-Pale (Story-BG)",     False),
    ("muted-foreground", "sage-pale",     "Muted auf Sage-Pale (Story-BG)",        False),
]

AA_NORMAL = 4.5
AA_LARGE  = 3.0

print("=" * 72)
print("WCAG-AA-Kontrast-Audit – Editorial Design System")
print("Borderline-Angehörige · 26. April 2026")
print("=" * 72)
print(f"{'Kombination':<45} {'Ratio':>6}  {'Schwelle':>8}  {'Status'}")
print("-" * 72)

all_pass = True
for fg_name, bg_name, label, large_text in CHECKS:
    fg = srgb(fg_name)
    bg = srgb(bg_name)
    ratio = contrast_ratio(fg, bg)
    threshold = AA_LARGE if large_text else AA_NORMAL
    status = "✅ PASS" if ratio >= threshold else "❌ FAIL"
    if ratio < threshold:
        all_pass = False
    print(f"{label:<45} {ratio:>6.2f}  {threshold:>8.1f}  {status}")

print("-" * 72)
if all_pass:
    print("GESAMT: ✅ Alle Kombinationen bestehen WCAG AA.")
else:
    print("GESAMT: ❌ Mindestens eine Kombination unterschreitet WCAG AA.")
print("=" * 72)
