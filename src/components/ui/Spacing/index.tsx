import React from 'react';

interface SpacingProps {
  size: number;
  horizontal?: boolean;
}

export function Spacing({ size, horizontal = false }: SpacingProps) {
  const style = horizontal
    ? { width: `${size}px`, minWidth: `${size}px` }
    : { height: `${size}px`, minHeight: `${size}px` };

  return <div style={style} />;
}
