import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('profile.personalInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('profile.name')}</label>
                  <Input defaultValue={user?.name} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('profile.email')}</label>
                  <Input defaultValue={user?.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('profile.role')}</label>
                  <Input defaultValue={user?.role} disabled />
                </div>
              </div>
            </div>

            {/* Appointment History */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('profile.appointmentHistory')}</h3>
              <div className="space-y-4">
                {/* Mock appointment history */}
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</div>
                  <div className="font-medium">Haircut</div>
                  <div className="text-sm text-muted-foreground">Stylist: Sarah</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</div>
                  <div className="font-medium">Coloring</div>
                  <div className="text-sm text-muted-foreground">Stylist: John</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <Button variant="default">{t('profile.updateProfile')}</Button>
              <Button variant="outline" className="ml-2">{t('profile.changePassword')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
