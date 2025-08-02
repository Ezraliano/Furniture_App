import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  const isInWishlist = (productId) => {
    return items.value.some(item => item.id === productId)
  }

  const addItem = (product) => {
    if (!isInWishlist(product.id)) {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        addedAt: new Date().toISOString()
      })
      saveWishlist()
    }
  }

  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
      saveWishlist()
    }
  }

  const toggleItem = (product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const clearWishlist = () => {
    items.value = []
    saveWishlist()
  }

  const saveWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify(items.value))
  }

  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      items.value = JSON.parse(savedWishlist)
    }
  }

  return {
    items,
    isInWishlist,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    loadWishlist
  }
})