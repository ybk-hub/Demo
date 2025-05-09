// 导入 React 的 useState 钩子，用于管理组件内部状态
import { useState } from "react";

// 定义一个自定义 Hook，用于管理单个产品的购物车和愿望清单状态
export const useProductActions = (productId) => {
  // 使用 useState 管理是否已添加到购物车的状态，初始值为 false
  const [isAddedToCart, setAddedToCart] = useState(false);

  // 使用 useState 管理是否已添加到愿望清单的状态，初始值为 false
  const [isWishlisted, setWishlisted] = useState(false);

  // 定义一个函数，用于切换购物车状态
  const toggleCart = () => {
    // 切换购物车状态
    setAddedToCart((prevState) => !prevState);
    // 打印状态切换的日志信息
    console.log(
      !isAddedToCart
        ? "Added to cart" + productId // 如果状态变为 true，打印“已添加到购物车”
        : "Removed from cart" + productId // 如果状态变为 false，打印“已从购物车移除”
    );
  };

  // 定义一个函数，用于切换愿望清单状态
  const toggleWishlist = () => {
    // 切换愿望清单状态
    setWishlisted((prevState) => !prevState);
    // 打印状态切换的日志信息
    console.log(
      !isWishlisted
        ? "Added to wishlist" + productId // 如果状态变为 true，打印“已添加到愿望清单”
        : "Removed from wishlist" + productId // 如果状态变为 false，打印“已从愿望清单移除”
    );
  };

  // 返回状态值和操作函数，供组件使用
  return {
    isAddedToCart, // 是否已添加到购物车
    isWishlisted, // 是否已添加到愿望清单
    toggleCart, // 切换购物车状态的函数
    toggleWishlist, // 切换愿望清单状态的函数
  };
};
