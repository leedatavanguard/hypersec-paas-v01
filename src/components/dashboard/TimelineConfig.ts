export const chartTheme = {
  axis: {
    ticks: {
      text: {
        fontSize: 12,
      },
    },
    legend: {
      text: {
        fontSize: 14,
        fontWeight: 500,
      },
    },
  },
  grid: {
    line: {
      stroke: '#e0e0e0',
      strokeWidth: 1,
    },
  },
};

export const chartMargin = { top: 50, right: 110, bottom: 50, left: 60 };

export const chartLegend = {
  anchor: 'bottom-right' as const,
  direction: 'column' as const,
  justify: false,
  translateX: 100,
  translateY: 0,
  itemsSpacing: 0,
  itemDirection: 'left-to-right' as const,
  itemWidth: 80,
  itemHeight: 20,
  itemOpacity: 0.75,
  symbolSize: 12,
  symbolShape: 'circle' as const,
  symbolBorderColor: 'rgba(0, 0, 0, .5)',
  effects: [
    {
      on: 'hover' as const,
      style: {
        itemBackground: 'rgba(0, 0, 0, .03)',
        itemOpacity: 1
      }
    }
  ]
};

export const getYAxisLabel = (metric: 'alerts' | 'data' | 'cost'): string => {
  switch (metric) {
    case 'alerts':
      return 'Number of Alerts';
    case 'data':
      return 'Data Ingested (TB)';
    case 'cost':
      return 'Cost ($)';
  }
};