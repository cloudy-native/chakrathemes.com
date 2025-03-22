import React from 'react';
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ThemeValues } from '../hooks/useColorManagement';

interface SpacingTabProps {
  themeValues: ThemeValues;
  handleSpacingChange: (spaceKey: string, value: string) => void;
}

export const SpacingTab: React.FC<SpacingTabProps> = ({
  themeValues,
  handleSpacingChange,
}) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {Object.entries(themeValues.space || {}).map(([spaceKey, spaceValue]) => (
        <FormControl key={spaceKey}>
          <FormLabel>{spaceKey}</FormLabel>
          <Input
            value={spaceValue as string}
            onChange={(e) => handleSpacingChange(spaceKey, e.target.value)}
          />
        </FormControl>
      ))}
    </SimpleGrid>
  );
};

export default SpacingTab;