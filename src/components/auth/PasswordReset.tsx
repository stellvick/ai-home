import React, { useState } from 'react'
import { Input, Card, CardBody, Link, Divider, Alert } from '@heroui/react'
import { Mail, AlertCircle } from 'lucide-react'
import * as yup from 'yup'
import { useAuth } from '../../hooks/useAuth'
import { MysticalButton } from '../common/MysticalButton'

export const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      setError(null)

      const emailSchema = yup.string().email('Invalid email').required('Email is required')
      await emailSchema.validate(email)

      await resetPassword(email)
      setSuccess(true)
      setEmail('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)]">
      <CardBody className="gap-4 p-6">
        <h2 className="text-2xl font-bold text-center text-[var(--color-text)] font-cinzel-decorative">
          Reset Password
        </h2>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Enter your email to receive a password reset link
        </p>

        <Divider className="bg-[var(--color-border)]" />

        {success && (
          <Alert color="success" className="bg-green-500/10 text-green-600 dark:text-green-400">
            Check your email for password reset instructions
          </Alert>
        )}

        {error && (
          <Alert
            color="danger"
            icon={<AlertCircle className="w-4 h-4" />}
            className="bg-red-500/10 text-red-600 dark:text-red-400"
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            startContent={<Mail className="w-4 h-4 text-[var(--color-text-secondary)]" />}
            className="bg-[var(--color-surface-dark)] text-[var(--color-text)]"
          />

          <MysticalButton
            mysticalVariant="glow"
            type="submit"
            fullWidth
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </MysticalButton>

          <Divider className="bg-[var(--color-border)]" />

          <div className="text-center text-sm text-[var(--color-text-secondary)]">
            <Link href="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-light)]">
              Back to login
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default PasswordReset
