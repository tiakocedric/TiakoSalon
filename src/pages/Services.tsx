import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const services = [
  {
    title: 'Haircut',
    description: 'Classic haircut with styling',
    price: 30,
  },
  {
    title: 'Coloring',
    description: 'Hair coloring and highlights',
    price: 50,
  },
  {
    title: 'Styling',
    description: 'Professional hair styling',
    price: 40,
  },
];

export default function Services() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('services.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title}>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-4">
                <span className="text-2xl font-bold">${service.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
