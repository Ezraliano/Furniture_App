import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isCustomer = computed(() => user.value?.role === 'customer')

  const login = async (credentials) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      user.value = {
        id: 1,
        name: credentials.email === 'admin@furniture.com' ? 'Admin User' : 'John Doe',
        email: credentials.email,
        role: credentials.email === 'admin@furniture.com' ? 'admin' : 'customer',
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      user.value = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'customer',
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const initAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  const updateProfile = async (profileData) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      user.value = { ...user.value, ...profileData }
      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isCustomer,
    login,
    register,
    logout,
    initAuth,
    updateProfile
  }
})