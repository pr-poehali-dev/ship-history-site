import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
}

const shipsData: Ship[] = [
  {
    id: '1',
    name: 'Ладья новгородская',
    period: '9-11 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/ead6eb16-bb2f-42ad-8061-44bf70248f30.jpg',
    type: 'Торговое и ратное судно речное',
    length: '12-15 аршин (8-10 метров)',
    width: '2-3 аршина (1.5-2 метра)',
    crew: '10-15 гребцов и воинов',
    armament: 'Копия, мечи, луки со стрелами, щиты дубовые',
    equipment: 'Парус полотняный единственный, вёсла дубовые, якорь каменный на веревии',
    history: 'Ладьи служили новгородским купцам и дружинам во времена освоения водных путей "из варяг в греки". Суда сии строились из дуба и сосны, годились для плавания по рекам и морским заливам. Ходили на них торговые люди до Царьграда и Хвалынского моря.'
  },
  {
    id: '2',
    name: 'Насад',
    period: '10-13 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/ead6eb16-bb2f-42ad-8061-44bf70248f30.jpg',
    type: 'Судно грузовое речное',
    length: '18-25 аршин (12-17 метров)',
    width: '4-5 аршин (3-3.5 метра)',
    crew: '8-12 кормщиков',
    armament: 'Без вооружения воинского',
    equipment: 'Паруса два или три, мачты сосновые, снасти конопляные',
    history: 'Насады использовались для перевозки товаров и грузов тяжёлых по рекам русским. Отличались вместительностью великой и прочностью в построении. Купцы московские и новгородские предпочитали сии суда для дальних странствий торговых.'
  },
  {
    id: '3',
    name: 'Учан',
    period: '11-14 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/ead6eb16-bb2f-42ad-8061-44bf70248f30.jpg',
    type: 'Судно рыболовное морское',
    length: '10-14 аршин (7-10 метров)',
    width: '3-4 аршина (2-3 метра)',
    crew: '4-8 рыбаков',
    armament: 'Топоры, ножи промысловые',
    equipment: 'Сети рыболовные, невод, парус единственный, вёсла',
    history: 'Учаны были излюбленным судном поморов северных для промысла рыбного в водах Студёного моря. Строились крепко, дабы выдержать волны суровые и ветры студёные. Кормили сии суда многие селения поморские.'
  },
  {
    id: '4',
    name: 'Коч поморский',
    period: '12-17 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/2339f76c-3741-4da4-bf59-dcff79a93f87.jpg',
    type: 'Судно промысловое ледовое',
    length: '20-25 аршин (14-17 метров)',
    width: '5-6 аршин (3.5-4 метра)',
    crew: '10-15 промышленников',
    armament: 'Пищали, луки, топоры',
    equipment: 'Паруса полотняные, обшивка двойная от льдов, якоря железные',
    history: 'Кочи создавались поморами для плавания во льдах и достижения земель дальних заполярных. Форма корпуса особая позволяла судну выдавливаться на лёд при сжатии. На кочах достигали промышленники островов Новой Земли и Груманта.'
  },
  {
    id: '5',
    name: 'Струг ратный',
    period: '13-16 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/2339f76c-3741-4da4-bf59-dcff79a93f87.jpg',
    type: 'Судно военное речное',
    length: '15-20 аршин (10-14 метров)',
    width: '3-4 аршина (2-3 метра)',
    crew: '20-30 ратников',
    armament: 'Пищали затинные, самострелы, копья, мечи',
    equipment: 'Паруса и вёсла, щиты по бортам, помост для стрельцов',
    history: 'Струги использовались в походах военных по рекам. Дружины княжеские передвигались на них быстро и скрытно. Особо славились струги в походах новгородских и московских ратей против недругов.'
  },
  {
    id: '6',
    name: 'Бусса',
    period: '13-15 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/2339f76c-3741-4da4-bf59-dcff79a93f87.jpg',
    type: 'Судно торговое морское',
    length: '25-30 аршин (17-21 метр)',
    width: '6-8 аршин (4-5.5 метра)',
    crew: '15-25 мореходов',
    armament: 'Пищали, самострелы для охраны',
    equipment: 'Три мачты с парусами, трюмы грузовые, каюты для купцов',
    history: 'Буссы строились для торговли морской с землями заморскими. Плавали по Балтийскому и Белому морям, перевозили товары ценные: меха, воск, мёд, смолу. Отличались надёжностью и вместительностью великой.'
  },
  {
    id: '7',
    name: 'Галера московская',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/dd280ded-31f4-4235-9761-146267d3a187.jpg',
    type: 'Судно военное гребное',
    length: '35-40 аршин (25-28 метров)',
    width: '7-9 аршин (5-6 метров)',
    crew: '100-150 гребцов и воинов',
    armament: 'Пушки медные 4-6 стволов, пищали, сабли, бердыши',
    equipment: 'Вёсла длинные парные, паруса запасные, снаряжение пушечное',
    history: 'Галеры появились на Руси по образцу судов европейских во времена царствования Ивана Грозного. Использовались для защиты рубежей южных и в походах против Крымского ханства. Строились на верфях волжских и доных.'
  },
  {
    id: '8',
    name: 'Соймá',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/dd280ded-31f4-4235-9761-146267d3a187.jpg',
    type: 'Судно транспортное речное',
    length: '30-40 аршин (21-28 метров)',
    width: '8-10 аршин (5.5-7 метров)',
    crew: '20-30 судовщиков',
    armament: 'Пищали малые для охраны',
    equipment: 'Мачты три с парусами большими, якоря железные тяжёлые',
    history: 'Соймы были крупнейшими судами речными Московского государства. Перевозили хлеб, соль, железо и товары иные в больших количествах. Особо важны были для снабжения городов поволжских и астраханских.'
  },
  {
    id: '9',
    name: 'Каторга ратная',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/dd280ded-31f4-4235-9761-146267d3a187.jpg',
    type: 'Судно военное парусно-гребное',
    length: '25-30 аршин (17-21 метр)',
    width: '6-7 аршин (4-5 метров)',
    crew: '60-80 воинов и гребцов',
    armament: 'Пушки 2-4 ствола, затинные пищали, холодное оружие',
    equipment: 'Вёсла 20-30 пар, паруса латинские, платформа пушечная',
    history: 'Каторги строились для флотилии донской и волжской. Сочетали в себе манёвренность гребных судов и мощь пушечную. Использовались казаками и стрельцами для охраны границ и походов против кочевников.'
  }
];

const Index = () => {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [activeTab, setActiveTab] = useState('9-11');

  const filteredShips = shipsData.filter(ship => ship.century === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur">
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
        <section className="mb-12 text-center">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Летопись судов российских
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            От ладей новгородских до галер московских — история великого судостроения 
            земли русской от времён древних до эпохи царствования династии Романовых
          </p>
        </section>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShips.map((ship) => (
                <Card
                  key={ship.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] bg-card"
                  onClick={() => setSelectedShip(ship)}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <img
                        src={ship.image}
                        alt={ship.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground">
                        {ship.period}
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
          </TabsContent>
        </Tabs>
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
                </div>
                <DialogTitle className="text-4xl">{selectedShip.name}</DialogTitle>
                <DialogDescription className="text-lg">
                  {selectedShip.type}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-accent rounded-lg">
                    <Icon name="Ruler" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Длина судна</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.length}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg">
                    <Icon name="ArrowLeftRight" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Ширина судна</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.width}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg">
                    <Icon name="Users" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Экипаж</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.crew}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg">
                    <Icon name="Swords" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Вооружение</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.armament}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent rounded-lg">
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

                <div className="p-4 bg-accent rounded-lg">
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
