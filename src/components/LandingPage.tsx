import React from 'react';
import { Shield, Building2, Users, MapPin, Package, Truck, BarChart3, Bell, ArrowRight, ArrowLeft } from 'lucide-react';

interface LandingPageProps {
  onNavigateTo: (page: string) => void;
}

export default function LandingPage({ onNavigateTo }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-50 via-white to-green-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">منصة المساعدات</h1>
                <p className="text-xs text-gray-600">نظام إدارة التوزيع الإنساني</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            منصة غزة للمساعدات
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent block">
              الإنسانية المتكاملة
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            نظام شامل لإدارة وتوزيع المساعدات الإنسانية في قطاع غزة مع تتبع في الوقت الفعلي،
            إدارة المستفيدين، والمؤسسات والعائلات الفلسطينية
          </p>
          
          {/* Features Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">تتبع الموقع</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">إدارة الطرود</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-orange-100 p-3 rounded-full">
                <Truck className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">التوزيع</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">التقارير</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Selection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              اختر لوحة التحكم المناسبة
            </h3>
            <p className="text-lg text-gray-600">
              نظام متعدد المستويات لإدارة المساعدات بفعالية
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Admin Dashboard */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-600 p-4 rounded-full w-fit mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">لوحة الإدمن</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                التحكم الكامل في النظام، إدارة المستفيدين، المؤسسات، العائلات، 
                المندوبين والتقارير الشاملة
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-2"></div>
                  خريطة تفاعلية مباشرة
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-2"></div>
                  إدارة شاملة للمؤسسات والعائلات
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-2"></div>
                  تقارير مفصلة وتنبيهات ذكية
                </li>
              </ul>
              <button 
                onClick={() => onNavigateTo('admin')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>دخول لوحة الإدمن</span>
                <ArrowLeft className="w-4 h-4 mr-2" />
              </button>
            </div>

            {/* Organizations Dashboard */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-green-600 p-4 rounded-full w-fit mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">لوحة المؤسسات</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                إدارة مستفيدين وطرود المؤسسة، متابعة عملية التوزيع، 
                والحصول على تقارير أداء مفصلة
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full ml-2"></div>
                  إدارة المستفيدين والطرود
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full ml-2"></div>
                  متابعة المهام والمندوبين
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full ml-2"></div>
                  تقارير أداء المؤسسة
                </li>
              </ul>
              <button 
                onClick={() => onNavigateTo('organizations')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>دخول لوحة المؤسسات</span>
                <ArrowLeft className="w-4 h-4 mr-2" />
              </button>
            </div>

            {/* Families Dashboard */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-600 p-4 rounded-full w-fit mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">لوحة العائلات</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">
                للعائلات والمبادرين الفرديين، إدارة مبسطة للمستفيدين 
                ومتابعة التوزيع بواجهة سهلة الاستخدام
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full ml-2"></div>
                  إدارة مبسطة للمستفيدين
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full ml-2"></div>
                  تحديد الطرود للعائلة
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full ml-2"></div>
                  متابعة التوزيع والتنبيهات
                </li>
              </ul>
              <button 
                onClick={() => onNavigateTo('families')}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>دخول لوحة العائلات</span>
                <ArrowLeft className="w-4 h-4 mr-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              مميزات النظام
            </h3>
            <p className="text-lg text-gray-600">
              حلول شاملة لإدارة المساعدات الإنسانية بكفاءة عالية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MapPin className="w-8 h-8 text-blue-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">التتبع المباشر</h4>
              <p className="text-sm text-gray-600">خريطة تفاعلية لتتبع المستفيدين والمندوبين</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Package className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">إدارة الطرود</h4>
              <p className="text-sm text-gray-600">نظام شامل لإدارة وتتبع جميع الطرود</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Bell className="w-8 h-8 text-orange-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">التنبيهات الذكية</h4>
              <p className="text-sm text-gray-600">تنبيهات فورية للطلبات المتأخرة والمشاكل</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <BarChart3 className="w-8 h-8 text-purple-600 mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">التقارير التفصيلية</h4>
              <p className="text-sm text-gray-600">تقارير شاملة وإحصائيات مفصلة للأداء</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">منصة المساعدات الإنسانية</span>
          </div>
          <p className="text-gray-300 mt-2">
            نظام متكامل لإدارة وتوزيع المساعدات الإنسانية بكفاءة وشفافية
          </p>
        </div>
      </footer>
    </div>
  );
}