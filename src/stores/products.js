import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const categories = ref([
    { id: 1, name: 'Ruang Tamu', slug: 'living-room' },
    { id: 2, name: 'Kamar Tidur', slug: 'bedroom' },
    { id: 3, name: 'Ruang Makan', slug: 'dining-room' },
    { id: 4, name: 'Kantor', slug: 'office' },
    { id: 5, name: 'Outdoor', slug: 'outdoor' },
    { id: 6, name: 'Penyimpanan', slug: 'storage' }
  ])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const priceRange = ref([0, 50000000])
  const sortBy = ref('name')

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'Sofa Sectional Modern',
      description: 'Sofa sectional yang nyaman dan bergaya, sempurna untuk ruang tamu modern.',
      price: 19499900,
      originalPrice: 23999900,
      category: 'living-room',
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 15,
      rating: 4.5,
      reviewCount: 89,
      tags: ['modern', 'nyaman', 'sectional'],
      dimensions: '274cm L x 91cm D x 81cm T',
      material: 'Pelapis kain, rangka kayu keras',
      createdAt: new Date('2024-01-15').toISOString()
    },
    {
      id: 2,
      name: 'Meja Makan Rustic',
      description: 'Meja makan rustic buatan tangan dari kayu daur ulang.',
      price: 13499900,
      originalPrice: 14999900,
      category: 'dining-room',
      images: [
        'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1395953/pexels-photo-1395953.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 8,
      rating: 4.7,
      reviewCount: 56,
      tags: ['rustic', 'buatan-tangan', 'daur-ulang'],
      dimensions: '183cm L x 91cm D x 76cm T',
      material: 'Kayu oak daur ulang',
      createdAt: new Date('2024-01-10').toISOString()
    },
    {
      id: 3,
      name: 'Kursi Kantor Ergonomis',
      description: 'Kursi kantor ergonomis profesional dengan penyangga punggung.',
      price: 6749900,
      originalPrice: 8249900,
      category: 'office',
      images: [
        'https://images.pexels.com/photos/541518/pexels-photo-541518.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/159805/meeting-modern-room-architecture-159805.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 25,
      rating: 4.3,
      reviewCount: 134,
      tags: ['ergonomis', 'kantor', 'dapat-disesuaikan'],
      dimensions: '66cm L x 66cm D x 102-112cm T',
      material: 'Punggung mesh, dudukan kain, dasar aluminium',
      createdAt: new Date('2024-01-20').toISOString()
    },
    {
      id: 4,
      name: 'Rangka Tempat Tidur King Mewah',
      description: 'Rangka tempat tidur king berlapis elegan dengan kepala tempat tidur berlapis.',
      price: 26999900,
      originalPrice: 32999900,
      category: 'bedroom',
      images: [
        'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 12,
      rating: 4.8,
      reviewCount: 78,
      tags: ['mewah', 'berlapis', 'king'],
      dimensions: '203cm L x 213cm D x 137cm T',
      material: 'Pelapis beludru, rangka kayu solid',
      createdAt: new Date('2024-01-08').toISOString()
    },
    {
      id: 5,
      name: 'Set Patio Outdoor',
      description: 'Set makan patio tahan cuaca untuk hiburan luar ruangan.',
      price: 10499900,
      originalPrice: 13499900,
      category: 'outdoor',
      images: [
        'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1619569/pexels-photo-1619569.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 18,
      rating: 4.4,
      reviewCount: 92,
      tags: ['outdoor', 'tahan-cuaca', 'makan'],
      dimensions: 'Meja: 152cm L x 97cm D x 74cm T',
      material: 'Rangka aluminium, kain tahan cuaca',
      createdAt: new Date('2024-01-12').toISOString()
    },
    {
      id: 6,
      name: 'Ottoman Penyimpanan',
      description: 'Ottoman penyimpanan multifungsi dengan tutup yang dapat dilepas.',
      price: 2999900,
      originalPrice: 3749900,
      category: 'storage',
      images: [
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      inStock: true,
      stock: 30,
      rating: 4.2,
      reviewCount: 145,
      tags: ['penyimpanan', 'ottoman', 'multifungsi'],
      dimensions: '61cm L x 41cm D x 46cm T',
      material: 'Kulit sintetis, rangka MDF',
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