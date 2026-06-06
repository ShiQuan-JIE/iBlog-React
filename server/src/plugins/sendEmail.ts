// 邮件发送服务
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

const config = {
  service: process.env.EMAIL_SERVICE || 'QQ',
  user: process.env.EMAIL_USER || '',
  pass: process.env.EMAIL_PASS || '',
}

// 创建 SMTP 传输器
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: config.service,
    auth: { user: config.user, pass: config.pass },
  })
)

interface SendMailOptions {
  recipient: string // 收件人
  subject: string   // 主题
  html: string      // HTML 内容
}

/**
 * 发送邮件
 */
export function sendEmail(options: SendMailOptions): void {
  transporter.sendMail(
    {
      from: config.user,
      to: options.recipient,
      subject: `${options.subject} 你好! 你有新邮件了, 请查收`,
      html: options.html,
    },
    (error) => {
      if (error) {
        console.error('邮件发送失败:', error)
        return
      }
      console.log('邮件发送成功')
    }
  )
}

export default sendEmail
