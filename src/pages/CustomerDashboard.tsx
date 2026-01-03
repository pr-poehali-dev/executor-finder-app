import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ActiveOrderCard from '@/components/dashboard/ActiveOrderCard';
import CompletedOrderCard from '@/components/dashboard/CompletedOrderCard';
import PaymentsTab from '@/components/dashboard/PaymentsTab';

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
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8">
        <DashboardStats customerData={customerData} />

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
                <ActiveOrderCard key={order.id} order={order} getStatusBadge={getStatusBadge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-6">
              {completedOrders.map((order) => (
                <CompletedOrderCard key={order.id} order={order} getStatusBadge={getStatusBadge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <PaymentsTab transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
