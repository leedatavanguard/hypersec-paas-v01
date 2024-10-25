import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#123456',
    colorInfo: '#56789A',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorTextBase: '#2c3e50',
    borderRadius: 6,
    wireframe: false,
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    Button: {
      algorithm: true,
      borderRadius: 6,
      controlHeight: 36,
      paddingContentHorizontal: 16,
    },
    Card: {
      borderRadiusLG: 8,
      boxShadowTertiary: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    },
    Layout: {
      headerBg: '#ffffff',
      bodyBg: '#f5f7fa',
      colorBgContainer: '#ffffff',
    },
    Menu: {
      itemBorderRadius: 6,
      itemMarginInline: 8,
      itemPaddingInline: 12,
    },
  },
}

export default theme;