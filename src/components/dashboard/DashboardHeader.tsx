import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
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
  );
}
