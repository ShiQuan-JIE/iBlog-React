// 关于
import { Card } from 'antd'

const About: React.FC = () => (
  <Card title="关于我">
    <p>欢迎来到 <strong>iBlog</strong>！</p>
    <p>这是一个基于 <strong>React 19 + Express + Prisma + PostgreSQL</strong> 构建的个人博客系统。</p>
    <h3>技术栈</h3>
    <ul>
      <li>前端：React 19 + Vite 5 + TypeScript + Redux Toolkit + Ant Design 5</li>
      <li>后端：Express 4 + Prisma 5 + PostgreSQL</li>
      <li>认证：JWT + bcryptjs</li>
      <li>文件上传：Multer</li>
    </ul>
    <h3>联系我</h3>
    <p>Email: admin@iblog.com</p>
  </Card>
)

export default About
