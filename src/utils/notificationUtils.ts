import { ToastId } from "@chakra-ui/react";

export type ToastStatus = "info" | "warning" | "success" | "error" | "loading";

/**
 * Centralized notification utilities for consistent toast messaging
 *
 * @param toast - Chakra toast function from useToast hook
 * @param title - Toast title
 * @param status - Toast status (info, warning, success, error, loading)
 * @param description - Optional description text
 * @param duration - Duration in ms (default: success/info=2000, error/warning=3000)
 * @returns The toast ID
 */
export const showToast = (
  toast: any,
  title: string,
  status: ToastStatus,
  description?: string,
  duration?: number
): ToastId => {
  // Use appropriate default durations based on status
  const defaultDuration = status === "error" || status === "warning" ? 3000 : 2000;

  return toast({
    title,
    description,
    status,
    duration: duration ?? defaultDuration,
    isClosable: true,
  });
};

/**
 * Show a success toast notification
 */
export const showSuccess = (
  toast: any,
  title: string,
  description?: string,
  duration?: number
): ToastId => {
  return showToast(toast, title, "success", description, duration);
};

/**
 * Show an error toast notification
 */
export const showError = (
  toast: any,
  title: string,
  description?: string,
  duration?: number
): ToastId => {
  return showToast(toast, title, "error", description, duration ?? 3000);
};

/**
 * Show a warning toast notification
 */
export const showWarning = (
  toast: any,
  title: string,
  description?: string,
  duration?: number
): ToastId => {
  return showToast(toast, title, "warning", description, duration ?? 3000);
};

/**
 * Show an info toast notification
 */
export const showInfo = (
  toast: any,
  title: string,
  description?: string,
  duration?: number
): ToastId => {
  return showToast(toast, title, "info", description, duration);
};

/**
 * Show a loading toast notification
 */
export const showLoading = (
  toast: any,
  title: string,
  description?: string,
  duration?: number
): ToastId => {
  return showToast(toast, title, "loading", description, duration ?? 5000);
};

/**
 * Update a toast notification (e.g., change loading to success/error)
 */
export const updateToast = (
  toast: any,
  id: ToastId,
  title: string,
  status: ToastStatus,
  description?: string,
  duration?: number
): void => {
  toast.update(id, {
    title,
    description,
    status,
    duration: duration ?? (status === "error" || status === "warning" ? 3000 : 2000),
    isClosable: true,
  });
};
