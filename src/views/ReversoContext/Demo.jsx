import "./Demo.css";
import { FixedSizeList as List } from 'react-window';
import { useInfiniteScroll } from 'ahooks';
import { useRef, useState, useCallback } from 'react';
import ProductCardWrapper from "./components/ProductCardWrapper";
import { ProductProvider } from "./context/ProductContext";
import { useLazyImage } from './hooks/useLazyImage';

// 生成模拟数据
const generateMockData = (page, pageSize) => {
  const startIndex = page * pageSize;
  return Array.from({ length: pageSize }, (_, index) => ({
    id: `product${startIndex + index}`,
    title: `商品 ${startIndex + index}`,
    price: `￥${Math.floor(Math.random() * 1000)}.${Math.floor(Math.random() * 100)}`,
    inventory: Math.floor(Math.random() * 100),
    imageSrc: `https://picsum.photos/250/250?random=${startIndex + index}`,
  }));
};

const TOTAL_ITEMS = 1000;
const PAGE_SIZE = 20;
const ITEM_HEIGHT = 200;

const App = () => {
  const containerRef = useRef(null);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { loading, loadMore } = useInfiniteScroll(
    (d) => {
      const page = d ? d.list.length / PAGE_SIZE : 0;
      return new Promise((resolve) => {
        setTimeout(() => {
          const list = generateMockData(page, PAGE_SIZE);
          setItems(prev => [...prev, ...list]);
          setHasMore(page * PAGE_SIZE + PAGE_SIZE < TOTAL_ITEMS);
          resolve({
            list,
            total: TOTAL_ITEMS,
          });
        }, 500);
      });
    },
    {
      target: containerRef,
      isNoMore: () => !hasMore,
      threshold: 100,
    }
  );

  const Item = useCallback(({ index, style }) => {
    const item = items[index];
    if (!item) return null;

    const { imageSrc, loading: imageLoading } = useLazyImage(item.imageSrc);

    return (
      <div className="virtual-list-item" style={style}>
        <ProductCardWrapper
          productId={item.id}
          layout="horizontal"
          imageSrc={imageLoading ? 'https://via.placeholder.com/250?text=Loading...' : imageSrc}
          title={item.title}
          price={item.price}
          inventory={item.inventory}
          badgeType=""
          showActions={false}
        />
      </div>
    );
  }, [items]);

  return (
    <ProductProvider>
      <div className="App">
        <div className="virtual-list-container" 
          ref={containerRef} 
          style={{ 
            height: '800px', 
            width: '100%',
            position: 'relative'
          }}
        >
          <List
            height={800}
            itemCount={items.length}
            itemSize={ITEM_HEIGHT}
            width="100%"
          >
            {Item}
          </List>
          {loading && (
            <div className="loading-spinner">
              <span>加载中...</span>
            </div>
          )}
          {!hasMore && items.length > 0 && (
            <div className="custom-footer">
              没有更多数据了
            </div>
          )}
        </div>
      </div>
    </ProductProvider>
  );
};

export default App;
