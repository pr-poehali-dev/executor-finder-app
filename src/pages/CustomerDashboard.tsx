import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const customerData = {
  lastName: 'Соколова',
  firstName: 'Анна',
  middleName: 'Сергеевна',
  avatar: '/placeholder.svg',
  phone: '+7 (999) 888-77-66',
  email: 'anna.sokolova@example.com',
  registrationDate: '2023-06-10',
  totalOrders: 12,
  activeOrders: 2,
  completedOrders: 8,
  cancelledOrders: 2,
};

const activeOrders = [
  {
    id: 1,
    title: 'Ремонт ванной комнаты',
    category: 'Ремонт и строительство',
    status: 'in_progress',
    performer: {
      name: 'Алексей Петров',
      avatar: '/placeholder.svg',
      rating: 4.9,
    },
    budget: 45000,
    createdDate: '2024-12-01',
    deadline: '2024-12-20',
    progress: 60,
    description: 'Замена плитки, сантехники, косметический ремонт',
    address: 'Москва, ул. Ленина, д. 15, кв. 42',
  },
  {
    id: 2,
    title: 'Установка кондиционера',
    category: 'Электрика',
    status: 'waiting',
    performer: null,
    budget: 8000,
    createdDate: '2024-12-15',
    deadline: '2024-12-25',
    progress: 0,
    description: 'Установка сплит-системы в спальне',
    address: 'Москва, ул. Ленина, д. 15, кв. 42',
    applicants: 5,
  },
];

const completedOrders = [
  {
    id: 3,
    title: 'Замена электропроводки',
    category: 'Электрика',
    status: 'completed',
    performer: {
      name: 'Дмитрий Козлов',
      avatar: '/placeholder.svg',
      rating: 4.8,
    },
    budget: 32000,
    createdDate: '2024-10-01',
    completedDate: '2024-10-15',
    description: 'Полная замена проводки в 2-комнатной квартире',
    address: 'Москва, ул. Ленина, д. 15, кв. 42',
    reviewed: true,
    myRating: 5,
  },
  {
    id: 4,
    title: 'Генеральная уборка квартиры',
    category: 'Уборка и клининг',
    status: 'completed',
    performer: {
      name: 'Мария Иванова',
      avatar: '/placeholder.svg',
      rating: 5.0,
    },
    budget: 4500,
    createdDate: '2024-11-20',
    completedDate: '2024-11-20',
    description: 'Генеральная уборка после ремонта',
    address: 'Москва, ул. Ленина, д. 15, кв. 42',
    reviewed: false,
    myRating: null,
  },
];

const transactions = [
  {
    id: 1,
    orderId: 1,
    orderTitle: 'Ремонт ванной комнаты',
    amount: 22500,
    type: 'payment',
    status: 'completed',
    date: '2024-12-10',
    description: 'Оплата 50% стоимости работ',
  },
  {
    id: 2,
    orderId: 3,
    orderTitle: 'Замена электропроводки',
    amount: 32000,
    type: 'payment',
    status: 'completed',
    date: '2024-10-15',
    description: 'Полная оплата выполненных работ',
  },
  {
    id: 3,
    orderId: 4,
    orderTitle: 'Генеральная уборка квартиры',
    amount: 4500,
    type: 'payment',
    status: 'completed',
    date: '2024-11-20',
    description: 'Оплата услуг клининга',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'in_progress':
      return <Badge className="bg-blue-500">В работе</Badge>;
    case 'waiting':
      return <Badge variant="outline">Ожидает исполнителя</Badge>;
    case 'completed':
      return <Badge className="bg-accent">Завершен</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Отменен</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

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
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate('/notifications')}>
                <Icon name="Bell" size={18} className="mr-2" />
                Уведомления
              </Button>
              <Button variant="outline" onClick={() => navigate('/chat')}>
                <Icon name="MessageSquare" size={18} className="mr-2" />
                Сообщения
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Создать заказ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Создать новый заказ</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="new-order-title">Название заказа</Label>
                      <Input id="new-order-title" placeholder="Например: Ремонт крана на кухне" />
                    </div>
                    <div>
                      <Label htmlFor="new-order-category">Категория работ</Label>
                      <Select>
                        <SelectTrigger id="new-order-category">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="repair">Ремонт и строительство</SelectItem>
                          <SelectItem value="cleaning">Уборка и клининг</SelectItem>
                          <SelectItem value="plumbing">Сантехника</SelectItem>
                          <SelectItem value="electric">Электрика</SelectItem>
                          <SelectItem value="transport">Грузоперевозки</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="new-order-description">Описание работы</Label>
                      <Textarea
                        id="new-order-description"
                        placeholder="Опишите детали работы, требования, желаемые сроки..."
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new-order-budget">Бюджет, ₽</Label>
                        <Input id="new-order-budget" type="number" placeholder="15000" />
                      </div>
                      <div>
                        <Label htmlFor="new-order-deadline">Срок выполнения</Label>
                        <Input id="new-order-deadline" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-order-address">Адрес</Label>
                      <Input id="new-order-address" placeholder="Москва, ул. Примерная, д. 1" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button className="w-full">Опубликовать заказ</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={customerData.avatar} />
                  <AvatarFallback>
                    {customerData.firstName[0]}{customerData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {customerData.firstName} {customerData.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">Заказчик</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={14} className="text-muted-foreground" />
                  <span>{customerData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} className="text-muted-foreground" />
                  <span className="text-xs">{customerData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={14} className="text-muted-foreground" />
                  <span>На платформе с {new Date(customerData.registrationDate).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon name="ClipboardList" size={24} className="text-primary" />
                <span className="text-3xl font-bold">{customerData.totalOrders}</span>
              </div>
              <p className="text-sm text-muted-foreground">Всего заказов</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon name="Clock" size={24} className="text-blue-500" />
                <span className="text-3xl font-bold">{customerData.activeOrders}</span>
              </div>
              <p className="text-sm text-muted-foreground">Активных заказов</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Icon name="CheckCircle" size={24} className="text-accent" />
                <span className="text-3xl font-bold">{customerData.completedOrders}</span>
              </div>
              <p className="text-sm text-muted-foreground">Завершено</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">
              Активные заказы ({customerData.activeOrders})
            </TabsTrigger>
            <TabsTrigger value="completed">
              История ({customerData.completedOrders})
            </TabsTrigger>
            <TabsTrigger value="payments">
              Платежи
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-6">
              {activeOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{order.title}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{order.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{order.budget.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{order.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <span>{order.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span>Срок: {new Date(order.deadline).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>

                    {order.performer ? (
                      <>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={order.performer.avatar} />
                              <AvatarFallback>{order.performer.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{order.performer.name}</p>
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-sm">{order.performer.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Icon name="MessageSquare" size={16} className="mr-2" />
                            Написать
                          </Button>
                        </div>

                        {order.status === 'in_progress' && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Прогресс выполнения</span>
                              <span className="text-sm text-muted-foreground">{order.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Icon name="Users" size={20} className="text-muted-foreground" />
                            <span className="text-sm">
                              <span className="font-semibold">{order.applicants}</span> исполнителей откликнулось
                            </span>
                          </div>
                          <Button size="sm">Смотреть отклики</Button>
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 mt-4">
                      {order.status === 'in_progress' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="default" className="flex-1">
                              <Icon name="CheckCircle" size={16} className="mr-2" />
                              Завершить заказ
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Завершить заказ</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <p className="text-sm text-muted-foreground">
                                Подтвердите, что работа выполнена и вы готовы завершить заказ.
                                После завершения исполнитель получит оплату.
                              </p>
                              <div>
                                <Label>Оцените работу исполнителя</Label>
                                <div className="flex gap-2 mt-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Button key={star} variant="outline" size="sm">
                                      <Icon name="Star" size={16} />
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="review-text">Отзыв о работе</Label>
                                <Textarea
                                  id="review-text"
                                  placeholder="Расскажите о качестве работы..."
                                  rows={3}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Отмена</Button>
                              <Button>Завершить и оплатить</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button variant="outline" className="flex-1">
                        <Icon name="FileText" size={16} className="mr-2" />
                        Детали заказа
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-6">
              {completedOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{order.title}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{order.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">{order.budget.toLocaleString('ru-RU')} ₽</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{order.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span>Завершено: {new Date(order.completedDate).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="MapPin" size={16} className="text-muted-foreground" />
                        <span>{order.address}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={order.performer.avatar} />
                          <AvatarFallback>{order.performer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{order.performer.name}</p>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm">{order.performer.rating}</span>
                          </div>
                        </div>
                      </div>

                      {!order.reviewed ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Icon name="Star" size={16} className="mr-2" />
                              Оставить отзыв
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Оставить отзыв</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div>
                                <Label>Оцените работу исполнителя</Label>
                                <div className="flex gap-2 mt-2">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Button key={star} variant="outline" size="sm">
                                      <Icon name="Star" size={20} />
                                    </Button>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="review-text-completed">Отзыв о работе</Label>
                                <Textarea
                                  id="review-text-completed"
                                  placeholder="Расскажите о качестве работы, соблюдении сроков..."
                                  rows={4}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="w-full">Опубликовать отзыв</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="CheckCircle" size={16} className="text-accent" />
                          <span>Вы оценили на {order.myRating}</span>
                          <div className="flex">
                            {[...Array(order.myRating)].map((_, i) => (
                              <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>История платежей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name="CreditCard" size={24} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{transaction.orderTitle}</p>
                          <p className="text-sm text-muted-foreground">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(transaction.date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">
                          -{transaction.amount.toLocaleString('ru-RU')} ₽
                        </p>
                        <Badge variant="secondary" className="bg-accent text-white mt-1">
                          Оплачено
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <span className="font-semibold">Итого потрачено:</span>
                  <span className="text-2xl font-bold text-primary">
                    {transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}