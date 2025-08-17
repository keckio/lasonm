import React, { useState } from 'react';
import { X, User, Phone, MapPin, Calendar, FileText, Package, Truck, CheckCircle, Clock, AlertTriangle, Eye, Download, Edit, Star, Car as IdCard, Home, UserCheck, Shield, Camera, Upload, MessageSquare, Activity, Navigation, Map } from 'lucide-react';
import { Beneficiary, mockPackages, mockTasks, type ActivityLog } from '../data/mockData';

interface BeneficiaryDetailsModalProps {
  beneficiary: Beneficiary;
  onClose: () => void;
}

export default function BeneficiaryDetailsModal({ beneficiary, onClose }: BeneficiaryDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('info');

  // Get beneficiary's packages and tasks
  const beneficiaryPackages = mockPackages.filter(p => p.beneficiaryId === beneficiary.id);
  const beneficiaryTasks = mockTasks.filter(t => {
    const pkg = mockPackages.find(p => p.id === t.packageId);
    return pkg?.beneficiaryId === beneficiary.id;
  });

  // Mock requests data
  const beneficiaryRequests = [
    {
      id: 'REQ-001',
      type: 'طرد غذائي',
      status: 'approved',
      requestDate: '2024-01-15',
      approvedDate: '2024-01-16',
      approvedBy: 'أحمد المشرف',
      notes: 'تم الموافقة - حالة طوارئ',
      priority: 'high'
    },
    {
      id: 'REQ-002',
      type: 'طرد ملابس شتوية',
      status: 'pending',
      requestDate: '2024-01-20',
      notes: 'قيد المراجعة - تحديد الأولوية',
      priority: 'medium'
    },
    {
      id: 'REQ-003',
      type: 'طرد أدوية',
      status: 'rejected',
      requestDate: '2024-01-10',
      rejectedDate: '2024-01-12',
      rejectedBy: 'د. فاطمة المراجعة',
      rejectionReason: 'لا يوجد وصفة طبية',
      notes: 'يحتاج وصفة طبية من طبيب معتمد'
    }
  ];

  // Mock delivery locations
  const deliveryLocations = [
    {
      id: 'DEL-001',
      packageName: 'طرد رمضان كريم 2024',
      deliveryDate: '2024-01-15',
      deliveryTime: '14:30',
      location: { lat: 31.3469, lng: 34.3029 },
      address: 'خان يونس - الكتيبة - شارع الشهداء',
      courier: 'محمد علي الغزاوي',
      status: 'delivered',
      photoUrl: 'delivery-photo-1.jpg',
      signature: true
    },
    {
      id: 'DEL-002',
      packageName: 'طرد ملابس شتوية',
      deliveryDate: '2024-01-10',
      deliveryTime: '11:15',
      location: { lat: 31.3500, lng: 34.3100 },
      address: 'خان يونس - بني سهيلا - شارع الجلاء',
      courier: 'أحمد خالد الشوا',
      status: 'delivered',
      photoUrl: 'delivery-photo-2.jpg',
      signature: true
    },
    {
      id: 'DEL-003',
      packageName: 'طرد أدوية أساسية',
      deliveryDate: '2024-01-05',
      deliveryTime: '16:45',
      location: { lat: 31.3400, lng: 34.3200 },
      address: 'خان يونس - القرارة - شارع فلسطين',
      courier: 'سالم محمد أبو يوسف',
      status: 'delivered',
      photoUrl: 'delivery-photo-3.jpg',
      signature: true
    }
  ];

  // Mock documents
  const beneficiaryDocuments = [
    {
      id: 'DOC-001',
      type: 'national_id',
      name: 'بطاقة الهوية الشخصية',
      status: 'verified',
      uploadDate: '2024-01-15',
      verifiedDate: '2024-01-16',
      verifiedBy: 'سارة المراجعة',
      fileUrl: 'id-card-front.jpg',
      notes: 'صورة واضحة ومطابقة للبيانات'
    },
    {
      id: 'DOC-002',
      type: 'family_card',
      name: 'بطاقة العائلة',
      status: 'verified',
      uploadDate: '2024-01-15',
      verifiedDate: '2024-01-16',
      verifiedBy: 'سارة المراجعة',
      fileUrl: 'family-card.jpg',
      notes: 'تم التحقق من عدد أفراد الأسرة'
    },
    {
      id: 'DOC-003',
      type: 'address_proof',
      name: 'إثبات السكن',
      status: 'pending',
      uploadDate: '2024-01-20',
      fileUrl: 'address-proof.jpg',
      notes: 'في انتظار المراجعة'
    },
    {
      id: 'DOC-004',
      type: 'income_certificate',
      name: 'شهادة دخل',
      status: 'rejected',
      uploadDate: '2024-01-18',
      rejectedDate: '2024-01-19',
      rejectedBy: 'محمد المراجع',
      rejectionReason: 'الوثيقة غير واضحة',
      notes: 'يرجى رفع صورة أوضح للشهادة'
    }
  ];

  const tabs = [
    { id: 'info', name: 'المعلومات الأساسية', icon: User },
    { id: 'documents', name: 'التوثيقات', icon: Shield },
    { id: 'orders', name: 'سجل الطرود', icon: Package },
    { id: 'requests', name: 'سجل الطلبات', icon: FileText },
    { id: 'delivery', name: 'الموقع والتسليم', icon: MapPin },
    { id: 'notes', name: 'الملاحظات', icon: MessageSquare },
    { id: 'activity', name: 'سجل النشاط', icon: Clock },
  ];

  const activityLog: ActivityLog[] = [
    {
      id: '1',
      action: 'تم إنشاء المستفيد',
      user: 'أحمد المدير',
      role: 'مدير النظام',
      timestamp: beneficiary.createdAt,
      type: 'create',
      details: 'تم إنشاء حساب المستفيد وإدخال البيانات الأساسية'
    },
    {
      id: '2',
      action: 'تم رفع بطاقة الهوية',
      user: beneficiary.name,
      role: 'مستفيد',
      timestamp: '2024-01-15',
      type: 'update',
      details: 'تم رفع صورة بطاقة الهوية الشخصية'
    },
    {
      id: '3',
      action: 'تم التحقق من الهوية',
      user: 'سارة المراجعة',
      role: 'مراجع البيانات',
      timestamp: '2024-01-16',
      type: 'verify',
      details: 'تم التحقق من صحة بطاقة الهوية والموافقة عليها'
    },
    {
      id: '4',
      action: 'تم الموافقة على الأهلية',
      user: 'محمد المشرف',
      role: 'مشرف الأهلية',
      timestamp: '2024-01-17',
      type: 'approve',
      details: 'تم تصنيف المستفيد كمؤهل للحصول على المساعدات'
    },
    {
      id: '5',
      action: 'تم تسليم طرد غذائي',
      user: 'محمد علي الغزاوي',
      role: 'مندوب التوصيل',
      timestamp: '2024-01-20',
      type: 'deliver',
      details: 'تم تسليم طرد رمضان كريم 2024 بنجاح مع التوقيع والصورة'
    },
    {
      id: '6',
      action: 'تم تحديث العنوان',
      user: 'فاطمة الموظفة',
      role: 'موظف البيانات',
      timestamp: beneficiary.updatedAt,
      type: 'update',
      details: 'تم تحديث عنوان السكن بناءً على طلب المستفيد'
    },
    {
      id: '7',
      action: 'طلب طرد جديد',
      user: beneficiary.name,
      role: 'مستفيد',
      timestamp: '2024-01-20',
      type: 'create',
      details: 'تم تقديم طلب للحصول على طرد ملابس شتوية'
    },
    {
      id: '8',
      action: 'مراجعة الطلب',
      user: 'خالد المراجع',
      role: 'مراجع الطلبات',
      timestamp: '2024-01-21',
      type: 'review',
      details: 'تم مراجعة طلب الملابس الشتوية وهو قيد الدراسة'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequestStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'national_id': return IdCard;
      case 'family_card': return Users;
      case 'address_proof': return Home;
      case 'income_certificate': return FileText;
      default: return FileText;
    }
  };

  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white rounded-2xl w-full max-w-7xl mx-4 max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-l from-blue-50 to-green-50">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="bg-blue-100 p-3 rounded-xl">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{beneficiary.name}</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <p className="text-sm text-gray-600">رقم الهوية: {beneficiary.nationalId}</p>
                {beneficiary.identityStatus === 'verified' && (
                  <Shield className="w-4 h-4 text-green-600" title="موثق" />
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-200">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <UserCheck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h5 className="font-semibold text-gray-900 mb-1">حالة الأهلية</h5>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              beneficiary.eligibilityStatus === 'eligible' ? 'bg-green-100 text-green-800' :
              beneficiary.eligibilityStatus === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {beneficiary.eligibilityStatus === 'eligible' ? 'مؤهل' :
               beneficiary.eligibilityStatus === 'under_review' ? 'قيد المراجعة' : 'مرفوض'}
            </span>
          </div>

          <div className="bg-green-50 rounded-xl p-4 text-center">
            <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <h5 className="font-semibold text-gray-900 mb-1">حالة التوثيق</h5>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(beneficiary.identityStatus)}`}>
              {beneficiary.identityStatus === 'verified' ? 'موثق' :
               beneficiary.identityStatus === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
            </span>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 text-center">
            <Package className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h5 className="font-semibold text-gray-900 mb-1">إجمالي الطرود</h5>
            <span className="text-2xl font-bold text-purple-600">{beneficiary.totalPackages}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-4 h-4 ml-2" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Basic Information Tab */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 ml-2 text-blue-600" />
                    المعلومات الشخصية
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الاسم الكامل:</span>
                      <span className="font-medium">{beneficiary.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ الميلاد:</span>
                      <span className="font-medium">{new Date(beneficiary.dateOfBirth).toLocaleDateString('ar-SA')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الجنس:</span>
                      <span className="font-medium">{beneficiary.gender === 'male' ? 'ذكر' : 'أنثى'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">رقم الهاتف:</span>
                      <span className="font-medium">{beneficiary.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">فئة الأهلية:</span>
                      <span className="font-medium">
                        {beneficiary.eligibilityCategory === 'poor' ? 'فقير' :
                         beneficiary.eligibilityCategory === 'widow' ? 'أرملة' :
                         beneficiary.eligibilityCategory === 'orphan' ? 'يتيم' :
                         beneficiary.eligibilityCategory === 'disabled' ? 'ذوي احتياجات خاصة' : 'أخرى'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Address Info */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Home className="w-5 h-5 ml-2 text-green-600" />
                    معلومات العنوان
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المحافظة:</span>
                      <span className="font-medium">{beneficiary.detailedAddress.governorate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">المدينة:</span>
                      <span className="font-medium">{beneficiary.detailedAddress.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحي:</span>
                      <span className="font-medium">{beneficiary.detailedAddress.district}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الشارع:</span>
                      <span className="font-medium">{beneficiary.detailedAddress.street}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      <strong>تفاصيل إضافية:</strong> {beneficiary.detailedAddress.additionalInfo}
                    </div>
                  </div>
                </div>
              </div>

              {/* Family/Organization Info */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 ml-2 text-blue-600" />
                  الانتماء
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {beneficiary.organizationId && (
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        <Building2 className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900">المؤسسة</span>
                      </div>
                      <p className="text-sm text-gray-600">مسجل تحت مؤسسة رقم: {beneficiary.organizationId}</p>
                    </div>
                  )}
                  {beneficiary.familyId && (
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        <Heart className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900">العائلة</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        عضو في عائلة رقم: {beneficiary.familyId}
                        {beneficiary.relationToFamily && (
                          <span className="block">صلة القرابة: {beneficiary.relationToFamily}</span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">التوثيقات والمستندات</h4>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع مستند جديد
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {beneficiaryDocuments.map((doc) => {
                  const IconComponent = getDocumentIcon(doc.type);
                  return (
                    <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{doc.name}</h5>
                            <p className="text-sm text-gray-600">رفع في: {new Date(doc.uploadDate).toLocaleDateString('ar-SA')}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status === 'verified' ? 'موثق' :
                           doc.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                        </span>
                      </div>
                      
                      {doc.status === 'verified' && doc.verifiedDate && (
                        <div className="bg-green-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-green-800">
                            <strong>تم التوثيق:</strong> {new Date(doc.verifiedDate).toLocaleDateString('ar-SA')}
                          </p>
                          <p className="text-sm text-green-700">بواسطة: {doc.verifiedBy}</p>
                        </div>
                      )}
                      
                      {doc.status === 'rejected' && doc.rejectionReason && (
                        <div className="bg-red-50 rounded-lg p-3 mb-3">
                          <p className="text-sm text-red-800">
                            <strong>سبب الرفض:</strong> {doc.rejectionReason}
                          </p>
                          <p className="text-sm text-red-700">بواسطة: {doc.rejectedBy}</p>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 mb-4">{doc.notes}</p>
                      
                      <div className="flex space-x-2 space-x-reverse">
                        <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
                          <Eye className="w-4 h-4 ml-2" />
                          عرض
                        </button>
                        <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center">
                          <Download className="w-4 h-4 ml-2" />
                          تحميل
                        </button>
                        {doc.status === 'pending' && (
                          <>
                            <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                              موافقة
                            </button>
                            <button className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                              رفض
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upload New Document */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-4">رفع مستند جديد</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نوع المستند</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">اختر نوع المستند</option>
                      <option value="national_id">بطاقة الهوية الشخصية</option>
                      <option value="family_card">بطاقة العائلة</option>
                      <option value="address_proof">إثبات السكن</option>
                      <option value="income_certificate">شهادة دخل</option>
                      <option value="medical_report">تقرير طبي</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الملف</label>
                    <input type="file" accept="image/*,.pdf" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات</label>
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={2} placeholder="أي ملاحظات حول المستند..."></textarea>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
                    <Upload className="w-4 h-4 ml-2" />
                    رفع المستند
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Orders History Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">سجل الطرود المستلمة</h4>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {beneficiaryPackages.length} طرد
                </span>
              </div>

              <div className="space-y-4">
                {beneficiaryPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">{pkg.name}</h5>
                          <p className="text-sm text-gray-600">{pkg.type}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        pkg.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        pkg.status === 'in_delivery' ? 'bg-blue-100 text-blue-800' :
                        pkg.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {pkg.status === 'delivered' ? 'تم التسليم' :
                         pkg.status === 'in_delivery' ? 'قيد التوصيل' :
                         pkg.status === 'pending' ? 'معلق' : 'فشل'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{pkg.description}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">تاريخ الإنشاء:</span>
                        <p className="font-medium">{new Date(pkg.createdAt).toLocaleDateString('ar-SA')}</p>
                      </div>
                      {pkg.deliveredAt && (
                        <div>
                          <span className="text-gray-500">تاريخ التسليم:</span>
                          <p className="font-medium">{new Date(pkg.deliveredAt).toLocaleDateString('ar-SA')}</p>
                        </div>
                      )}
                      {pkg.expiryDate && (
                        <div>
                          <span className="text-gray-500">تاريخ الانتهاء:</span>
                          <p className="font-medium">{new Date(pkg.expiryDate).toLocaleDateString('ar-SA')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">سجل الطلبات</h4>
                <div className="flex space-x-2 space-x-reverse">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center">
                    <Plus className="w-4 h-4 ml-2" />
                    طلب جديد
                  </button>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {beneficiaryRequests.length} طلب
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {beneficiaryRequests.map((request) => (
                  <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className={`p-2 rounded-lg ${
                          request.status === 'approved' ? 'bg-green-100' :
                          request.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            request.status === 'approved' ? 'text-green-600' :
                            request.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">طلب {request.type}</h5>
                          <p className="text-sm text-gray-600">رقم الطلب: {request.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority === 'high' ? 'عالية' :
                           request.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRequestStatusColor(request.status)}`}>
                          {request.status === 'approved' ? 'تمت الموافقة' :
                           request.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">تاريخ الطلب:</span>
                        <p className="font-medium">{new Date(request.requestDate).toLocaleDateString('ar-SA')}</p>
                      </div>
                      {request.approvedDate && (
                        <div>
                          <span className="text-gray-500">تاريخ الموافقة:</span>
                          <p className="font-medium">{new Date(request.approvedDate).toLocaleDateString('ar-SA')}</p>
                        </div>
                      )}
                      {request.rejectedDate && (
                        <div>
                          <span className="text-gray-500">تاريخ الرفض:</span>
                          <p className="font-medium">{new Date(request.rejectedDate).toLocaleDateString('ar-SA')}</p>
                        </div>
                      )}
                      {(request.approvedBy || request.rejectedBy) && (
                        <div>
                          <span className="text-gray-500">بواسطة:</span>
                          <p className="font-medium">{request.approvedBy || request.rejectedBy}</p>
                        </div>
                      )}
                    </div>
                    
                    {request.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-800">
                          <strong>سبب الرفض:</strong> {request.rejectionReason}
                        </p>
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm">{request.notes}</p>
                    
                    {request.status === 'pending' && (
                      <div className="flex space-x-2 space-x-reverse mt-4">
                        <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                          موافقة
                        </button>
                        <button className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                          رفض
                        </button>
                        <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          طلب توضيح
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location and Delivery Tab */}
          {activeTab === 'delivery' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Location Map */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 ml-2 text-red-600" />
                    موقع المستفيد
                  </h4>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 flex items-center justify-center relative">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-red-500 mx-auto mb-2" />
                      <p className="font-medium text-gray-700">{beneficiary.detailedAddress.city}</p>
                      <p className="text-sm text-gray-600">{beneficiary.detailedAddress.district}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {beneficiary.location.lat.toFixed(4)}, {beneficiary.location.lng.toFixed(4)}
                      </p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Delivery Statistics */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Truck className="w-5 h-5 ml-2 text-green-600" />
                    إحصائيات التوصيل
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">إجمالي التوصيلات:</span>
                      <span className="font-medium text-green-600">{deliveryLocations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التوصيلات الناجحة:</span>
                      <span className="font-medium text-green-600">{deliveryLocations.filter(d => d.status === 'delivered').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">متوسط وقت التوصيل:</span>
                      <span className="font-medium">2.5 ساعة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">آخر توصيل:</span>
                      <span className="font-medium">{new Date(beneficiary.lastReceived).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Locations Map */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Map className="w-5 h-5 ml-2 text-blue-600" />
                  خريطة مواقع التسليم
                </h4>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center z-10">
                    <Navigation className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700">مواقع التسليم السابقة</p>
                    <p className="text-sm text-gray-500 mt-2">{deliveryLocations.length} موقع تسليم</p>
                  </div>
                  
                  {/* Sample delivery points */}
                  {deliveryLocations.map((delivery, index) => (
                    <div 
                      key={delivery.id}
                      className="absolute w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        top: `${20 + index * 15}%`,
                        left: `${25 + index * 20}%`
                      }}
                      onClick={() => setSelectedDelivery(delivery)}
                      title={`${delivery.packageName} - ${delivery.deliveryDate}`}
                    >
                      <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Selected Delivery Details */}
                {selectedDelivery && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-3">تفاصيل التسليم المحدد</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">الطرد:</span>
                        <p className="font-medium">{selectedDelivery.packageName}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">تاريخ التسليم:</span>
                        <p className="font-medium">{selectedDelivery.deliveryDate} - {selectedDelivery.deliveryTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">المندوب:</span>
                        <p className="font-medium">{selectedDelivery.courier}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">العنوان:</span>
                        <p className="font-medium">{selectedDelivery.address}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse mt-3">
                      <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
                        <Camera className="w-4 h-4 ml-2" />
                        عرض صورة التسليم
                      </button>
                      <button className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center">
                        <FileText className="w-4 h-4 ml-2" />
                        تقرير التسليم
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery History List */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 ml-2 text-green-600" />
                  سجل التوصيل التفصيلي
                </h4>
                <div className="space-y-3">
                  {deliveryLocations.map((delivery) => (
                    <div key={delivery.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-900">{delivery.packageName}</h6>
                            <p className="text-sm text-gray-600">المندوب: {delivery.courier}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {delivery.deliveryDate} - {delivery.deliveryTime}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{delivery.address}</p>
                      <div className="flex items-center space-x-2 space-x-reverse text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        <span>تم التوقيع</span>
                        <Camera className="w-3 h-3 mr-2" />
                        <span>تم التصوير</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 ml-2 text-yellow-600" />
                  تعليمات التوصيل
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-1">أفضل وقت للتوصيل:</p>
                    <p className="text-gray-600">من 9 صباحاً إلى 5 مساءً</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">رقم الهاتف للتواصل:</p>
                    <p className="text-gray-600">{beneficiary.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-medium text-gray-700 mb-1">ملاحظات خاصة:</p>
                    <p className="text-gray-600">{beneficiary.detailedAddress.additionalInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">الملاحظات والتعليقات</h4>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
                  <Edit className="w-4 h-4 ml-2" />
                  إضافة ملاحظة
                </button>
              </div>

              {/* Current Notes */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">الملاحظات الحالية</h5>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-gray-700">{beneficiary.notes}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      آخر تحديث: {new Date(beneficiary.updatedAt).toLocaleDateString('ar-SA')}
                    </span>
                    <span className="text-xs text-gray-500">
                      بواسطة: {beneficiary.updatedBy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">ملاحظات الإدارة</h5>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">ملاحظة للمندوب</span>
                      <span className="text-xs text-gray-500">2024-01-20</span>
                    </div>
                    <p className="text-sm text-gray-700">يرجى التأكد من التوصيل في الصباح الباكر - المستفيد يعمل بعد الظهر</p>
                    <p className="text-xs text-blue-600 mt-1">بواسطة: أحمد المشرف</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">تحديث العنوان</span>
                      <span className="text-xs text-gray-500">2024-01-18</span>
                    </div>
                    <p className="text-sm text-gray-700">تم تحديث العنوان - العنوان الجديد تم التأكد منه عبر الهاتف</p>
                    <p className="text-xs text-green-600 mt-1">بواسطة: فاطمة الموظفة</p>
                  </div>
                </div>
              </div>

              {/* Add New Note */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-3">إضافة ملاحظة جديدة</h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">نوع الملاحظة</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">اختر نوع الملاحظة</option>
                      <option value="delivery">ملاحظة للمندوب</option>
                      <option value="admin">ملاحظة إدارية</option>
                      <option value="update">تحديث بيانات</option>
                      <option value="special">حالة خاصة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الملاحظة</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="اكتب ملاحظة جديدة..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      حفظ الملاحظة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">سجل النشاط والمراجعات</h4>
                <div className="flex space-x-2 space-x-reverse">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير السجل
                  </button>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {activityLog.length} نشاط
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'create' ? 'bg-blue-100' :
                        activity.type === 'verify' ? 'bg-green-100' :
                        activity.type === 'approve' ? 'bg-purple-100' :
                        activity.type === 'deliver' ? 'bg-green-100' :
                        activity.type === 'review' ? 'bg-yellow-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'create' && <UserCheck className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'verify' && <Shield className="w-5 h-5 text-green-600" />}
                        {activity.type === 'approve' && <Star className="w-5 h-5 text-purple-600" />}
                        {activity.type === 'deliver' && <Truck className="w-5 h-5 text-green-600" />}
                        {activity.type === 'review' && <Eye className="w-5 h-5 text-yellow-600" />}
                        {activity.type === 'update' && <Edit className="w-5 h-5 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">{activity.action}</h5>
                          <span className="text-sm text-gray-500">
                            {new Date(activity.timestamp).toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{activity.user}</span>
                          <span>-</span>
                          <span>{activity.role}</span>
                        </div>
                        {activity.details && (
                          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{activity.details}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity Summary */}
              <div className="bg-gradient-to-l from-blue-50 to-green-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-5 h-5 ml-2 text-blue-600" />
                  ملخص النشاط
                </h5>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {activityLog.filter(a => a.type === 'create').length}
                    </div>
                    <div className="text-sm text-gray-600">إنشاء</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {activityLog.filter(a => a.type === 'verify' || a.type === 'approve').length}
                    </div>
                    <div className="text-sm text-gray-600">موافقات</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {activityLog.filter(a => a.type === 'deliver').length}
                    </div>
                    <div className="text-sm text-gray-600">تسليمات</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {activityLog.filter(a => a.type === 'update').length}
                    </div>
                    <div className="text-sm text-gray-600">تحديثات</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex space-x-3 space-x-reverse justify-end">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              إغلاق
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Edit className="w-4 h-4 ml-2" />
              تعديل البيانات
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="w-4 h-4 ml-2" />
              تصدير التقرير
            </button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center">
              <MessageSquare className="w-4 h-4 ml-2" />
              إرسال رسالة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}