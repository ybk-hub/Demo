// 导入 CompositeProductCard 组件和自定义 Hook
import CompositeProductCard from "./CompositeProductCard";
import { useProductActions } from "../hooks/useProductActions";

// 定义主组件：ProductCardWrapper，用于封装产品卡片的逻辑和显示
const ProductCardWrapper = ({
  productId, // 产品 ID
  layout = "vertical", // 布局类型（默认垂直布局）
  imageSrc, // 产品图片 URL
  title, // 产品标题
  price, // 产品价格
  inventory, //产品库存
  badgeType, // 产品徽章类型（如促销标签）
  customFooter, // 自定义底部内容
  showActions = true, // 是否显示操作按钮
  className = "", // 自定义 CSS 类名
  style = {}, // 自定义内联样式
  children, // 子组件
}) => {
  // 使用自定义 Hook 管理产品的购物车和愿望清单状态
  const { isAddedToCart, isWishlisted, toggleCart, toggleWishlist } =
    useProductActions(productId);

  // 定义操作按钮的渲染逻辑
  const renderActions = showActions
    ? () => (
        <>
          {/* 添加到购物车按钮 */}
          <CompositeProductCard.ActionButton
            onClick={toggleCart}
            isActive={isAddedToCart}
          >
            {isAddedToCart ? "Remove from Cart" : " Add to Cart"}
          </CompositeProductCard.ActionButton>

          {/* 添加到愿望清单按钮 */}
          <CompositeProductCard.ActionButton
            onClick={toggleWishlist}
            isActive={isWishlisted}
          >
            {isWishlisted ? "Remove from Wishlist" : " Add to Wishlist"}
          </CompositeProductCard.ActionButton>
        </>
      )
    : null; // 如果不显示操作按钮，返回 null

  // 返回封装后的 CompositeProductCard 组件
  return (
    <CompositeProductCard
      productId={productId} // 传递产品 ID
      layout={layout} // 传递布局类型
      renderActions={renderActions} // 传递操作按钮渲染逻辑
      customFooter={customFooter} // 传递自定义底部内容
      className={className} // 传递自定义 CSS 类名
      style={style} // 传递自定义内联样式
    >
      {/* 如果提供了图片 URL，则渲染图片组件 */}
      {imageSrc && (
        <CompositeProductCard.Image src={imageSrc} alt={title || "Product"} />
      )}

      {/* 如果提供了徽章类型，则渲染徽章组件 */}
      {!!badgeType && (
        <CompositeProductCard.Badge type={badgeType}>
          {badgeType || "甄选"} {/* 默认徽章内容为“甄选” */}
        </CompositeProductCard.Badge>
      )}

      {/* 如果提供了子组件，则渲染子组件；否则渲染默认的标题和价格 */}
      {children || (
        <>
          {/* 渲染标题 */}
          {title && (
            <CompositeProductCard.Title>{title}</CompositeProductCard.Title>
          )}

          {/* 渲染价格 */}
          {price && (
            <CompositeProductCard.Price>{price}</CompositeProductCard.Price>
          )}

          {/* 渲染库存 */}
          {inventory && (
              <CompositeProductCard.Inventory>{inventory}</CompositeProductCard.Inventory>
          )}
        </>
      )}
    </CompositeProductCard>
  );
};

// 将子组件挂载到 ProductCardWrapper 上，方便外部使用
ProductCardWrapper.Title = CompositeProductCard.Title;
ProductCardWrapper.Price = CompositeProductCard.Price;
ProductCardWrapper.Image = CompositeProductCard.Image;
ProductCardWrapper.Badge = CompositeProductCard.Badge;
ProductCardWrapper.Inventory = CompositeProductCard.Inventory;
ProductCardWrapper.ActionButton = CompositeProductCard.ActionButton;

// 导出主组件
export default ProductCardWrapper;
