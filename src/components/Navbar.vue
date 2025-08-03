<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-primary-500">FurniMarket</span>
        </router-link>

        <!-- Search Bar -->
        <div class="flex-1 max-w-lg mx-8">
          <div class="relative">
            <input 
              v-model="searchQuery"
              @keyup.enter="performSearch"
              type="text" 
             placeholder="Cari furnitur..." 
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/products" class="text-gray-700 hover:text-primary-500 font-medium transition-colors">
            Produk
          </router-link>
          
          <!-- Wishlist -->
          <router-link to="/wishlist" class="relative p-2 text-gray-700 hover:text-primary-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span v-if="wishlistStore.items.length > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ wishlistStore.items.length }}
            </span>
          </router-link>

          <!-- Cart -->
          <router-link to="/cart" class="relative p-2 text-gray-700 hover:text-primary-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 19v-6"/>
            </svg>
            <span v-if="cartStore.totalItems > 0" class="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </router-link>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="relative" ref="userMenu">
            <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <img :src="authStore.user.avatar" :alt="authStore.user.name" class="w-8 h-8 rounded-full">
              <span class="text-gray-700">{{ authStore.user.name }}</span>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors" @click="showUserMenu = false">
                Profile
              </router-link>
              <router-link to="/dashboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors" @click="showUserMenu = false">
                Dashboard
              </router-link>
              <router-link v-if="authStore.isAdmin" to="/admin" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors" @click="showUserMenu = false">
                Admin Dashboard
              </router-link>
              <hr class="my-2">
              <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                Logout
              </button>
            </div>
          </div>

          <!-- Login/Register -->
          <div v-else class="flex items-center space-x-4">
            <router-link to="/login" class="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Masuk
            </router-link>
            <router-link to="/register" class="btn-primary">
              Daftar
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <button @click="showMobileMenu = !showMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-4 py-2 space-y-2">
        <router-link to="/products" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors" @click="showMobileMenu = false">
          Produk
        </router-link>
        <router-link to="/wishlist" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors" @click="showMobileMenu = false">
          Wishlist
        </router-link>
        <router-link to="/cart" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors" @click="showMobileMenu = false">
          Cart
        </router-link>
        
        <div v-if="authStore.isAuthenticated" class="pt-2 border-t border-gray-200">
          <router-link to="/profile" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors" @click="showMobileMenu = false">
            Profile
          </router-link>
          <router-link to="/dashboard" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors" @click="showMobileMenu = false">
            Dashboard
          </router-link>
          <button @click="logout" class="block w-full text-left py-2 text-gray-700 hover:text-primary-500 transition-colors">
            Logout
          </button>
        </div>
        <div v-else class="pt-2 border-t border-gray-200">
          <router-link to="/login" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors" @click="showMobileMenu = false">
            Masuk
          </router-link>
          <router-link to="/register" class="block py-2 text-gray-700 hover:text-primary-500 transition-colors" @click="showMobileMenu = false">
            Daftar
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useProductsStore } from '../stores/products'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const productsStore = useProductsStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const userMenu = ref(null)
const searchQuery = ref('')

const logout = () => {
  authStore.logout()
  showUserMenu.value = false
  showMobileMenu.value = false
  router.push('/')
}

const performSearch = () => {
  productsStore.searchQuery = searchQuery.value
  if (router.currentRoute.value.name !== 'Products') {
    router.push('/products')
  }
  showMobileMenu.value = false
}

const handleClickOutside = (event) => {
  if (userMenu.value && !userMenu.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>