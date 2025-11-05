import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Card, CardBody, CardHeader } from '@heroui/react'
import { loginSchema } from '../validation/login.schema'
import { api } from '../../../services/api'
import { useAuthStore } from '../../../store/auth'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../../routes/paths'
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

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await api.login(data)
      login(response.token)
      navigate(paths.dashboard)
    } catch (error) {
      console.error('Login failed', error)
      // Show error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0B2545] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4B0082]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2E2E2E]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header with branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl mb-6 shadow-2xl shadow-primary/20">
            <img src={logo} alt="Oráculo IA Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-heading text-white mb-3 tracking-heading drop-shadow-lg">
            Oráculo IA
          </h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 relative overflow-hidden">
          {/* Card background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B0082] via-[#D4AF37] to-[#4B0082] rounded-t-3xl"></div>
          
          <div className="relative z-10">
            <CardBody className="space-y-6 px-0">
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
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Entrar
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </form>
          </CardBody>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm italic drop-shadow-sm">
            "No silêncio das estrelas, o conhecimento aguarda aqueles que ousam perguntar"
          </p>
        </div>
      </div>
    </div>
  )
}