import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    
    <div className="w-full h-svh flex items-center justify-center absolute inset-0 -z-10 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {children}
    </div>
  );
}
