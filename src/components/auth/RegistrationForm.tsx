import React, { useState } from 'react'
import { Input, Card, CardBody, Link, Divider, Alert, Checkbox } from '@heroui/react'
import { Mail, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react'
import * as yup from 'yup'
import { useAuth } from '../../hooks/useAuth'
import { MysticalButton } from '../common/MysticalButton'
import { registrationSchema, RegistrationFormData } from '../../utils/validators'

export interface RegistrationFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { register, error, clearError } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
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
      setRegisterError(null)
      setFormErrors({})
      clearError()

      if (!agreedToTerms) {
        setRegisterError('You must agree to the terms and conditions')
        return
      }

      await registrationSchema.validate(formData, { abortEarly: false })
      await register(formData)
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
        const message = err instanceof Error ? err.message : 'Registration failed. Please try again.'
        setRegisterError(message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)]">
      <CardBody className="gap-4 p-6">
        <h2 className="text-2xl font-bold text-center text-[var(--color-text)] font-cinzel-decorative">
          Join the Oracle
        </h2>

        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Create your mystical account to begin your journey
        </p>

        <Divider className="bg-[var(--color-border)]" />

        {(registerError || error) && (
          <Alert
            color="danger"
            icon={<AlertCircle className="w-4 h-4" />}
            className="bg-red-500/10 text-red-600 dark:text-red-400"
          >
            {registerError || error}
          </Alert>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Username (3-20 characters)"
              startContent={<User className="w-4 h-4 text-[var(--color-text-secondary)]" />}
              className="bg-[var(--color-surface-dark)] text-[var(--color-text)]"
              errorMessage={formErrors.username}
              isInvalid={!!formErrors.username}
            />
          </div>

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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 8 characters)"
              startContent={<Lock className="w-4 h-4 text-[var(--color-text-secondary)]" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              className="bg-[var(--color-surface-dark)] text-[var(--color-text)]"
              errorMessage={formErrors.password}
              isInvalid={!!formErrors.password}
            />
          </div>

          <div>
            <Input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              startContent={<Lock className="w-4 h-4 text-[var(--color-text-secondary)]" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              className="bg-[var(--color-surface-dark)] text-[var(--color-text)]"
              errorMessage={formErrors.confirmPassword}
              isInvalid={!!formErrors.confirmPassword}
            />
          </div>

          <Checkbox
            isSelected={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="text-[var(--color-text-secondary)]"
          >
            <span className="text-sm text-[var(--color-text-secondary)]">
              I agree to the{' '}
              <Link href="#" className="text-[var(--color-accent)]">
                terms and conditions
              </Link>
            </span>
          </Checkbox>

          <MysticalButton
            mysticalVariant="glow"
            type="submit"
            fullWidth
            disabled={isSubmitting || !agreedToTerms}
            isLoading={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Register'}
          </MysticalButton>

          <Divider className="bg-[var(--color-border)]" />

          <div className="text-center text-sm text-[var(--color-text-secondary)]">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[var(--color-accent)] hover:text-[var(--color-accent-light)] font-semibold"
            >
              Login here
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

export default RegistrationForm
