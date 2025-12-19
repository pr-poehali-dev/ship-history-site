import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { shipsData, Ship } from '@/data/shipsData';
import ShipCard from '@/components/ships/ShipCard';
import ShipDialog from '@/components/ships/ShipDialog';
import ShipFilters from '@/components/ships/ShipFilters';

const Index = () => {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [activeTab, setActiveTab] = useState('9-11');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredShips = useMemo(() => {
    return shipsData.filter(ship => {
      const matchesCentury = ship.century === activeTab;
      const matchesSearch = ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ship.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || ship.category === categoryFilter;
      
      return matchesCentury && matchesSearch && matchesCategory;
    });
  }, [activeTab, searchQuery, categoryFilter]);

  const categoryLabels = {
    all: 'Все типы',
    military: 'Военные',
    trade: 'Торговые',
    fishing: 'Промысловые',
    transport: 'Транспортные'
  };

  const getCategoryBadgeColor = (category: string) => {
    switch(category) {
      case 'military': return 'bg-red-600';
      case 'trade': return 'bg-green-600';
      case 'fishing': return 'bg-blue-600';
      case 'transport': return 'bg-amber-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Anchor" size={32} className="text-primary" />
              <h1 className="text-4xl font-bold text-primary">Корабли.ру</h1>
            </div>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Русское судостроение IX—XVII столетий
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Летопись судов российских
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            От ладей новгородских до галер московских — история великого судостроения 
            земли русской от времён древних до эпохи царствования династии Романовых
          </p>
        </section>

        <ShipFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-auto">
            <TabsTrigger value="9-11" className="text-base py-3">
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold">IX—XI века</span>
                <span className="text-xs text-muted-foreground">Времена древние</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="12-14" className="text-base py-3">
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold">XII—XIV века</span>
                <span className="text-xs text-muted-foreground">Эпоха расцвета</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="15-17" className="text-base py-3">
              <div className="flex flex-col items-center gap-1">
                <span className="font-semibold">XV—XVII века</span>
                <span className="text-xs text-muted-foreground">Государство Московское</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredShips.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Ship" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Судов по заданным критериям не обретено</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredShips.map((ship, index) => (
                  <ShipCard
                    key={ship.id}
                    ship={ship}
                    index={index}
                    onClick={setSelectedShip}
                    getCategoryBadgeColor={getCategoryBadgeColor}
                    categoryLabels={categoryLabels}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-16 p-6 bg-accent/50 rounded-lg border border-border text-center">
          <Icon name="BookOpen" size={32} className="mx-auto mb-3 text-primary" />
          <h3 className="text-xl font-semibold mb-2">Сведения о судах российских</h3>
          <p className="text-muted-foreground mb-4">
            Всего в летописи представлено {shipsData.length} судов различных типов и назначений
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="text-sm">⚔️ Военных: {shipsData.filter(s => s.category === 'military').length}</Badge>
            <Badge variant="outline" className="text-sm">⛵ Торговых: {shipsData.filter(s => s.category === 'trade').length}</Badge>
            <Badge variant="outline" className="text-sm">🐟 Промысловых: {shipsData.filter(s => s.category === 'fishing').length}</Badge>
            <Badge variant="outline" className="text-sm">📦 Транспортных: {shipsData.filter(s => s.category === 'transport').length}</Badge>
          </div>
        </div>
      </main>

      <ShipDialog
        ship={selectedShip}
        onClose={() => setSelectedShip(null)}
        getCategoryBadgeColor={getCategoryBadgeColor}
        categoryLabels={categoryLabels}
      />

      <footer className="border-t border-border bg-card/50 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Icon name="Anchor" size={24} className="text-primary" />
              <span className="font-semibold text-lg">Корабли.ру</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Собрание сведений о судах российских времён древних и средних веков. 
              Составлено по летописям, документам архивным и трудам исследователей морской истории.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Icon name="ExternalLink" size={16} className="text-primary" />
              <a 
                href="https://madte.st/cgJNW24F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                Тест
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} · Для просвещения и изучения наследия судостроительного
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
