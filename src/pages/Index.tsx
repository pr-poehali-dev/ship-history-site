import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const shipsData: Ship[] = [
  {
    id: '1',
    name: 'Ладья новгородская',
    period: '9-11 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/e1035189-3a01-4460-b0f4-8fd0df050978.jpg',
    type: 'Торговое и ратное судно речное',
    length: '12-15 аршин (8-10 метров)',
    width: '2-3 аршина (1.5-2 метра)',
    crew: '10-15 гребцов и воинов',
    armament: 'Копия, мечи, луки со стрелами, щиты дубовые',
    equipment: 'Парус полотняный единственный, вёсла дубовые, якорь каменный на веревии',
    history: 'Ладьи служили новгородским купцам и дружинам во времена освоения водных путей "из варяг в греки". Суда сии строились из дуба и сосны, годились для плавания по рекам и морским заливам. Ходили на них торговые люди до Царьграда и Хвалынского моря.',
    category: 'military'
  },
  {
    id: '2',
    name: 'Насад',
    period: '10-13 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/38b49611-fdec-49f7-9b58-84d2826037bc.jpg',
    type: 'Судно грузовое речное',
    length: '18-25 аршин (12-17 метров)',
    width: '4-5 аршин (3-3.5 метра)',
    crew: '8-12 кормщиков',
    armament: 'Без вооружения воинского',
    equipment: 'Паруса два или три, мачты сосновые, снасти конопляные',
    history: 'Насады использовались для перевозки товаров и грузов тяжёлых по рекам русским. Отличались вместительностью великой и прочностью в построении. Купцы московские и новгородские предпочитали сии суда для дальних странствий торговых.',
    category: 'transport'
  },
  {
    id: '3',
    name: 'Учан',
    period: '11-14 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/7a7e326e-e9ae-4ee4-a4ff-e1f70310405d.jpg',
    type: 'Судно рыболовное морское',
    length: '10-14 аршин (7-10 метров)',
    width: '3-4 аршина (2-3 метра)',
    crew: '4-8 рыбаков',
    armament: 'Топоры, ножи промысловые',
    equipment: 'Сети рыболовные, невод, парус единственный, вёсла',
    history: 'Учаны были излюбленным судном поморов северных для промысла рыбного в водах Студёного моря. Строились крепко, дабы выдержать волны суровые и ветры студёные. Кормили сии суда многие селения поморские.',
    category: 'fishing'
  },
  {
    id: '4',
    name: 'Паузок',
    period: '10-12 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/38b49611-fdec-49f7-9b58-84d2826037bc.jpg',
    type: 'Судно береговое торговое',
    length: '8-12 аршин (5-8 метров)',
    width: '2-3 аршина (1.5-2 метра)',
    crew: '3-6 гребцов',
    armament: 'Оружие личное промышленников',
    equipment: 'Парус малый, вёсла короткие, снасти простые',
    history: 'Паузки использовались для торговли прибрежной между селениями ближними. Малые размеры позволяли судну ходить по мелководью и заходить в устья рек малых. Промышленники на них доставляли товары к поселениям отдалённым.',
    category: 'trade'
  },
  {
    id: '5',
    name: 'Перевоз',
    period: '9-13 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/4bf4ad7e-6eea-4a2a-83ba-145912b45411.jpg',
    type: 'Судно паромное речное',
    length: '15-20 аршин (10-14 метров)',
    width: '5-7 аршин (3.5-5 метров)',
    crew: '6-10 перевозчиков',
    armament: 'Без вооружения',
    equipment: 'Платформа широкая, канаты переправные, колья береговые',
    history: 'Перевозы служили для переправы людей, повозок и скота через реки широкие. Были незаменимы на торговых путях и дорогах военных. Держались на канатах меж берегов и приводились в движение силой течения или вёслами.',
    category: 'transport'
  },
  {
    id: '6',
    name: 'Коч поморский',
    period: '12-17 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/cc7db15e-f884-40e5-9f8d-fea2d910453b.jpg',
    type: 'Судно промысловое ледовое',
    length: '20-25 аршин (14-17 метров)',
    width: '5-6 аршин (3.5-4 метра)',
    crew: '10-15 промышленников',
    armament: 'Пищали, луки, топоры',
    equipment: 'Паруса полотняные, обшивка двойная от льдов, якоря железные',
    history: 'Кочи создавались поморами для плавания во льдах и достижения земель дальних заполярных. Форма корпуса особая позволяла судну выдавливаться на лёд при сжатии. На кочах достигали промышленники островов Новой Земли и Груманта.',
    category: 'fishing'
  },
  {
    id: '7',
    name: 'Струг ратный',
    period: '13-16 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/a6501bca-5c3e-46a4-96a5-7c47fb68867e.jpg',
    type: 'Судно военное речное',
    length: '15-20 аршин (10-14 метров)',
    width: '3-4 аршина (2-3 метра)',
    crew: '20-30 ратников',
    armament: 'Пищали затинные, самострелы, копья, мечи',
    equipment: 'Паруса и вёсла, щиты по бортам, помост для стрельцов',
    history: 'Струги использовались в походах военных по рекам. Дружины княжеские передвигались на них быстро и скрытно. Особо славились струги в походах новгородских и московских ратей против недругов.',
    category: 'military'
  },
  {
    id: '8',
    name: 'Бусса',
    period: '13-15 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/107abfb9-9d03-4d7a-9b67-98974034656d.jpg',
    type: 'Судно торговое морское',
    length: '25-30 аршин (17-21 метр)',
    width: '6-8 аршин (4-5.5 метра)',
    crew: '15-25 мореходов',
    armament: 'Пищали, самострелы для охраны',
    equipment: 'Три мачты с парусами, трюмы грузовые, каюты для купцов',
    history: 'Буссы строились для торговли морской с землями заморскими. Плавали по Балтийскому и Белому морям, перевозили товары ценные: меха, воск, мёд, смолу. Отличались надёжностью и вместительностью великой.',
    category: 'trade'
  },
  {
    id: '9',
    name: 'Дощаник',
    period: '12-17 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/e70dccaf-89c8-4925-8f15-3ffbf3adfb29.jpg',
    type: 'Судно речное плоскодонное',
    length: '20-30 аршин (14-21 метр)',
    width: '5-7 аршин (3.5-5 метров)',
    crew: '10-15 судовщиков',
    armament: 'Для охраны - пищали малые',
    equipment: 'Дно плоское из досок, паруса простые, снасти прочные',
    history: 'Дощаники были распространены на реках великих русских - Волге, Днепре, Оке. Благодаря дну плоскому проходили по мелководью и годились для перевозки грузов различных. Особо любимы были купцами за простоту построения.',
    category: 'transport'
  },
  {
    id: '10',
    name: 'Лодка промысловая',
    period: '10-17 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/a2840b06-a9a0-459a-8ed2-dd9cad56d90f.jpg',
    type: 'Судно малое рыболовное',
    length: '5-8 аршин (3-5 метров)',
    width: '1-2 аршина (0.7-1.5 метра)',
    crew: '1-3 рыбака',
    armament: 'Без вооружения',
    equipment: 'Вёсла, сети, снасти рыболовные простые',
    history: 'Малые лодки служили повсеместно для промысла на реках, озёрах и прудах. Каждый рыбак имел такую лодку для пропитания семьи своей. Строились просто и быстро из досок сосновых с применением дёгтя для герметичности.',
    category: 'fishing'
  },
  {
    id: '11',
    name: 'Галера московская',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/1c195781-a25c-434f-b4d1-0d4d2f1acfd2.jpg',
    type: 'Судно военное гребное',
    length: '35-40 аршин (25-28 метров)',
    width: '7-9 аршин (5-6 метров)',
    crew: '100-150 гребцов и воинов',
    armament: 'Пушки медные 4-6 стволов, пищали, сабли, бердыши',
    equipment: 'Вёсла длинные парные, паруса запасные, снаряжение пушечное',
    history: 'Галеры появились на Руси по образцу судов европейских во времена царствования Ивана Грозного. Использовались для защиты рубежей южных и в походах против Крымского ханства. Строились на верфях волжских и доных.',
    category: 'military'
  },
  {
    id: '12',
    name: 'Соймá',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/34c9b019-2ef2-4369-931d-2ae9b3b7fa4e.jpg',
    type: 'Судно транспортное речное',
    length: '30-40 аршин (21-28 метров)',
    width: '8-10 аршин (5.5-7 метров)',
    crew: '20-30 судовщиков',
    armament: 'Пищали малые для охраны',
    equipment: 'Мачты три с парусами большими, якоря железные тяжёлые',
    history: 'Соймы были крупнейшими судами речными Московского государства. Перевозили хлеб, соль, железо и товары иные в больших количествах. Особо важны были для снабжения городов поволжских и астраханских.',
    category: 'transport'
  },
  {
    id: '13',
    name: 'Каторга ратная',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/2238fc1f-9a56-4c7d-8782-cea9173a1f1c.jpg',
    type: 'Судно военное парусно-гребное',
    length: '25-30 аршин (17-21 метр)',
    width: '6-7 аршин (4-5 метров)',
    crew: '60-80 воинов и гребцов',
    armament: 'Пушки 2-4 ствола, затинные пищали, холодное оружие',
    equipment: 'Вёсла 20-30 пар, паруса латинские, платформа пушечная',
    history: 'Каторги строились для флотилии донской и волжской. Сочетали в себе манёвренность гребных судов и мощь пушечную. Использовались казаками и стрельцами для охраны границ и походов против кочевников.',
    category: 'military'
  },
  {
    id: '14',
    name: 'Беляна',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/40ef8ea6-712d-4b9d-9af8-506a07bafb26.jpg',
    type: 'Баржа грузовая одноразовая',
    length: '40-60 аршин (28-42 метра)',
    width: '10-15 аршин (7-10 метров)',
    crew: '15-25 бурлаков',
    armament: 'Без вооружения',
    equipment: 'Паруса большие, трюмы огромные, снасти мощные',
    history: 'Беляны были судами особыми - строились из древесины белой необработанной для единственного плавания вниз по течению. По прибытии разбирались на брёвна для продажи. Перевозили товары массовые: хлеб, соль, лес. Были самыми вместительными судами речными.',
    category: 'transport'
  },
  {
    id: '15',
    name: 'Шняка поморская',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/fc76010a-4290-4ddb-a885-aa45313e0054.jpg',
    type: 'Судно торговое прибрежное',
    length: '15-20 аршин (10-14 метров)',
    width: '4-5 аршин (3-3.5 метра)',
    crew: '8-12 мореходов',
    armament: 'Пищали для защиты от разбойников',
    equipment: 'Паруса прямые, корпус укреплённый, трюм для товаров',
    history: 'Шняки использовались поморами для торговли вдоль берегов Белого и Баренцева морей. Отличались мореходностью в условиях северных и способностью противостоять штормам суровым. Доставляли рыбу солёную, жир тюлений и товары промысловые.',
    category: 'trade'
  },
  {
    id: '16',
    name: 'Бударка казачья',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/20d23258-c3b3-4e7b-a39c-cabccef79227.jpg',
    type: 'Судно военно-разбойничье',
    length: '12-18 аршин (8-12 метров)',
    width: '3-4 аршина (2-3 метра)',
    crew: '15-25 казаков',
    armament: 'Пушки малые, пищали, сабли, бердыши',
    equipment: 'Вёсла быстроходные, паруса манёвренные, борта низкие',
    history: 'Бударки строились казаками донскими и запорожскими для набегов на суда турецкие и татарские. Были быстры и манёвренны, позволяли совершать нападения внезапные. Использовались также для походов военных по приказу царскому против неприятелей южных.',
    category: 'military'
  }
];

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
                  <Card
                    key={ship.id}
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.03] bg-card animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedShip(ship)}
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

      <Dialog open={!!selectedShip} onOpenChange={() => setSelectedShip(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedShip && (
            <>
              <DialogHeader>
                <div className="relative h-64 w-full -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-lg">
                  <img
                    src={selectedShip.image}
                    alt={selectedShip.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground text-base px-3 py-1">
                    {selectedShip.period}
                  </Badge>
                  <Badge className={`absolute top-4 left-4 ${getCategoryBadgeColor(selectedShip.category)} text-white text-base px-3 py-1`}>
                    {categoryLabels[selectedShip.category]}
                  </Badge>
                </div>
                <DialogTitle className="text-4xl">{selectedShip.name}</DialogTitle>
                <DialogDescription className="text-lg">
                  {selectedShip.type}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                    <Icon name="Ruler" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Длина судна</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.length}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                    <Icon name="ArrowLeftRight" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Ширина судна</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.width}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                    <Icon name="Users" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Экипаж</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.crew}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                    <Icon name="Swords" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Вооружение</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.armament}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent rounded-lg transition-all hover:bg-accent/70">
                  <div className="flex gap-3">
                    <Icon name="Ship" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Оснащение судна</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedShip.equipment}
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
                        {selectedShip.history}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setSelectedShip(null)} variant="outline">
                  Закрыть описание
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
                Источник исторических материалов и летописных данных
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
