import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function Admin() {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Check if user has admin role
  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('common.error')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-lg text-muted-foreground">
                {t('admin.accessDenied')}
              </p>
              <Button variant="outline" className="mt-4">
                {t('common.back')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.dashboard')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.statistics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">125</div>
                    <div className="text-sm text-muted-foreground">{t('admin.totalAppointments')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm text-muted-foreground">{t('admin.totalStylists')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">25</div>
                    <div className="text-sm text-muted-foreground">{t('admin.activeClients')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manage Stylists */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.manageStylists')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="default">{t('admin.addStylist')}</Button>
                  <Button variant="outline">{t('admin.viewAllStylists')}</Button>
                </div>
              </CardContent>
            </Card>

            {/* Manage Services */}
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.manageServices')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="default">{t('admin.addService')}</Button>
                  <Button variant="outline">{t('admin.viewAllServices')}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
