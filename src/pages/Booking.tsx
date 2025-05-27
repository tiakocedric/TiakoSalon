import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function Booking() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBooking = () => {
    // TODO: Implement booking logic with Supabase
    console.log('Booking:', {
      date: selectedDate,
      service: selectedService,
      time: selectedTime,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('booking.title')}</h1>
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('booking.selectDate')}</label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('booking.selectService')}</label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder={t('booking.servicePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="haircut">{t('services.haircut')}</SelectItem>
              <SelectItem value="coloring">{t('services.coloring')}</SelectItem>
              <SelectItem value="styling">{t('services.styling')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('booking.selectTime')}</label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder={t('booking.timePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="11:00">11:00</SelectItem>
              <SelectItem value="12:00">12:00</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="15:00">15:00</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleBooking} disabled={!selectedDate || !selectedService || !selectedTime}>
          {t('booking.bookNow')}
        </Button>
      </div>
    </div>
  );
}
