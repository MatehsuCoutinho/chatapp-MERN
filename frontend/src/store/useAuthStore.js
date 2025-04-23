import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingin: false,
    isUpdantingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const resp = axiosInstance.get('/auth/check')

            set({ authUser: resp.data })
        } catch (error) {
            console.log('Error in checkAuth', error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    }
}))