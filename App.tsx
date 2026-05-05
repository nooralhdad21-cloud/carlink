import { useState, useEffect } from 'react';
import {
  Brain,
  BookOpen,
  Trophy,
  Target,
  Award,
  MessageCircle,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Smartphone,
  ChevronDown,
  Menu,
  X,
  Star,
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone,
  Send,
  GraduationCap,
  Lightbulb,
  BarChart3,
  Gamepad2,
  FileBadge,
  Globe,
  Clock,
  BadgeCheck
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState('');

  const fullText = 'مستقبل التعليم يبدأ هنا';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);

      const sections = ['home', 'features', 'market', 'pricing', 'strategy', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'تعلم ذكي',
      description: 'نظام توصية يقترح أسئلة وكورسات حسب مستوى الطالب',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'تتبع التقدم',
      description: 'إحصائيات دقيقة لكل مادة وتحليل أداء شامل',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Gamification',
      description: 'نقاط XP وشارات (Badges) و Leaderboard',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'اختبار يومي',
      description: 'تحدي يومي لزيادة التفاعل ونظام ترتيب المستخدمين',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <FileBadge className="w-8 h-8" />,
      title: 'شهادات احترافية',
      description: 'توليد شهادة PDF مع QR Code للتحقق',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'مجتمع تفاعلي',
      description: 'تعليقات ونقاشات داخل الكورسات',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const competitors = [
    { name: 'Telegram', issue: 'فوضى وعدم تنظيم' },
    { name: 'PDF', issue: 'غير تفاعلي' },
    { name: 'منصات عالمية', issue: 'غير موجهة للسوق المحلي' }
  ];

  const advantages = [
    'منصة متكاملة',
    'تجربة ذكية',
    'موجهة محلياً'
  ];

  const stats = [
    { number: '100,000+', label: 'طالب سنوياً', icon: <Users className="w-6 h-6" /> },
    { number: '50+', label: 'كورس تدريبي', icon: <BookOpen className="w-6 h-6" /> },
    { number: '10,000+', label: 'سؤال في البنك', icon: <Brain className="w-6 h-6" /> },
    { number: '5,000+', label: 'مستخدم نشط', icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                كفاءة .IQ
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'features', label: 'المميزات' },
                { id: 'market', label: 'السوق' },
                { id: 'pricing', label: 'الاشتراكات' },
                { id: 'strategy', label: 'الاستراتيجية' },
                { id: 'contact', label: 'تواصل معنا' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-slate-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-4 space-y-3">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'features', label: 'المميزات' },
                { id: 'market', label: 'السوق' },
                { id: 'pricing', label: 'الاشتراكات' },
                { id: 'strategy', label: 'الاستراتيجية' },
                { id: 'contact', label: 'تواصل معنا' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-right py-2 text-slate-300 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
                <BadgeCheck className="w-4 h-4" />
                <span>منصة ذكية للدراسات العليا</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  كفاءة .IQ
                </span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-400">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                منصة تعليمية ذكية متكاملة للتحضير لدراسات العليا في العراق.
                بنك أسئلة ذكي، اختبارات تفاعلية، كورسات تدريبية، ومجتمع تفاعلي
                في مكان واحد.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  ابدأ الآن مجاناً
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="px-8 py-4 bg-slate-800 border border-slate-700 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  اكتشف المزيد
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(1571 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-400">
                  <span className="text-white font-semibold">+5,000</span> طالب بدأوا رحلتهم
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-700 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">تقدمك اليومي</h3>
                      <span className="text-green-400 text-sm">+25%</span>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'الأسئلة المحلولة', value: 85, color: 'bg-blue-500' },
                        { label: 'الكورسات المكتملة', value: 60, color: 'bg-purple-500' },
                        { label: 'الاختبارات', value: 40, color: 'bg-orange-500' }
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">{item.label}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center p-4 bg-slate-700/50 rounded-xl">
                        <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                        <div className="text-2xl font-bold">1,250</div>
                        <div className="text-xs text-slate-400">نقطة XP</div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/50 rounded-xl">
                        <Star className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs text-slate-400">شارة</div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/50 rounded-xl">
                        <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                        <div className="text-2xl font-bold">#5</div>
                        <div className="text-xs text-slate-400">الترتيب</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>المشكلة</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                طلاب الدراسات العليا
                <span className="text-red-400"> يواجهون تحديات</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: '❌', text: 'محتوى مشتت وغير منظم' },
                  { icon: '❌', text: 'غياب منصة موحدة للتحضير' },
                  { icon: '❌', text: 'ضعف التقييم الحقيقي للمستوى' },
                  { icon: '❌', text: 'الاعتماد على مصادر غير موثوقة' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-slate-300">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 font-semibold">
                  📉 النتيجة: تحضير ضعيف + فرص قبول أقل
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-red-400">85%</div>
                      <div className="text-slate-400">من الطلاب غير راضين</div>
                    </div>
                  </div>
                  <div className="h-px bg-slate-700" />
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                      <Clock className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-400">40%</div>
                      <div className="text-slate-400">وقت ضائع في البحث</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-4">
              <CheckCircle className="w-4 h-4" />
              <span>الحل</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                كفاءة .IQ
              </span>{' '}
              تقدم تجربة متكاملة
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              كل ما يحتاجه الطالب في منصة واحدة - من بنك الأسئلة الذكي إلى الكورسات التدريبية والمدربين المتخصصين
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Feature Showcase */}
          <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">نظام التوصية الذكي</h3>
              </div>
              <div className="space-y-4">
                {[
                  'تحليل مستوى الطالب تلقائياً',
                  'اقتراح أسئلة حسب نقاط الضعف',
                  'توصية كورسات مخصصة',
                  'تتبع التطور اليومي'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">نظام التحديات اليومي</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { day: 'السبت', points: '+50 XP', completed: true },
                  { day: 'الأحد', points: '+75 XP', completed: true },
                  { day: 'الاثنين', points: '+100 XP', completed: false },
                  { day: 'الثلاثاء', points: '+50 XP', completed: false }
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl ${item.completed ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-700/50'}`}
                  >
                    <div className="text-sm text-slate-400">{item.day}</div>
                    <div className={`font-bold ${item.completed ? 'text-green-400' : 'text-slate-300'}`}>
                      {item.points}
                    </div>
                    {item.completed && (
                      <CheckCircle className="w-4 h-4 text-green-400 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">أرقام تتحدث عنا</h2>
            <p className="text-slate-400">نمو متسارع ومجتمع متنامي</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="inline-flex p-3 bg-blue-500/20 rounded-xl mb-4 text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section id="market" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
                <Globe className="w-4 h-4" />
                <span>فرصة السوق</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                سوق <span className="text-blue-400">واعد</span> وقابل للتوسع
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">أكثر من 100,000 طالب سنوياً</h3>
                    <p className="text-slate-400">في العراق وحده يبحثون عن فرص الدراسات العليا</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">قابل للتوسع إلى السوق العربي</h3>
                    <p className="text-slate-400">إمكانية التوسع لتشمل العراق ومصر والسعودية والإمارات</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-400 font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  سوق غير مخدوم تقنياً بشكل كافي
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
                <h3 className="text-xl font-bold mb-6">توقعات النمو</h3>
                <div className="space-y-4">
                  {[
                    { year: '2025', users: '5,000', growth: '+150%' },
                    { year: '2026', users: '25,000', growth: '+400%' },
                    { year: '2027', users: '75,000', growth: '+200%' },
                    { year: '2028', users: '150,000', growth: '+100%' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                      <div>
                        <div className="font-bold">{item.year}</div>
                        <div className="text-sm text-slate-400">{item.users} مستخدم</div>
                      </div>
                      <div className="text-green-400 font-semibold">{item.growth}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">لماذا <span className="text-blue-400">كفاءة .IQ</span>؟</h2>
            <p className="text-slate-400">مقارنة مع المنافسين</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6 text-red-400">❌ المنافسون</h3>
              <div className="space-y-4">
                {competitors.map((comp, i) => (
                  <div key={i} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="font-bold text-lg mb-1">{comp.name}</div>
                    <div className="text-slate-400">{comp.issue}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-green-400">✅ ميزاتنا</h3>
              <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                <div className="space-y-4">
                  {advantages.map((adv, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="font-semibold text-lg">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">خطط الاشتراك</h2>
            <p className="text-slate-400">اختر الخطة المناسبة لك</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">مجاني</h3>
                <div className="text-4xl font-bold mb-1">$0</div>
                <div className="text-slate-400">للبداية</div>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  '5 اختبارات يومياً',
                  'بنك الأسئلة الأساسي',
                  'تحدي يومي واحد',
                  'إحصائيات أساسية'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-slate-700 rounded-xl font-semibold hover:bg-slate-600 transition-colors">
                ابدأ مجاناً
              </button>
            </div>

            <div className="relative p-8 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-2xl border-2 border-blue-500/50">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 rounded-full text-sm font-semibold">
                الأكثر شعبية
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-1">$19</div>
                <div className="text-slate-400">شهرياً</div>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  'اختبارات لا محدودة',
                  'بنك الأسئلة الكامل',
                  'جميع التحديات اليومية',
                  'إحصائيات متقدمة',
                  'كورسات حصرية',
                  'دعم أولوي'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                اشترك الآن
              </button>
            </div>

            <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Institution</h3>
                <div className="text-4xl font-bold mb-1">$99</div>
                <div className="text-slate-400">شهرياً</div>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  'كل مميزات Premium',
                  'حتى 50 مستخدم',
                  'لوحة تحكم إدارية',
                  'تقارير مخصصة',
                  'API وصول',
                  'دعم مخصص'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-slate-700 rounded-xl font-semibold hover:bg-slate-600 transition-colors">
                تواصل معنا
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-400">
              <span className="text-blue-400 font-semibold">ARPU المتوقع:</span> 10 – 50 دولار
            </p>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section id="strategy" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">استراتيجية النمو</h2>
            <p className="text-slate-400">كيف سنصل إلى المستخدمين</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Smartphone className="w-8 h-8" />, title: 'تسويق رقمي', desc: 'TikTok / Telegram', color: 'from-pink-500 to-rose-500' },
              { icon: <Gift className="w-8 h-8" />, title: 'محتوى مجاني', desc: 'اختبار يومي', color: 'from-green-500 to-emerald-500' },
              { icon: <Users className="w-8 h-8" />, title: 'شراكات تعليمية', desc: 'معاهد وجامعات', color: 'from-blue-500 to-cyan-500' },
              { icon: <TrendingUp className="w-8 h-8" />, title: 'نظام إحالة', desc: 'Referral System', color: 'from-purple-500 to-indigo-500' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 text-center">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} mb-4`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Technology */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">⚙️ التقنية</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Globe className="w-6 h-6" />, title: 'Cloud', desc: 'بدون سيرفر معقد' },
                { icon: <Shield className="w-6 h-6" />, title: 'أمان عالي', desc: 'تسجيل دخول آمن' },
                { icon: <Zap className="w-6 h-6" />, title: 'سرعة فائقة', desc: 'Lazy Loading' },
                { icon: <Smartphone className="w-6 h-6" />, title: 'Responsive', desc: 'متوافق مع الموبايل' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                  <div className="text-blue-400">{item.icon}</div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-blue-500/30 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">📊 التراكتشن</h2>
            <div className="grid sm:grid-cols-3 gap-8 mb-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-green-400">✅</div>
                <div className="font-semibold">Prototype جاهز</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-blue-400">🔄</div>
                <div className="font-semibold">تطوير مستمر</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-purple-400">🎯</div>
                <div className="font-semibold">جاهز لإطلاق Beta</div>
              </div>
            </div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              نحن في مرحلة التطوير المستمر والاستعداد لإطلاق النسخة التجريبية
              التي ستحدث ثورة في طريقة تحضير الطلاب لدراسات العليا
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">🏆 الرؤية</h2>
            <blockquote className="text-2xl sm:text-3xl font-semibold leading-relaxed text-slate-300 mb-8">
              "أن تصبح{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                كفاءة .IQ
              </span>{' '}
              المنصة الأولى في العراق، ثم التوسع إلى{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                الشرق الأوسط
              </span>"
            </blockquote>
            <div className="flex justify-center gap-4">
              <div className="px-6 py-3 bg-slate-800 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">العراق أولاً</div>
              </div>
              <div className="px-6 py-3 bg-slate-800 rounded-xl">
                <div className="text-2xl font-bold text-purple-400">ثم التوسع</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">📞 تواصل معنا</h2>
            <p className="text-slate-400">نحن نبحث عن شركاء ومستثمرين</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold mb-4">💵 ما نبحث عنه</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-xl">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💰</span>
                    </div>
                    <div>
                      <div className="font-semibold">استثمار مبدئي (Seed)</div>
                      <p className="text-sm text-slate-400">للتطوير والإطلاق</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-purple-500/10 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🤝</span>
                    </div>
                    <div>
                      <div className="font-semibold">شريك تقني / تسويقي</div>
                      <p className="text-sm text-slate-400">للمساعدة في البناء والتسويق</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold mb-4">🎯 الهدف</h3>
                <div className="space-y-3">
                  {[
                    'تطوير النسخة الاحترافية',
                    'إطلاق رسمي',
                    'توسيع السوق'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ArrowLeft className="w-5 h-5 text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-6">معلومات التواصل</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">البريد الإلكتروني</div>
                    <a href="mailto:nooraldeinsbah@gmail.com" className="text-lg hover:text-blue-400 transition-colors">
                      nooraldeinsbah@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">رقم الهاتف</div>
                    <a href="tel:07700028170" className="text-lg hover:text-green-400 transition-colors">
                      07700028170
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                  <h4 className="font-semibold mb-4">أرسل لنا رسالة</h4>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="الاسم"
                      className="w-full px-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      className="w-full px-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <textarea
                      placeholder="رسالتك..."
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      إرسال الرسالة
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">كفاءة .IQ</span>
            </div>

            <div className="flex items-center gap-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
              <a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.054 5.56-5.022c.242-.213-.054-.333-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.828.94z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>© 2025 كفاءة .IQ — مستقبل التعليم يبدأ هنا 🔥</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Gift(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );
}

export default App;
