import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0a0a0a",
          color: "#f0ede6",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Georgia, serif",
          height: "100%",
          justifyContent: "center",
          padding: 80,
          width: "100%",
        }}
      >
        <div style={{ color: "#b5f44a", fontSize: 32, marginBottom: 28 }}>
          Software Engineer & Designer
        </div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          Muhammad Umar Malik
        </div>
        <div
          style={{
            color: "#9a9a8e",
            fontFamily: "Arial, sans-serif",
            fontSize: 34,
            lineHeight: 1.25,
            marginTop: 30,
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          I help small businesses fix slow websites, automate work, and grow.
        </div>
      </div>
    ),
    size,
  );
}
