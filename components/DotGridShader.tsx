"use client"

// Fallback simple dot grid background without external dependency
// This mimics a subtle dotted texture using CSS gradients.

type DotGridShaderProps = React.HTMLAttributes<HTMLDivElement>

export default function DotGridShader(props: DotGridShaderProps) {
  return (
    <div
      {...props}
      style={{
        backgroundColor: "#000000",
        backgroundImage:
          "radial-gradient(circle, rgba(58,58,58,0.6) 1px, rgba(0,0,0,0) 1px)",
        backgroundSize: "10px 10px",
        width: "100%",
        height: "100%",
        ...(props.style || {}),
      }}
    />
  )
}
