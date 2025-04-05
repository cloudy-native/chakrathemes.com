/**
 * Google Analytics & Ads Tracking Utilities
 *
 * This module provides functions for tracking various events and conversions
 * using Google Analytics (GA4) and Google Ads.
 */

// Check if window and gtag exist (prevents SSR errors)
const isGtagDefined = () => {
  return typeof window !== "undefined" && typeof window.gtag !== "undefined";
};

// Define event categories
export enum EventCategory {
  ENGAGEMENT = "engagement",
  THEME = "theme",
  COLOR = "color",
  EDITOR = "editor",
  CONVERSION = "conversion",
  TYPOGRAPHY = "typography",
}

/**
 * Track page view (generally handled automatically by gatsby-plugin-google-gtag)
 * Use this only if you need to manually track a page view
 */
export const trackPageView = (path: string, title?: string) => {
  if (isGtagDefined()) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track general events with category, action, and optional label/value
 */
export const trackEvent = (
  category: EventCategory,
  action: string,
  label?: string,
  value?: number
) => {
  if (isGtagDefined()) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track a theme download (primary conversion)
 */
export const trackThemeDownload = (themeType: string) => {
  if (isGtagDefined()) {
    // Track in Google Analytics
    window.gtag("event", "download_theme", {
      event_category: EventCategory.CONVERSION,
      event_label: themeType,
    });

    // Track in Google Ads (if conversion ID and label exist)
    const conversionId = process.env.GOOGLE_ADS_CONVERSION_ID;
    const conversionLabel = process.env.GOOGLE_ADS_CONVERSION_LABEL;

    if (conversionId && conversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${conversionId}/${conversionLabel}`,
        value: 1.0,
        currency: "USD",
      });
    }
  }
};

/**
 * Track feature usage
 */
export const trackFeatureUsage = (feature: string, action: string) => {
  trackEvent(EventCategory.ENGAGEMENT, action, feature);
};

/**
 * Track color palette creation
 */
export const trackPaletteCreation = (method: string, paletteCount: number) => {
  trackEvent(EventCategory.COLOR, "create_palette", method, paletteCount);
};

/**
 * Track color-related actions in a consistent way
 */
export const trackColorAction = (action: string, colorName: string) => {
  trackEvent(EventCategory.COLOR, action, colorName);
};

/**
 * Track palette actions with consistent naming
 */
export const trackPaletteAction = (
  action: "add" | "update" | "delete" | "rename" | "overwrite",
  paletteName: string,
  details?: string
) => {
  const actionMap = {
    add: "add_palette",
    update: "update_palette",
    delete: "delete_palette",
    rename: "rename_palette",
    overwrite: "overwrite_palette",
  };

  const label = details ? `${paletteName}: ${details}` : paletteName;
  trackEvent(EventCategory.COLOR, actionMap[action], label);
};

/**
 * Track a tab change in the editor
 */
export const trackTabChange = (tabName: string) => {
  trackEvent(EventCategory.EDITOR, "tab_change", tabName);
};

/**
 * Track external link clicks
 */
export const trackExternalLinkClick = (destination: string) => {
  trackEvent(EventCategory.ENGAGEMENT, "external_link_click", destination);
};

// Add to Window for debugging in development
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  (
    window as Window & {
      analyticsDebug?: {
        trackEvent: typeof trackEvent;
        trackPageView: typeof trackPageView;
        trackThemeDownload: typeof trackThemeDownload;
        trackFeatureUsage: typeof trackFeatureUsage;
        trackPaletteCreation: typeof trackPaletteCreation;
        trackTabChange: typeof trackTabChange;
        trackExternalLinkClick: typeof trackExternalLinkClick;
      };
    }
  ).analyticsDebug = {
    trackEvent,
    trackPageView,
    trackThemeDownload,
    trackFeatureUsage,
    trackPaletteCreation,
    trackTabChange,
    trackExternalLinkClick,
  };
}

// Type definition for window.gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
  }
}
