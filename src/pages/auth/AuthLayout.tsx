import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#dde1e7", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "900px", background: "#fff", borderRadius: "20px", boxShadow: "0 8px 40px rgba(0,0,0,0.12)", overflow: "hidden", display: "flex", minHeight: "560px" }}>
        {/* Form panel */}
        <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 52px" }}>
          {children}
        </div>
        {/* Image panel */}
        <div style={{ width: "420px", flexShrink: 0, display: "none" }} className="md-image-panel">
          <img src="/Images/golden-statue.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>
      <style>{`@media (min-width: 768px) { .md-image-panel { display: block !important; } }`}</style>
    </div>
  );
}
