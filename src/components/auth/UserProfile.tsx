import React from 'react'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { Typography } from '../theme/Typography'
import { MysticalButton } from '../common/MysticalButton'
import { useAuth } from '../../hooks/useAuth'

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Card className="w-full bg-[var(--color-surface)] border border-[var(--color-border)]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <Typography variant="h4">User Profile</Typography>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        <div className="space-y-2">
          <Typography variant="overline">Username</Typography>
          <Typography variant="body">{user.username}</Typography>
        </div>

        <div className="space-y-2">
          <Typography variant="overline">Email</Typography>
          <Typography variant="body">{user.email}</Typography>
        </div>

        {user.biography && (
          <div className="space-y-2">
            <Typography variant="overline">Biography</Typography>
            <Typography variant="body">{user.biography}</Typography>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <MysticalButton mysticalVariant="secondary" onClick={handleLogout}>
            Logout
          </MysticalButton>
        </div>
      </CardBody>
    </Card>
  )
}

export default UserProfile
