import React from 'react';
import { FixedSizeList as List } from 'react-window';
import ProductCardWrapper from '../ReversoContext/components/ProductCardWrapper';
import { ProductProvider } from '../ReversoContext/context/ProductContext';
import './Demo.css';

// 模拟商品数据
const generateProducts = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `product${index + 1}`,
    title: `商品 ${index + 1}`,
    price: `￥${Math.floor(Math.random() * 1000)}.99`,
    imageSrc: `https://picsum.photos/200/200?random=${index + 1}`,
    badgeType: index % 3 === 0 ? 'premium' : '',
    inventory: Math.floor(Math.random() * 100)
  }));
};

const products = generateProducts(1000); // 生成1000个商品数据

// 列表项组件
const Row = ({ index, style }) => {
  const product = products[index];
  return (
    <div style={style}>
      <ProductCardWrapper
        productId={product.id}
        layout="horizontal"
        imageSrc={product.imageSrc}
        title={product.title}
        price={product.price}
        badgeType={product.badgeType}
        inventory={product.inventory}
        showActions={false}
      />
    </div>
  );
};

const VirtualProductList = () => {
  return (
    <ProductProvider>
      <div className="virtual-list-container">
        <List
          height={800} // 列表容器高度
          itemCount={products.length} // 商品总数
          itemSize={200} // 每个商品卡片的高度
          width="100%" // 列表宽度
        >
          {Row}
        </List>
      </div>
    </ProductProvider>
  );
};

export default VirtualProductList;
