import { ImageResponse } from "next/og";

export const alt = "Adlac Realty — a more considered way home";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "90px 110px", background: "#1e2b25", color: "#f7f4e9" }}><div style={{ display: "flex", alignItems: "center", gap: 15, color: "#d3c28f", fontSize: 22, letterSpacing: 8 }}>ADLAC <span style={{ color: "#f7f4e9", fontSize: 12, letterSpacing: 5 }}>REALTY</span></div><div style={{ display: "flex", marginTop: 45, fontSize: 72, lineHeight: 1.08, fontFamily: "Georgia" }}>A more considered<br/>way home.</div><div style={{ display: "flex", marginTop: 30, color: "#cad0c8", fontSize: 22 }}>Thoughtfully selected homes across Mumbai.</div><div style={{ display: "flex", marginTop: 55, color: "#b4a16d", fontSize: 14, letterSpacing: 4 }}>MUMBAI · THANE · NAVI MUMBAI</div></div>, size);
}
