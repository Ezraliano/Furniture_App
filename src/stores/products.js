import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([
    { id: 1, name: 'Living Room', slug: 'living-room' },
    { id: 2, name: 'Bedroom', slug: 'bedroom' },
    { id: 3, name: 'Dining Room', slug: 'dining-room' },
    { id: 4, name: 'Office', slug: 'office' },
    { id: 5, name: 'Outdoor', slug: 'outdoor' },
    { id: 6, name: 'Storage', slug: 'storage' }
  ])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const priceRange = ref([0, 5000])
  const sortBy = ref('name')

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'Modern Sectional Sofa',
      description: 'Comfortable and stylish sectional sofa perfect for modern living rooms.',
      price: 1299.99,
      originalPrice: 1599.99,
      category: 'living-room',
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 15,
      rating: 4.5,
      reviewCount: 89,
      seller: { id: 1, name: 'Furniture Plus', rating: 4.8 },
      tags: ['modern', 'comfortable', 'sectional'],
      dimensions: '108" W x 36" D x 32" H',
      material: 'Fabric upholstery, hardwood frame',
      createdAt: new Date('2024-01-15').toISOString()
    },
    {
      id: 2,
      name: 'Rustic Dining Table',
      description: 'Handcrafted rustic dining table made from reclaimed wood.',
      price: 899.99,
      originalPrice: 999.99,
      category: 'dining-room',
      images: [
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1395953/pexels-photo-1395953.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 8,
      rating: 4.7,
      reviewCount: 56,
      seller: { id: 2, name: 'Rustic Woods', rating: 4.9 },
      tags: ['rustic', 'handcrafted', 'reclaimed'],
      dimensions: '72" W x 36" D x 30" H',
      material: 'Reclaimed oak wood',
      createdAt: new Date('2024-01-10').toISOString()
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      description: 'Professional ergonomic office chair with lumbar support.',
      price: 449.99,
      originalPrice: 549.99,
      category: 'office',
      images: [
        'https://images.pexels.com/photos/541518/pexels-photo-541518.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/159805/meeting-modern-room-architecture-159805.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 25,
      rating: 4.3,
      reviewCount: 134,
      seller: { id: 3, name: 'Office Solutions', rating: 4.6 },
      tags: ['ergonomic', 'office', 'adjustable'],
      dimensions: '26" W x 26" D x 40-44" H',
      material: 'Mesh back, fabric seat, aluminum base',
      createdAt: new Date('2024-01-20').toISOString()
    },
    {
      id: 4,
      name: 'Luxury King Bed Frame',
      description: 'Elegant upholstered king bed frame with tufted headboard.',
      price: 1799.99,
      originalPrice: 2199.99,
      category: 'bedroom',
      images: [
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 12,
      rating: 4.8,
      reviewCount: 78,
      seller: { id: 4, name: 'Bedroom Luxe', rating: 4.9 },
      tags: ['luxury', 'upholstered', 'king'],
      dimensions: '80" W x 84" D x 54" H',
      material: 'Velvet upholstery, solid wood frame',
      createdAt: new Date('2024-01-08').toISOString()
    },
    {
      id: 5,
      name: 'Outdoor Patio Set',
      description: 'Weather-resistant patio dining set for outdoor entertaining.',
      price: 699.99,
      originalPrice: 899.99,
      category: 'outdoor',
      images: [
        'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 18,
      rating: 4.4,
      reviewCount: 92,
      seller: { id: 5, name: 'Outdoor Living', rating: 4.7 },
      tags: ['outdoor', 'weather-resistant', 'dining'],
      dimensions: 'Table: 60" W x 38" D x 29" H',
      material: 'Aluminum frame, weather-resistant fabric',
      createdAt: new Date('2024-01-12').toISOString()
    },
    {
      id: 6,
      name: 'Storage Ottoman',
      description: 'Multi-functional storage ottoman with removable lid.',
      price: 199.99,
      originalPrice: 249.99,
      category: 'storage',
      images: [
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 30,
      rating: 4.2,
      reviewCount: 145,
      seller: { id: 6, name: 'Smart Storage', rating: 4.5 },
      tags: ['storage', 'ottoman', 'multi-functional'],
      dimensions: '24" W x 16" D x 18" H',
      material: 'Faux leather, MDF frame',
      createdAt: new Date('2024-01-18').toISOString()
    }
  ]

  const filteredProducts = computed(() => {
    let filtered = products.value.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
      const matchesPrice = product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy.value) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  })

  const featuredProducts = computed(() => {
    return products.value.filter(product => product.rating >= 4.5).slice(0, 4)
  })

  const initProducts = () => {
    products.value = mockProducts
  }

  const getProduct = (id) => {
    return products.value.find(product => product.id === parseInt(id))
  }

  const getProductsByCategory = (categorySlug) => {
    return products.value.filter(product => product.category === categorySlug)
  }

  const addProduct = async (productData) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newProduct = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString(),
        rating: 0,
        reviewCount: 0,
        inStock: true
      }
      products.value.push(newProduct)
      return { success: true, product: newProduct }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (id, productData) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...productData }
        return { success: true, product: products.value[index] }
      }
      return { success: false, error: 'Product not found' }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value.splice(index, 1)
        return { success: true }
      }
      return { success: false, error: 'Product not found' }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    categories,
    isLoading,
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    filteredProducts,
    featuredProducts,
    initProducts,
    getProduct,
    getProductsByCategory,
    addProduct,
    updateProduct,
    deleteProduct
  }
})