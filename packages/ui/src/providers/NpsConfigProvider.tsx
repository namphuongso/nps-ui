import { ConfigProvider, type ConfigProviderProps } from "antd";

export type NpsConfigProviderProps = ConfigProviderProps;

export function NpsConfigProvider({
  children,
  ...props
}: NpsConfigProviderProps) {
  return <ConfigProvider {...props}>{children}</ConfigProvider>;
}
