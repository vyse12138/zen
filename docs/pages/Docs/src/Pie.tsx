import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import Pie from '../../../../src/Pie'
export default function PiePage() {
  window.scrollTo(0, 0)

  return (
    <div style={{ paddingLeft: 20 }}>
      <h1>饼状图</h1>

      <p>
        3D 饼状图比常规的 2D 饼状图多增加了一个维度,
        这使其更便于进行多维数据的展示和比较
      </p>

      <br />
      <h2>例子</h2>

      <div style={{ width: 600 }}>
        <SyntaxHighlighter language='javascript' style={vs2015}>
          {`
<Pie
  data={[
    [111, 333, 241, 444, 542],
    [424, 182, 67, 291],
    [352, 111, 222],
    [853, 156, 333, 555]
  ]}
  xLabels={[
    ['iPhone 11', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 13', 'iPhone 14'],
    ['S11', 'S11 Ultra', 'Note 21', 'S12 FE'],
    ['Xiaomi 11', 'Xiaomi 12', 'Xiaomi 10s'],
    ['Mate 40 Pro', 'P30', 'P40', 'Mate 40']
  ]}
  zLabels={['苹果', '三星', '小米', '华为']}
  colors={['#f44336', '#4caf50', '#ffeb3b', '#2196f3']}
  size={600}
  baseHeight={13}
/>
          `}
        </SyntaxHighlighter>
      </div>

      <Pie
        data={[
          [111, 333, 241, 444, 542],
          [424, 182, 67, 291],
          [352, 111, 222],
          [853, 156, 333, 555]
        ]}
        xLabels={[
          ['iPhone 11', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 13', 'iPhone 14'],
          ['S11', 'S11 Ultra', 'Note 21', 'S12 FE'],
          ['Xiaomi 11', 'Xiaomi 12', 'Xiaomi 10s'],
          ['Mate 40 Pro', 'P30', 'P40', 'Mate 40']
        ]}
        zLabels={['苹果', '三星', '小米', '华为']}
        colors={['#f44336', '#4caf50', '#ffeb3b', '#2196f3']}
        size={600}
        baseHeight={13}
      />

      <h2>配置</h2>

      <h3>data</h3>
      <p>类型: number [ ] [ ]</p>
      <p>表示具体数据的二维数组</p>
      <br />

      <h3>size (可选)</h3>
      <p>类型: number</p>
      <p>默认值: 300px</p>
      <p>指定图表大小, 单位为 px</p>
      <br />

      <h3>xLabels (可选)</h3>
      <p>类型: string [ ]</p>
      <p>x 轴的 label</p>
      <br />

      <h3>zLabels (可选)</h3>
      <p>类型: string [ ]</p>
      <p>z 轴的 labels</p>
      <br />

      <h3>baseHeight (可选)</h3>
      <p>类型: number [ ]</p>
      <p>饼图的基础厚度</p>
      <br />

      <h3>colors (可选)</h3>
      <p>类型: string [ ]</p>
      <p>默认值: 绿色</p>
      <p>指定每行的颜色</p>
      <br />

      <h3>transparency (可选)</h3>
      <p>类型: boolean</p>
      <p>默认值: false</p>
      <p>指定背景是否透明</p>
    </div>
  )
}
