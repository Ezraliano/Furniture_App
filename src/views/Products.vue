<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="page-header">All Products</h1>
        <p class="text-gray-600">Discover our complete collection of premium furniture</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
            
            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input 
                v-model="productsStore.searchQuery"
                type="text" 
                placeholder="Search products..." 
                class="input-field"
              >
            </div>

            <!-- Category Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select v-model="productsStore.selectedCategory" class="input-field">
                <option value="">All Categories</option>
                <option v-for="category in productsStore.categories" :key="category.id" :value="category.slug">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div class="space-y-2">
                <input 
                  v-model.number="productsStore.priceRange[0]"
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="50"
                  class="w-full"
                >
                <input 
                  v-model.number="productsStore.priceRange[1]"
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="50"
                  class="w-full"
                >
                <div class="flex justify-between text-sm text-gray-600">
                  <span>${{ productsStore.priceRange[0] }}</span>
                  <span>${{ productsStore.priceRange[1] }}</span>
                </div>
              </div>
            </div>

            <!-- Sort Options -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select v-model="productsStore.sortBy" class="input-field">
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            <!-- Reset Filters -->
            <button @click="resetFilters" class="w-full btn-outline">
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="lg:w-3/4">
          <!-- Results Summary -->
          <div class="flex justify-between items-center mb-6">
            <p class="text-gray-600">
              Showing {{ productsStore.filteredProducts.length }} of {{ productsStore.products.length }} products
            </p>
          </div>

          <!-- Products Grid -->
          <div v-if="productsStore.filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard 
              v-for="product in productsStore.filteredProducts" 
              :key="product.id" 
              :product="product" 
            />
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.324-2.5m10.648 0A7.962 7.962 0 0012 15c2.34 0 4.29-1.007 5.324-2.5M12 3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p class="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button @click="resetFilters" class="btn-primary">
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../stores/products'

const route = useRoute()
const productsStore = useProductsStore()

const resetFilters = () => {
  productsStore.searchQuery = ''
  productsStore.selectedCategory = ''
  productsStore.priceRange = [0, 5000]
  productsStore.sortBy = 'name'
}

onMounted(() => {
  productsStore.initProducts()
  
  // Set filters from URL params
  if (route.query.category) {
    productsStore.selectedCategory = route.query.category
  }
  if (route.query.search) {
    productsStore.searchQuery = route.query.search
  }
})

// Watch for route changes
watch(() => route.query, (newQuery) => {
  if (newQuery.category) {
    productsStore.selectedCategory = newQuery.category
  }
  if (newQuery.search) {
    productsStore.searchQuery = newQuery.search
  }
})
</script>