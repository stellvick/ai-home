import { useState } from 'react'
import { Card, CardBody, CardHeader, Button, Input, Switch, Divider, Tabs, Tab } from '@heroui/react'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'

const SettingsPage = () => {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [hasChanges, setHasChanges] = useState(false)

  const [profile, setProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
    biography: '',
  })

  const [preferences, setPreferences] = useState({
    notifications: true,
    emailNotifications: true,
    soundEnabled: true,
    autoSave: true,
  })

  const handleSaveChanges = () => {
    // Would call API to save changes
    setHasChanges(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lunar-900 via-purple-900 to-shadow-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="oracle-title text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystical-gold to-mystical-cyan mb-2">
            Settings
          </h1>
          <p className="text-gray-400">Customize your Oracle experience</p>
        </div>

        {/* Main Settings Card */}
        <Card className="mystical-card">
          <CardHeader>
            <Tabs
              aria-label="Settings tabs"
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(key as string)}
              classNames={{
                tabList: 'grid w-full grid-cols-3 gap-4',
                cursor: 'w-full bg-mystical-gold',
                tab: 'h-12',
              }}
            >
              <Tab key="profile" title="👤 Profile" />
              <Tab key="theme" title="🎨 Appearance" />
              <Tab key="preferences" title="⚙️ Preferences" />
            </Tabs>
          </CardHeader>

          <Divider className="bg-mystical-gold/20" />

          <CardBody className="gap-6 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Username</label>
                  <Input
                    value={profile.username}
                    onChange={(e) => {
                      setProfile({ ...profile, username: e.target.value })
                      setHasChanges(true)
                    }}
                    className="mystical-input"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Email</label>
                  <Input
                    value={profile.email}
                    onChange={(e) => {
                      setProfile({ ...profile, email: e.target.value })
                      setHasChanges(true)
                    }}
                    className="mystical-input"
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Biography (max 500 characters)</label>
                  <textarea
                    value={profile.biography}
                    onChange={(e) => {
                      setProfile({ ...profile, biography: e.target.value })
                      setHasChanges(true)
                    }}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-mystical-gold resize-none"
                    rows={4}
                    maxLength={500}
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {profile.biography.length}/500 characters
                  </p>
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="text-sm text-gray-300 mb-3 block">Avatar</label>
                  <div className="grid grid-cols-4 gap-3">
                    {['👤', '🧙', '🎭', '✨', '🌙', '🔮'].map((emoji, idx) => (
                      <button
                        key={idx}
                        className="p-4 rounded-lg border-2 border-gray-700 hover:border-mystical-gold transition text-2xl"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-3 block">Color Theme</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button
                      onClick={() => setTheme('lunar')}
                      className={`p-4 rounded-lg border-2 transition text-center ${
                        theme === 'lunar'
                          ? 'border-mystical-gold bg-mystical-gold/10'
                          : 'border-gray-700 hover:border-mystical-gold'
                      }`}
                    >
                      <div className="text-lg mb-2">🌙</div>
                      <p className="text-sm font-medium text-white">Lunar</p>
                      <p className="text-xs text-gray-400">Ethereal blue</p>
                    </button>

                    <button
                      onClick={() => setTheme('shadow')}
                      className={`p-4 rounded-lg border-2 transition text-center ${
                        theme === 'shadow'
                          ? 'border-mystical-gold bg-mystical-gold/10'
                          : 'border-gray-700 hover:border-mystical-gold'
                      }`}
                    >
                      <div className="text-lg mb-2">🌑</div>
                      <p className="text-sm font-medium text-white">Shadow</p>
                      <p className="text-xs text-gray-400">Dark fantasy</p>
                    </button>
                  </div>
                </div>

                <Divider className="bg-mystical-gold/20" />

                <div className="space-y-3">
                  <h4 className="oracle-title text-sm text-mystical-gold">Display Options</h4>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Font Size</span>
                    <select className="bg-gray-800/50 border border-gray-700 rounded px-2 py-1 text-sm text-white">
                      <option>Small</option>
                      <option selected>Normal</option>
                      <option>Large</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Animation Effects</span>
                    <Switch defaultSelected />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Particle Effects</span>
                    <Switch defaultSelected />
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-4">
                <div>
                  <h4 className="oracle-title text-sm text-mystical-gold mb-3">Notifications</h4>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Push Notifications</p>
                        <p className="text-xs text-gray-500">Receive alerts for evaluations</p>
                      </div>
                      <Switch
                        checked={preferences.notifications}
                        onChange={(e) => {
                          setPreferences({ ...preferences, notifications: e.target.checked })
                          setHasChanges(true)
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Email Notifications</p>
                        <p className="text-xs text-gray-500">Get updates via email</p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onChange={(e) => {
                          setPreferences({ ...preferences, emailNotifications: e.target.checked })
                          setHasChanges(true)
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Sound Effects</p>
                        <p className="text-xs text-gray-500">Play sounds for interactions</p>
                      </div>
                      <Switch
                        checked={preferences.soundEnabled}
                        onChange={(e) => {
                          setPreferences({ ...preferences, soundEnabled: e.target.checked })
                          setHasChanges(true)
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Divider className="bg-mystical-gold/20" />

                <div>
                  <h4 className="oracle-title text-sm text-mystical-gold mb-3">Data & Privacy</h4>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-300">Auto-Save</p>
                        <p className="text-xs text-gray-500">Automatically save preferences</p>
                      </div>
                      <Switch
                        checked={preferences.autoSave}
                        onChange={(e) => {
                          setPreferences({ ...preferences, autoSave: e.target.checked })
                          setHasChanges(true)
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Divider className="bg-mystical-gold/20" />

                <div className="space-y-2">
                  <Button fullWidth variant="flat" className="text-sm">
                    📥 Export My Data
                  </Button>
                  <Button fullWidth variant="flat" className="text-sm">
                    🔄 Import Settings
                  </Button>
                  <Button fullWidth color="danger" variant="flat" className="text-sm">
                    🗑️ Clear All Data
                  </Button>
                </div>
              </div>
            )}
          </CardBody>

          {/* Footer Actions */}
          <Divider className="bg-mystical-gold/20" />
          <CardBody className="flex flex-row justify-end gap-2 p-4">
            <Button variant="flat">Cancel</Button>
            <Button
              color="primary"
              variant="shadow"
              onPress={handleSaveChanges}
              isDisabled={!hasChanges}
              className="mystical-btn"
            >
              Save Changes
            </Button>
          </CardBody>
        </Card>

        {/* Additional Info */}
        <Card className="mystical-card mt-6 opacity-75">
          <CardBody className="gap-2">
            <p className="text-sm text-gray-400">
              💡 <strong>Tip:</strong> Your settings are automatically synced across all your devices
            </p>
            <p className="text-xs text-gray-500">Last updated: Just now</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
