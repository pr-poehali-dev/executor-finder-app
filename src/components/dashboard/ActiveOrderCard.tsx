import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface ActiveOrder {
  id: number;
  title: string;
  category: string;
  status: string;
  performer: {
    name: string;
    avatar: string;
    rating: number;
  } | null;
  budget: number;
  createdDate: string;
  deadline: string;
  progress?: number;
  description: string;
  address: string;
  applicants?: number;
}

interface ActiveOrderCardProps {
  order: ActiveOrder;
  getStatusBadge: (status: string) => JSX.Element;
}

export default function ActiveOrderCard({ order, getStatusBadge }: ActiveOrderCardProps) {
  return (
    <Card>
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

            {order.status === 'in_progress' && order.progress !== undefined && (
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
  );
}
