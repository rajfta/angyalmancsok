import { type FC, type ReactNode } from "react";
import { Button, ConfigProvider, theme } from "antd";

type Props = {
    children: ReactNode;
};

const AntdProvider: FC<Props> = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: "#00b96b",
                    borderRadius: 4,
                    colorBgContainer: "#f6ffed",
                },
            }}
        >
            {/* <Button type="primary" size="large">
                Hello
            </Button> */}
            {children}
        </ConfigProvider>
    );
};

export default AntdProvider;
