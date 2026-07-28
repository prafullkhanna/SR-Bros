import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const runtime = "edge";

/** Route handlers may not export `size`/`contentType`, so keep them local. */
const size = { width: 1200, height: 630 };

/**
 * Dynamic Open Graph image.
 * `/og` renders the site default; `/og?title=…&subtitle=…` renders a page card.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.headline;
  const subtitle = searchParams.get("subtitle") ?? siteConfig.subheadline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #05060a 0%, #0e1118 55%, #141824 100%)",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 14,
              border: "1px solid rgba(77,124,255,0.5)",
              background: "rgba(77,124,255,0.12)",
              color: "#35d6f5",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            SR
          </div>
          <div style={{ fontSize: 28, letterSpacing: -0.5 }}>SRbros.in</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 44 ? 60 : 76,
              lineHeight: 1.04,
              letterSpacing: -2.5,
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              lineHeight: 1.4,
              color: "#a3adc2",
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#6b768d",
          }}
        >
          <span>Sommay &amp; Ramansh Khanna</span>
          <span style={{ color: "#35d6f5" }}>Robotics · AI · Software</span>
        </div>
      </div>
    ),
    size,
  );
}
