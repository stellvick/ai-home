import React, { useState } from 'react'
import { Input, Card, CardBody, Link, Divider, Alert } from '@heroui/react'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import * as yup from 'yup'
import { useAuth } from '../../hooks/useAuth'
import { MysticalButton } from '../common/MysticalButton'
import { loginSchema, LoginFormData } from '../../utils/validators'

export interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const { login, error, clearError } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      setLoginError(null)
      setFormErrors({})
      clearError()

      await loginSchema.validate(formData, { abortEarly: false })
      await login(formData)
      onSuccess?.()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {}
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message
          }
        })
        setFormErrors(newErrors)
      } else {
        const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
        setLoginError(message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)]">
      <CardBody className="gap-4 p-6">
        <h2 className="text-2xl font-bold text-center text-[var(--color-text)] font-cinzel-decorative">
          Mystical Login
        </h2>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Enter your credentials to access the Oracle platform
        </p>

        <Divider className="bg-[var(--color-border)]" />

        {(loginError || error) && (
          <Alert
            color="danger"
            icon={<AlertCircle className="w-4 h-4" />}
            className="bg-red-500/10 text-red-600 dark:text-red-400"
          >
            {loginError || error}
          </Alert>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email address"
              startContent={<Mail className="w-4 h-4 text-[var(--color-text-secondary)]" />}
              className="bg-[var(--color-surface-dark)] text-[var(--color-text)]"
              errorMessage={formErrors.email}
              isInvalid={!!formErrors.email}
            />
          </div>

          <div>
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              startContent={<Lock className="w-4 h-4 text-[var(--color-text-secondary)]" />}
              className="bg-[var(--color-surface-dark)] text-[var(--color-text)]"
              errorMessage={formErrors.password}
              isInvalid={!!formErrors.password}
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="#"
              size="sm"
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-light)]"
            >
              Forgot password?
            </Link>
          </div>

          <MysticalButton
            mysticalVariant="glow"
            type="submit"
            fullWidth
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </MysticalButton>

          <Divider className="bg-[var(--color-border)]" />

          <div className="text-center text-sm text-[var(--color-text-secondary)]">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-light)] font-semibold"
            >
              Register here
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default LoginForm
