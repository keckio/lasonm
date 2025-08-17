import React, { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useErrorLogger } from '../utils/errorLogger';
import { ArrowRight, Shield, Users, Package, Truck, Bell, BarChart3, Settings, MapPin, Calendar, FileText, AlertTriangle, CheckCircle, Clock, Plus, Search, Filter, Download, Eye, Edit, Phone, Star, UserPlus, Building2, Heart, TrendingUp, Activity, Database, MessageSquare, UserCheck, Crown, Key, Lock, ChevronDown, ChevronRight } from 'lucide-react';
import { 
  mockOrganizations, 
  mockFamilies,
  mockBeneficiaries, 
  mockPackages, 
  mockTasks, 
  mockAlerts,
  mockCouriers,
  calculateStats,
  getCriticalAlerts,
  getUnreadAlerts,
  type Organization,
  type Family,
  type Beneficiary,
  type Package as PackageType,
  type Task,
  type Alert
} from '../data/mockData';
import BeneficiariesManagement from './BeneficiariesManagement';
import PermissionsManagement from './PermissionsManagement';
import PackageManagement from './PackageManagement';

interface AdminDashboardProps {
  onNavigateBack: () => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  children?: NavSubItem[];
}

interface NavSubItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export default function AdminDashboard({ onNavigateBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { logInfo, logError } = useErrorLogger();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [openMenus, setOpenMenus] = useState<string[]>(['beneficiaries', 'packages']);

  const stats = calculateStats();
  const criticalAlerts = getCriticalAlerts();
  const unreadAlerts = getUnreadAlerts();

  // Navigation structure with hierarchical organization
  const navItems: NavItem[] = [
    {
      id: 'overview',
      name: 'نظرة عامة',
      icon: BarChart3
    },
    {
      id: 'beneficiaries',
      name: 'إدارة المستفيدين',
      icon: Users,
      children: [
        { id: 'beneficiaries-list', name: 'قائمة المستفيدين', icon: Users },
        { id: 'status-management', name: 'إدارة الحالات', icon: UserCheck },
        { id: 'delayed', name: 'المتأخرين', icon: Clock },
        { id: 'activity-log', name: 'سجل النشاط', icon: Activity }
      ]
    },
    {
      id: 'packages',
      name: 'إدارة الطرود',
      icon: Package,
      children: [
        { id: 'packages-list', name: 'قوالب الطرود', icon: Package },
        { id: 'bulk-send', name: 'إرسال جماعي', icon: Users },
        { id: 'individual-send', name: 'إرسال فردي', icon: UserPlus },
        { id: 'tracking', name: 'تتبع الإرسالات', icon: Truck },
        { id: 'distribution-reports', name: 'تقارير التوزيع', icon: BarChart3 }
      ]
    },
    {
      id: 'organizations-families',
      name: 'المؤسسات والعائلات',
      icon: Building2,
      children: [
        { id: 'organizations', name: 'إدارة المؤسسات', icon: Building2 },
        { id: 'families', name: 'إدارة العائلات', icon: Heart }
      ]
    },
    {
      id: 'distribution',
      name: 'إدارة التوزيع',
      icon: Truck,
      children: [
        { id: 'couriers', name: 'إدارة المندوبين', icon: Truck },
        { id: 'tasks', name: 'إدارة المهام', icon: Clock }
      ]
    },
    {
      id: 'reports-alerts',
      name: 'التقارير والتنبيهات',
      icon: BarChart3,
      children: [
        { id: 'reports', name: 'التقارير الشاملة', icon: BarChart3 },
        { id: 'alerts', name: 'التنبيهات', icon: Bell }
      ]
    },
    {
      id: 'settings',
      name: 'الإعدادات',
      icon: Settings,
      children: [
        { id: 'permissions', name: 'إدارة الصلاحيات', icon: Shield },
        { id: 'messages', name: 'إعدادات الرسائل', icon: MessageSquare },
        { id: 'system', name: 'إعدادات النظام', icon: Settings },
        { id: 'backup', name: 'النسخ الاحتياطي', icon: Database },
        { id: 'audit', name: 'سجل المراجعة', icon: Activity }
      ]
    }
  ];

  const settingsItems = [
    { id: 'permissions', name: 'إدارة الصلاحيات', icon: Shield, description: 'إدارة أدوار المستخدمين وصلاحياتهم' },
    { id: 'messages', name: 'إعدادات الرسائل', icon: MessageSquare, description: 'إدارة قوالب الرسائل والتنبيهات' },
    { id: 'system', name: 'إعدادات النظام', icon: Settings, description: 'الإعدادات العامة للنظام' },
    { id: 'backup', name: 'النسخ الاحتياطي', icon: Database, description: 'إدارة النسخ الاحتياطية للبيانات' },
    { id: 'audit', name: 'سجل المراجعة', icon: Activity, description: 'سجل جميع العمليات في النظام' },
  ];

  React.useEffect(() => {
    logInfo('تم تحميل لوحة التحكم الرئيسية', 'AdminDashboard');
  }, []);

  // Initialize open menus based on active tab
  React.useEffect(() => {
    const findParentMenu = (tabId: string): string | null => {
      for (const item of navItems) {
        if (item.children) {
          for (const child of item.children) {
            if (child.id === tabId) {
              return item.id;
            }
          }
        }
      }
      return null;
    };

    const parentMenu = findParentMenu(activeTab);
    if (parentMenu && !openMenus.includes(parentMenu)) {
      setOpenMenus(prev => [...prev, parentMenu]);
    }
  }, [activeTab]);

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isMenuActive = (item: NavItem): boolean => {
    if (item.id === activeTab) return true;
    if (item.children) {
      return item.children.some(child => child.id === activeTab);
    }
    return false;
  };

  const handleAddNew = (type: string) => {
    setModalType('add');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleView = (item: any) => {
    setModalType('view');
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCall = (phone: string) => {
    if (confirm(`هل تريد الاتصال بالرقم ${phone}؟`)) {
      window.open(`tel:${phone}`);
    }
  };

  const handleExportReport = () => {
    const reportData = {
      date: new Date().toISOString(),
      stats,
      organizations: mockOrganizations.length,
      families: mockFamilies.length,
      beneficiaries: mockBeneficiaries.length,
      packages: mockPackages.length,
      alerts: unreadAlerts.length
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_النظام_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('تم تصدير تقرير النظام بنجاح');
  };

  const renderMainContent = () => {
    // Show permissions management component
    if (activeTab === 'permissions') {
      return <PermissionsManagement />;
    }

    // Show beneficiaries management component
    if (['beneficiaries-list', 'status-management', 'delayed', 'activity-log'].includes(activeTab)) {
      return <BeneficiariesManagement initialTab={activeTab} />;
    }

    // Show package management component
    if (['packages-list', 'bulk-send', 'individual-send', 'tracking', 'distribution-reports'].includes(activeTab)) {
      return <PackageManagement initialTab={activeTab} />;
    }

    // Overview Tab
    if (activeTab === 'overview') {
      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">لوحة التحكم الرئيسية</h2>
              <p className="text-gray-600 mt-1">نظرة شاملة على النظام والأنشطة</p>
            </div>
            <div className="flex space-x-3 space-x-reverse">
              <button 
                onClick={handleExportReport}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg flex items-center transform hover:scale-105"
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير التقرير
              </button>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg transform hover:scale-105">
                تحديث البيانات
              </button>
            </div>
          </div>

          {/* Critical Alerts */}
          {criticalAlerts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-800">تنبيهات حرجة تحتاج إجراء فوري</h3>
              </div>
              <div className="space-y-3">
                {criticalAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-red-200">
                    <div>
                      <p className="font-medium text-gray-900">{alert.title}</p>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      اتخاذ إجراء
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">إجمالي المستفيدين</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBeneficiaries}</p>
                  <p className="text-green-600 text-sm mt-2 flex items-center font-medium">
                    <TrendingUp className="w-4 h-4 ml-1" />
                    +12 هذا الأسبوع
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">الطرود النشطة</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalPackages}</p>
                  <p className="text-green-600 text-sm mt-2 flex items-center font-medium">
                    <Package className="w-4 h-4 ml-1" />
                    {stats.deliveredPackages} تم التسليم
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-2xl">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">المهام النشطة</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeTasks}</p>
                  <p className="text-orange-600 text-sm mt-2 flex items-center font-medium">
                    <Clock className="w-4 h-4 ml-1" />
                    {criticalAlerts.length} متأخرة
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-2xl">
                  <Truck className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">نسبة التسليم</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.deliveryRate}%</p>
                  <p className="text-green-600 text-sm mt-2 flex items-center font-medium">
                    <Star className="w-4 h-4 ml-1" />
                    +3% من الشهر الماضي
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-2xl">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => setActiveTab('beneficiaries-list')}>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <UserPlus className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">إدارة المستفيدين</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">إضافة وإدارة المستفيدين الجدد</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>إدارة المستفيدين</span>
                <ArrowRight className="w-4 h-4 mr-2 rtl-flip" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => setActiveTab('packages-list')}>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">إدارة الطرود</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">إنشاء وتوزيع الطرود</p>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <span>إدارة الطرود</span>
                <ArrowRight className="w-4 h-4 mr-2 rtl-flip" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => setActiveTab('reports')}>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">التقارير والإحصائيات</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">عرض التقارير المفصلة</p>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <span>عرض التقارير</span>
                <ArrowRight className="w-4 h-4 mr-2 rtl-flip" />
              </div>
            </div>
          </div>

          {/* Recent Activities and System Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">آخر الأنشطة</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">تم تسليم 15 طرد في منطقة خان يونس</p>
                    <p className="text-xs text-gray-500 mt-1">منذ 5 دقائق - المندوب: محمد علي أبو عامر</p>
                    <p className="text-xs text-green-600 mt-1">تم التوثيق بالصورة والموقع</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 space-x-reverse p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-full">
                    <UserPlus className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">إضافة 8 مستفيدين جدد للنظام</p>
                    <p className="text-xs text-gray-500 mt-1">منذ 15 دقيقة - بواسطة: فاطمة أحمد المشرفة</p>
                    <p className="text-xs text-blue-600 mt-1">جميعهم في انتظار التحقق</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">تحديث عناوين 3 مستفيدين</p>
                    <p className="text-xs text-gray-500 mt-1">منذ 30 دقيقة</p>
                    <p className="text-xs text-orange-600 mt-1">يحتاج إعادة جدولة التوصيل</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Building2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">تسجيل مؤسسة جديدة: جمعية الخير</p>
                    <p className="text-xs text-gray-500 mt-1">منذ ساعة</p>
                    <p className="text-xs text-purple-600 mt-1">في انتظار الموافقة</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setActiveTab('alerts')}
                className="w-full mt-6 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors py-2 border border-blue-200 rounded-xl hover:bg-blue-50"
              >
                عرض جميع الأنشطة
              </button>
            </div>

            {/* System Overview Map */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">خريطة النظام</h3>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">قطاع غزة - نظرة شاملة</p>
                  <p className="text-sm text-gray-500 mt-2">{stats.totalBeneficiaries} مستفيد في 5 محافظات</p>
                  <p className="text-xs text-gray-400 mt-1">{stats.activeTasks} مهمة نشطة</p>
                </div>
                {/* Sample activity points */}
                <div className="absolute top-16 left-20 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg" title="شمال غزة"></div>
                <div className="absolute top-32 right-16 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg" title="مدينة غزة"></div>
                <div className="absolute bottom-16 left-24 w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg" title="الوسط"></div>
                <div className="absolute bottom-32 right-20 w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg" title="خان يونس"></div>
                <div className="absolute top-40 left-40 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg" title="رفح"></div>
              </div>
            </div>
          </div>

          {/* Organizations and Families Overview */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">المؤسسات النشطة</h3>
                <button 
                  onClick={() => setActiveTab('organizations')}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                >
                  عرض الكل
                </button>
              </div>
              <div className="space-y-4">
                {mockOrganizations.slice(0, 3).map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Building2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{org.name}</p>
                        <p className="text-sm text-gray-600">{org.beneficiariesCount} مستفيد</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      org.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {org.status === 'active' ? 'نشط' : 'معلق'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">العائلات النشطة</h3>
                <button 
                  onClick={() => setActiveTab('families')}
                  className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors"
                >
                  عرض الكل
                </button>
              </div>
              <div className="space-y-4">
                {mockFamilies.slice(0, 3).map((family) => (
                  <div key={family.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Heart className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{family.name}</p>
                        <p className="text-sm text-gray-600">{family.membersCount} فرد</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{family.completionRate}%</p>
                      <p className="text-xs text-gray-500">نسبة الإنجاز</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Settings Tab
    if (activeTab === 'settings') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">إعدادات النظام</h2>
              <p className="text-gray-600 mt-1">إدارة إعدادات النظام والصلاحيات</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {settingsItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                >
                  <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-2xl group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{item.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{item.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-all duration-200">
                    <span>فتح الإعدادات</span>
                    <ArrowRight className="w-4 h-4 mr-2 rtl-flip group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Other tabs placeholder
    const getTabInfo = (tabId: string) => {
      for (const item of navItems) {
        if (item.id === tabId) {
          return { name: item.name, icon: item.icon };
        }
        if (item.children) {
          for (const child of item.children) {
            if (child.id === tabId) {
              return { name: child.name, icon: child.icon };
            }
          }
        }
      }
      return { name: 'غير محدد', icon: FileText };
    };

    const tabInfo = getTabInfo(activeTab);
    const IconComponent = tabInfo.icon;

    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-16 mb-8">
            <div className="text-gray-400 text-center">
              <IconComponent className="w-20 h-20 mx-auto mb-4" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">قسم {tabInfo.name}</h3>
          <p className="text-gray-600 mb-8 text-lg">هذا القسم قيد التطوير - سيتم إضافة التفاصيل الكاملة قريباً</p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
            ابدأ التطوير
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-xl flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">لوحة الإدارة</h1>
              <p className="text-sm text-blue-100">التحكم الكامل في النظام</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isMenuActive(item);
              const isExpanded = openMenus.includes(item.id);
              
              return (
                <div key={item.id}>
                  {/* Parent Menu Item */}
                  <button
                    onClick={() => {
                      if (item.children) {
                        toggleMenu(item.id);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <IconComponent className={`w-5 h-5 ml-3 ${isActive ? 'text-blue-600' : ''}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.children && (
                      <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </button>

                  {/* Sub Menu Items */}
                  {item.children && isExpanded && (
                    <div className="mt-1 mr-6 space-y-1">
                      {item.children.map((child) => {
                        const ChildIconComponent = child.icon;
                        const isChildActive = activeTab === child.id;
                        
                        return (
                          <button
                            key={child.id}
                            onClick={() => setActiveTab(child.id)}
                            className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isChildActive
                                ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <ChildIconComponent className={`w-4 h-4 ml-2 ${isChildActive ? 'text-blue-600' : ''}`} />
                            <span>{child.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* System Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
            <div className="text-sm font-semibold text-blue-800 mb-2">إحصائيات سريعة</div>
            <div className="space-y-1 text-xs text-blue-700">
              <div className="flex justify-between">
                <span>المستفيدين:</span>
                <span className="font-medium">{stats.totalBeneficiaries}</span>
              </div>
              <div className="flex justify-between">
                <span>الطرود النشطة:</span>
                <span className="font-medium">{stats.totalPackages}</span>
              </div>
              <div className="flex justify-between">
                <span>نسبة التسليم:</span>
                <span className="font-medium">{stats.deliveryRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>التنبيهات الحرجة:</span>
                <span className="font-medium text-red-600">{stats.criticalAlerts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderMainContent()}
        </div>
      </div>

      {/* Modal for Add/Edit/View */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {modalType === 'add' ? 'إضافة جديد' : modalType === 'edit' ? 'تعديل' : 'عرض التفاصيل'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-xl p-8 mb-4">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">نموذج {modalType === 'add' ? 'الإضافة' : modalType === 'edit' ? 'التعديل' : 'العرض'}</p>
                <p className="text-sm text-gray-500 mt-2">سيتم تطوير النماذج التفاعلية هنا</p>
              </div>
              
              <div className="flex space-x-3 space-x-reverse justify-center">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                {modalType !== 'view' && (
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    {modalType === 'add' ? 'إضافة' : 'حفظ التغييرات'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}