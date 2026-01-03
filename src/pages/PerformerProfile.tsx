import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const performerData = {
  id: 1,
  lastName: 'Петров',
  firstName: 'Алексей',
  middleName: 'Михайлович',
  citizenship: 'Российская Федерация',
  location: 'Москва, район Хамовники',
  workRadius: 15,
  avatar: '/placeholder.svg',
  profession: 'Мастер по ремонту и строительству',
  rating: 4.9,
  reviews: 127,
  completedOrders: 345,
  verified: true,
  hasInsurance: true,
  hasCertificates: true,
  registrationDate: '2021-03-15',
  responseTime: '15 минут',
  phone: '+7 (999) 123-45-67',
  email: 'aleksey.petrov@example.com',
  about: 'Профессиональный строитель с 12-летним опытом работы. Специализируюсь на комплексном ремонте квартир и домов. Все работы выполняю качественно, с гарантией. Имею собственный инструмент и бригаду проверенных мастеров.',
  
  services: [
    { name: 'Укладка плитки', price: 'от 1500 ₽/м²', unit: 'м²' },
    { name: 'Штукатурка стен', price: 'от 800 ₽/м²', unit: 'м²' },
    { name: 'Монтаж электрики', price: 'от 2000 ₽/час', unit: 'час' },
    { name: 'Сантехнические работы', price: 'от 1800 ₽/час', unit: 'час' },
    { name: 'Установка дверей', price: 'от 3000 ₽/шт', unit: 'шт' },
    { name: 'Покраска стен', price: 'от 600 ₽/м²', unit: 'м²' },
  ],

  certificates: [
    { 
      name: 'Сертификат монтажника электрооборудования', 
      issueDate: '2022-05-10',
      organization: 'Учебный центр "Электромонтаж"',
      verified: true 
    },
    { 
      name: 'Удостоверение облицовщика-плиточника', 
      issueDate: '2020-08-15',
      organization: 'Строительный колледж №7',
      verified: true 
    },
    { 
      name: 'Свидетельство о повышении квалификации', 
      issueDate: '2023-02-20',
      organization: 'Институт строительства и архитектуры',
      verified: true 
    },
  ],

  portfolio: [
    { 
      id: 1, 
      title: 'Ремонт ванной комнаты', 
      description: 'Полный ремонт ванной 6м², укладка плитки, замена сантехники',
      image: '/placeholder.svg',
      completedDate: '2024-11-20'
    },
    { 
      id: 2, 
      title: 'Ремонт кухни под ключ', 
      description: 'Комплексный ремонт кухни 12м², электрика, штукатурка, плитка',
      image: '/placeholder.svg',
      completedDate: '2024-10-15'
    },
    { 
      id: 3, 
      title: 'Электромонтаж в новостройке', 
      description: 'Монтаж электропроводки в 3-комнатной квартире',
      image: '/placeholder.svg',
      completedDate: '2024-09-08'
    },
  ],

  reviews: [
    {
      id: 1,
      author: 'Ирина К.',
      rating: 5,
      date: '2024-12-10',
      text: 'Отличный мастер! Сделал ремонт ванной быстро и качественно. Все работы выполнены на высшем уровне, убрал за собой. Рекомендую!',
      workType: 'Ремонт ванной комнаты'
    },
    {
      id: 2,
      author: 'Сергей П.',
      rating: 5,
      date: '2024-11-28',
      text: 'Алексей профессионал своего дела. Помог с электрикой в квартире, все розетки и выключатели установлены ровно. Цены адекватные.',
      workType: 'Электромонтажные работы'
    },
    {
      id: 3,
      author: 'Анна В.',
      rating: 4,
      date: '2024-11-15',
      text: 'Хороший мастер, немного задержались по срокам, но результат отличный. Плитка положена идеально.',
      workType: 'Укладка плитки'
    },
  ],

  insurance: {
    company: 'Страховая компания "Гарант"',
    policyNumber: 'СТР-2024-123456',
    coverage: '500 000 ₽',
    validUntil: '2025-12-31'
  }
};

export default function PerformerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold text-foreground">Шабашка</span>
              </div>
            </div>
            <Button>Создать заказ</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={performerData.avatar} />
                  <AvatarFallback className="text-3xl">
                    {performerData.firstName[0]}{performerData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Star" size={24} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold">{performerData.rating}</span>
                  <span className="text-muted-foreground">({performerData.reviews} отзывов)</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">
                        {performerData.lastName} {performerData.firstName} {performerData.middleName}
                      </h1>
                      {performerData.verified && (
                        <Badge className="bg-accent text-white gap-1">
                          <Icon name="BadgeCheck" size={16} />
                          Проверен
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-3">{performerData.profession}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="MapPin" size={18} className="text-muted-foreground" />
                      <span className="font-medium">Проживание:</span>
                      <span>{performerData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Radar" size={18} className="text-muted-foreground" />
                      <span className="font-medium">Радиус работ:</span>
                      <span>{performerData.workRadius} км от места проживания</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Flag" size={18} className="text-muted-foreground" />
                      <span className="font-medium">Гражданство:</span>
                      <span>{performerData.citizenship}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="ClipboardCheck" size={18} className="text-muted-foreground" />
                      <span className="font-medium">Выполнено заказов:</span>
                      <span>{performerData.completedOrders}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Clock" size={18} className="text-muted-foreground" />
                      <span className="font-medium">Время ответа:</span>
                      <span>{performerData.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Calendar" size={18} className="text-muted-foreground" />
                      <span className="font-medium">На платформе:</span>
                      <span>с {new Date(performerData.registrationDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-wrap gap-3 mb-6">
                  {performerData.hasInsurance && (
                    <Badge variant="outline" className="text-accent border-accent gap-1 px-3 py-1">
                      <Icon name="ShieldCheck" size={16} />
                      Страховка ответственности
                    </Badge>
                  )}
                  {performerData.hasCertificates && (
                    <Badge variant="outline" className="text-primary border-primary gap-1 px-3 py-1">
                      <Icon name="Award" size={16} />
                      {performerData.certificates.length} сертификата
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-primary border-primary gap-1 px-3 py-1">
                    <Icon name="FileText" size={16} />
                    Паспорт РФ проверен
                  </Badge>
                </div>

                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="flex-1">
                        <Icon name="MessageSquare" size={18} className="mr-2" />
                        Написать исполнителю
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Создать заказ для {performerData.firstName} {performerData.lastName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="task-title">Название задачи</Label>
                          <Input id="task-title" placeholder="Например: Ремонт крана на кухне" />
                        </div>
                        <div>
                          <Label htmlFor="task-description">Описание работы</Label>
                          <Textarea
                            id="task-description"
                            placeholder="Опишите детали работы, адрес, желаемые сроки..."
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="task-budget">Ваш бюджет</Label>
                          <Input id="task-budget" placeholder="Например: 3000 ₽" />
                        </div>
                        <Button className="w-full">Отправить запрос</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="lg" variant="outline">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Позвонить
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="about">О специалисте</TabsTrigger>
            <TabsTrigger value="services">Услуги и цены</TabsTrigger>
            <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({performerData.reviews})</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>О специалисте</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{performerData.about}</p>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-semibold text-lg mb-4">Контактная информация</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={18} className="text-muted-foreground" />
                      <span>{performerData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={18} className="text-muted-foreground" />
                      <span>{performerData.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Виды работ и стоимость</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performerData.services.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">Единица измерения: {service.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">{service.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <Icon name="Info" size={16} className="inline mr-2" />
                    Окончательная стоимость работ обговаривается индивидуально после осмотра объекта
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {performerData.portfolio.map((work) => (
                <Card key={work.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <Icon name="Image" size={48} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{work.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{work.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>Выполнено: {new Date(work.completedDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              {performerData.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{review.author}</h4>
                        <p className="text-sm text-muted-foreground">{review.workType}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={16}
                              className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" size={24} className="text-primary" />
                    Сертификаты и удостоверения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performerData.certificates.map((cert, index) => (
                      <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{cert.name}</h4>
                            {cert.verified && (
                              <Badge variant="secondary" className="bg-accent text-white gap-1">
                                <Icon name="BadgeCheck" size={12} />
                                Проверен
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Выдан: {new Date(cert.issueDate).toLocaleDateString('ru-RU')}
                          </p>
                          <p className="text-sm text-muted-foreground">{cert.organization}</p>
                        </div>
                        <Icon name="FileCheck" size={24} className="text-accent" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ShieldCheck" size={24} className="text-accent" />
                    Страхование ответственности
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Страховая компания:</span>
                      <span className="font-medium">{performerData.insurance.company}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Номер полиса:</span>
                      <span className="font-medium">{performerData.insurance.policyNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Сумма покрытия:</span>
                      <span className="font-medium text-accent">{performerData.insurance.coverage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Действителен до:</span>
                      <span className="font-medium">
                        {new Date(performerData.insurance.validUntil).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" size={24} className="text-primary" />
                    Паспортные данные
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <Icon name="BadgeCheck" size={32} className="text-accent" />
                    <div>
                      <p className="font-semibold text-accent">Паспорт РФ проверен администрацией</p>
                      <p className="text-sm text-muted-foreground">
                        Данные проверены и соответствуют документу, удостоверяющему личность
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
