<template>
  <div class="product-card">
    <div class="relative">
      <img 
        :src="product.images[0]" 
        :alt="product.name" 
        class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      >
      
      <!-- Wishlist button -->
      <button 
        @click.prevent="toggleWishlist"
        class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        :class="{ 'text-red-500': isInWishlist, 'text-gray-400': !isInWishlist }"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Sale badge -->
      <div v-if="product.originalPrice > product.price" class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
        Sale
      </div>

      <!-- Out of stock overlay -->
      <div v-if="!product.inStock" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span class="text-white font-semibold text-lg">Out of Stock</span>
      </div>
    </div>

    <div class="p-6">
      <!-- Product title -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
        {{ product.name }}
      </h3>

      <!-- Product description -->
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <span class="ml-2 text-sm text-gray-600">{{ product.rating }} ({{ product.reviewCount }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-primary-500">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice > product.price" class="text-sm text-gray-500 line-through">
            ${{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex space-x-2">
        <button 
          @click.prevent="addToCart"
          :disabled="!product.inStock"
          class="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 19v-6"/>
          </svg>
          Add to Cart
        </button>
        <router-link 
          :to="`/products/${product.id}`"
          class="btn-outline text-center"
        >
          View
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

const addToCart = () => {
  cartStore.addItem(props.product)
}

const toggleWishlist = () => {
  wishlistStore.toggleItem(props.product)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>