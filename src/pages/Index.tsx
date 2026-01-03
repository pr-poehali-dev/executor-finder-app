import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const categories = [
  { name: 'Ремонт и строительство', icon: 'Hammer', count: 2847 },
  { name: 'Уборка и клининг', icon: 'Sparkles', count: 1523 },
  { name: 'Грузоперевозки', icon: 'Truck', count: 892 },
  { name: 'Сантехника', icon: 'Droplet', count: 1204 },
  { name: 'Электрика', icon: 'Zap', count: 967 },
  { name: 'IT и компьютеры', icon: 'Monitor', count: 743 },
  { name: 'Красота и здоровье', icon: 'Heart', count: 1156 },
  { name: 'Репетиторство', icon: 'GraduationCap', count: 628 },
];

const performers = [
  {
    id: 1,
    name: 'Алексей Петров',
    avatar: '/placeholder.svg',
    profession: 'Мастер по ремонту',
    rating: 4.9,
    reviews: 127,
    completedOrders: 345,
    verified: true,
    hasInsurance: true,
    hasCertificates: true,
    price: 'от 1500 ₽/час',
    description: 'Комплексный ремонт квартир и домов. Опыт работы 12 лет.',
    skills: ['Плитка', 'Электрика', 'Сантехника'],
  },
  {
    id: 2,
    name: 'Мария Иванова',
    avatar: '/placeholder.svg',
    profession: 'Клининг-специалист',
    rating: 5.0,
    reviews: 89,
    completedOrders: 234,
    verified: true,
    hasInsurance: true,
    hasCertificates: false,
    price: 'от 800 ₽/час',
    description: 'Профессиональная уборка квартир, офисов. Свои средства.',
    skills: ['Генеральная уборка', 'Мытье окон', 'Химчистка'],
  },
  {
    id: 3,
    name: 'Дмитрий Козлов',
    avatar: '/placeholder.svg',
    profession: 'Сантехник',
    rating: 4.8,
    reviews: 156,
    completedOrders: 412,
    verified: true,
    hasInsurance: false,
    hasCertificates: true,
    price: 'от 1200 ₽/час',
    description: 'Установка, ремонт сантехники. Работа под ключ.',
    skills: ['Установка', 'Ремонт', 'Замена труб'],
  },
  {
    id: 4,
    name: 'Елена Смирнова',
    avatar: '/placeholder.svg',
    profession: 'Репетитор по математике',
    rating: 4.9,
    reviews: 72,
    completedOrders: 156,
    verified: true,
    hasInsurance: false,
    hasCertificates: true,
    price: 'от 1000 ₽/час',
    description: 'Подготовка к ЕГЭ и ОГЭ. Высшее педагогическое образование.',
    skills: ['ЕГЭ', 'ОГЭ', 'Высшая математика'],
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('rating');

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-foreground">Шабашка</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Найти исполнителя
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Стать исполнителем
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Как это работает
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline">Войти</Button>
              <Button>Создать заказ</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Найдите проверенного исполнителя для любой задачи
            </h1>
            <p className="text-lg text-muted-foreground">
              Все специалисты прошли проверку документов, имеют портфолио и реальные отзывы
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-3 flex gap-3">
              <div className="flex-1 flex gap-3">
                <Input
                  placeholder="Что нужно сделать? Например: ремонт крана"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name.toLowerCase()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg" className="px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheck" size={16} className="text-accent" />
                <span className="text-muted-foreground">Проверенные специалисты</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={16} className="text-yellow-500" />
                <span className="text-muted-foreground">Реальные отзывы</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span className="text-muted-foreground">Безопасные платежи</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={category.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} специалистов</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Проверенные исполнители</h2>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="reviews">По отзывам</SelectItem>
                <SelectItem value="orders">По заказам</SelectItem>
                <SelectItem value="price-low">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-high">Цена: по убыванию</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {performers.map((performer) => (
              <Card key={performer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={performer.avatar} />
                      <AvatarFallback>{performer.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{performer.name}</CardTitle>
                        {performer.verified && (
                          <Badge variant="secondary" className="bg-accent text-white gap-1">
                            <Icon name="BadgeCheck" size={14} />
                            Проверен
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{performer.profession}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{performer.rating}</span>
                          <span className="text-muted-foreground">({performer.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Icon name="ClipboardCheck" size={16} />
                          <span>{performer.completedOrders} заказов</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">{performer.price}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{performer.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {performer.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                    {performer.hasInsurance && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="ShieldCheck" size={14} className="text-accent" />
                        Страховка
                      </div>
                    )}
                    {performer.hasCertificates && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Award" size={14} className="text-primary" />
                        Сертификаты
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="FileText" size={14} className="text-primary" />
                      Паспорт проверен
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1">
                          <Icon name="MessageSquare" size={16} className="mr-2" />
                          Написать
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Создать заказ для {performer.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <Label htmlFor="task-title">Название задачи</Label>
                            <Input id="task-title" placeholder="Например: Ремонт крана на кухне" />
                          </div>
                          <div>
                            <Label htmlFor="task-description">Описание</Label>
                            <Textarea
                              id="task-description"
                              placeholder="Опишите детали работы..."
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
                    <Button variant="outline" onClick={() => navigate(`/performer/${performer.id}`)}>
                      Профиль
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Icon name="Shield" size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Система проверки исполнителей</h2>
            <p className="text-lg mb-8 text-white/90">
              Мы проверяем каждого специалиста перед допуском на платформу
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Icon name="FileText" size={32} className="mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Паспорт</h3>
                <p className="text-sm text-white/80">Проверка документов</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Icon name="Briefcase" size={32} className="mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Портфолио</h3>
                <p className="text-sm text-white/80">Примеры работ</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Icon name="Award" size={32} className="mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Сертификаты</h3>
                <p className="text-sm text-white/80">Подтверждение квалификации</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Icon name="ShieldCheck" size={32} className="mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Страховка</h3>
                <p className="text-sm text-white/80">Гарантия безопасности</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold">Шабашка</span>
              </div>
              <p className="text-sm text-white/70">
                Надежная платформа для поиска проверенных исполнителей
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Заказчикам</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white">Как создать заказ</a></li>
                <li><a href="#" className="hover:text-white">Гарантии безопасности</a></li>
                <li><a href="#" className="hover:text-white">Оплата услуг</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Исполнителям</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white">Начать работать</a></li>
                <li><a href="#" className="hover:text-white">Правила платформы</a></li>
                <li><a href="#" className="hover:text-white">Верификация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white">Часто задаваемые вопросы</a></li>
                <li><a href="#" className="hover:text-white">Связаться с нами</a></li>
                <li><a href="#" className="hover:text-white">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
            © 2024 Шабашка. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}