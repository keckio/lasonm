// Mock Database - سيتم استبدالها بقاعدة بيانات حقيقية لاحقاً

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'organization' | 'family';
  organizationId?: string;
  familyId?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  location: string;
  contactPerson: string;
  phone: string;
  email: string;
  beneficiariesCount: number;
  packagesCount: number;
  completionRate: number;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

export interface Family {
  id: string;
  name: string;
  headOfFamily: string;
  phone: string;
  membersCount: number;
  packagesDistributed: number;
  completionRate: number;
  location: string;
  createdAt: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  phone: string;
  address: string;
  detailedAddress: {
    governorate: string;
    city: string;
    district: string;
    street: string;
    additionalInfo: string;
  };
  location: { lat: number; lng: number };
  organizationId?: string;
  familyId?: string;
  relationToFamily?: string;
  eligibilityCategory: 'poor' | 'widow' | 'orphan' | 'disabled' | 'emergency' | 'other';
  eligibilityStatus: 'eligible' | 'under_review' | 'rejected' | 'suspended';
  identityStatus: 'verified' | 'pending' | 'rejected';
  identityImageUrl?: string;
  status: 'active' | 'pending' | 'suspended';
  lastReceived: string;
  totalPackages: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface Request {
  id: string;
  beneficiaryId: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  approvedDate?: string;
  rejectedDate?: string;
  approvedBy?: string;
  rejectedBy?: string;
  rejectionReason?: string;
  priority: 'low' | 'medium' | 'high';
  notes: string;
}

export interface Document {
  id: string;
  beneficiaryId: string;
  type: 'national_id' | 'family_card' | 'address_proof' | 'income_certificate' | 'medical_report' | 'other';
  name: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
  verifiedDate?: string;
  rejectedDate?: string;
  verifiedBy?: string;
  rejectedBy?: string;
  rejectionReason?: string;
  fileUrl: string;
  notes: string;
}

export interface Package {
  id: string;
  name: string;
  type: string;
  description: string;
  organizationId?: string;
  familyId?: string;
  beneficiaryId?: string;
  status: 'pending' | 'assigned' | 'in_delivery' | 'delivered' | 'failed';
  createdAt: string;
  deliveredAt?: string;
  expiryDate?: string;
}

export interface Courier {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'busy' | 'offline';
  rating: number;
  completedTasks: number;
  currentLocation?: { lat: number; lng: number };
  isHumanitarianApproved: boolean;
}

export interface Task {
  id: string;
  packageId: string;
  beneficiaryId: string;
  courierId?: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'delivered' | 'failed' | 'rescheduled';
  createdAt: string;
  scheduledAt?: string;
  deliveredAt?: string;
  deliveryLocation?: { lat: number; lng: number };
  notes?: string;
  photoUrl?: string;
  failureReason?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  type: 'create' | 'verify' | 'approve' | 'update' | 'deliver' | 'review';
  details?: string;
}

export interface Alert {
  id: string;
  type: 'delayed' | 'failed' | 'expired' | 'urgent';
  title: string;
  description: string;
  relatedId: string;
  relatedType: 'package' | 'beneficiary' | 'task';
  priority: 'low' | 'medium' | 'high' | 'critical';
  isRead: boolean;
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'read' | 'write' | 'delete' | 'approve' | 'manage';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdAt: string;
}

// Mock Data
export const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'جمعية الهلال الأحمر الفلسطيني - غزة',
    type: 'طعام - ملابس',
    location: 'خان يونس - الكتيبة',
    contactPerson: 'أحمد أبو سالم',
    phone: '0501234567',
    email: 'info@redcrescent-gaza.org',
    beneficiariesCount: 342,
    packagesCount: 87,
    completionRate: 92,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'مؤسسة أطباء بلا حدود - غزة',
    type: 'أدوية - معدات طبية',
    location: 'غزة - الشجاعية',
    contactPerson: 'د. فاطمة الغزاوي',
    phone: '0559876543',
    email: 'gaza@msf.org',
    beneficiariesCount: 156,
    packagesCount: 23,
    completionRate: 75,
    status: 'pending',
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'جمعية الإغاثة الإسلامية - فلسطين',
    type: 'مواد غذائية',
    location: 'خان يونس - بني سهيلا',
    contactPerson: 'خالد أبو يوسف',
    phone: '0567891234',
    email: 'palestine@islamic-relief.org',
    beneficiariesCount: 89,
    packagesCount: 45,
    completionRate: 88,
    status: 'active',
    createdAt: '2024-01-20'
  }
];

export const mockFamilies: Family[] = [
  {
    id: '1',
    name: 'عائلة آل أبو عامر',
    headOfFamily: 'محمد أبو عامر',
    phone: '0591234567',
    membersCount: 12,
    packagesDistributed: 45,
    completionRate: 93,
    location: 'خان يونس - الكتيبة',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    name: 'مبادرة عائلة الفرا',
    headOfFamily: 'سارة الفرا',
    phone: '0592345678',
    membersCount: 8,
    packagesDistributed: 23,
    completionRate: 78,
    location: 'خان يونس - عبسان الكبيرة',
    createdAt: '2024-02-05'
  },
  {
    id: '3',
    name: 'عائلة آل الشوا',
    headOfFamily: 'عبدالله الشوا',
    phone: '0593456789',
    membersCount: 15,
    packagesDistributed: 67,
    completionRate: 95,
    location: 'خان يونس - بني سهيلا',
    createdAt: '2024-01-25'
  }
];

export const mockBeneficiaries: Beneficiary[] = [
  {
    id: '1',
    name: 'محمد خالد أبو عامر',
    fullName: 'محمد خالد عبدالله أبو عامر',
    nationalId: '900123456',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    phone: '0591234567',
    address: 'خان يونس - الكتيبة - شارع الشهداء',
    detailedAddress: {
      governorate: 'خان يونس',
      city: 'خان يونس',
      district: 'الكتيبة',
      street: 'شارع الشهداء',
      additionalInfo: 'بجانب مسجد الكتيبة الكبير'
    },
    location: { lat: 31.3469, lng: 34.3029 },
    organizationId: '1',
    eligibilityCategory: 'poor',
    eligibilityStatus: 'eligible',
    identityStatus: 'verified',
    identityImageUrl: 'https://example.com/id1.jpg',
    status: 'active',
    lastReceived: '2024-12-20',
    totalPackages: 5,
    notes: 'مستفيد منتظم، يحتاج مساعدة شهرية',
    createdAt: '2024-01-15',
    updatedAt: '2024-12-20',
    createdBy: 'admin',
    updatedBy: 'admin'
  },
  {
    id: '2',
    name: 'فاطمة أحمد الفرا',
    fullName: 'فاطمة أحمد محمد الفرا',
    nationalId: '900234567',
    dateOfBirth: '1978-07-22',
    gender: 'female',
    phone: '0592345678',
    address: 'خان يونس - عبسان الكبيرة - شارع الوحدة',
    detailedAddress: {
      governorate: 'خان يونس',
      city: 'عبسان الكبيرة',
      district: 'عبسان الكبيرة',
      street: 'شارع الوحدة',
      additionalInfo: 'حي المساجد'
    },
    location: { lat: 31.3200, lng: 34.3500 },
    organizationId: '1',
    eligibilityCategory: 'widow',
    eligibilityStatus: 'eligible',
    identityStatus: 'verified',
    status: 'pending',
    lastReceived: '2024-12-17',
    totalPackages: 3,
    notes: 'أرملة مع 4 أطفال',
    createdAt: '2024-02-01',
    updatedAt: '2024-12-17',
    createdBy: 'org_admin',
    updatedBy: 'admin'
  },
  {
    id: '3',
    name: 'خالد سالم أبو يوسف',
    fullName: 'خالد سالم محمد أبو يوسف',
    nationalId: '900345678',
    dateOfBirth: '1990-11-10',
    gender: 'male',
    phone: '0593456789',
    address: 'خان يونس - خزاعة - شارع المقاومة',
    detailedAddress: {
      governorate: 'خان يونس',
      city: 'خزاعة',
      district: 'خزاعة الشرقية',
      street: 'شارع المقاومة',
      additionalInfo: 'منطقة الحدود الشرقية'
    },
    location: { lat: 31.3100, lng: 34.3800 },
    familyId: '1',
    relationToFamily: 'أخ',
    eligibilityCategory: 'poor',
    eligibilityStatus: 'eligible',
    identityStatus: 'verified',
    status: 'active',
    lastReceived: '2024-12-21',
    totalPackages: 7,
    notes: 'فرد من عائلة أبو يوسف',
    createdAt: '2024-01-10',
    updatedAt: '2024-12-21',
    createdBy: 'family_admin',
    updatedBy: 'family_admin'
  },
  {
    id: '4',
    name: 'سارة محمود الشوا',
    fullName: 'سارة محمود عبدالله الشوا',
    nationalId: '900456789',
    dateOfBirth: '1995-05-18',
    gender: 'female',
    phone: '0594567890',
    address: 'خان يونس - بني سهيلا - شارع الجلاء',
    detailedAddress: {
      governorate: 'خان يونس',
      city: 'بني سهيلا',
      district: 'بني سهيلا',
      street: 'شارع الجلاء',
      additionalInfo: 'حي الشهداء'
    },
    location: { lat: 31.3300, lng: 34.3200 },
    familyId: '1',
    relationToFamily: 'أخت',
    eligibilityCategory: 'poor',
    eligibilityStatus: 'under_review',
    identityStatus: 'pending',
    status: 'active',
    lastReceived: '2024-12-18',
    totalPackages: 4,
    notes: 'تحت المراجعة لتحديث البيانات',
    createdAt: '2024-01-12',
    updatedAt: '2024-12-18',
    createdBy: 'family_admin',
    updatedBy: 'admin'
  },
  {
    id: '5',
    name: 'أحمد عبدالله النجار',
    fullName: 'أحمد عبدالله سليم النجار',
    nationalId: '900567890',
    dateOfBirth: '1982-09-30',
    gender: 'male',
    phone: '0595678901',
    address: 'خان يونس - القرارة - شارع فلسطين',
    detailedAddress: {
      governorate: 'خان يونس',
      city: 'القرارة',
      district: 'القرارة الشرقية',
      street: 'شارع فلسطين',
      additionalInfo: 'بجانب مسجد القرارة الكبير'
    },
    location: { lat: 31.3000, lng: 34.3600 },
    organizationId: '2',
    eligibilityCategory: 'disabled',
    eligibilityStatus: 'eligible',
    identityStatus: 'verified',
    status: 'active',
    lastReceived: '2024-12-19',
    totalPackages: 8,
    notes: 'من ذوي الاحتياجات الخاصة',
    createdAt: '2024-01-08',
    updatedAt: '2024-12-19',
    createdBy: 'org_admin',
    updatedBy: 'org_admin'
  },
  {
    id: '6',
    name: 'نورا إبراهيم الحلو',
    fullName: 'نورا إبراهيم عبدالرحمن الحلو',
    nationalId: '900678901',
    dateOfBirth: '1988-12-05',
    gender: 'female',
    phone: '0596789012',
    address: 'خان يونس - عبسان الصغيرة - شارع النصر',
    detailedAddress: {
      governorate: 'خان يونس',
      city: 'عبسان الصغيرة',
      district: 'عبسان الصغيرة',
      street: 'شارع النصر',
      additionalInfo: 'حي الزيتون'
    },
    location: { lat: 31.3150, lng: 34.3450 },
    organizationId: '3',
    eligibilityCategory: 'orphan',
    eligibilityStatus: 'rejected',
    identityStatus: 'rejected',
    status: 'suspended',
    lastReceived: '2024-11-15',
    totalPackages: 2,
    notes: 'تم رفض الطلب لعدم استيفاء الشروط',
    createdAt: '2024-03-01',
    updatedAt: '2024-11-20',
    createdBy: 'org_admin',
    updatedBy: 'admin'
  },
  {
    id: '7',
    name: 'يوسف حسن البرغوثي',
    fullName: 'يوسف حسن محمد البرغوثي',
    nationalId: '900789012',
    dateOfBirth: '1992-08-12',
    gender: 'male',
    phone: '0597890123',
    address: 'خان يونس - الفخاري - شارع الأقصى',
    detailedAddress: {
      governorate: 'خان يونس',
      city: 'الفخاري',
      district: 'الفخاري الشرقية',
      street: 'شارع الأقصى',
      additionalInfo: 'منطقة الحدود الشرقية'
    },
    location: { lat: 31.2950, lng: 34.3700 },
    organizationId: '1',
    eligibilityCategory: 'poor',
    eligibilityStatus: 'under_review',
    identityStatus: 'pending',
    status: 'pending',
    lastReceived: '2024-11-30',
    totalPackages: 1,
    notes: 'مستفيد جديد - تم رفع صورة الهوية للمراجعة',
    createdAt: '2024-12-01',
    updatedAt: '2024-12-01',
    createdBy: 'org_admin',
    updatedBy: 'org_admin'
  }
];

export const mockPackages: Package[] = [
  {
    id: '1',
    name: 'طرد مواد غذائية أساسية',
    type: 'مواد غذائية',
    description: 'أرز، سكر، زيت، معلبات، تمر',
    organizationId: '1',
    beneficiaryId: '1',
    status: 'delivered',
    createdAt: '2024-12-20',
    deliveredAt: '2024-12-20',
    expiryDate: '2024-12-30'
  },
  {
    id: '2',
    name: 'طرد ملابس شتوية',
    type: 'ملابس',
    description: 'معاطف، بطانيات، ملابس داخلية',
    organizationId: '1',
    beneficiaryId: '2',
    status: 'in_delivery',
    createdAt: '2024-12-19'
  },
  {
    id: '3',
    name: 'طرد أدوية أساسية',
    type: 'أدوية',
    description: 'مسكنات، أدوية ضغط، فيتامينات',
    organizationId: '2',
    beneficiaryId: '3',
    status: 'pending',
    createdAt: '2024-12-18',
    expiryDate: '2025-06-18'
  }
];

export const mockCouriers: Courier[] = [
  {
    id: '1',
    name: 'محمد علي أبو عامر',
    phone: '0591234567',
    email: 'mohammed@courier.com',
    status: 'active',
    rating: 4.8,
    completedTasks: 156,
    currentLocation: { lat: 31.3469, lng: 34.3029 },
    isHumanitarianApproved: true
  },
  {
    id: '2',
    name: 'أحمد خالد الفرا',
    phone: '0592345678',
    email: 'ahmed@courier.com',
    status: 'busy',
    rating: 4.6,
    completedTasks: 89,
    currentLocation: { lat: 31.3200, lng: 34.3500 },
    isHumanitarianApproved: true
  },
  {
    id: '3',
    name: 'سالم محمد النجار',
    phone: '0593456789',
    email: 'salem@courier.com',
    status: 'offline',
    rating: 4.9,
    completedTasks: 234,
    currentLocation: { lat: 31.3100, lng: 34.3800 },
    isHumanitarianApproved: true
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    packageId: '1',
    beneficiaryId: '1',
    courierId: '1',
    status: 'delivered',
    createdAt: '2024-12-20',
    scheduledAt: '2024-12-20',
    deliveredAt: '2024-12-20',
    deliveryLocation: { lat: 31.5017, lng: 34.4668 },
    notes: 'تم التسليم بنجاح للمستفيد'
  },
  {
    id: '2',
    packageId: '2',
    beneficiaryId: '2',
    courierId: '2',
    status: 'in_progress',
    createdAt: '2024-12-19',
    scheduledAt: '2024-12-21',
    notes: 'في الطريق للتسليم'
  },
  {
    id: '3',
    packageId: '3',
    beneficiaryId: '3',
    status: 'pending',
    createdAt: '2024-12-18',
    notes: 'في انتظار تعيين مندوب'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'delayed',
    title: 'طرود متأخرة في قطاع غزة',
    description: '23 طرد في منطقة الشجاعية لم يتم تسليمها',
    relatedId: '2',
    relatedType: 'package',
    priority: 'critical',
    isRead: false,
    createdAt: '2024-12-21'
  },
  {
    id: '2',
    type: 'failed',
    title: 'فشل في التسليم',
    description: '5 طرود تحتاج تحديث عنوان',
    relatedId: '3',
    relatedType: 'task',
    priority: 'high',
    isRead: false,
    createdAt: '2024-12-20'
  },
  {
    id: '3',
    type: 'expired',
    title: 'طرود قاربت على الانتهاء',
    description: '12 طرد تنتهي صلاحيتها خلال 3 أيام',
    relatedId: '1',
    relatedType: 'package',
    priority: 'medium',
    isRead: true,
    createdAt: '2024-12-19'
  }
];

// Permissions Data
export const mockPermissions: Permission[] = [
  { id: '1', name: 'قراءة جميع البيانات', description: 'عرض جميع البيانات في النظام', category: 'read' },
  { id: '2', name: 'تعديل جميع البيانات', description: 'تعديل أي بيانات في النظام', category: 'write' },
  { id: '3', name: 'حذف البيانات', description: 'حذف البيانات من النظام', category: 'delete' },
  { id: '4', name: 'إدارة المستخدمين', description: 'إضافة وتعديل المستخدمين', category: 'manage' },
  { id: '5', name: 'إدارة الأدوار', description: 'إنشاء وتعديل الأدوار', category: 'manage' },
  { id: '6', name: 'عرض التقارير', description: 'الوصول للتقارير والإحصائيات', category: 'read' },
  { id: '7', name: 'عرض المستفيدين', description: 'عرض قائمة المستفيدين', category: 'read' },
  { id: '8', name: 'إدارة المستفيدين', description: 'إضافة وتعديل المستفيدين', category: 'write' },
  { id: '9', name: 'عرض الطلبات', description: 'عرض طلبات المساعدة', category: 'read' },
  { id: '10', name: 'موافقة الطلبات', description: 'الموافقة على طلبات المساعدة', category: 'approve' },
  { id: '11', name: 'رفض الطلبات', description: 'رفض طلبات المساعدة', category: 'approve' },
  { id: '12', name: 'عرض التسليمات', description: 'عرض حالة التسليمات', category: 'read' },
  { id: '13', name: 'تحديث حالة التسليم', description: 'تحديث حالة تسليم الطرود', category: 'write' }
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'مدير النظام',
    description: 'صلاحيات كاملة على جميع أجزاء النظام',
    permissions: ['1', '2', '3', '4', '5', '6'],
    userCount: 2,
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'مشرف المؤسسة',
    description: 'إدارة المستفيدين والطلبات الخاصة بالمؤسسة',
    permissions: ['7', '8', '9', '6', '12'],
    userCount: 8,
    isActive: true,
    createdAt: '2024-01-05'
  },
  {
    id: '3',
    name: 'مندوب التوزيع',
    description: 'تحديث حالة التسليمات والتوزيع',
    permissions: ['12', '13', '7'],
    userCount: 15,
    isActive: true,
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'مراجع الطلبات',
    description: 'مراجعة وموافقة طلبات المساعدة',
    permissions: ['9', '10', '11', '7'],
    userCount: 5,
    isActive: true,
    createdAt: '2024-01-15'
  }
];

export const mockSystemUsers: SystemUser[] = [
  {
    id: '1',
    name: 'أحمد محمد الإدمن',
    email: 'admin@humanitarian.ps',
    phone: '0501234567',
    roleId: '1',
    status: 'active',
    lastLogin: '2024-12-21',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'فاطمة أحمد المشرفة',
    email: 'fatima@humanitarian.ps',
    phone: '0559876543',
    roleId: '2',
    status: 'active',
    lastLogin: '2024-12-20',
    createdAt: '2024-01-05'
  },
  {
    id: '3',
    name: 'محمد علي المندوب',
    email: 'mohammed@humanitarian.ps',
    phone: '0567891234',
    roleId: '3',
    status: 'active',
    lastLogin: '2024-12-21',
    createdAt: '2024-01-10'
  }
];

// Helper functions for data manipulation
export const getOrganizationById = (id: string): Organization | undefined => {
  return mockOrganizations.find(org => org.id === id);
};

export const getFamilyById = (id: string): Family | undefined => {
  return mockFamilies.find(family => family.id === id);
};

export const getBeneficiariesByOrganization = (organizationId: string): Beneficiary[] => {
  return mockBeneficiaries.filter(b => b.organizationId === organizationId);
};

export const getBeneficiariesByFamily = (familyId: string): Beneficiary[] => {
  return mockBeneficiaries.filter(b => b.familyId === familyId);
};

export const getPackagesByBeneficiary = (beneficiaryId: string): Package[] => {
  return mockPackages.filter(p => p.beneficiaryId === beneficiaryId);
};

export const getTasksByStatus = (status: Task['status']): Task[] => {
  return mockTasks.filter(t => t.status === status);
};

export const getUnreadAlerts = (): Alert[] => {
  return mockAlerts.filter(a => !a.isRead);
};

export const getCriticalAlerts = (): Alert[] => {
  return mockAlerts.filter(a => a.priority === 'critical' && !a.isRead);
};

// Statistics calculations
export const calculateStats = () => {
  const totalBeneficiaries = mockBeneficiaries.length;
  const totalPackages = mockPackages.length;
  const deliveredPackages = mockPackages.filter(p => p.status === 'delivered').length;
  const activeTasks = mockTasks.filter(t => ['pending', 'assigned', 'in_progress'].includes(t.status)).length;
  const criticalAlerts = getCriticalAlerts().length;
  
  return {
    totalBeneficiaries,
    totalPackages,
    deliveredPackages,
    activeTasks,
    criticalAlerts,
    deliveryRate: totalPackages > 0 ? Math.round((deliveredPackages / totalPackages) * 100) : 0
  };
};