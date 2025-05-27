import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function About() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('about.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-3xl">
            <p>{t('about.description')}</p>
            <h2 className="mt-4">{t('about.ourMission')}</h2>
            <p>{t('about.missionDescription')}</p>
            <h2 className="mt-4">{t('about.ourValues')}</h2>
            <ul className="list-disc pl-5">
              <li>{t('about.values.quality')}</li>
              <li>{t('about.values.professionalism')}</li>
              <li>{t('about.values.customerService')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
