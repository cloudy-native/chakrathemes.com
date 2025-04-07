/**
 * Generates TypeScript code for a color mode value pair
 */
export function generateColorModeCode(
  bgColorKey: string,
  bgShadeLight: string,
  bgShadeDark: string,
  textColorKey: string,
  textShadeLight: string,
  textShadeDark: string
): string {
  const bgCode = `const bg = useColorModeValue("${bgColorKey}.${bgShadeLight}", "${bgColorKey}.${bgShadeDark}");`;
  const textCode = `const textColor = useColorModeValue("${textColorKey}.${textShadeLight}", "${textColorKey}.${textShadeDark}");`;
  return `${bgCode}\n${textCode}`;
}

/**
 * Generates TypeScript code for just a background color
 */
export function generateBackgroundColorCode(
  colorKey: string,
  shadeLight: string,
  shadeDark: string
): string {
  return `useColorModeValue("${colorKey}.${shadeLight}", "${colorKey}.${shadeDark}")`;
}
