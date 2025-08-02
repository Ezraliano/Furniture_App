<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h1 class="text-5xl font-bold text-gray-900 leading-tight">
              Transform Your Space with 
              <span class="text-primary-500">Premium Furniture</span>
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed">
              Discover unique, high-quality furniture from trusted sellers. Create your perfect home 
              with pieces that reflect your style and personality.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/products" class="btn-primary text-center">
                Shop Now
              </router-link>
              <router-link to="/register" class="btn-outline text-center">
                Start Selling
              </router-link>
            </div>
            <div class="flex items-center space-x-8 pt-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-500">10K+</div>
                <div class="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-500">500+</div>
                <div class="text-sm text-gray-600">Trusted Sellers</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-primary-500">50K+</div>
                <div class="text-sm text-gray-600">Products</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <img 
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Modern Living Room" 
              class="w-full rounded-2xl shadow-2xl"
            >
            <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Quality Guaranteed</div>
                  <div class="text-sm text-gray-600">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every room in your home
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div v-for="category in productsStore.categories" :key="category.id" class="group cursor-pointer">
            <router-link :to="`/products?category=${category.slug}`" class="block">
              <div class="bg-gray-100 rounded-2xl p-8 text-center group-hover:bg-primary-50 transition-colors duration-300">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {{ category.name }}
                </h3>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated furniture pieces loved by customers
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard 
            v-for="product in productsStore.featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/products" class="btn-primary">
            View All Products
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose FurniMarket?</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best furniture shopping experience
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
            <p class="text-gray-600">
              Every piece is carefully vetted for quality and durability. We only work with trusted sellers.
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p class="text-gray-600">
              Quick and reliable shipping to your doorstep. Most items delivered within 5-7 business days.
            </p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
            <p class="text-gray-600">
              Our dedicated support team is here to help you every step of the way, from selection to delivery.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="py-16 bg-primary-500">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p class="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest furniture trends, exclusive deals, and design inspiration
        </p>
        <div class="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
          <button class="px-6 py-3 bg-secondary-500 text-white rounded-r-lg hover:bg-secondary-600 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.initProducts()
})
</script>