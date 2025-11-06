import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@heroui/react'
import { loginSchema } from '../validation/login.schema'
import { api } from '../../../services/api'
import { useAuthStore } from '../../../store/auth'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../../routes/paths'
import { MysticalBackground } from '../../../components/ui/MysticalBackground'
import { MysticalCard } from '../../../components/ui/MysticalCard'
import logo from '../../../assets/logo.png'

interface LoginForm {
  email: string
  senha: string
}

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: 'test@example.com',
      senha: 'password'
    }
  })
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    setError('')
    try {
      const response = await api.login(data)
      login(response.token)
      navigate(paths.dashboard)
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.')
      console.error('Login failed', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MysticalBackground className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl mb-6 shadow-2xl shadow-primary/20">
            <img src={logo} alt="IA Oracle Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-heading text-white mb-3 tracking-heading drop-shadow-lg">
            IA Oracle
          </h1>
        </div>

        <MysticalCard className="p-8" bodyClassName="space-y-6 px-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/90">
                Email
              </label>
              <Input
                type="email"
                {...register('email')}
                placeholder="seu@email.com"
                className="w-full"
                classNames={{
                  input: "bg-[#374151] border-[#4B5563] text-[#F5F5F5] placeholder:text-[#9CA3AF] focus:border-[#4B0082] rounded-xl",
                  inputWrapper: "bg-[#374151] border-[#4B5563] hover:border-[#4B0082] focus:border-[#4B0082] rounded-xl shadow-sm p-3",
                }}
              />
              {errors.email && (
                <p className="text-red-400 text-sm ml-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/90">
                Senha
              </label>
              <Input
                type="password"
                {...register('senha')}
                placeholder="••••••••"
                className="w-full"
                classNames={{
                  input: "bg-[#374151] border-[#4B5563] text-[#F5F5F5] placeholder:text-[#9CA3AF] focus:border-[#4B0082] rounded-xl",
                  inputWrapper: "bg-[#374151] border-[#4B5563] hover:border-[#4B0082] focus:border-[#4B0082] rounded-xl shadow-sm p-3",
                }}
              />
              {errors.senha && (
                <p className="text-red-400 text-sm ml-1">{errors.senha.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4B0082] hover:bg-[#6B0A9A] text-white font-bold py-4 px-8 shadow-2xl hover:shadow-[0_0_30px_rgba(75,0,130,0.5)] transition-all duration-500 border-0 rounded-2xl mt-8 hover:scale-105 text-lg tracking-wide relative overflow-hidden group"
              size="lg"
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? 'Entrando...' : 'Entrar'}
                {!isLoading && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
            {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          </form>
        </MysticalCard>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm italic drop-shadow-sm">
            "No silêncio das estrelas, o conhecimento aguarda aqueles que ousam perguntar"
          </p>
        </div>
      </div>
    </MysticalBackground>
  )
}