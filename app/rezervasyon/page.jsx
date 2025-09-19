"use client"

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Check, 
  ChevronRight,
  ChevronLeft,
  Star,
  Sparkles,
  Shield,
  Award,
  Heart,
  Users,
  Camera,
  Scissors,
  Zap,
  Droplets,
  Palette,
  Brush,
  AlertTriangle,
  FileText,
  CheckCircle2,
  X
} from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import ServicesSkeleton from '@/components/ServicesSkeleton';


const ReservationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [existingReservations, setExistingReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] = useState(true);
  const [healthInfo, setHealthInfo] = useState({
    hasHealthProblem: '',
    healthDetails: '',
    medications: '',
    allergies: '',
    previousTreatments: ''
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    notes: ''
  });

  const steps = [
    {
      id: 1,
      title: 'Hizmet Seçimi',
      description: 'İstediğiniz hizmeti seçin',
      icon: Sparkles
    },
    {
      id: 2,
      title: 'Sağlık Bilgileri',
      description: 'Sağlık durumunuz hakkında bilgi verin',
      icon: Shield
    },
    {
      id: 3,
      title: 'Tarih & Saat',
      description: 'Uygun tarih ve saati belirleyin',
      icon: Calendar
    },
    {
      id: 4,
      title: 'Kişisel Bilgiler',
      description: 'İletişim bilgilerinizi girin',
      icon: User
    },
    {
      id: 5,
      title: 'Onay',
      description: 'Randevunuzu onaylayın',
      icon: Check
    }
  ];

  // Icon mapping for dynamic icons
  const iconMap = {
    'Zap': Zap,
    'Droplets': Droplets,
    'Heart': Heart,
    'Palette': Palette,
    'Scissors': Scissors,
    'Camera': Camera,
    'Sparkles': Sparkles,
    'Shield': Shield,
    'Award': Award,
    'Brush': Brush,
    'Star': Star
  };

  // Services'leri API'den çek
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const response = await fetch('/api/services');
        const data = await response.json();
        
        if (data.success) {
          // API'den gelen verileri rezervasyon formuna uygun formata çevir
          const formattedServices = data.data.map(service => ({
            id: service.id,
            name: service.title,
            category: service.category,
            price: service.price || 'Fiyat Belirtilmemiş',
            duration: service.duration || 'Süre Belirtilmemiş',
            description: service.description,
            icon: iconMap[service.icon] || Sparkles, // Varsayılan ikon
            color: service.color || 'from-gray-500 to-gray-600',
            popular: service.popular || false,
            areas: service.areas || []
          }));
          setServices(formattedServices);
        } else {
          console.error('Services yüklenirken hata:', data.error);
          toast.error('Hizmetler yüklenirken bir hata oluştu');
        }
      } catch (error) {
        console.error('Services fetch error:', error);
        toast.error('Hizmetler yüklenirken bir hata oluştu');
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Mevcut randevuları çek
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setReservationsLoading(true);
        const response = await fetch('/api/talepler');
        const data = await response.json();
        
        if (data.success) {
          // Randevu tarihi ve saati olan talepleri filtrele
          const reservations = data.data.filter(talep => 
            talep.adres && talep.adres.includes('Randevu Tarihi:')
          );
          setExistingReservations(reservations);
        } else {
          console.error('Reservations yüklenirken hata:', data.error);
        }
      } catch (error) {
        console.error('Reservations fetch error:', error);
      } finally {
        setReservationsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Tarih oluşturucu (sonraki 14 gün)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Pazarları hariç tut
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('tr-TR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
          }),
          dayName: date.toLocaleDateString('tr-TR', { weekday: 'long' })
        });
      }
    }
    return dates;
  };

  const availableDates = generateDates();

  // Saat seçenekleri
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Mevcut randevuları parse et ve tarih-saat çiftlerini çıkar
  const getBookedSlots = () => {
    const bookedSlots = new Set();
    
    existingReservations.forEach(reservation => {
      if (reservation.adres && reservation.adres.includes('Randevu Tarihi:')) {
        // "Randevu Tarihi: 2024-01-15 14:00" formatından tarih ve saati çıkar
        const match = reservation.adres.match(/rezervasyon Tarihi:\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/);
        if (match) {
          const [, date, time] = match;
          bookedSlots.add(`${date}-${time}`);
        }
      }
    });
    
    return bookedSlots;
  };

  const bookedSlots = getBookedSlots();

  // Belirli bir tarih ve saatin dolu olup olmadığını kontrol et
  const isSlotBooked = (date, time) => {
    return bookedSlots.has(`${date}-${time}`);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromStep = (step) => {
    switch (step) {
      case 1:
        return selectedService !== null;
      case 2:
        return healthInfo.hasHealthProblem !== '';
      case 3:
        return selectedDate && selectedTime && !isSlotBooked(selectedDate, selectedTime);
      case 4:
        return personalInfo.firstName && personalInfo.lastName && personalInfo.phone;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {servicesLoading ? (
              <ServicesSkeleton />
            ) : (
              <>
                <div className="text-center mb-8">
                  <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">Hangi Hizmeti İstiyorsunuz?</h2>
                  <p className="text-gray-600">Size en uygun hizmeti seçin ve güzellik yolculuğunuza başlayın</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedService?.id === service.id
                        ? 'border-primary shadow-lg transform scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Popüler
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-primary font-bold text-lg">{service.price}</span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </span>
                    </div>

                    {service.areas && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Uygulama Alanları:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.areas.slice(0, 3).map((area, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                              {area}
                            </span>
                          ))}
                          {service.areas.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                              +{service.areas.length - 3} daha
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {selectedService?.id === service.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                );
                  })}
                </div>
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Sağlık Bilgileriniz</h2>
              <p className="text-gray-600">Güvenli ve etkili bir tedavi için sağlık durumunuzu paylaşın</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Ana sağlık durumu sorusu */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Herhangi bir sağlık probleminiz var mı?</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setHealthInfo({...healthInfo, hasHealthProblem: 'hayir'})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      healthInfo.hasHealthProblem === 'hayir'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">Hayır</span>
                  </button>
                  
                  <button
                    onClick={() => setHealthInfo({...healthInfo, hasHealthProblem: 'evet'})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      healthInfo.hasHealthProblem === 'evet'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">Evet</span>
                  </button>
                  
                  <button
                    onClick={() => setHealthInfo({...healthInfo, hasHealthProblem: 'emin-degilim'})}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      healthInfo.hasHealthProblem === 'emin-degilim'
                        ? 'border-gray-500 bg-gray-50 text-gray-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FileText className="w-6 h-6 mx-auto mb-2" />
                    <span className="font-medium">Emin Değilim</span>
                  </button>
                </div>
              </div>

              {/* Detaylı form - sadece "evet" seçildiğinde göster */}
              {(healthInfo.hasHealthProblem === 'evet' || healthInfo.hasHealthProblem === 'emin-degilim') && (
                <div className="space-y-6 animate-in slide-in-from-top duration-500">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sağlık probleminizi detaylandırır mısınız? *
                    </label>
                    <textarea
                      value={healthInfo.healthDetails}
                      onChange={(e) => setHealthInfo({...healthInfo, healthDetails: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Örn: Diyabet, hipertansiyon, kalp hastalığı, cilt hastalıkları vb."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kullandığınız ilaçlar var mı?
                    </label>
                    <textarea
                      value={healthInfo.medications}
                      onChange={(e) => setHealthInfo({...healthInfo, medications: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={2}
                      placeholder="Kullandığınız ilaçları yazınız..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bilinen alerjileriniz var mı?
                    </label>
                    <input
                      type="text"
                      value={healthInfo.allergies}
                      onChange={(e) => setHealthInfo({...healthInfo, allergies: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Örn: İlaç alerjisi, besin alerjisi, kozmetik ürün alerjisi"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daha önce benzer tedavi aldınız mı?
                    </label>
                    <input
                      type="text"
                      value={healthInfo.previousTreatments}
                      onChange={(e) => setHealthInfo({...healthInfo, previousTreatments: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Hangi tedavileri aldığınızı ve sonuçlarını yazabilirsiniz"
                    />
                  </div>
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-blue-800 font-medium mb-1">Gizlilik Güvencesi</p>
                    <p className="text-blue-700">
                      Paylaştığınız tüm sağlık bilgileri gizli tutulacak ve sadece tedavinizin güvenliği için kullanılacaktır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Tarih & Saat Seçin</h2>
              <p className="text-gray-600">Size uygun tarih ve saati seçerek randevunuzu planlayın</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Tarih Seçimi */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Tarih Seçin
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                  {availableDates.map((date) => {
                    return (
                      <button
                        key={date.value}
                        onClick={() => setSelectedDate(date.value)}
                        className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                          selectedDate === date.value
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {date.display.split(' ')[0]}
                        </div>
                        <div className="text-lg font-bold">
                          {date.display.split(' ')[1]}
                        </div>
                        <div className="text-xs opacity-70">
                          {date.display.split(' ')[2]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Saat Seçimi */}
              {selectedDate && (
                <div className="animate-in slide-in-from-top duration-500">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Saat Seçin
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                    {timeSlots.map((time) => {
                      const isBooked = isSlotBooked(selectedDate, time);
                      
                      return (
                        <button
                          key={time}
                          onClick={() => !isBooked && setSelectedTime(time)}
                          disabled={isBooked}
                          className={`p-3 rounded-xl border-2 text-center font-medium transition-all ${
                            isBooked
                              ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed opacity-60'
                              : selectedTime === time
                              ? 'border-primary bg-primary text-white hover:shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <span>{time}</span>
                            {isBooked && (
                              <span className="text-xs text-red-500 mt-1">Dolu</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Seçilen bilgileri göster */}
              {selectedDate && selectedTime && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 animate-in slide-in-from-bottom duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <h4 className="text-lg font-semibold text-green-800">Seçiminiz Onaylandı</h4>
                  </div>
                  <p className="text-green-700">
                    <span className="font-medium">
                      {availableDates.find(d => d.value === selectedDate)?.dayName}
                    </span>
                    , {new Date(selectedDate).toLocaleDateString('tr-TR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })} - <span className="font-medium">{selectedTime}</span>
                  </p>
                  {isSlotBooked(selectedDate, selectedTime) && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm">
                        ⚠️ Bu saat dolu görünüyor. Lütfen başka bir saat seçin.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Kişisel Bilgileriniz</h2>
              <p className="text-gray-600">Randevunuz için iletişim bilgilerinizi paylaşın</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad *
                  </label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Adınızı yazın"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Soyadınızı yazın"
                  />
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon Numarası *
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="0555 123 45 67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Doğum Tarihi
                </label>
                <input
                  type="date"
                  value={personalInfo.birthDate}
                  onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özel Notlar
                </label>
                <textarea
                  value={personalInfo.notes}
                  onChange={(e) => setPersonalInfo({...personalInfo, notes: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Varsa özel isteklerinizi veya notlarınızı yazabilirsiniz..."
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-blue-800 font-medium mb-1">Kişisel Veri Korunması</p>
                    <p className="text-blue-700">
                      Bilgileriniz KVKK kapsamında güvenle saklanır ve sadece randevu süreçleriniz için kullanılır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Randevunuzu Onaylayın</h2>
              <p className="text-gray-600">Bilgilerinizi kontrol edin ve randevunuzu onaylayın</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {/* Hizmet Özeti */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Seçilen Hizmet
                </h3>
                {selectedService && (
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedService.color} flex items-center justify-center`}>
                      <selectedService.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{selectedService.name}</h4>
                      <p className="text-sm text-gray-600">{selectedService.category}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-primary font-semibold">{selectedService.price}</span>
                        <span className="text-gray-500 text-sm">{selectedService.duration}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tarih Saat Özeti */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Randevu Tarihi
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {availableDates.find(d => d.value === selectedDate)?.dayName}
                    </p>
                    <p className="text-gray-600">
                      {new Date(selectedDate).toLocaleDateString('tr-TR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })} - {selectedTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kişisel Bilgiler Özeti */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Kişisel Bilgiler
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Ad Soyad:</span> {personalInfo.firstName} {personalInfo.lastName}</p>
                  <p><span className="font-medium">Telefon:</span> {personalInfo.phone}</p>
                  {personalInfo.birthDate && (
                    <p><span className="font-medium">Doğum Tarihi:</span> {new Date(personalInfo.birthDate).toLocaleDateString('tr-TR')}</p>
                  )}
                  {personalInfo.notes && (
                    <p><span className="font-medium">Notlar:</span> {personalInfo.notes}</p>
                  )}
                </div>
              </div>

              {/* Sağlık Bilgileri Özeti */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Sağlık Durumu
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Sağlık Problemi:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      healthInfo.hasHealthProblem === 'hayir' ? 'bg-green-100 text-green-800' :
                      healthInfo.hasHealthProblem === 'evet' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {healthInfo.hasHealthProblem === 'hayir' ? 'Yok' : 
                       healthInfo.hasHealthProblem === 'evet' ? 'Var' : 'Emin Değil'}
                    </span>
                  </p>
                  {healthInfo.healthDetails && (
                    <p><span className="font-medium">Detay:</span> {healthInfo.healthDetails}</p>
                  )}
                  {healthInfo.medications && (
                    <p><span className="font-medium">İlaçlar:</span> {healthInfo.medications}</p>
                  )}
                  {healthInfo.allergies && (
                    <p><span className="font-medium">Alerjiler:</span> {healthInfo.allergies}</p>
                  )}
                </div>
              </div>

              {/* Önemli Notlar */}
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Randevu Öncesi Önemli Notlar</h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Randevunuzdan 15 dakika önce kliniğimizde bulunun</li>
                      <li>• Kimlik belgenizi yanınızda getirmeyi unutmayın</li>
                      <li>• Randevu değişikliği için en az 24 saat öncesinden arayın</li>
                      <li>• Sorularınız için: 0212 123 45 67</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Onay Butonu */}
              <div className="text-center pt-6">
                <button 
                  onClick={async () => {
                    try {
                      toast.loading('Randevunuz oluşturuluyor...', { id: 'reservation' });
                      
                      const reservationData = {
                        isimSoyisim: `${personalInfo.firstName} ${personalInfo.lastName}`,
                        markaModel: selectedService?.name || 'Rezervasyon',
                        sorun: `Hizmet: ${selectedService?.name} - ${selectedService?.category}`,
                        telefonNo: personalInfo.phone,
                        ekranSifresi: '', // Rezervasyon için gerekli değil
                        adres: `Randevu Tarihi: ${selectedDate} ${selectedTime}`,
                        not: `
Sağlık Sorunu: ${healthInfo.hasHealthProblem === 'hayir' ? 'Yok' : healthInfo.hasHealthProblem === 'evet' ? 'Var' : 'Emin Değil'}
${healthInfo.healthDetails ? `Sağlık Detayı: ${healthInfo.healthDetails}` : ''}
${healthInfo.medications ? `İlaçlar: ${healthInfo.medications}` : ''}
${healthInfo.allergies ? `Alerjiler: ${healthInfo.allergies}` : ''}
${personalInfo.birthDate ? `Doğum Tarihi: ${personalInfo.birthDate}` : ''}
${personalInfo.notes ? `Özel Notlar: ${personalInfo.notes}` : ''}
                        `.trim()
                      };

                      const response = await fetch('/api/talepler', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reservationData),
                      });

                      const result = await response.json();

                      if (result.success) {
                        toast.success(`Randevunuz başarıyla oluşturuldu! Talep No: ${result.data.talepId}`, { id: 'reservation' });
                        
                        // Formu sıfırla
                        setCurrentStep(1);
                        setSelectedService(null);
                        setSelectedDate('');
                        setSelectedTime('');
                        setHealthInfo({
                          hasHealthProblem: '',
                          healthDetails: '',
                          medications: '',
                          allergies: '',
                          previousTreatments: ''
                        });
                        setPersonalInfo({
                          firstName: '',
                          lastName: '',
                          phone: '',
                          birthDate: '',
                          notes: ''
                        });
                      } else {
                        toast.error(`Hata: ${result.error}`, { id: 'reservation' });
                      }
                    } catch (error) {
                      console.error('Rezervasyon hatası:', error);
                      toast.error('Randevu oluşturulurken bir hata oluştu', { id: 'reservation' });
                    }
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Check className="w-6 h-6 inline mr-2" />
                  Randevuyu Onayla
                </button>
                
                <p className="text-sm text-gray-600 mt-4">
                  Onayladıktan sonra SMS ve e-posta ile bilgilendirme alacaksınız
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-32 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Randevu Al
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Güzellik yolculuğunuz sadece birkaç adım uzakta. Hızlı ve kolay randevu sistemi ile zamanınızı ayırın.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-semibold ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[600px]">
            {renderStep()}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center max-w-6xl mx-auto mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Önceki
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              disabled={!canProceedFromStep(currentStep)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                canProceedFromStep(currentStep)
                  ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Sonraki
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-24" /> /* Placeholder for layout balance */
          )}
        </div>

        {/* Help Section */}
        <div className="text-center mt-12 p-6 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Yardıma mı ihtiyacınız var?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Randevu alma sürecinde herhangi bir sorunuz varsa, uzman ekibimiz size yardımcı olmaktan mutluluk duyar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+905304348349"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
              0530 434 83 49
            </a>
            <a 
              href="https://wa.me/905304348349"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
