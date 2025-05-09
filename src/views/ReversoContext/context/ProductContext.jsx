// 导入 React 的 createContext、useContext 和 useState，用于创建上下文和管理状态
import { createContext, useContext, useState } from "react";

// 创建一个新的上下文对象，用于共享产品状态
const ProductContext = createContext();

// 定义一个提供者组件，用于包裹需要访问上下文的子组件
export const ProductProvider = ({ children }) => {
  // 使用 useState 钩子管理产品状态，初始值为空对象
  const [productStates, setProductStates] = useState({});

  // 定义一个函数，用于切换指定产品的状态（如购物车或愿望清单）
  const toggleState = (productId, stateType) => {
    setProductStates((prevStates) => {
      // 获取当前产品的状态，如果不存在则初始化为默认值
      const currentProductState = prevStates[productId] || {
        cart: false,
        wishlist: false,
      };
      // 返回更新后的状态对象，切换指定的状态类型
      return {
        ...prevStates,
        [productId]: {
          ...currentProductState,
          [stateType]: !currentProductState[stateType], // 切换状态
        },
      };
    });
  };

  // 定义一个函数，用于获取指定产品的状态，如果不存在则返回默认值
  const getProductState = (productId) =>
    productStates[productId] || {
      cart: false,
      wishlist: false,
    };

  // 返回上下文提供者组件，传递状态获取和切换函数作为上下文值
  return (
    <ProductContext.Provider value={{ getProductState, toggleState }}>
      {children}
    </ProductContext.Provider>
  );
};

// 定义一个自定义钩子，用于方便地访问上下文
export const useProductContext = () => {
  // 使用 useContext 钩子获取上下文值
  const context = useContext(ProductContext);
  // 如果上下文为空，抛出错误，提示必须在 ProductProvider 内使用
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context; // 返回上下文值
};
