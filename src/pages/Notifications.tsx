import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'Новое сообщение от Алексея Петрова',
    description: 'Завтра приеду к 10:00, привезу материалы',
    time: '2024-12-15T18:30:00',
    read: false,
    avatar: '/placeholder.svg',
    orderId: 1,
    orderTitle: 'Ремонт ванной комнаты',
  },
  {
    id: 2,
    type: 'offer',
    title: '5 новых откликов на заказ',
    description: 'Исполнители откликнулись на "Установка кондиционера"',
    time: '2024-12-15T16:00:00',
    read: false,
    icon: 'Users',
    orderId: 2,
    orderTitle: 'Установка кондиционера',
  },
  {
    id: 3,
    type: 'progress',
    title: 'Обновление прогресса работ',
    description: 'Алексей Петров обновил прогресс до 60%',
    time: '2024-12-15T14:00:00',
    read: false,
    avatar: '/placeholder.svg',
    orderId: 1,
    orderTitle: 'Ремонт ванной комнаты',
  },
  {
    id: 4,
    type: 'review',
    title: 'Оставьте отзыв о работе',
    description: 'Вы завершили заказ "Генеральная уборка". Поделитесь впечатлениями!',
    time: '2024-12-14T20:00:00',
    read: true,
    icon: 'Star',
    orderId: 4,
    orderTitle: 'Генеральная уборка квартиры',
  },
  {
    id: 5,
    type: 'payment',
    title: 'Оплата выполнена',
    description: 'Оплата 22 500 ₽ за заказ "Ремонт ванной комнаты" прошла успешно',
    time: '2024-12-14T12:30:00',
    read: true,
    icon: 'CreditCard',
    orderId: 1,
    orderTitle: 'Ремонт ванной комнаты',
  },
  {
    id: 6,
    type: 'system',
    title: 'Приветствуем на платформе!',
    description: 'Спасибо за регистрацию на Шабашке. Создайте первый заказ и найдите исполнителя.',
    time: '2024-12-10T09:00:00',
    read: true,
    icon: 'Info',
  },
];

const getNotificationIcon = (notification: typeof notifications[0]) => {
  if (notification.avatar) {
    return (
      <Avatar className="w-10 h-10">
        <AvatarImage src={notification.avatar} />
        <AvatarFallback>АП</AvatarFallback>
      </Avatar>
    );
  }

  const iconMap: Record<string, string> = {
    message: 'MessageSquare',
    offer: 'Users',
    progress: 'TrendingUp',
    review: 'Star',
    payment: 'CreditCard',
    system: 'Info',
  };

  const colorMap: Record<string, string> = {
    message: 'text-blue-500',
    offer: 'text-accent',
    progress: 'text-primary',
    review: 'text-yellow-500',
    payment: 'text-green-500',
    system: 'text-muted-foreground',
  };

  const icon = notification.icon || iconMap[notification.type];
  const color = colorMap[notification.type];

  return (
    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${color}`}>
      <Icon name={icon as any} size={20} />
    </div>
  );
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} мин назад`;
  }
  if (hours < 24) {
    return `${hours} ч назад`;
  }
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} дн назад`;
  }
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState(notifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotificationList(notificationList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotificationList(notificationList.filter(n => n.id !== id));
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notificationList.filter(n => !n.read)
    : notificationList;

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
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
              <Button variant="outline" onClick={() => navigate('/chat')}>
                <Icon name="MessageSquare" size={18} className="mr-2" />
                Сообщения
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Мои заказы
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Уведомления</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground">
                  У вас {unreadCount} непрочитанных уведомлений
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Icon name="CheckCheck" size={18} className="mr-2" />
                Прочитать все
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">
                Все ({notificationList.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                Непрочитанные {unreadCount > 0 && `(${unreadCount})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Icon name="Bell" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">Нет уведомлений</h3>
                      <p className="text-sm text-muted-foreground">
                        {activeTab === 'unread' 
                          ? 'Все уведомления прочитаны' 
                          : 'У вас пока нет уведомлений'}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-colors ${
                        !notification.read ? 'border-primary/50 bg-primary/5' : ''
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (notification.type === 'message') {
                          navigate('/chat');
                        } else if (notification.orderId) {
                          navigate('/dashboard');
                        }
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {getNotificationIcon(notification)}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {formatTime(notification.time)}
                                </span>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.description}
                            </p>
                            {notification.orderTitle && (
                              <Badge variant="outline" className="text-xs">
                                <Icon name="Briefcase" size={12} className="mr-1" />
                                {notification.orderTitle}
                              </Badge>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-8" />

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Настройки уведомлений</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-messages" className="font-medium">Новые сообщения</Label>
                    <p className="text-sm text-muted-foreground">Получать уведомления о новых сообщениях</p>
                  </div>
                  <Switch id="notify-messages" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-offers" className="font-medium">Отклики на заказы</Label>
                    <p className="text-sm text-muted-foreground">Когда исполнители откликаются на ваши заказы</p>
                  </div>
                  <Switch id="notify-offers" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-progress" className="font-medium">Обновления прогресса</Label>
                    <p className="text-sm text-muted-foreground">Изменения статуса и прогресса ваших заказов</p>
                  </div>
                  <Switch id="notify-progress" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-payments" className="font-medium">Платежи</Label>
                    <p className="text-sm text-muted-foreground">Уведомления о проведенных платежах</p>
                  </div>
                  <Switch id="notify-payments" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-reviews" className="font-medium">Напоминания об отзывах</Label>
                    <p className="text-sm text-muted-foreground">Напоминать оставить отзыв после завершения заказа</p>
                  </div>
                  <Switch id="notify-reviews" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-email" className="font-medium">Email-уведомления</Label>
                    <p className="text-sm text-muted-foreground">Дублировать уведомления на электронную почту</p>
                  </div>
                  <Switch id="notify-email" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
