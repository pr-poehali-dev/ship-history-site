import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface ShipFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
}

const ShipFilters = ({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter }: ShipFiltersProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center animate-fade-in">
      <div className="relative w-full md:w-96">
        <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Поиск по названию или типу судна..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-full md:w-52">
          <SelectValue placeholder="Тип судна" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все типы</SelectItem>
          <SelectItem value="military">⚔️ Военные</SelectItem>
          <SelectItem value="trade">⛵ Торговые</SelectItem>
          <SelectItem value="fishing">🐟 Промысловые</SelectItem>
          <SelectItem value="transport">📦 Транспортные</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShipFilters;
