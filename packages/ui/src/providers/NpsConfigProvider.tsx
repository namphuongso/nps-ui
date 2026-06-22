import { ConfigProvider, type ConfigProviderProps } from "antd";

export type NpsConfigProviderProps = ConfigProviderProps;

export function NpsConfigProvider({
  children,
  theme,
  ...props
}: NpsConfigProviderProps) {
  const mergedTheme: ConfigProviderProps["theme"] = {
    ...theme,
    token: {
      colorPrimary: "#05397b",
      borderRadius: 8,
      fontFamily: "Outfit, system-ui, sans-serif",
      ...theme?.token,
    },
  };

  return (
    <ConfigProvider theme={mergedTheme} {...props}>
      {children}
    </ConfigProvider>
  );
}
