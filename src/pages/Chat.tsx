import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const chatList = [
  {
    id: 1,
    orderId: 1,
    orderTitle: 'Ремонт ванной комнаты',
    participant: {
      name: 'Алексей Петров',
      avatar: '/placeholder.svg',
      role: 'performer',
      online: true,
    },
    lastMessage: {
      text: 'Завтра приеду к 10:00, привезу материалы',
      time: '2024-12-15T18:30:00',
      unread: 2,
      isOwn: false,
    },
  },
  {
    id: 2,
    orderId: 2,
    orderTitle: 'Установка кондиционера',
    participant: {
      name: 'Иван Смирнов',
      avatar: '/placeholder.svg',
      role: 'performer',
      online: false,
    },
    lastMessage: {
      text: 'Могу выполнить за 2 дня',
      time: '2024-12-15T15:20:00',
      unread: 0,
      isOwn: false,
    },
  },
  {
    id: 3,
    orderId: 3,
    orderTitle: 'Замена электропроводки',
    participant: {
      name: 'Дмитрий Козлов',
      avatar: '/placeholder.svg',
      role: 'performer',
      online: false,
    },
    lastMessage: {
      text: 'Спасибо за отзыв!',
      time: '2024-12-14T20:10:00',
      unread: 0,
      isOwn: true,
    },
  },
];

const messages = [
  {
    id: 1,
    text: 'Здравствуйте! Интересует ваш заказ по ремонту ванной.',
    time: '2024-12-15T10:00:00',
    isOwn: false,
    sender: 'Алексей Петров',
  },
  {
    id: 2,
    text: 'Добрый день! Да, нужна замена плитки и сантехники.',
    time: '2024-12-15T10:05:00',
    isOwn: true,
    sender: 'Вы',
  },
  {
    id: 3,
    text: 'Могу приехать на осмотр завтра или послезавтра. Когда вам удобно?',
    time: '2024-12-15T10:10:00',
    isOwn: false,
    sender: 'Алексей Петров',
  },
  {
    id: 4,
    text: 'Завтра после 14:00 подойдет?',
    time: '2024-12-15T10:15:00',
    isOwn: true,
    sender: 'Вы',
  },
  {
    id: 5,
    text: 'Отлично, завтра в 14:30 буду. Адрес: ул. Ленина, 15, кв. 42?',
    time: '2024-12-15T10:20:00',
    isOwn: false,
    sender: 'Алексей Петров',
  },
  {
    id: 6,
    text: 'Да, верно. Жду вас.',
    time: '2024-12-15T10:22:00',
    isOwn: true,
    sender: 'Вы',
  },
  {
    id: 7,
    text: 'Все посмотрел, могу начать работу в понедельник. Стоимость работ + материалы выйдет около 45000₽.',
    time: '2024-12-15T16:00:00',
    isOwn: false,
    sender: 'Алексей Петров',
  },
  {
    id: 8,
    text: 'Хорошо, устраивает. Когда завершите?',
    time: '2024-12-15T16:30:00',
    isOwn: true,
    sender: 'Вы',
  },
  {
    id: 9,
    text: 'Примерно 2 недели. Точные сроки скажу после начала работ.',
    time: '2024-12-15T17:00:00',
    isOwn: false,
    sender: 'Алексей Петров',
  },
  {
    id: 10,
    text: 'Завтра приеду к 10:00, привезу материалы',
    time: '2024-12-15T18:30:00',
    isOwn: false,
    sender: 'Алексей Петров',
  },
];

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
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
};

export default function Chat() {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [messageText, setMessageText] = useState('');
  const [currentMessages, setCurrentMessages] = useState(messages);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: currentMessages.length + 1,
      text: messageText,
      time: new Date().toISOString(),
      isOwn: true,
      sender: 'Вы',
    };

    setCurrentMessages([...currentMessages, newMessage]);
    setMessageText('');
  };

  const unreadCount = chatList.reduce((sum, chat) => sum + chat.lastMessage.unread, 0);

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
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Мои заказы
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          <Card className="md:col-span-1">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Сообщения</h2>
                {unreadCount > 0 && (
                  <Badge className="bg-primary">{unreadCount}</Badge>
                )}
              </div>
              <Input
                placeholder="Поиск по чатам..."
                className="w-full"
              />
            </div>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="p-2">
                {chatList.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors mb-2 ${
                      selectedChat.id === chat.id
                        ? 'bg-primary/10 border border-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.participant.avatar} />
                          <AvatarFallback>{chat.participant.name[0]}</AvatarFallback>
                        </Avatar>
                        {chat.participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm truncate">
                            {chat.participant.name}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(chat.lastMessage.time)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 truncate">
                          {chat.orderTitle}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className={`text-sm truncate ${
                            chat.lastMessage.unread > 0 ? 'font-semibold' : 'text-muted-foreground'
                          }`}>
                            {chat.lastMessage.isOwn && 'Вы: '}
                            {chat.lastMessage.text}
                          </p>
                          {chat.lastMessage.unread > 0 && (
                            <Badge variant="default" className="bg-primary ml-2">
                              {chat.lastMessage.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="md:col-span-2 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedChat.participant.avatar} />
                      <AvatarFallback>{selectedChat.participant.name[0]}</AvatarFallback>
                    </Avatar>
                    {selectedChat.participant.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedChat.participant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedChat.participant.online ? 'В сети' : 'Не в сети'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/performer/${selectedChat.id}`)}>
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Заказ
                  </Button>
                </div>
              </div>
              <div className="mt-3 p-2 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <Icon name="Briefcase" size={14} className="inline mr-1" />
                  {selectedChat.orderTitle}
                </p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.isOwn
                          ? 'bg-primary text-white'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {new Date(message.time).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="p-4">
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <Input
                  placeholder="Введите сообщение..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
