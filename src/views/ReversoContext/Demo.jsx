import "./Demo.css";

import ProductCardWrapper from "./components/ProductCardWrapper";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (
    <ProductProvider>
      <div className="App">
        <h1>React完美组件的封装</h1>
        <ProductCardWrapper
          productId={"product1"}
          layout="vertical"
          imageSrc={"https://via.placeholder.com/250"}
          title="Product Title 1"
          price="￥99.99"
          badgeType={"premium"}
          showActions={false}
          customFooter={<div className="custom-footer">额外的自定义内容</div>}
        />

        <ProductCardWrapper
          productId={"product2"}
          layout="horizontal"
          imageSrc={"https://via.placeholder.com/250"}
          title="Product Title 2"
          price="￥299.99"
          badgeType={""}
          showActions={true}
          customFooter={<div className="custom-footer">额外的自定义内容</div>}
        />

        <ProductCardWrapper
          productId={"product3"}
          showActions={false}
          price="￥299.99"
          className="custom-product-card"
          style={{
            backgroundColor: "#ccc",
            border: "2px solid #e0e0e0",
          }}
        >
          <ProductCardWrapper.Image src="https://m.360buyimg.com/babel/jfs/t1/105718/32/47548/4135/6601555fFdbb76302/ce8e1355e08435d0.png" />
          <ProductCardWrapper.Title>礼品卡</ProductCardWrapper.Title>
        </ProductCardWrapper>
      </div>
    </ProductProvider>
  );
};
export default App;
