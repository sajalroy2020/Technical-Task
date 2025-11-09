import React from 'react';

export function LightBulb({ isOn, brightness, color }) {
  const intensity = isOn ? brightness : 0

  // Warm color for the glow when on
  const glowColor = isOn ? color : "transparent"  

  const glowSize = isOn ? 120 + (brightness / 100) * 180 : 0
  const glowBlur = isOn ? 30 + (brightness / 100) * 40 : 0
  const glowOpacity = isOn ? (brightness / 100) * 0.5 : 0

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      <div
        className="absolute rounded-full blur-3xl z-10 transition-all duration-500"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: glowColor,
          opacity: glowOpacity,
          boxShadow: isOn ? `0 0 ${glowBlur}px ${color}` : "none",
          filter: `blur(${glowBlur}px)`,
        }}
      />

      <div className="relative w-40 h-56">
        {/* Base/Cap of the bulb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-6 bg-linear-to-b from-[#4A5565] to-[#364153] rounded-t-md" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 flex flex-col">
          <div className="h-1 bg-[#364153] border-b border-[#4A5565]" />
          <div className="h-1 bg-[#364153] border-b border-[#4A5565]" />
          <div className="h-1 bg-[#364153] border-b border-[#4A5565]" />
          <div className="h-1 bg-[#364153] border-b border-[#4A5565]" />
        </div>

        {/* Main bulb sphere */}
        <div className="absolute top-9 left-1/2 -translate-x-1/2 w-28 h-36">
          <div className={`w-full h-full rounded-full transition-all duration-500 shadow-2xl relative overflow-hidden`}
            style={{
              background: isOn
                ? `radial-gradient(circle at 35% 35%, ${color}, ${color}dd 40%, ${adjustBrightness(color, -20)} 100%)`
                : "radial-gradient(circle at 35% 35%, #4A5568, #2D3748 40%, #1A202C 100%)",
              boxShadow: isOn
                ? `0 0 60px ${color}, inset -20px -20px 60px rgba(0,0,0,0.3), inset 15px 15px 40px rgba(255,255,255,0.15)`
                : "0 10px 40px rgba(0,0,0,0.8), inset -10px -10px 30px rgba(0,0,0,0.5), inset 8px 8px 20px rgba(255,255,255,0.1)",
            }}
          >
            {isOn && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-14 bg-gray-200 rounded-full shadow-lg"
                style={{ boxShadow: "0 0 8px rgba(255,255,255,0.8)" }}
              />
            )}

            {!isOn && (
              <div className="absolute top-6 left-4 w-10 h-10 rounded-full opacity-0 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.6), transparent)",
                  opacity: isOn ? (intensity / 100) * 0.4 : 0.1,
                }}
              />
            )}
          </div>
        </div>        
      </div>
    </div>
  )
}

// Helper function to adjust hex color brightness
function adjustBrightness(hex, percent) {
  const num = Number.parseInt(hex.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.max(0, Math.min(255, (num >> 16) + amt))
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt))
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt))
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
}
