import axios, { AxiosError, AxiosResponse } from "axios";
import { AITheme } from "@/types";

// API base URL configuration
const API_BASE_URL = "https://api.chakrathemes.com";

// Type for the API response from the theme generator
interface ThemeGeneratorResponse {
  themes: AITheme[];
}

// Type for the error response
interface APIErrorResponse {
  error?: string;
  message?: string;
  statusCode?: number;
}

/**
 * Configuration for API requests
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

/**
 * Parse API error response to get a meaningful error message
 *
 * @param error Axios error object
 * @returns Formatted error message
 */
export const parseApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<APIErrorResponse>;

    // Check if response data contains error message
    if (axiosError.response?.data) {
      const errorData = axiosError.response.data;
      return (
        errorData.message ||
        errorData.error ||
        `Error ${axiosError.response.status}: ${axiosError.response.statusText}`
      );
    }

    // Network error or timeout
    if (axiosError.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  // Fallback for non-Axios errors
  return error instanceof Error ? error.message : "An unknown error occurred";
};

/**
 * API service for theme operations
 */
export const themeApi = {
  /**
   * Generate theme suggestions based on a text prompt
   *
   * @param prompt User input describing the desired theme
   * @returns Promise with an array of theme suggestions
   */
  generateTheme: async (prompt: string): Promise<AITheme[]> => {
    try {
      const response: AxiosResponse<ThemeGeneratorResponse> = await apiClient.post(
        "/generate-theme",
        {
          prompt,
        }
      );

      // Validate the response format
      if (!response.data || !Array.isArray(response.data.themes)) {
        throw new Error("Invalid response format from the API");
      }

      return response.data.themes;
    } catch (error) {
      // Convert error to a readable message and re-throw
      const errorMessage = parseApiError(error);
      throw new Error(errorMessage);
    }
  },

  /**
   * Get details about API rate limits and usage
   * This is a placeholder function that could be implemented if the API
   * supports checking rate limits or quotas
   */
  getApiStatus: async (): Promise<{ remaining: number; limit: number; reset: Date }> => {
    try {
      const response = await apiClient.get("/api-status");
      return response.data;
    } catch (error) {
      throw new Error(parseApiError(error));
    }
  },
};

export default themeApi;
