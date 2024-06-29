import ogImage from "../assets/og-image.png";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ConfigProvider } from "antd";
import { Helmet, HelmetProvider } from "react-helmet-async";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Helmet>
          <title>Product Management</title>
          <meta
            name='description'
            content='Browse and manage our extensive collection of products. Find the latest and best products in our inventory.'
          />
          <meta name='keywords' content='products, product management, inventory, e-commerce' />
          <link rel='canonical' href={import.meta.env.BASE_URL} />
          <meta property='og:title' content='Product Management' />
          <meta
            property='og:description'
            content='Browse and manage our extensive collection of products. Find the latest and best products in our inventory.'
          />
          <meta property='og:url' content={import.meta.env.BASE_URL} />
          <meta property='og:type' content='website' />
          <meta property='og:image' content={ogImage} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='Product Management' />
          <meta
            name='twitter:description'
            content='Browse and manage our extensive collection of products. Find the latest and best products in our inventory.'
          />
          <meta name='twitter:image' content={ogImage} />
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
