export const generateChartData = () => {
  const now = new Date();
  const data = [];
  
  // Generate alerts data
  const alertsData = {
    id: 'Alerts',
    data: Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      return {
        x: date.toISOString(),
        y: Math.floor(Math.random() * 50) + 10
      };
    }).reverse()
  };

  // Generate data ingested
  const dataIngestedData = {
    id: 'Data Ingested (GB)',
    data: Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      return {
        x: date.toISOString(),
        y: Math.floor(Math.random() * 100) + 50
      };
    }).reverse()
  };

  // Generate cost data
  const costData = {
    id: 'Cost ($)',
    data: Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - i);
      return {
        x: date.toISOString(),
        y: Math.floor(Math.random() * 200) + 100
      };
    }).reverse()
  };

  data.push(alertsData, dataIngestedData, costData);
  return data;
};