// 模拟1000条商品数据，包括图片、标题、价格。
import Mock from 'mockjs'; 

const mockData = Mock.mock({
    'list|10000': [{
      'id|+1': 1, 
      'image': '@image("200x200", "#50B347", "#FFF", "Mock")',
      'title': '@ctitle(3, 8)',
      'price': '@float(10, 1000, 2, 2)'
    }]
  });
  export default mockData;