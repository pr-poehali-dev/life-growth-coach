import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  category: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const Index = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [entries, setEntries] = useState<string[]>([]);
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income', amount: 50000, category: 'Зарплата', description: 'Основной доход', date: '2026-01-01' },
    { id: '2', type: 'expense', amount: 15000, category: 'Еда', description: 'Продукты', date: '2026-01-02' },
    { id: '3', type: 'expense', amount: 8000, category: 'Транспорт', description: 'Бензин', date: '2026-01-03' },
  ]);
  
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: ''
  });
  
  const expenseCategories = ['Еда', 'Транспорт', 'Жильё', 'Здоровье', 'Развлечения', 'Образование', 'Другое'];
  const incomeCategories = ['Зарплата', 'Фриланс', 'Инвестиции', 'Другое'];
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Утренняя зарядка 20 минут', completed: false, date: new Date().toISOString().split('T')[0], category: 'Спорт' },
    { id: '2', title: 'Записать в дневник размышления', completed: false, date: new Date().toISOString().split('T')[0], category: 'Личное' },
    { id: '3', title: 'Выпить 2 литра воды', completed: false, date: new Date().toISOString().split('T')[0], category: 'Здоровье' },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: 'Привет! Я твой личный наставник 🌟 Рад быть рядом на твоём пути к лучшей жизни. Как твои дела сегодня?', timestamp: new Date().toISOString() },
  ]);
  
  const [userMessage, setUserMessage] = useState('');
  
  const aiResponses = [
    'Отличный вопрос! Помни, что маленькие шаги каждый день приводят к большим изменениям 💪',
    'Я верю в тебя! Ты уже проделал большой путь, продолжай двигаться вперёд 🚀',
    'Это совершенно нормально чувствовать себя так. Главное — не останавливаться. Я здесь, чтобы поддержать тебя ❤️',
    'Классная идея! Давай разобьём это на маленькие задачи, чтобы было легче начать 📝',
    'Помни, что саморазвитие — это марафон, а не спринт. Ты справляешься отлично! 🌱',
    'Давай посмотрим на твой прогресс — ты уже многого добился! Гордись собой 🎯',
    'Иногда нужен отдых, и это абсолютно нормально. Забота о себе — тоже часть пути к успеху 🧘',
    'Отличное наблюдение! Продолжай быть внимательным к себе — это очень важный навык 👁️',
  ];

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
  
  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        date: selectedDate,
        category: 'Личное'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };
  
  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const newUserMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: userMessage,
        timestamp: new Date().toISOString()
      };
      
      setChatMessages([...chatMessages, newUserMessage]);
      setUserMessage('');
      
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
          timestamp: new Date().toISOString()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };
  
  const handleAddTransaction = () => {
    if (newTransaction.amount && newTransaction.category) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        type: newTransaction.type,
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        description: newTransaction.description,
        date: new Date().toISOString().split('T')[0]
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ type: 'expense', amount: '', category: '', description: '' });
    }
  };
  
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
  
  const todayTasks = tasks.filter(t => t.date === selectedDate);
  const completedToday = todayTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm/20 to-growth/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Твой Путь Роста</h1>
          <p className="text-muted-foreground text-lg">Отслеживай прогресс и меняй жизнь каждый день</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
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
          
          <Card className="border-2 hover:shadow-xl transition-all duration-300 animate-scale-in">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" className="text-primary" size={24} />
                <CardTitle className="text-2xl">Задачи на День</CardTitle>
              </div>
              <CardDescription>{completedToday} из {todayTasks.length} выполнено</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">Нет задач на сегодня</p>
              ) : (
                todayTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      task.completed ? 'bg-growth/20' : 'bg-muted/30'
                    }`}
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed ? 'bg-growth border-growth' : 'border-muted-foreground'
                    }`}>
                      {task.completed && <Icon name="Check" size={14} className="text-white" />}
                    </div>
                    <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </span>
                  </div>
                ))
              )}
              
              <div className="flex gap-2 pt-2">
                <Input
                  placeholder="Новая задача..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <Button onClick={handleAddTask} size="icon">
                  <Icon name="Plus" size={18} />
                </Button>
              </div>
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
              <Icon name="Wallet" className="text-primary" size={24} />
              <CardTitle className="text-2xl">Финансы</CardTitle>
            </div>
            <CardDescription>Управляй доходами и расходами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-growth/20 border-growth">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Доходы</p>
                      <p className="text-2xl font-bold text-foreground">{totalIncome.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <Icon name="TrendingUp" className="text-growth" size={32} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-destructive/10 border-destructive/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Расходы</p>
                      <p className="text-2xl font-bold text-foreground">{totalExpense.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <Icon name="TrendingDown" className="text-destructive" size={32} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/20 border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Баланс</p>
                      <p className={`text-2xl font-bold ${balance >= 0 ? 'text-growth' : 'text-destructive'}`}>
                        {balance.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <Icon name="Wallet" className="text-primary" size={32} />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="add" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="add">Добавить</TabsTrigger>
                <TabsTrigger value="history">История ({transactions.length})</TabsTrigger>
                <TabsTrigger value="categories">По категориям</TabsTrigger>
              </TabsList>
              
              <TabsContent value="add" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Тип операции</Label>
                    <Select value={newTransaction.type} onValueChange={(value: 'income' | 'expense') => setNewTransaction({...newTransaction, type: value, category: ''})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Доход</SelectItem>
                        <SelectItem value="expense">Расход</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Сумма (₽)</Label>
                      <Input
                        type="number"
                        placeholder="5000"
                        value={newTransaction.amount}
                        onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Категория</Label>
                      <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {(newTransaction.type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Описание (опционально)</Label>
                    <Input
                      placeholder="Покупка продуктов"
                      value={newTransaction.description}
                      onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleAddTransaction}
                    className="w-full"
                    disabled={!newTransaction.amount || !newTransaction.category}
                  >
                    <Icon name="Plus" className="mr-2" size={18} />
                    Добавить {newTransaction.type === 'income' ? 'доход' : 'расход'}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-3">
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="Receipt" className="mx-auto mb-2" size={48} />
                    <p>Пока нет транзакций</p>
                  </div>
                ) : (
                  transactions.map((transaction) => (
                    <Card key={transaction.id} className={transaction.type === 'income' ? 'bg-growth/10' : 'bg-muted/30'}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Icon 
                              name={transaction.type === 'income' ? 'ArrowUpCircle' : 'ArrowDownCircle'} 
                              className={transaction.type === 'income' ? 'text-growth' : 'text-destructive'}
                              size={24}
                            />
                            <div>
                              <p className="font-semibold text-foreground">{transaction.category}</p>
                              {transaction.description && (
                                <p className="text-sm text-muted-foreground">{transaction.description}</p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(transaction.date).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                          </div>
                          <p className={`font-bold text-lg ${transaction.type === 'income' ? 'text-growth' : 'text-destructive'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="categories" className="space-y-4">
                {Object.keys(expensesByCategory).length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="PieChart" className="mx-auto mb-2" size={48} />
                    <p>Нет данных о расходах</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(expensesByCategory)
                      .sort(([,a], [,b]) => b - a)
                      .map(([category, amount]) => {
                        const percentage = Math.round((amount / totalExpense) * 100);
                        return (
                          <div key={category} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{category}</span>
                              <span className="text-muted-foreground">{amount.toLocaleString('ru-RU')} ₽ ({percentage}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

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
              
              <TabsContent value="write" className="space-y-4 mt-4">
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
        
        <Card className="border-2 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 to-energy/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon name="MessageCircle" className="text-primary" size={24} />
              <CardTitle className="text-2xl">Личный Наставник</CardTitle>
            </div>
            <CardDescription>Твой ИИ-друг для поддержки и мотивации</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-96 overflow-y-auto space-y-3 p-4 bg-background/50 rounded-lg">
                {chatMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground ml-4' 
                        : 'bg-calm/30 text-foreground mr-4'
                    }`}>
                      {message.sender === 'ai' && (
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Sparkles" size={16} className="text-primary" />
                          <span className="text-xs font-semibold text-primary">ИИ Наставник</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Напиши свои мысли или вопросы..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!userMessage.trim()}>
                  <Icon name="Send" size={18} />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setUserMessage('Как мне начать день правильно?');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs"
                >
                  💭 Советы на день
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setUserMessage('Я чувствую упадок мотивации');
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs"
                >
                  💪 Нужна поддержка
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Index;