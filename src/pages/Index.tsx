import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

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
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/5d7d971e-db2c-4feb-91b5-ef006397b8cf.jpg',
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
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/36bbb593-b332-4d7f-93e9-33dec7000aed.jpg',
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
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/57bb544e-8885-423c-b034-77b8ec4a6d77.jpg',
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
    name: 'Паузок',
    period: '10-12 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/b63ed5ec-8fcb-45ce-a404-1ec8f194630b.jpg',
    type: 'Судно береговое торговое',
    length: '8-12 аршин (5-8 метров)',
    width: '2-3 аршина (1.5-2 метра)',
    crew: '3-6 гребцов',
    armament: 'Оружие личное промышленников',
    equipment: 'Парус малый, вёсла короткие, снасти простые',
    history: 'Паузки использовались для торговли прибрежной между селениями ближними. Малые размеры позволяли судну ходить по мелководью и заходить в устья рек малых. Промышленники на них доставляли товары к поселениям отдалённым.'
  },
  {
    id: '5',
    name: 'Перевоз',
    period: '9-13 века',
    century: '9-11',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/5917173e-ce6b-4d9c-93a9-679c961000de.jpg',
    type: 'Судно паромное речное',
    length: '15-20 аршин (10-14 метров)',
    width: '5-7 аршин (3.5-5 метров)',
    crew: '6-10 перевозчиков',
    armament: 'Без вооружения',
    equipment: 'Платформа широкая, канаты переправные, колья береговые',
    history: 'Перевозы служили для переправы людей, повозок и скота через реки широкие. Были незаменимы на торговых путях и дорогах военных. Держались на канатах меж берегов и приводились в движение силой течения или вёслами.'
  },
  {
    id: '6',
    name: 'Коч поморский',
    period: '12-17 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/7785eb4d-7fd7-4a07-ab71-4b33d4bd47e7.jpg',
    type: 'Судно промысловое ледовое',
    length: '20-25 аршин (14-17 метров)',
    width: '5-6 аршин (3.5-4 метра)',
    crew: '10-15 промышленников',
    armament: 'Пищали, луки, топоры',
    equipment: 'Паруса полотняные, обшивка двойная от льдов, якоря железные',
    history: 'Кочи создавались поморами для плавания во льдах и достижения земель дальних заполярных. Форма корпуса особая позволяла судну выдавливаться на лёд при сжатии. На кочах достигали промышленники островов Новой Земли и Груманта.'
  },
  {
    id: '7',
    name: 'Струг ратный',
    period: '13-16 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/4e8baa32-0c78-4178-9291-8c0ac88c0109.jpg',
    type: 'Судно военное речное',
    length: '15-20 аршин (10-14 метров)',
    width: '3-4 аршина (2-3 метра)',
    crew: '20-30 ратников',
    armament: 'Пищали затинные, самострелы, копья, мечи',
    equipment: 'Паруса и вёсла, щиты по бортам, помост для стрельцов',
    history: 'Струги использовались в походах военных по рекам. Дружины княжеские передвигались на них быстро и скрытно. Особо славились струги в походах новгородских и московских ратей против недругов.'
  },
  {
    id: '8',
    name: 'Бусса',
    period: '13-15 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/e318a1d5-c247-4e1a-aa30-31cb8ef34b36.jpg',
    type: 'Судно торговое морское',
    length: '25-30 аршин (17-21 метр)',
    width: '6-8 аршин (4-5.5 метра)',
    crew: '15-25 мореходов',
    armament: 'Пищали, самострелы для охраны',
    equipment: 'Три мачты с парусами, трюмы грузовые, каюты для купцов',
    history: 'Буссы строились для торговли морской с землями заморскими. Плавали по Балтийскому и Белому морям, перевозили товары ценные: меха, воск, мёд, смолу. Отличались надёжностью и вместительностью великой.'
  },
  {
    id: '9',
    name: 'Соляница',
    period: '14-16 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/dc9762ae-f9c1-4409-95d1-29abc60f1983.jpg',
    type: 'Судно специализированное грузовое',
    length: '22-28 аршин (15-20 метров)',
    width: '6-8 аршин (4-5.5 метра)',
    crew: '12-18 судовщиков',
    armament: 'Пищали для обороны',
    equipment: 'Трюмы особые для соли, паруса прочные, якоря тяжёлые',
    history: 'Соляницы предназначались для перевозки соли с промыслов поморских и с озёр соляных. Соль была товаром ценным и требовала судов надёжных. Плавали сии суда по Белому морю и рекам северным, снабжая солью земли московские.'
  },
  {
    id: '10',
    name: 'Кóломенка',
    period: '13-15 века',
    century: '12-14',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/40ae9c29-fedd-4276-83d3-692503088da7.jpg',
    type: 'Судно монастырское хозяйственное',
    length: '16-22 аршина (11-15 метров)',
    width: '4-5 аршин (3-3.5 метра)',
    crew: '8-14 братьев и послушников',
    armament: 'Без вооружения особого',
    equipment: 'Паруса простые, вёсла, трюм для припасов монастырских',
    history: 'Коломенки использовались обителями монастырскими для доставки припасов, строительных материалов и паломников. Строились просто но крепко, служили долгие годы. Названы по месту первого построения близ града Коломны.'
  },
  {
    id: '11',
    name: 'Галера московская',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/97b0e58c-c5db-4517-b752-25bd26d7672c.jpg',
    type: 'Судно военное гребное',
    length: '35-40 аршин (25-28 метров)',
    width: '7-9 аршин (5-6 метров)',
    crew: '100-150 гребцов и воинов',
    armament: 'Пушки медные 4-6 стволов, пищали, сабли, бердыши',
    equipment: 'Вёсла длинные парные, паруса запасные, снаряжение пушечное',
    history: 'Галеры появились на Руси по образцу судов европейских во времена царствования Ивана Грозного. Использовались для защиты рубежей южных и в походах против Крымского ханства. Строились на верфях волжских и доных.'
  },
  {
    id: '12',
    name: 'Соймá',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/ffca715c-0534-46c9-bbb2-34f30435f61f.jpg',
    type: 'Судно транспортное речное',
    length: '30-40 аршин (21-28 метров)',
    width: '8-10 аршин (5.5-7 метров)',
    crew: '20-30 судовщиков',
    armament: 'Пищали малые для охраны',
    equipment: 'Мачты три с парусами большими, якоря железные тяжёлые',
    history: 'Соймы были крупнейшими судами речными Московского государства. Перевозили хлеб, соль, железо и товары иные в больших количествах. Особо важны были для снабжения городов поволжских и астраханских.'
  },
  {
    id: '13',
    name: 'Каторга ратная',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/a909ea2d-ea30-4d16-9147-000e0e0822da.jpg',
    type: 'Судно военное парусно-гребное',
    length: '25-30 аршин (17-21 метр)',
    width: '6-7 аршин (4-5 метров)',
    crew: '60-80 воинов и гребцов',
    armament: 'Пушки 2-4 ствола, затинные пищали, холодное оружие',
    equipment: 'Вёсла 20-30 пар, паруса латинские, платформа пушечная',
    history: 'Каторги строились для флотилии донской и волжской. Сочетали в себе манёвренность гребных судов и мощь пушечную. Использовались казаками и стрельцами для охраны границ и походов против кочевников.'
  },
  {
    id: '14',
    name: 'Чайка запорожская',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/a909ea2d-ea30-4d16-9147-000e0e0822da.jpg',
    type: 'Судно казацкое боевое',
    length: '18-22 аршина (12-15 метров)',
    width: '4-5 аршин (3-3.5 метра)',
    crew: '50-70 казаков',
    armament: 'Пищали, мушкеты, сабли, пики казацкие',
    equipment: 'Вёсла 10-15 пар, парус запасной, камыш для плавучести',
    history: 'Чайки были главным оружием казаков запорожских в морских походах. Лёгкие и быстрые, они совершали дерзкие набеги на крепости турецкие. Особенность чаек - обшивка камышом, дававшая непотопляемость при пробоинах.'
  },
  {
    id: '15',
    name: 'Дощаник',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/ffca715c-0534-46c9-bbb2-34f30435f61f.jpg',
    type: 'Судно грузовое плоскодонное',
    length: '20-30 аршин (14-21 метр)',
    width: '6-9 аршин (4-6 метров)',
    crew: '10-20 бурлаков и кормщиков',
    armament: 'Минимальное для охраны',
    equipment: 'Паруса простые, весла или бурлацкая тяга, трюм просторный',
    history: 'Дощаники были самым распространённым типом грузовых судов на реках московских. Строились из досок без особой сложности, потому и получили такое имя. Часто тянулись бурлаками против течения, везя товары в города верховые.'
  },
  {
    id: '16',
    name: 'Коч-каюк',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/7785eb4d-7fd7-4a07-ab71-4b33d4bd47e7.jpg',
    type: 'Судно промысловое малое',
    length: '12-16 аршин (8-11 метров)',
    width: '3-4 аршина (2-3 метра)',
    crew: '4-8 промышленников',
    armament: 'Оружие охотничье и рыбацкое',
    equipment: 'Парус один, вёсла, сети, снаряжение зверобойное',
    history: 'Коч-каюки были младшими братьями кочей больших. Использовались для промысла морского близ берегов и в заливах. Строились проще и быстрее кочей, служили артелям промысловым малым.'
  },
  {
    id: '17',
    name: 'Бударá',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/d3786aa6-210f-42e6-9288-cdbaf2d20dad.jpg',
    type: 'Судно рыболовное озёрное',
    length: '10-15 аршин (7-10 метров)',
    width: '3-5 аршин (2-3.5 метра)',
    crew: '4-10 рыбаков',
    armament: 'Без вооружения',
    equipment: 'Невода, сети, парус, садок для рыбы живой',
    history: 'Будары строились специально для промысла рыбного на озёрах больших и заливах морских. Имели садки для хранения рыбы живой, что позволяло доставлять её свежей на рынки городские. Особенно распространены были на Ладоге и Онеге.'
  },
  {
    id: '18',
    name: 'Карбас поморский',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/7785eb4d-7fd7-4a07-ab71-4b33d4bd47e7.jpg',
    type: 'Судно универсальное северное',
    length: '14-18 аршин (10-12 метров)',
    width: '4-5 аршин (3-3.5 метра)',
    crew: '6-12 поморов',
    armament: 'Оружие промысловое',
    equipment: 'Парус, вёсла, снасти рыболовные и зверобойные',
    history: 'Карбасы были рабочими лошадками поморов. На них ходили на промысел, перевозили грузы меж селениями, плавали к островам ближним. Строились каждым хозяином сам или артелью, служили десятилетиями.'
  },
  {
    id: '19',
    name: 'Корабль боярский',
    period: '16-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/0a00d24d-a914-4dca-923c-27443760ac90.jpg',
    type: 'Судно военное флагманское',
    length: '40-50 аршин (28-35 метров)',
    width: '10-12 аршин (7-8.5 метра)',
    crew: '150-200 воинов и матросов',
    armament: 'Пушки 10-20 стволов, пищали многие, мортиры',
    equipment: 'Мачты три высокие, паруса множество, каюты командирские богатые',
    history: 'Корабли боярские строились по указу царскому как флагманы флотилий. Украшались резьбой и росписью, имели палубы многие и пушки тяжёлые. Самый знаменитый - "Орёл", первый военный корабль российский с орлом двуглавым на носу.'
  },
  {
    id: '20',
    name: 'Лодья тиунская',
    period: '15-17 века',
    century: '15-17',
    image: 'https://cdn.poehali.dev/projects/d9eb6197-3788-4936-8ddf-c6c9775dc564/files/d3786aa6-210f-42e6-9288-cdbaf2d20dad.jpg',
    type: 'Судно административное речное',
    length: '18-24 аршина (12-17 метров)',
    width: '4-6 аршин (3-4 метра)',
    crew: '12-20 гребцов и служивых',
    armament: 'Пищали, бердыши стражи',
    equipment: 'Каюта для тиуна, паруса, вёсла, знамя княжеское или царское',
    history: 'Лодьи тиунские использовались представителями власти княжеской и царской для объезда владений, сбора податей и вершения суда. Отличались украшением и наличием каюты для должностного лица. Имели право первенства при проходе по рекам.'
  }
];

const Index = () => {
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [activeTab, setActiveTab] = useState('9-11');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats] = useState({
    totalShips: shipsData.length,
    centuries: 9,
    types: ['Военные', 'Торговые', 'Промысловые', 'Административные']
  });

  const filteredShips = shipsData.filter(ship => {
    const matchesCentury = ship.century === activeTab;
    const matchesSearch = searchQuery.trim() === '' || 
      ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ship.history.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCentury && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-50">
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
          <h2 className="text-5xl font-bold mb-4 text-foreground animate-fade-in">
            Летопись судов российских
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            От ладей новгородских до галер московских — история великого судостроения 
            земли русской от времён древних до эпохи царствования династии Романовых
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <Card className="bg-accent border-none">
              <CardContent className="pt-6 text-center">
                <Icon name="Ship" className="mx-auto mb-2 text-primary" size={32} />
                <div className="text-3xl font-bold text-primary">{stats.totalShips}</div>
                <div className="text-sm text-muted-foreground">судов в летописи</div>
              </CardContent>
            </Card>
            <Card className="bg-accent border-none">
              <CardContent className="pt-6 text-center">
                <Icon name="Calendar" className="mx-auto mb-2 text-primary" size={32} />
                <div className="text-3xl font-bold text-primary">{stats.centuries}</div>
                <div className="text-sm text-muted-foreground">столетий истории</div>
              </CardContent>
            </Card>
            <Card className="bg-accent border-none">
              <CardContent className="pt-6 text-center">
                <Icon name="Navigation" className="mx-auto mb-2 text-primary" size={32} />
                <div className="text-3xl font-bold text-primary">{stats.types.length}</div>
                <div className="text-sm text-muted-foreground">типа судов</div>
              </CardContent>
            </Card>
            <Card className="bg-accent border-none">
              <CardContent className="pt-6 text-center">
                <Icon name="Scroll" className="mx-auto mb-2 text-primary" size={32} />
                <div className="text-3xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">страниц истории</div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>
          </div>
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
            {filteredShips.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Суда по запросу "{searchQuery}" не найдены в летописях
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShips.map((ship, index) => (
                  <Card
                    key={ship.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] bg-card animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => setSelectedShip(ship)}
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={ship.image}
                          alt={ship.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
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
            )}
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
                  <div className="flex gap-3 p-4 bg-accent rounded-lg hover:bg-accent/70 transition-colors">
                    <Icon name="Ruler" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Длина судна</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.length}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg hover:bg-accent/70 transition-colors">
                    <Icon name="ArrowLeftRight" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Ширина судна</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.width}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg hover:bg-accent/70 transition-colors">
                    <Icon name="Users" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Экипаж</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.crew}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-accent rounded-lg hover:bg-accent/70 transition-colors">
                    <Icon name="Swords" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Вооружение</h4>
                      <p className="text-sm text-muted-foreground">{selectedShip.armament}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent rounded-lg hover:bg-accent/70 transition-colors">
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

                <div className="p-4 bg-accent rounded-lg hover:bg-accent/70 transition-colors">
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
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <Icon name="Anchor" size={24} className="text-primary" />
              <span className="font-semibold text-lg">Корабли.ру</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Собрание сведений о судах российских времён древних и средних веков. 
              Составлено по летописям, документам архивным и трудам исследователей морской истории.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <a 
                href="https://madte.st/cgJNW24F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline transition-all hover:gap-3"
              >
                <Icon name="FileText" size={16} />
                <span>Историческая справка о судостроении</span>
                <Icon name="ExternalLink" size={14} />
              </a>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} · Для просвещения и изучения наследия судостроительного</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
