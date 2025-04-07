export interface ColorShadeType {
  [key: string]: string;
}

export interface PaletteType {
  colorKey: string;
  colorShades: ColorShadeType;
}

export interface ColorContrastPanelProps {
  mode: "light" | "dark";
  colorKey: string;
  bgShade: string;
  textKey: string;
  textShade: string;
  onBgShadeChange: (shade: string) => void;
  onTextShadeChange: (shade: string) => void;
  disabled?: boolean;
  autoSuggested?: boolean;
}

export interface WCAGComplianceLevel {
  AA: boolean;
  AALarge: boolean;
  AAA: boolean;
}
