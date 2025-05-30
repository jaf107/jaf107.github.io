import React from "react";

const Logo = ({ size = 64 }: { size?: number }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="relative rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20"
    >
      <div className="absolute inset-2 bg-background dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
        <span className="font-bold text-primary text-sm">AJ</span>
      </div>
    </div>
  );
};

export default Logo;
