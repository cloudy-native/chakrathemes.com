import React from 'react';
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ThemeValues } from '../hooks/useColorManagement';

interface BorderRadiusTabProps {
  themeValues: ThemeValues;
  handleRadiiChange: (radiusKey: string, value: string) => void;
}

export const BorderRadiusTab: React.FC<BorderRadiusTabProps> = ({
  themeValues,
  handleRadiiChange,
}) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {Object.entries(themeValues.radii || {}).map(([radiusKey, radiusValue]) => (
        <FormControl key={radiusKey}>
          <FormLabel>{radiusKey}</FormLabel>
          <Input
            value={radiusValue as string}
            onChange={(e) => handleRadiiChange(radiusKey, e.target.value)}
          />
        </FormControl>
      ))}
    </SimpleGrid>
  );
};

export default BorderRadiusTab;