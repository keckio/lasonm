import React, { useState } from 'react';
import { ArrowRight, Building2, Users, Package, Truck, Bell, BarChart3, Plus, Search, Filter, Download, Eye, Edit, Phone, CheckCircle, Clock, AlertTriangle, MapPin, Star, Calendar, FileText, UserPlus } from 'lucide-react';
import { 
  mockOrganizations, 
  mockBeneficiaries, 
  mockPackages, 
  mockTasks, 
  mockAlerts,
  getBeneficiariesByOrganization,
  getPackagesByBeneficiary,
  type Organization,
  type Beneficiary,
  type Package as PackageType,
  type Task
} from '../data/mockData';

interface OrganizationsDashboardProps {
  onNavigateBack: () => void;
}

export default function OrganizationsDashboard({ onNavigateBack }: OrganizationsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalContent, setModalContent] = useState<string>('');

  // Assuming we're viewing the first organization for demo
  const currentOrg = mockOrganizations[0];
  const orgBeneficiaries = getBeneficiariesByOrganization(currentOrg.id);
  const orgPackages = mockPackages.filter(p => p.organizationId === currentOrg.id);
  const orgTasks = mockTasks.filter(t => {
    const pkg = mockPackages.find(p => p.id === t.packageId);
    return pkg?.organizationId === currentOrg.id;
  });

  const sidebarItems = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'beneficiaries', name: 'المستفيدين', icon: Users },
    { id: 'packages', name: 'الطرود', icon: Package },
    { id: 'tasks', name: 'المهام', icon: Clock },
    { id: 'couriers', name: 'المندوبين', icon: Truck },
    { id: 'reports', name: 'التقارير', icon: BarChart3 },
  ];

  const handleAddNew = (type: string) => {
    setModalType('add');
    setSelectedItem(null);
    setModalContent(type);
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');
    setSelectedItem(item);
    setModalContent('edit');
    setShowModal(true);
  };

  const handleView = (item: any) => {
    setModalType('view');
    setSelectedItem(item);
    setModalContent('view');
    setShowModal(true);
  };

  const handleUpdateData = () => {
    alert('تم تحديث بيانات المؤسسة بنجاح');
  };

  const handleExportReport = () => {
    const reportData = {
      organization: currentOrg.name,
      date: new Date().toISOString(),
      beneficiaries: orgBeneficiaries.length,
      packages: orgPackages.length,
      tasks: orgTasks.length,
      completionRate: currentOrg.completionRate
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_${currentOrg.name}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('تم تصدير تقرير المؤسسة بنجاح');
  };

  const handleBulkUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`تم اختيار الملف: ${file.name}\nسيتم رفع المستفيدين الجدد`);
        setTimeout(() => {
          alert('تم رفع وإضافة 15 مستفيد جديد للمؤسسة');
        }, 2000);
      }
    };
    input.click();
  };

  const handleCall = (phone: string) => {
    if (confirm(`هل تريد الاتصال بالرقم ${phone}؟`)) {
      window.open(`tel:${phone}`);
    }
  };

  const handleSendMessage = (beneficiary: Beneficiary) => {
    const message = prompt(`أدخل الرسالة لـ ${beneficiary.name}:`);
    if (message) {
      alert(`تم إرسال الرسالة لـ ${beneficiary.name}: "${message}"`);
    }
  };

  const handleFollowUp = (alertType: string) => {
    switch (alertType) {
      case 'delayed':
        alert('تم إرسال تنبيه للمندوبين بخصوص الطرود المتأخرة');
        break;
      case 'review':
        alert('تم فتح صفحة مراجعة المستفيدين الجدد');
        break;
    }
  };

  const filteredBeneficiaries = orgBeneficiaries.filter(ben => 
    ben.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ben.nationalId.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-xl flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-l from-green-600 to-green-700">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">لوحة المؤسسات</h1>
              <p className="text-xs text-green-100">{currentOrg.name}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-green-50 text-green-700 border-r-4 border-green-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ml-3 ${isActive ? 'text-green-600' : ''}`} />
                    <span>{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Organization Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl">
            <div className="text-sm font-semibold text-green-800 mb-2">معلومات المؤسسة</div>
            <div className="space-y-1 text-xs text-green-700">
              <div className="flex justify-between">
                <span>المستفيدين:</span>
                <span className="font-medium">{currentOrg.beneficiariesCount}</span>
              </div>
              <div className="flex justify-between">
                <span>الطرود النشطة:</span>
                <span className="font-medium">{currentOrg.packagesCount}</span>
              </div>
              <div className="flex justify-between">
                <span>نسبة الإنجاز:</span>
                <span className="font-medium">{currentOrg.completionRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">نظرة عامة - {currentOrg.name}</h2>
                  <p className="text-gray-600 mt-1">إدارة مستفيدين وطرود المؤسسة</p>
                </div>
                <div className="flex space-x-3 space-x-reverse">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors shadow-lg">
                    تحديث البيانات
                  </button>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg flex items-center">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير التقرير
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">إجمالي المستفيدين</p>
                      <p className="text-3xl font-bold text-gray-900">{currentOrg.beneficiariesCount}</p>
                      <p className="text-green-600 text-sm mt-2 flex items-center">
                        <UserPlus className="w-4 h-4 ml-1" />
                        +18 مستفيد جديد
                      </p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-2xl">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">الطرود الموزعة</p>
                      <p className="text-3xl font-bold text-gray-900">{orgPackages.filter(p => p.status === 'delivered').length}</p>
                      <p className="text-green-600 text-sm mt-2 flex items-center">
                        <CheckCircle className="w-4 h-4 ml-1" />
                        +15 هذا الأسبوع
                      </p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-2xl">
                      <Package className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">المهام النشطة</p>
                      <p className="text-3xl font-bold text-gray-900">{orgTasks.filter(t => ['pending', 'assigned', 'in_progress'].includes(t.status)).length}</p>
                      <p className="text-orange-600 text-sm mt-2 flex items-center">
                        <Clock className="w-4 h-4 ml-1" />
                        2 متأخرة
                      </p>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-2xl">
                      <Truck className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">نسبة الإنجاز</p>
                      <p className="text-3xl font-bold text-gray-900">{currentOrg.completionRate}%</p>
                      <p className="text-green-600 text-sm mt-2 flex items-center">
                        <Star className="w-4 h-4 ml-1" />
                        +3% من الشهر الماضي
                      </p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-2xl">
                      <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">إضافة مستفيد جديد</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">أضف مستفيد جديد لقائمة المؤسسة</p>
                  <button 
                    onClick={() => handleAddNew('beneficiary')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مستفيد
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">إضافة طرد جديد</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">إنشاء طرد جديد للتوزيع</p>
                  <button 
                    onClick={() => handleAddNew('package')}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة طرد
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <BarChart3 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">تقرير الأداء</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">عرض تقرير مفصل للمؤسسة</p>
                  <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                    عرض التقرير
                  </button>
                </div>
              </div>

              {/* Recent Activities and Map */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">آخر الأنشطة</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-green-50 border border-green-100">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">تم تسليم طرد مواد غذائية لسارة الغزاوي</p>
                        <p className="text-xs text-gray-500 mt-1">منذ 10 دقائق - المندوب: محمد علي الغزاوي</p>
                        <p className="text-xs text-green-600 mt-1">تم التوثيق بالصورة والموقع</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <UserPlus className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">إضافة مستفيد جديد: خالد أبو النجا</p>
                        <p className="text-xs text-gray-500 mt-1">منذ 25 دقيقة</p>
                        <p className="text-xs text-blue-600 mt-1">تم التحقق من البيانات</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-orange-50 border border-orange-100">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">تحديث عنوان مستفيد: فاطمة الشوا</p>
                        <p className="text-xs text-gray-500 mt-1">منذ ساعة</p>
                        <p className="text-xs text-orange-600 mt-1">يحتاج إعادة جدولة</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-purple-50 border border-purple-100">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">إضافة طرد ملابس شتوية</p>
                        <p className="text-xs text-gray-500 mt-1">منذ ساعتين</p>
                        <p className="text-xs text-purple-600 mt-1">جاهز للتوزيع</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 text-green-600 text-sm font-medium hover:text-green-700 transition-colors py-2 border border-green-200 rounded-xl hover:bg-green-50">
                    عرض جميع الأنشطة
                  </button>
                </div>

                {/* Distribution Map */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">خريطة التوزيع</h3>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center z-10">
                      <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700">مواقع مستفيدي المؤسسة في خان يونس</p>
                      <p className="text-sm text-gray-500 mt-2">{currentOrg.beneficiariesCount} مستفيد في محافظة خان يونس</p>
                    </div>
                    {/* Sample map points */}
                    <div className="absolute top-16 left-20 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg" title="الكتيبة"></div>
                    <div className="absolute top-24 right-16 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg" title="عبسان الكبيرة"></div>
                    <div className="absolute bottom-16 left-24 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg" title="خزاعة"></div>
                    <div className="absolute bottom-24 right-20 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg" title="بني سهيلا"></div>
                    <div className="absolute top-40 left-40 w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg" title="القرارة"></div>
                    <div className="absolute bottom-40 right-40 w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg" title="عبسان الصغيرة"></div>
                    <div className="absolute top-60 right-60 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg" title="الفخاري"></div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">التنبيهات</h3>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">3 تنبيهات</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <AlertTriangle className="w-6 h-6 text-orange-600 ml-4" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">طرود متأخرة في خان يونس</p>
                        <p className="text-xs text-gray-600 mt-1">2 طرد في خزاعة وبني سهيلا لم يتم تسليمها</p>
                      </div>
                    </div>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                      متابعة
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Users className="w-6 h-6 text-blue-600 ml-4" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">مستفيدين جدد</p>
                        <p className="text-xs text-gray-600 mt-1">18 مستفيد جديد يحتاج مراجعة</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      مراجعة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Beneficiaries Tab */}
          {activeTab === 'beneficiaries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">إدارة المستفيدين</h2>
                  <p className="text-gray-600 mt-1">إدارة مستفيدي {currentOrg.name}</p>
                </div>
                <div className="flex space-x-3 space-x-reverse">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors flex items-center shadow-lg">
                    <Download className="w-4 h-4 ml-2" />
                    رفع ملف جماعي
                  </button>
                  <button 
                    onClick={() => handleAddNew('beneficiary')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center shadow-lg"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مستفيد
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="البحث في المستفيدين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button className="flex items-center space-x-2 space-x-reverse px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4 ml-2" />
                    <span>فلترة</span>
                  </button>
                </div>
              </div>

              {/* Beneficiaries Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الاسم
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          رقم الهوية
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          رقم الهاتف
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          آخر استلام
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBeneficiaries.map((beneficiary) => (
                        <tr key={beneficiary.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-green-100 p-2 rounded-xl ml-4">
                                <Users className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{beneficiary.name}</div>
                                <div className="text-sm text-gray-500">{beneficiary.address.split(' - ')[1]}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.nationalId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {beneficiary.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(beneficiary.lastReceived).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              beneficiary.status === 'active' ? 'bg-green-100 text-green-800' :
                              beneficiary.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {beneficiary.status === 'active' ? 'نشط' : 
                               beneficiary.status === 'pending' ? 'معلق' : 'متوقف'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2 space-x-reverse">
                              <button 
                                onClick={() => handleView(beneficiary)}
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors" 
                                title="عرض السجل"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEdit(beneficiary)}
                                className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors" 
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                className="text-orange-600 hover:text-orange-900 p-2 rounded-lg hover:bg-orange-50 transition-colors" 
                                title="اتصال"
                              >
                                <Phone className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs */}
          {['packages', 'tasks', 'couriers', 'reports'].includes(activeTab) && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-12 mb-6">
                  <div className="text-gray-400 text-center">
                    {activeTab === 'packages' && <Package className="w-20 h-20 mx-auto mb-4" />}
                    {activeTab === 'tasks' && <Clock className="w-20 h-20 mx-auto mb-4" />}
                    {activeTab === 'couriers' && <Truck className="w-20 h-20 mx-auto mb-4" />}
                    {activeTab === 'reports' && <BarChart3 className="w-20 h-20 mx-auto mb-4" />}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  قسم {
                    activeTab === 'packages' ? 'الطرود' :
                    activeTab === 'tasks' ? 'المهام' :
                    activeTab === 'couriers' ? 'المندوبين' :
                    activeTab === 'reports' ? 'التقارير' : ''
                  }
                </h3>
                <p className="text-gray-600 mb-6">هذا القسم قيد التطوير - سيتم إضافة التفاصيل الكاملة قريباً</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                  ابدأ التطوير
                </button>
              </div>
            </div>
          )}
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
                  <button className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
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