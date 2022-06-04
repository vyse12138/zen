import { Link } from 'react-router-dom'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function GettingStarted() {
  window.scrollTo(0, 0)
  SyntaxHighlighter.registerLanguage('javascript', js)

  return (
    <div style={{ paddingLeft: 20 }}>
      <h1>上手</h1>

      <p>Zen 是一款开源的, 基于数据驱动的 3D 图表库</p>
      <p>
        目前支持以 React 组件的形式来使用, 未来也会支持 Vue, 原生 JS ,
        或其他框架
      </p>

      <br />
      <h2>安装</h2>
      <p> 可以通过以下的方式来安装依赖:</p>

      <SyntaxHighlighter language='javascript' style={vs2015}>
        {`
// 使用 npm 安装
npm i three zenjs-react

// 使用 yarn 安装
yarn add three zenjs-react
          `}
      </SyntaxHighlighter>

      <br />
      <h2>使用</h2>
      <p>图表目前支持旋转, 滑动, 缩放, 以及 hover 效果</p>
      <p>在电脑端: 左键拖拽进行旋转, 右键拖拽进行滑动, 滚轮进行缩放</p>
      <p>
        在手机端: 单指拖拽进行旋转, 双指拖拽进行滑动, 双指捏合进行缩放, 轻点展开
        hover 效果
      </p>

      <br />
      <h2>创建第一个 3D 图表</h2>
      <p>跟随下面的链接去试试吧</p>

      <Link
        style={{
          fontSize: 16,
          textDecoration: 'none'
        }}
        to='bar'
      >
        创建一个 3D 柱状图
      </Link>
      <br />
      <br />
      <br />
    </div>
  )
}
