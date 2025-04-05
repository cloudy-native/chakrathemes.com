import { useCallback, useState } from 'react';

/**
 * Custom hook for managing modal state with type-safe data
 * @param initialData - Optional initial data to associate with the modal
 * @returns Object containing modal state and handlers
 */
export function useModalManager<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<T | undefined>(undefined);

  // Open modal with optional data
  const openModal = useCallback((data?: T) => {
    setModalData(data);
    setIsOpen(true);
  }, []);

  // Close modal and reset data
  const closeModal = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(false);
  }, []);

  // Update modal data without changing open state
  const updateModalData = useCallback((data: T) => {
    setModalData(data);
  }, []);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    updateModalData
  };
}

export default useModalManager;