import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Clock, MapPin, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Home() {
  const { t } = useTranslation();
  
  // Mock data for services
  const featuredServices = [
    {
      id: 1,
      name: 'Box Braids',
      description: 'Classic protective style with neat, square-shaped hair divisions.',
      price: 120,
      duration: 240,
      image: 'https://images.pexels.com/photos/3060318/pexels-photo-3060318.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'Twist Outs',
      description: 'Beautiful, defined curls with a two-strand twist technique.',
      price: 80,
      duration: 120,
      image: 'https://images.pexels.com/photos/3310694/pexels-photo-3310694.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: 'Cornrows',
      description: 'Sleek, flat braids against the scalp in straight lines.',
      price: 90,
      duration: 150,
      image: 'https://images.pexels.com/photos/2487062/pexels-photo-2487062.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  
  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Melissa Johnson',
      text: 'Absolutely love how my box braids turned out! The stylist was patient and made sure I was comfortable throughout the process.',
      rating: 5,
      date: '2023-10-15',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'David Williams',
      text: 'First-class service from start to finish. My hair has never looked better!',
      rating: 5,
      date: '2023-09-22',
      image: 'https://images.pexels.com/photos/2741701/pexels-photo-2741701.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      name: 'Sophia Garcia',
      text: 'The atmosphere is so welcoming, and the staff is knowledgeable. Definitely coming back!',
      rating: 4,
      date: '2023-11-05',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-32 md:py-40">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in">
              {t('home.hero.subtitle')}
            </p>
            <Link to="/booking">
              <Button 
                variant="accent" 
                size="lg" 
                className="animate-slide-up delay-100"
              >
                {t('home.hero.cta')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>
      
      {/* Featured Services Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.services.title')}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="card overflow-hidden transition-transform hover:scale-105">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <div className="text-accent-400 font-bold">${service.price}</div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{service.duration} mins</span>
                  </div>
                  <Link to={`/services/${service.id}`}>
                    <Button variant="outline" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="ghost" className="inline-flex items-center">
                {t('home.services.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t('home.about.title')}</h2>
              <div className="w-24 h-1 bg-primary-600 mb-6"></div>
              <h3 className="text-xl text-gray-600 dark:text-gray-300 mb-6">{t('home.about.subtitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('home.about.description')}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-primary-900 rounded-full mr-4">
                    <Scissors className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Expert Stylists</h4>
                    <p className="text-gray-600 dark:text-gray-400">Licensed professionals with years of experience</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-primary-900 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Extended Hours</h4>
                    <p className="text-gray-600 dark:text-gray-400">Open daily from 6am to 11pm CTZ</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-primary-900 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Convenient Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">Located in the heart of Oklahoma City</p>
                  </div>
                </div>
              </div>
              
              <Link to="/about">
                <Button variant="outline">
                  {t('home.about.learnMore')}
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/3993260/pexels-photo-3993260.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Salon interior" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-xl hidden md:block">
                <img 
                  src="https://images.pexels.com/photos/3992855/pexels-photo-3992855.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Stylist working" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('home.testimonials.title')}</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-accent-400 fill-accent-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">"{testimonial.text}"</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {new Date(testimonial.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button variant="ghost" className="inline-flex items-center">
                {t('home.testimonials.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.cta.title')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{t('home.cta.subtitle')}</p>
          <Link to="/booking">
            <Button 
              variant="accent" 
              size="lg"
            >
              {t('home.cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}