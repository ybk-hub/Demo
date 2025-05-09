/* eslint-disable react/display-name */

// 导入样式文件
import "./CompositeProductCard.css";

// 导入 React 和上下文钩子
import React from "react";
import { useProductContext } from "../context/ProductContext";

// 定义子组件：Image，用于显示产品图片
const Image = ({ src, alt }) => {
  return (
    <div className="product-image">
      <img src={src} alt={alt} />
    </div>
  );
};

// 定义子组件：Title，用于显示产品标题
const Title = ({ children }) => {
  return <div className="product-title">{children}</div>;
};

// 定义子组件：Price，用于显示产品价格
const Price = ({ children }) => {
  return <div className="product-price">{children}</div>;
};

// 定义子组件：Badge，用于显示产品徽章（如促销标签）
const Badge = ({ children, type }) => {
  return (
    <div className={`product-badge product-badge-${type}`}>{children}</div>
  );
};

// 定义子组件：Inventory，用于显示库存
const Inventory = ({ children }) =>{
  return <div className="product-inventory">{children}</div>;
}

// 定义子组件：ActionButton，用于显示操作按钮（如添加到购物车）
const ActionButton = ({ children, onClick, isActive }) => {
  return (
    <button
      className={`action-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// 定义主组件：CompositeProductCard，用于组合显示产品信息
const CompositeProductCard = ({
  productId, // 产品 ID
  children, // 子组件
  customFooter, // 自定义底部内容
  renderActions, // 自定义操作按钮渲染函数
  layout = "vertical", // 布局类型（默认垂直布局）
  className = "", // 自定义 CSS 类名
  style = {}, // 自定义内联样式
}) => {
  // 从上下文中获取产品状态和状态切换函数
  const { getProductState, toggleState } = useProductContext();
  const { cart, wishlist } = getProductState(productId); // 获取当前产品的购物车和愿望清单状态

  // 根据布局类型设置 CSS 类名
  const layoutClass =
    layout === "horizontal"
      ? "product-card-horizontal"
      : "product-card-vertical";

  // 查找指定类型的子组件（如 Image 或 Badge）
  const findChildComponent = (ComponentType) =>
    React.Children.toArray(children).find(
      (child) => child.type === ComponentType
    );

  // 过滤掉指定类型的子组件，返回其他子组件
  const filterChildrenComponents = (ComponentType) =>
    React.Children.toArray(children).filter(
      (child) => child.type !== ComponentType
    );

  // 获取 Image 和 Badge 子组件
  const imageComponent = findChildComponent(Image);
  const badgeComponent = findChildComponent(Badge);

  // 获取除 Image 和 Badge 外的其他子组件
  const otherComponents = filterChildrenComponents(Image).filter(
    (child) => child.type !== Badge
  );

  // 返回组合产品卡片的 JSX 结构
  return (
    <div
      className={`composite-product-card ${layoutClass} ${className}`}
      style={style}
    >
      {/* 图片和徽章部分 */}
      <div className="product-image-container">
        {imageComponent}
        {badgeComponent}
      </div>

      {/* 产品详情部分 */}
      <div className="product-details">
        {otherComponents}
        {/* 如果提供了 renderActions，则渲染操作按钮 */}
        {renderActions && (
          <div className="product-actions">
            {renderActions({
              isAddedToCart: cart, // 是否已添加到购物车
              isWishlisted: wishlist, // 是否已添加到愿望清单
              toggleCart: () => toggleState(productId, "cart"), // 切换购物车状态
              toggleWishlist: () => toggleState(productId, "wishlist"), // 切换愿望清单状态
            })}
          </div>
        )}

        {/* 如果提供了 customFooter，则渲染自定义底部内容 */}
        {customFooter && <div className="product-footer">{customFooter}</div>}
      </div>
    </div>
  );
};

// 将子组件挂载到 CompositeProductCard 上，方便外部使用
CompositeProductCard.Image = Image;
CompositeProductCard.Title = Title;
CompositeProductCard.Price = Price;
CompositeProductCard.Badge = Badge;
CompositeProductCard.Inventory = Inventory;
CompositeProductCard.ActionButton = ActionButton;

// 导出主组件
export default CompositeProductCard;
