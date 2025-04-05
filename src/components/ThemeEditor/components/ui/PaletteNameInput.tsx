import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  Tooltip,
  useTheme,
  useColorModeValue,
} from "@chakra-ui/react";
import { useThemeContext } from "@/context/ThemeContext";
import { formatPaletteName } from "@/utils/paletteUtils";

export interface PaletteNameInputProps {
  /**
   * Label for the form input
   */
  label?: string;

  /**
   * Placeholder text for the input
   */
  placeholder?: string;

  /**
   * Initial value for the palette name
   */
  initialValue?: string;

  /**
   * Description text to display under the input
   */
  helperText?: string;

  /**
   * Button text (default: "Create")
   */
  buttonText?: string;

  /**
   * Whether the input is required
   */
  isRequired?: boolean;

  /**
   * Function called when the form is submitted and validation passes
   */
  onSubmit: (paletteName: string) => void;

  /**
   * Function called when input value changes
   */
  onChange?: (value: string) => void;

  /**
   * Whether to show the submit button
   */
  showButton?: boolean;

  /**
   * Whether to disable the submit button regardless of validation
   */
  isDisabled?: boolean;

  /**
   * Size of the input and button
   */
  size?: "xs" | "sm" | "md" | "lg";
}

const PaletteNameInput: React.FC<PaletteNameInputProps> = ({
  label = "Palette Name",
  placeholder = "E.g., primary, secondary, accent",
  initialValue = "",
  helperText,
  buttonText = "Create",
  isRequired = true,
  onSubmit,
  onChange,
  showButton = false,
  isDisabled = false,
  size = "md",
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const { themeValues } = useThemeContext();
  const theme = useTheme();

  const errorColor = useColorModeValue("red.500", "red.300");
  const borderColor = useColorModeValue(
    isNameAvailable ? theme.colors.gray[200] : errorColor,
    isNameAvailable ? theme.colors.whiteAlpha[300] : errorColor
  );

  // Validate the palette name in real-time
  useEffect(() => {
    if (!value.trim()) {
      setError(isRequired ? "Palette name is required" : null);
      setIsNameAvailable(true);
      return;
    }

    const formattedName = formatPaletteName(value);
    const existingColors = themeValues.colors || {};

    if (existingColors[formattedName]) {
      setError(`Palette "${formattedName}" already exists`);
      setIsNameAvailable(false);
    } else {
      setError(null);
      setIsNameAvailable(true);
    }

    if (onChange) {
      onChange(value);
    }
  }, [value, isRequired, themeValues.colors, onChange]);

  // Focus the input when mounted
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!value.trim()) {
      setError(isRequired ? "Palette name is required" : null);
      return;
    }

    if (!isNameAvailable) {
      return;
    }

    onSubmit(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isButtonDisabled = isDisabled || !value.trim() || !isNameAvailable;

  return (
    <FormControl isRequired={isRequired}>
      {label && <FormLabel fontSize={size === "sm" ? "sm" : "md"}>{label}</FormLabel>}
      <InputGroup size={size}>
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          borderColor={value ? borderColor : undefined}
          autoComplete="off"
          data-cy="palette-name-input"
        />
        {showButton && (
          <InputRightElement width="auto" mr={1}>
            <Tooltip label={!isNameAvailable ? error : null} isDisabled={isNameAvailable} hasArrow>
              <Button
                size={size === "lg" ? "md" : size === "md" ? "sm" : "xs"}
                colorScheme={isNameAvailable ? "blue" : "gray"}
                onClick={handleSubmit}
                isDisabled={isButtonDisabled}
                opacity={isButtonDisabled ? 0.6 : 1}
                data-cy="palette-name-submit"
              >
                {buttonText}
              </Button>
            </Tooltip>
          </InputRightElement>
        )}
      </InputGroup>
      {(error || helperText) && (
        <FormHelperText color={error ? errorColor : undefined}>
          {error || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PaletteNameInput;
