import { ImageResponse } from "next/og";

export const alt = "seo-aeo — rank in Google and get cited by AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0b0f",
          backgroundImage:
            "radial-gradient(circle at 30% 0%, rgba(52,211,153,0.18), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#9aa3b4",
            fontSize: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(52,211,153,0.12)",
              color: "#34d399",
              fontSize: 26,
            }}
          >
            ▲
          </div>
          seo-aeo
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#e8eaf0" }}>Rank in Google.</span>
          <span
            style={{
              background: "linear-gradient(100deg,#34d399,#22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Get cited by AI.
          </span>
        </div>
        <div style={{ marginTop: 36, color: "#9aa3b4", fontSize: 30, maxWidth: 900 }}>
          Optimize any site for search and AI answer engines — then auto-publish
          an optimized article every week or two.
        </div>
      </div>
    ),
    size,
  );
}
