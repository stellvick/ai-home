import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Page not found</p>
      <Button onClick={() => navigate('/')}>Go to home</Button>
    </div>
  )
}

export default NotFoundPage
