import { Tabs, Tab } from '@heroui/react'
import { ProfileForm } from '../components/ProfileForm'
import { NotificationsForm } from '../components/NotificationsForm'
import { SessionsPanel } from '../components/SessionsPanel'
import { ChatPreferences } from '../components/ChatPreferences'
import { MysticalBackground } from '../../../components/ui/MysticalBackground'
import { MysticalCard } from '../../../components/ui/MysticalCard'

export const SettingsPage: React.FC = () => {
  return (
    <MysticalBackground className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-white mb-4 tracking-heading drop-shadow-lg">
            Configurações Místicas
          </h1>
          <p className="text-white/80">
            Personalize seu reino digital e preferências ancestrais
          </p>
        </div>

        <MysticalCard className="max-w-4xl mx-auto p-8">
          <Tabs aria-label="Configurações" className="w-full">
            <Tab key="profile" title="Perfil">
              <ProfileForm />
            </Tab>
            <Tab key="notifications" title="Notificações">
              <NotificationsForm />
            </Tab>
            <Tab key="security" title="Segurança">
              <SessionsPanel />
            </Tab>
            <Tab key="chat" title="Chat IA">
              <ChatPreferences />
            </Tab>
          </Tabs>
        </MysticalCard>
      </div>
    </MysticalBackground>
  )
}