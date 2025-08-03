<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="page-header">Welcome back, {{ authStore.user.name }}!</h1>
        <p class="text-gray-600">Manage your account and track your orders</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Stats Cards -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">12</h3>
              <p class="text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ wishlistStore.items.length }}</h3>
              <p class="text-gray-600">Wishlist Items</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 19v-6"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">{{ cartStore.totalItems }}</h3>
              <p class="text-gray-600">Cart Items</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-2xl font-bold text-gray-900">$2,847</h3>
              <p class="text-gray-600">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Orders -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div class="space-y-4">
            <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-semibold text-gray-900">Order #{{ order.id }}</p>
                <p class="text-sm text-gray-600">{{ order.date }}</p>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">${{ order.total.toFixed(2) }}</p>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
                      :class="order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                             order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                             'bg-yellow-100 text-yellow-800'">
                  {{ order.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <button class="btn-outline w-full">View All Orders</button>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          <div class="space-y-4">
            <router-link to="/profile" class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <div>
                  <p class="font-medium text-gray-900">Profile Settings</p>
                  <p class="text-sm text-gray-600">Update your personal information</p>
                </div>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>

            <div class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <div>
                  <p class="font-medium text-gray-900">Email Preferences</p>
                  <p class="text-sm text-gray-600">Manage your email notifications</p>
                </div>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>

            <div class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p class="font-medium text-gray-900">Shipping Addresses</p>
                  <p class="text-sm text-gray-600">Manage your delivery addresses</p>
                </div>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Role-specific actions -->
      <div v-if="authStore.isAdmin" class="mt-8">
        <div class="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
          <h3 class="text-xl font-semibold mb-2">Admin Dashboard</h3>
          <p class="mb-4">Manage users, products, and system settings</p>
          <router-link to="/admin" class="bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Go to Admin Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const recentOrders = ref([
  {
    id: '12345',
    date: 'March 15, 2024',
    total: 1299.99,
    status: 'Delivered'
  },
  {
    id: '12344',
    date: 'March 10, 2024',
    total: 449.99,
    status: 'Shipped'
  },
  {
    id: '12343',
    date: 'March 5, 2024',
    total: 899.99,
    status: 'Processing'
  }
])
</script>