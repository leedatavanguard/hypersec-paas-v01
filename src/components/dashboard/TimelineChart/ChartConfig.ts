export const chartConfig = {
  margin: { top: 50, right: 110, bottom: 50, left: 60 },
  curve: 'monotoneX' as const,
  enablePoints: true,
  pointSize: 8,
  pointColor: { theme: 'background' },
  pointBorderWidth: 2,
  pointBorderColor: { from: 'serieColor' },
  enableArea: true,
  areaOpacity: 0.1,
  useMesh: true,
  enableSlices: 'x' as const,
  legends: [
    {
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 80,
      itemHeight: 20,
      symbolSize: 12,
      symbolShape: 'circle'
    }
  ],
  xScale: { 
    type: 'point',
    useUTC: true 
  },
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: false
  },
  axisTop: null,
  axisRight: null,
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Time',
    legendOffset: 36,
    legendPosition: 'middle'
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Count',
    legendOffset: -40,
    legendPosition: 'middle'
  }
};