import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="border-b border-border p-6">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-2">
            Manage your account and application settings
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-2xl">
            {/* Account Settings */}
            <Card className="bg-card/50 border-border/50 mb-6">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground text-sm mt-1">user@example.com</p>
                </div>
                <Separator className="bg-border/30" />
                <div>
                  <label className="text-sm font-medium">Account Name</label>
                  <p className="text-muted-foreground text-sm mt-1">My Organization</p>
                </div>
                <Separator className="bg-border/30" />
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="font-medium text-sm">Update Profile</p>
                    <p className="text-muted-foreground text-xs mt-1">Change your account details</p>
                  </div>
                  <Button variant="outline">Edit</Button>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="bg-card/50 border-border/50 mb-6">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-muted-foreground text-xs mt-1">Receive updates via email</p>
                  </div>
                  <div className="h-6 w-11 bg-primary rounded-full" />
                </div>
                <Separator className="bg-border/30" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Marketing Emails</p>
                    <p className="text-muted-foreground text-xs mt-1">Receive promotional content</p>
                  </div>
                  <div className="h-6 w-11 bg-muted rounded-full" />
                </div>
                <Separator className="bg-border/30" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Two-Factor Authentication</p>
                    <p className="text-muted-foreground text-xs mt-1">Enhance your account security</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card className="bg-card/50 border-border/50 mb-6">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect third-party services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Slack', status: 'Connected' },
                  { name: 'GitHub', status: 'Not connected' },
                  { name: 'Jira', status: 'Not connected' },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{integration.name}</p>
                      <p className={`text-xs mt-1 ${
                        integration.status === 'Connected'
                          ? 'text-green-600'
                          : 'text-muted-foreground'
                      }`}>
                        {integration.status}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-destructive/5 border-destructive/30 border-border/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Delete Account</p>
                    <p className="text-muted-foreground text-xs mt-1">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
