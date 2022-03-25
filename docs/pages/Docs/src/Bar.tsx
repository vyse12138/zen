import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import Bar from '../../../../src/Bar'
export default function BarPage() {
  window.scrollTo(0, 0)

  return (
    <div style={{ paddingLeft: 20 }}>
      <h1>柱状图</h1>

      <p>
        3D 柱状图比常规的 2D 柱状图多增加了一个维度,
        这使其更便于进行多维数据的展示和比较
      </p>

      <br />
      <h2>例子</h2>

      <div style={{ width: 600 }}>
        <SyntaxHighlighter language='javascript' style={vs2015}>
          {`
<Bar
  data={[
    [98, 77, 101, 99, 40],
    [150, 182, 201, 154, 190],
    [220, 232, 191, 234, 290],
    [320, 332, 301, 334, 390]
  ]}
  size={600}
  xLabels={['2012', '2013', '2014', '2015', '2016']}
  zLabels={['Forest', 'Steppe', 'Desert', 'Wetland']}
  colors={['#f44336', '#4caf50', '#ffeb3b', '#2196f3']}
  transparent={false}
/>
          `}
        </SyntaxHighlighter>
      </div>

      <Bar
        data={[
          [98, 77, 101, 99, 40],
          [150, 182, 201, 154, 190],
          [220, 232, 191, 234, 290],
          [320, 332, 301, 334, 390]
        ]}
        size={600}
        xLabels={['2012', '2013', '2014', '2015', '2016']}
        zLabels={['Forest', 'Steppe', 'Desert', 'Wetland']}
        colors={['#f44336', '#4caf50', '#ffeb3b', '#2196f3']}
        transparent={false}
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
