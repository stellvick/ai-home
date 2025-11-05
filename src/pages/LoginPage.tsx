import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Spacer, Card, CardBody } from '@heroui/react'
import LoginForm from '../components/auth/LoginForm'
import { Typography } from '../components/theme/Typography'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    navigate('/dashboard')
  }

  const handleSwitchToRegister = () => {
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">✨</div>
        <Typography variant="h1" className="mb-2">
          Oráculo IA
        </Typography>
        <Typography variant="body" className="text-[var(--color-text-secondary)]">
          Mystical Evaluation Platform
        </Typography>
      </div>

      <Spacer y={4} />

      {/* Login Card */}
      <LoginForm onSuccess={handleLoginSuccess} onSwitchToRegister={handleSwitchToRegister} />

      <Spacer y={6} />

      {/* Footer Info */}
      <Card className="w-full max-w-md bg-[var(--color-surface-dark)] border border-[var(--color-border)]">
        <CardBody className="p-4 text-center text-sm text-[var(--color-text-secondary)]">
          <Typography variant="caption">
            This is a mystical platform for evaluating AI-generated content with hybrid human-AI
            validation. <br />
            <br />
            <strong>Demo Credentials:</strong>
            <br />
            Email: oracle@example.com
            <br />
            Password: mysticalPassword123
          </Typography>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginPage
