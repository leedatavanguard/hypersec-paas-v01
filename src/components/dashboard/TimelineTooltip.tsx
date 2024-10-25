import React from 'react';

interface TooltipProps {
  point: {
    data: {
      x: string;
      y: number;
    };
    serieId: string;
  };
}

export const TimelineTooltip: React.FC<TooltipProps> = ({ point }) => (
  <div
    style={{
      background: 'white',
      padding: '9px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  >
    <div style={{ marginBottom: 4 }}><strong>{point.data.x}</strong></div>
    <div>{point.data.y} {point.serieId}</div>
  </div>
);