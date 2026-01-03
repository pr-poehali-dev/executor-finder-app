import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface CompletedOrder {
  id: number;
  title: string;
  category: string;
  status: string;
  performer: {
    name: string;
    avatar: string;
    rating: number;
  };
  budget: number;
  createdDate: string;
  completedDate: string;
  description: string;
  address: string;
  reviewed: boolean;
  myRating: number | null;
}

interface CompletedOrderCardProps {
  order: CompletedOrder;
  getStatusBadge: (status: string) => JSX.Element;
}

export default function CompletedOrderCard({ order, getStatusBadge }: CompletedOrderCardProps) {
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
  );
}
