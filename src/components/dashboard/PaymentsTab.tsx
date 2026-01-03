import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Transaction {
  id: number;
  orderId: number;
  orderTitle: string;
  amount: number;
  type: string;
  status: string;
  date: string;
  description: string;
}

interface PaymentsTabProps {
  transactions: Transaction[];
}

export default function PaymentsTab({ transactions }: PaymentsTabProps) {
  return (
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
  );
}
