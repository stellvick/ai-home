import * as yup from 'yup'

// Login form validation
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>

// Registration form validation
export const registrationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain lowercase letter')
    .matches(/[A-Z]/, 'Password must contain uppercase letter')
    .matches(/[0-9]/, 'Password must contain number')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm password'),
})

export type RegistrationFormData = yup.InferType<typeof registrationSchema>

// Password reset validation
export const passwordResetSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
})

export type PasswordResetData = yup.InferType<typeof passwordResetSchema>

// Evaluation submission validation
export const evaluationSchema = yup.object().shape({
  title: yup
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must not exceed 200 characters')
    .required('Title is required'),
  description: yup.string().max(1000, 'Description must not exceed 1000 characters'),
  type: yup
    .string()
    .oneOf(['prompt', 'response', 'image', 'document', 'conversation'])
    .required('Resource type is required'),
  tags: yup.array().of(yup.string()).max(10, 'Maximum 10 tags allowed'),
})

export type EvaluationFormData = yup.InferType<typeof evaluationSchema>

// Chat message validation
export const messageSchema = yup.object().shape({
  content: yup
    .string()
    .min(1, 'Message cannot be empty')
    .max(10000, 'Message is too long')
    .required('Message is required'),
})

export type MessageFormData = yup.InferType<typeof messageSchema>

// Profile update validation
export const profileSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .required('Username is required'),
  biography: yup.string().max(500, 'Biography must not exceed 500 characters'),
  avatar: yup.string().url('Please enter a valid URL for avatar'),
})

export type ProfileFormData = yup.InferType<typeof profileSchema>
