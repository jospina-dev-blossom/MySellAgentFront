import type { AgentConfiguration } from '@core/domain/entities';
import { API_CONFIG } from '@infrastructure/config/api.config';

const getHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
});

export const agentApi = {
  createAgent: async (config: Omit<AgentConfiguration, 'id' | 'createdAt' | 'updatedAt'>): Promise<AgentConfiguration> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/agents`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`Error creating agent: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to create agent:', error);
      return {
        ...config,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as AgentConfiguration;
    }
  },

  getAgent: async (id: string): Promise<AgentConfiguration | null> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/agents/${id}`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Error fetching agent: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch agent:', error);
      return null;
    }
  },

  updateAgent: async (id: string, config: Partial<AgentConfiguration>): Promise<AgentConfiguration> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/agents/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`Error updating agent: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to update agent:', error);
      throw error;
    }
  },

  listAgents: async (): Promise<AgentConfiguration[]> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/agents`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error fetching agents: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      return [];
    }
  },

  validateAgent: async (config: Partial<AgentConfiguration>): Promise<{ valid: boolean; errors: string[] }> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/agents/validate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`Error validating agent: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to validate agent:', error);
      return {
        valid: true,
        errors: [],
      };
    }
  },
};
