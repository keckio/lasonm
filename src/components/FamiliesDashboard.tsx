import React, { useState } from 'react';
import { ArrowRight, Users, Package, Truck, Bell, BarChart3, Plus, Heart, Search, Filter, Eye, Edit, Phone, CheckCircle, Clock, AlertTriangle, MapPin, Star, Calendar, FileText, UserPlus } from 'lucide-react';
import { 
  mockFamilies, 
  mockBeneficiaries, 
  mockPackages, 
  mockTasks, 
  mockAlerts,
  getBeneficiariesByFamily,
  type Family,
  type Beneficiary,
  type Package as PackageType,
  type Task
} from '../data/mockData';

interface FamiliesDashboardProps {
  onNavigateBack: () => void;
}

export default function FamiliesDashboard({ onNavigateBack }: FamiliesDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalContent, setModalContent] = useState<string>('');

  // Assuming we're viewing the first family for demo
  const currentFamily = mockFamilies[0];
  const familyMembers = getBeneficiariesByFamily(currentFamily.id);
  const familyPackages = mockPackages.filter(p => p.familyId === currentFamily.id);
  const familyTasks = mockTasks.filter(t => {
    const pkg = mockPackages.find(p => p.id === t.packageId);
    return pkg?.familyId === currentFamily.id;
  });

  const sidebarItems = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'beneficiaries', name: 'أفراد العائلة', icon: Users },
    { id: 'packages', name: 'الطرود', icon: Package },
    { id: 'tasks', name: 'متابعة التوزيع', icon: Clock },
    { id: 'alerts', name: 'التنبيهات', icon: Bell },
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
    alert('تم تحديث بيانات العائلة بنجاح');
  };

  const handleExportReport = () => {
    const reportData = {
      family: currentFamily.name,
      date: new Date().toISOString(),
      members: familyMembers.length,
      packages: familyPackages.length,
      completionRate: currentFamily.completionRate
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير_${currentFamily.name}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('تم تصدير تقرير العائلة بنجاح');
  };

  const handleCall = (phone: string) => {
    if (confirm(`هل تريد الاتصال بالرقم ${phone}؟`)) {
      window.open(`tel:${phone}`);
    }
  };

  const handleFollowUp = (alertType: string) => {
    switch (alertType) {
      case 'delayed':
        alert('تم التواصل مع المندوب لمتابعة الطرد المتأخر');
        break;
      case 'ready':
        alert('تم إرسال الطرد للمندوب');
        break;
    }
  };

  const filteredMembers = familyMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.nationalId.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-xl flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-l from-purple-600 to-purple-700">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">لوحة العائلات</h1>
              <p className="text-xs text-purple-100">{currentFamily.name}</p>
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
                        ? 'bg-purple-50 text-purple-700 border-r-4 border-purple-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ml-3 ${isActive ? 'text-purple-600' : ''}`} />
                    <span>{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Family Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
            <div className="text-sm font-semibold text-purple-800 mb-2">معلومات العائلة</div>
            <div className="space-y-1 text-xs text-purple-700">
              <div className="flex justify-between">
                <span>أفراد العائلة:</span>
                <span className="font-medium">{currentFamily.membersCount}</span>
              </div>
              <div className="flex justify-between">
                <span>الطرود الموزعة:</span>
                <span className="font-medium">{currentFamily.packagesDistributed}</span>
              </div>
              <div className="flex justify-between">
                <span>نسبة الإنجاز:</span>
                <span className="font-medium">{currentFamily.completionRate}%</span>
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
                  <h2 className="text-3xl font-bold text-gray-900">نظرة عامة - {currentFamily.name}</h2>
                  <p className="text-gray-600 mt-1">إدارة أفراد العائلة والمساعدات</p>
                </div>
                <div className="flex space-x-3 space-x-reverse">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors shadow-lg">
                    تحديث البيانات
                  </button>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg flex items-center">
                    <FileText className="w-4 h-4 ml-2" />
                    تقرير العائلة
                  </button>
                </div>
              </div>

              {/* Welcome Card */}
              <div className="bg-gradient-to-l from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center space-x-6 space-x-reverse">
                  <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                    <Heart className="w-10 h-10 text-white ml-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-3">مرحباً بعائلة {currentFamily.name.split(' ')[2]}</h2>
                    <p className="text-purple-100 text-lg">نشكرك على مساعدتك في دعم المحتاجين من أفراد عائلتك</p>
                    <p className="text-purple-200 text-sm mt-2">رب الأسرة: {currentFamily.headOfFamily}</p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">أفراد العائلة</p>
                      <p className="text-3xl font-bold text-gray-900">{currentFamily.membersCount}</p>
                      <p className="text-green-600 text-sm mt-2 flex items-center">
                        <CheckCircle className="w-4 h-4 ml-1" />
                        جميعهم مسجلون
                      </p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-2xl">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">الطرود المقدمة</p>
                      <p className="text-3xl font-bold text-gray-900">{currentFamily.packagesDistributed}</p>
                      <p className="text-green-600 text-sm mt-2 flex items-center">
                        <Plus className="w-4 h-4 ml-1" />
                        +5 هذا الشهر
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
                      <p className="text-sm font-medium text-gray-600 mb-1">الطرود الموزعة</p>
                      <p className="text-3xl font-bold text-gray-900">{Math.floor(currentFamily.packagesDistributed * currentFamily.completionRate / 100)}</p>
                      <p className="text-green-600 text-sm mt-2 flex items-center">
                        <Star className="w-4 h-4 ml-1" />
                        نسبة التوزيع {currentFamily.completionRate}%
                      </p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-2xl">
                      <Truck className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">الطرود المعلقة</p>
                      <p className="text-3xl font-bold text-gray-900">{currentFamily.packagesDistributed - Math.floor(currentFamily.packagesDistributed * currentFamily.completionRate / 100)}</p>
                      <p className="text-orange-600 text-sm mt-2 flex items-center">
                        <Clock className="w-4 h-4 ml-1" />
                        تحتاج متابعة
                      </p>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-2xl">
                      <Bell className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <UserPlus className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">إضافة فرد للعائلة</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">أضف فرد جديد من العائلة لقائمة المستفيدين</p>
                  <button 
                    onClick={() => handleAddNew('member')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة فرد جديد
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Package className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">تحديد طرد للتوزيع</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">حدد الطرود المراد توزيعها على أفراد العائلة</p>
                  <button 
                    onClick={() => handleAddNew('package')}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    تحديد طرد
                  </button>
                </div>
              </div>

              {/* Recent Activities and Family Map */}
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
                        <p className="text-sm font-medium text-gray-900">تم تسليم طرد مواد غذائية لخالد الغزاوي</p>
                        <p className="text-xs text-gray-500 mt-1">منذ ساعتين</p>
                        <p className="text-xs text-green-600 mt-1">تم التوثيق بالصورة</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">تحديث بيانات أحمد الغزاوي</p>
                        <p className="text-xs text-gray-500 mt-1">أمس</p>
                        <p className="text-xs text-blue-600 mt-1">تم تحديث العنوان</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-purple-50 border border-purple-100">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">إضافة طرد ملابس شتوية للعائلة</p>
                        <p className="text-xs text-gray-500 mt-1">منذ يومين</p>
                        <p className="text-xs text-purple-600 mt-1">جاهز للتوزيع</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 space-x-reverse p-3 rounded-xl bg-orange-50 border border-orange-100">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">تنبيه: طرد فاطمة الغزاوي متأخر</p>
                        <p className="text-xs text-gray-500 mt-1">منذ 3 أيام</p>
                        <p className="text-xs text-orange-600 mt-1">يحتاج متابعة</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors py-2 border border-purple-200 rounded-xl hover:bg-purple-50">
                    عرض جميع الأنشطة
                  </button>
                </div>

                {/* Family Distribution Map */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">خريطة أفراد العائلة</h3>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center z-10">
                      <MapPin className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700">مواقع أفراد العائلة</p>
                      <p className="text-sm text-gray-500 mt-2">{currentFamily.membersCount} فرد في مناطق مختلفة</p>
                      <p className="text-xs text-gray-400 mt-1">في خان يونس - خزاعة</p>
                    </div>
                    {/* Sample family member locations */}
                    <div className="absolute top-20 left-16 w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute top-32 right-20 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute bottom-20 left-32 w-4 h-4 bg-orange-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute bottom-32 right-16 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">التنبيهات</h3>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">2 تنبيه</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <AlertTriangle className="w-6 h-6 text-orange-600 ml-4" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">طرد متأخر</p>
                        <p className="text-xs text-gray-600 mt-1">طرد فاطمة الغزاوي لم يتم استلامه</p>
                      </div>
                    </div>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                      متابعة
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Package className="w-6 h-6 text-blue-600 ml-4" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">طرد جاهز للتوزيع</p>
                        <p className="text-xs text-gray-600 mt-1">طرد محمد الغزاوي جاهز للإرسال</p>
                      </div>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      إرسال
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Family Members Tab */}
          {activeTab === 'beneficiaries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">أفراد العائلة المستفيدين</h2>
                  <p className="text-gray-600 mt-1">إدارة أفراد {currentFamily.name}</p>
                </div>
                <div className="flex space-x-3 space-x-reverse">
                  <button 
                    onClick={() => handleAddNew('member')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors flex items-center shadow-lg"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة فرد جديد
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="البحث في أفراد العائلة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button className="flex items-center space-x-2 space-x-reverse px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4 ml-2" />
                    <span>فلترة</span>
                  </button>
                </div>
              </div>

              {/* Family Members Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الاسم
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          صلة القرابة
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
                      {filteredMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="bg-purple-100 p-2 rounded-xl ml-4">
                                <Users className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.address.split(' - ')[1]}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.relationToFamily || 'فرد من العائلة'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(member.lastReceived).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              member.status === 'active' ? 'bg-green-100 text-green-800' :
                              member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {member.status === 'active' ? 'تم التسليم' : 
                               member.status === 'pending' ? 'لم يتم الاستلام' : 'معلق'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2 space-x-reverse">
                              <button 
                                onClick={() => handleView(member)}
                                className="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-50 transition-colors" 
                                title="عرض السجل"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleEdit(member)}
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
          {['packages', 'tasks', 'alerts'].includes(activeTab) && (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center">
                <div className="bg-gray-100 rounded-2xl p-12 mb-6">
                  <div className="text-gray-400 text-center">
                    {activeTab === 'packages' && <Package className="w-20 h-20 mx-auto mb-4" />}
                    {activeTab === 'tasks' && <Clock className="w-20 h-20 mx-auto mb-4" />}
                    {activeTab === 'alerts' && <Bell className="w-20 h-20 mx-auto mb-4" />}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  قسم {
                    activeTab === 'packages' ? 'الطرود' :
                    activeTab === 'tasks' ? 'متابعة التوزيع' :
                    activeTab === 'alerts' ? 'التنبيهات' : ''
                  }
                </h3>
                <p className="text-gray-600 mb-6">هذا القسم قيد التطوير - سيتم إضافة التفاصيل الكاملة قريباً</p>
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
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
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
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