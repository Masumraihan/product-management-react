import { ConfigProvider } from "antd";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "../redux/store";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Helmet>
          <title>Product Management</title>
        </Helmet>
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
      </HelmetProvider>
    </Provider>
  );
};

export default Providers;
