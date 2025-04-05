import { AITheme } from "./index";

/**
 * Common interface for all modal data that operates on a color palette
 */
export interface PaletteModalData {
  colorKey: string;
  colorShades: Record<string, string>;
}

/**
 * Interface for renaming or deleting a palette (only needs the color key)
 */
export interface PaletteIdentifier {
  colorKey: string;
}

/**
 * Interface for confirmation actions that include additional data
 */
export interface ConfirmationModalData {
  action: string;
  data?: unknown;
}

/**
 * Common modal props interface shared by most modals
 */
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Props for accessibility analysis, color contrast, and color harmony modals
 */
export interface PaletteAnalysisModalProps extends BaseModalProps {
  colorKey: string;
  colorShades: Record<string, string>;
}

/**
 * Props for renaming a palette
 */
export interface RenamePaletteModalProps extends BaseModalProps {
  currentName: string;
}

/**
 * Props for deleting a palette
 */
export interface DeletePaletteModalProps extends BaseModalProps {
  onConfirm: () => void;
  paletteName: string;
}

/**
 * Props for overwrite confirmation
 */
export interface OverwriteConfirmModalProps extends BaseModalProps {
  onConfirm: () => void;
  title: string;
  description: string;
}

/**
 * Modal manager hook return type for palette modals
 */
export interface ModalState<T> {
  isOpen: boolean;
  modalData?: T;
  openModal: (data: T) => void;
  closeModal: () => void;
}

/**
 * Complete return type for usePaletteModals hook
 */
export interface PaletteModalsState {
  accessibilityModal: ModalState<PaletteModalData>;
  contrastModal: ModalState<PaletteModalData>;
  harmonyModal: ModalState<PaletteModalData>;
  renameModal: ModalState<PaletteIdentifier>;
  deleteConfirmModal: ModalState<PaletteIdentifier>;
  overwriteConfirmModal: ModalState<ConfirmationModalData>;
}
