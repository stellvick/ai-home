import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be no more than 50 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

export const resourceSchema = yup.object({
  name: yup
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be no more than 100 characters')
    .required('Name is required'),
  api_url: yup
    .string()
    .url('API URL must be a valid URL')
    .required('API URL is required'),
})

export const evaluationSchema = yup.object({
  title: yup
    .string()
    .when('evaluated', {
      is: true,
      then: (schema) =>
        schema
          .min(1, 'Title is required')
          .max(200, 'Title must be no more than 200 characters')
          .required('Title is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  description: yup
    .string()
    .when('evaluated', {
      is: true,
      then: (schema) =>
        schema
          .min(1, 'Description is required')
          .max(1000, 'Description must be no more than 1000 characters')
          .required('Description is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  evaluated: yup.boolean(),
})

export const chatSchema = yup.object({
  name: yup
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be no more than 100 characters')
    .required('Name is required'),
})

export const conversationSchema = yup.object({
  title: yup
    .string()
    .max(200, 'Title must be no more than 200 characters'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
export type ResourceFormData = yup.InferType<typeof resourceSchema>
export type EvaluationFormData = yup.InferType<typeof evaluationSchema>
export type ChatFormData = yup.InferType<typeof chatSchema>
export type ConversationFormData = yup.InferType<typeof conversationSchema>
