import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface CustomerData {
  lastName: string;
  firstName: string;
  middleName: string;
  avatar: string;
  phone: string;
  email: string;
  registrationDate: string;
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}

interface DashboardStatsProps {
  customerData: CustomerData;
}

export default function DashboardStats({ customerData }: DashboardStatsProps) {
  return (
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
  );
}
