import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.welcome', { name: user?.name })}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upcoming Appointments Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.upcomingAppointments')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock appointments list */}
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">10:00 AM</div>
                    <div className="font-medium">Haircut</div>
                    <div className="text-sm text-muted-foreground">Stylist: Sarah</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">2:00 PM</div>
                    <div className="font-medium">Coloring</div>
                    <div className="text-sm text-muted-foreground">Stylist: John</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.statistics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">25</div>
                    <div className="text-sm text-muted-foreground">Appointments</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm text-muted-foreground">Stylists</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.actions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="default">{t('dashboard.bookNew')}</Button>
                  <Button variant="outline">{t('dashboard.viewAll')}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
