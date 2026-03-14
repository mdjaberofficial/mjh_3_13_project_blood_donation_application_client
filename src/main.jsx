import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import router from './router/router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HelmetProvider } from 'react-helmet-async';

// Initialize AOS right above the queryClient setup:
AOS.init();


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
       <AuthProvider>
          <QueryClientProvider client={queryClient}>
             <RouterProvider router={router} />
          </QueryClientProvider>
       </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)