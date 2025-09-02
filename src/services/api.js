import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const api = {
  // Brand-Creator Matching
  matchCreators: async (brandBrief) => {
    const response = await apiClient.post('/match', brandBrief);
    return response.data;
  },

  // Billing APIs
  submitBrandBilling: async (billingData) => {
    const response = await apiClient.post('/billing/brand', billingData);
    return response.data;
  },

  submitCreatorPayout: async (payoutData) => {
    const response = await apiClient.post('/billing/creator', payoutData);
    return response.data;
  },

  // Analytics APIs
  analytics: {
    getOverview: async () => {
      const response = await apiClient.get('/analytics/overview');
      return response.data;
    },

    getCreators: async (filters = {}) => {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await apiClient.get(`/analytics/creators?${params}`);
      return response.data;
    },

    getBrands: async (filters = {}) => {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await apiClient.get(`/analytics/brands?${params}`);
      return response.data;
    },

    getTrending: async () => {
      const response = await apiClient.get('/analytics/trending');
      return response.data;
    }
  },

  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default api;
