<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="page-header">Shopping Cart</h1>

      <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center space-x-4">
              <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg">
              
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
                <p class="text-2xl font-bold text-primary-500">${{ item.price.toFixed(2) }}</p>
              </div>

              <div class="flex items-center space-x-2">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <span class="w-12 text-center font-semibold">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </button>
              </div>

              <button 
                @click="removeItem(item.id)"
                class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div>
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div class="space-y-3 mb-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Items ({{ cartStore.totalItems }})</span>
                <span class="font-semibold">${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-semibold">Free</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-semibold">${{ (cartStore.totalPrice * 0.08).toFixed(2) }}</span>
              </div>
              <hr>
              <div class="flex justify-between text-lg">
                <span class="font-semibold">Total</span>
                <span class="font-bold text-primary-500">${{ (cartStore.totalPrice * 1.08).toFixed(2) }}</span>
              </div>
            </div>

            <router-link to="/checkout" class="w-full btn-primary text-center block">
              Proceed to Checkout
            </router-link>
            
            <router-link to="/products" class="w-full btn-outline text-center block mt-3">
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-16">
        <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 19v-6"/>
        </svg>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Add some beautiful furniture to get started!</p>
        <router-link to="/products" class="btn-primary">
          Start Shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId) => {
  cartStore.removeItem(productId)
}
</script>