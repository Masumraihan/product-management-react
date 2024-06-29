import { Provider } from "react-redux";
import store from "../redux/store";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConfigProvider
        button={{ className: "my-button" }}
        theme={{
          token: {
            colorPrimary: "#00246B",
            colorPrimaryActive: "#00246B",
            borderRadius: 4,
          },
        }}
      >
        <>{children}</>
      </ConfigProvider>
    </Provider>
  );
};

export default Providers;
