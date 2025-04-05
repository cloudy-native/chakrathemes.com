import { useCallback } from "react";
import {
  PaletteModalData,
  PaletteIdentifier,
  ConfirmationModalData,
  PaletteModalsState,
} from "@/types";
import useModalManager from "./useModalManager";

/**
 * Custom hook to manage all palette-related modals
 * Provides a standard interface for opening and closing modals with their data
 */
export const usePaletteModals = (): PaletteModalsState => {
  // Individual modal managers
  const accessibilityManager = useModalManager<PaletteModalData>();
  const contrastManager = useModalManager<PaletteModalData>();
  const harmonyManager = useModalManager<PaletteModalData>();
  const renameManager = useModalManager<PaletteIdentifier>();
  const deleteConfirmManager = useModalManager<PaletteIdentifier>();
  const overwriteConfirmManager = useModalManager<ConfirmationModalData>();

  // Helper to open accessibility modal
  const openAccessibilityModal = useCallback(
    (data: PaletteModalData) => {
      accessibilityManager.openModal(data);
    },
    [accessibilityManager]
  );

  // Helper to open contrast modal
  const openContrastModal = useCallback(
    (data: PaletteModalData) => {
      contrastManager.openModal(data);
    },
    [contrastManager]
  );

  // Helper to open harmony modal
  const openHarmonyModal = useCallback(
    (data: PaletteModalData) => {
      harmonyManager.openModal(data);
    },
    [harmonyManager]
  );

  // Helper to open rename modal
  const openRenameModal = useCallback(
    (data: { colorKey: string }) => {
      renameManager.openModal(data);
    },
    [renameManager]
  );

  // Helper to open delete confirmation modal
  const openDeleteConfirmModal = useCallback(
    (data: { colorKey: string }) => {
      deleteConfirmManager.openModal(data);
    },
    [deleteConfirmManager]
  );

  return {
    accessibilityModal: {
      isOpen: accessibilityManager.isOpen,
      modalData: accessibilityManager.modalData,
      openModal: openAccessibilityModal,
      closeModal: accessibilityManager.closeModal,
    },
    contrastModal: {
      isOpen: contrastManager.isOpen,
      modalData: contrastManager.modalData,
      openModal: openContrastModal,
      closeModal: contrastManager.closeModal,
    },
    harmonyModal: {
      isOpen: harmonyManager.isOpen,
      modalData: harmonyManager.modalData,
      openModal: openHarmonyModal,
      closeModal: harmonyManager.closeModal,
    },
    renameModal: {
      isOpen: renameManager.isOpen,
      modalData: renameManager.modalData,
      openModal: openRenameModal,
      closeModal: renameManager.closeModal,
    },
    deleteConfirmModal: {
      isOpen: deleteConfirmManager.isOpen,
      modalData: deleteConfirmManager.modalData,
      openModal: openDeleteConfirmModal,
      closeModal: deleteConfirmManager.closeModal,
    },
    overwriteConfirmModal: {
      isOpen: overwriteConfirmManager.isOpen,
      modalData: overwriteConfirmManager.modalData,
      openModal: overwriteConfirmManager.openModal,
      closeModal: overwriteConfirmManager.closeModal,
    },
  };
};

export default usePaletteModals;
