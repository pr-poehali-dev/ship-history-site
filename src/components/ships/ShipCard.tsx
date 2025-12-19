import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface ShipCardProps {
  ship: Ship;
  index: number;
  onClick: (ship: Ship) => void;
  getCategoryBadgeColor: (category: string) => string;
  categoryLabels: Record<string, string>;
}

const ShipCard = ({ ship, index, onClick, getCategoryBadgeColor, categoryLabels }: ShipCardProps) => {
  return (
    <Card
      key={ship.id}
      className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.03] bg-card animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={() => onClick(ship)}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={ship.image}
            alt={ship.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground">
            {ship.period}
          </Badge>
          <Badge className={`absolute top-3 left-3 ${getCategoryBadgeColor(ship.category)} text-white`}>
            {categoryLabels[ship.category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle className="text-2xl mb-2">{ship.name}</CardTitle>
        <CardDescription className="text-base">{ship.type}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ShipCard;
