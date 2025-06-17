import client from './client'

// Public routes
export const readAllReviews = async () => {
    return await client.get('/reviews')
}

export const readReviewsByProductId = async (product_id) => {
    return await client.get(`/reviews/product/${product_id}`)
}

export const readReviewById = async (id) => {
    return await client.get(`/reviews/${id}`)
}

// Authenticated user routes
export const readMyReviews = async () => {
    return await client.get('/reviews/me/all')
}

export const readMyReviewByProduct = async (product_id) => {
    return await client.get(`/reviews/me/${product_id}`)
}

export const createReview = async (product_id, comment, rating) => {
    return await client.post('/reviews', {product_id, comment, rating})
}

export const updateMyReview = async (product_id, data) => {
    return await client.patch(`/reviews/me/${product_id}`, data)
}

export const deleteMyReview = async (product_id) => {
    return await client.delete(`/reviews/me/${product_id}`)
}

// Admin-only route
export const deleteReviewById = async (id) => {
    return await client.delete(`/reviews/${id}`)
}
