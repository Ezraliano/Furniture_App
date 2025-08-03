<template>
  <div v-if="product" class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <router-link to="/" class="text-gray-500 hover:text-gray-700">Home</router-link>
          </li>
          <li>
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </li>
          <li>
            <router-link to="/products" class="text-gray-500 hover:text-gray-700">Products</router-link>
          </li>
          <li>
            <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
            </svg>
          </li>
          <li class="text-gray-900">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <div class="aspect-square bg-white rounded-xl overflow-hidden shadow-lg">
            <img 
              :src="selectedImage" 
              :alt="product.name" 
              class="w-full h-full object-cover"
            >
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button 
              v-for="(image, index) in product.images" 
              :key="index"
              @click="selectedImage = image"
              class="aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors"
              :class="selectedImage === image ? 'border-primary-500' : 'border-gray-200 hover:border-gray-300'"
            >
              <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-full object-cover">
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
            <p class="text-gray-600 text-lg">{{ product.description }}</p>
          </div>

          <!-- Rating -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="text-lg text-gray-600">{{ product.rating }} ({{ product.reviewCount }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="flex items-center space-x-4">
            <span class="text-4xl font-bold text-primary-500">${{ product.price.toFixed(2) }}</span>
            <span v-if="product.originalPrice > product.price" class="text-xl text-gray-500 line-through">
              ${{ product.originalPrice.toFixed(2) }}
            </span>
            <span v-if="product.originalPrice > product.price" class="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
              Save ${{ (product.originalPrice - product.price).toFixed(2) }}
            </span>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 rounded-full" :class="product.inStock ? 'bg-green-500' : 'bg-red-500'"></div>
            <span class="font-medium" :class="product.inStock ? 'text-green-600' : 'text-red-600'">
              {{ product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock' }}
            </span>
          </div>

          <!-- Quantity Selector -->
          <div class="flex items-center space-x-4">
            <label class="text-sm font-medium text-gray-700">Quantity:</label>
            <div class="flex items-center border border-gray-300 rounded-lg">
              <button 
                @click="quantity > 1 && quantity--"
                :disabled="quantity <= 1"
                class="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </button>
              <input 
                v-model.number="quantity" 
                type="number" 
                min="1" 
                :max="product.stock"
                class="w-16 text-center border-none focus:ring-0"
              >
              <button 
                @click="quantity < product.stock && quantity++"
                :disabled="quantity >= product.stock"
                class="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button 
              @click="addToCart"
              :disabled="!product.inStock"
              class="flex-1 btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5M7 13v6a1 1 0 001 1h9a1 1 0 001-1v-6M9 19v-6"/>
              </svg>
              Add to Cart
            </button>
            <button 
              @click="toggleWishlist"
              class="btn-outline"
              :class="{ 'text-red-500 border-red-500': isInWishlist }"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
              </svg>
              {{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
            </button>
          </div>

          <!-- Product Details -->
          <div class="border-t pt-6 space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Product Details</h3>
              <dl class="grid grid-cols-1 gap-2">
                <div class="flex justify-between">
                  <dt class="text-gray-600">Dimensions:</dt>
                  <dd class="text-gray-900">{{ product.dimensions }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Material:</dt>
                  <dd class="text-gray-900">{{ product.material }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in product.tags" :key="tag" class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct.id" 
            :product="relatedProduct" 
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Product Not Found -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.324-2.5m10.648 0A7.962 7.962 0 0012 15c2.34 0 4.29-1.007 5.324-2.5M12 3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
      <p class="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
      <router-link to="/products" class="btn-primary">
        Browse Products
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const quantity = ref(1)
const selectedImage = ref('')

const product = computed(() => {
  return productsStore.getProduct(route.params.id)
})

const isInWishlist = computed(() => {
  return product.value ? wishlistStore.isInWishlist(product.value.id) : false
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.getProductsByCategory(product.value.category)
    .filter(p => p.id !== product.value.id)
    .slice(0, 4)
})

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value)
  }
}

const toggleWishlist = () => {
  if (product.value) {
    wishlistStore.toggleItem(product.value)
  }
}

onMounted(() => {
  productsStore.initProducts()
  if (product.value) {
    selectedImage.value = product.value.images[0]
  }
})
</script>