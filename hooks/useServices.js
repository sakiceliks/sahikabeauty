import { useState, useEffect } from 'react';

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      if (params.category) searchParams.append('category', params.category);
      if (params.search) searchParams.append('search', params.search);

      const url = `/api/services${searchParams.toString() ? `?${searchParams}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch services');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const getServiceById = async (id) => {
    try {
      const response = await fetch(`/api/services/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to fetch service');
      }
    } catch (err) {
      console.error('Error fetching service:', err);
      throw err;
    }
  };

  const createService = async (serviceData) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Refresh services list
        await fetchServices();
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to create service');
      }
    } catch (err) {
      console.error('Error creating service:', err);
      throw err;
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Refresh services list
        await fetchServices();
        return data.data;
      } else {
        throw new Error(data.error || 'Failed to update service');
      }
    } catch (err) {
      console.error('Error updating service:', err);
      throw err;
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Refresh services list
        await fetchServices();
        return true;
      } else {
        throw new Error(data.error || 'Failed to delete service');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    fetchServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices
  };
};