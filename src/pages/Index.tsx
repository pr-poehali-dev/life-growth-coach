import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MetricData {
  name: string;
  value: number;
  goal: number;
  unit: string;
  icon: string;
  color: string;
  trend: number;
}

const Index = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [entries, setEntries] = useState<string[]>([]);

  const metrics: MetricData[] = [
    { name: 'Спорт', value: 75, goal: 100, unit: 'мин', icon: 'Dumbbell', color: 'bg-primary', trend: 12 },
    { name: 'Питание', value: 85, goal: 100, unit: '%', icon: 'Apple', color: 'bg-growth', trend: 5 },
    { name: 'Сон', value: 68, goal: 100, unit: 'часов', icon: 'Moon', color: 'bg-calm', trend: -3 },
    { name: 'Активность', value: 92, goal: 100, unit: 'шагов', icon: 'Activity', color: 'bg-energy', trend: 18 },
  ];

  const totalProgress = Math.round(metrics.reduce((acc, m) => acc + m.value, 0) / metrics.length);

  const adviceOfDay = {
    title: 'Совет дня',
    text: 'Начните утро со стакана воды и 5 минут растяжки. Это запустит метаболизм и подготовит тело к продуктивному дню.',
    category: 'Здоровье'
  };

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      setEntries([journalEntry, ...entries]);
      setJournalEntry('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm/20 to-growth/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Твой Путь Роста</h1>
          <p className="text-muted-foreground text-lg">Отслеживай прогресс и меняй жизнь каждый день</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 hover:shadow-xl transition-all duration-300 animate-scale-in">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Общий Прогресс</CardTitle>
              <CardDescription>Твои достижения сегодня</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray={`${totalProgress * 2.51} 251`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-primary">{totalProgress}%</span>
                  <span className="text-sm text-muted-foreground">завершено</span>
                </div>
              </div>
              
              <div className="w-full space-y-2">
                {metrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${metric.color}`} />
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    <span className="text-muted-foreground">{metric.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-primary/10 to-calm/10 hover:shadow-xl transition-all duration-300 animate-scale-in">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="Lightbulb" className="text-primary animate-float" size={24} />
                <CardTitle className="text-2xl">{adviceOfDay.title}</CardTitle>
              </div>
              <Badge variant="secondary" className="w-fit">{adviceOfDay.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-foreground/90">{adviceOfDay.text}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <Card 
              key={metric.name} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon name={metric.icon} className="text-foreground/70" size={28} />
                  <Badge variant={metric.trend > 0 ? 'default' : 'secondary'}>
                    {metric.trend > 0 ? '+' : ''}{metric.trend}%
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-2">{metric.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="font-semibold">{metric.value}/{metric.goal} {metric.unit}</span>
                </div>
                <Progress value={metric.value} className="h-3" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-2 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon name="BookOpen" className="text-primary" size={24} />
              <CardTitle className="text-2xl">Личный Дневник</CardTitle>
            </div>
            <CardDescription>Записывай свои мысли и наблюдения</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="write" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="write">Новая запись</TabsTrigger>
                <TabsTrigger value="history">История ({entries.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="space-y-4">
                <Textarea
                  placeholder="Что я узнал сегодня? Какие инсайты получил? Что хочу изменить?"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <Button 
                  onClick={handleSaveEntry}
                  className="w-full"
                  disabled={!journalEntry.trim()}
                >
                  <Icon name="Save" className="mr-2" size={18} />
                  Сохранить запись
                </Button>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-3">
                {entries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="FileText" className="mx-auto mb-2" size={48} />
                    <p>Пока нет записей. Начните вести дневник!</p>
                  </div>
                ) : (
                  entries.map((entry, idx) => (
                    <Card key={idx} className="bg-muted/30">
                      <CardContent className="pt-4">
                        <p className="text-sm text-foreground/80">{entry}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date().toLocaleDateString('ru-RU')}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Index;
