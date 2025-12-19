import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Ship {
  id: string;
  name: string;
  period: string;
  century: string;
  image: string;
  type: string;
  length: string;
  width: string;
  crew: string;
  armament: string;
  equipment: string;
  history: string;
  category: 'military' | 'trade' | 'fishing' | 'transport';
}

interface ShipDialogProps {
  ship: Ship | null;
  onClose: () => void;
  getCategoryBadgeColor: (category: string) => string;
  categoryLabels: Record<string, string>;
}

const ShipDialog = ({ ship, onClose, getCategoryBadgeColor, categoryLabels }: ShipDialogProps) => {
  return (
    <Dialog open={!!ship} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {ship && (
          <>
            <DialogHeader>
              <div className="relative h-64 w-full -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                <img
                  src={ship.image}
                  alt={ship.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-base px-3 py-1">
                  {ship.period}
                </Badge>
                <Badge className={`absolute top-4 left-4 ${getCategoryBadgeColor(ship.category)} text-white text-base px-3 py-1`}>
                  {categoryLabels[ship.category]}
                </Badge>
              </div>
              <DialogTitle className="text-4xl">{ship.name}</DialogTitle>
              <DialogDescription className="text-lg">
                {ship.type}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                  <Icon name="Ruler" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Длина судна</h4>
                    <p className="text-sm text-muted-foreground">{ship.length}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                  <Icon name="ArrowLeftRight" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Ширина судна</h4>
                    <p className="text-sm text-muted-foreground">{ship.width}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                  <Icon name="Users" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Экипаж</h4>
                    <p className="text-sm text-muted-foreground">{ship.crew}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                  <Icon name="Swords" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Вооружение</h4>
                    <p className="text-sm text-muted-foreground">{ship.armament}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                <div className="flex gap-3">
                  <Icon name="Ship" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Оснащение судна</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ship.equipment}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                <div className="flex gap-3">
                  <Icon name="BookOpen" size={24} className="text-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Из летописей</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ship.history}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={onClose} variant="outline">
                Закрыть описание
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShipDialog;
