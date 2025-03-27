import { useCallback } from "react";
import {
  EventCategory,
  trackEvent,
  trackFeatureUsage,
  trackTabChange,
  trackThemeDownload,
} from "@/utils/analytics";
import { TrackingEvent } from "@/types";

/**
 * Custom hook for centralized analytics tracking
 */
export const useAnalytics = () => {
  // Track a general event
  const trackAction = useCallback((event: TrackingEvent) => {
    trackEvent(event.category as EventCategory, event.action, event.label, event.value);
  }, []);

  // Track a specific feature usage
  const trackFeature = useCallback((feature: string, action: string) => {
    trackFeatureUsage(feature, action);
  }, []);

  // Track tab changes
  const trackTab = useCallback((tabName: string) => {
    trackTabChange(tabName);
  }, []);

  // Track theme downloads
  const trackDownload = useCallback((themeType: string) => {
    trackThemeDownload(themeType);
  }, []);

  // Track color palette actions
  const trackColorAction = useCallback((action: string, label?: string, value?: number) => {
    trackEvent(EventCategory.COLOR, action, label, value);
  }, []);

  // Track theme actions
  const trackThemeAction = useCallback((action: string, label?: string, value?: number) => {
    trackEvent(EventCategory.THEME, action, label, value);
  }, []);

  return {
    trackAction,
    trackFeature,
    trackTab,
    trackDownload,
    trackColorAction,
    trackThemeAction,
  };
};

export default useAnalytics;
