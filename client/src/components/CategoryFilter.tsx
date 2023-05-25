import {
  Box,
  CloseButton,
  Flex,
  MultiSelect,
  MultiSelectValueProps,
  SelectItemProps,
  rem,
} from '@mantine/core';
import { forwardRef, useState } from 'react';
import { Product } from '../contexts/ProductContext';
import { categoryData } from './CategoryData';

function Value({
  label,
  onRemove,
  ...others
}: MultiSelectValueProps & { value: string }) {
  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        cursor: 'default',
        alignItems: 'center',
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        border: `${rem(1)} solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors.gray[4]
        }`,
        paddingLeft: theme.spacing.xs,
        borderRadius: theme.radius.sm,
      })}
      {...others}
    >
      <Box sx={{ lineHeight: 1, fontSize: rem(12) }} mr={10}>
        {label}
      </Box>
      <CloseButton
        onMouseDown={onRemove}
        variant="transparent"
        size={22}
        iconSize={14}
        tabIndex={-1}
      />
    </Box>
  );
}

const Item = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ label, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Flex align="center">
          <div>{label}</div>
        </Flex>
      </div>
    );
  },
);

interface CategoryFilterProps {
  products: Product[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  setSelectedCategories,
}) => {
  const [selectedCategories, _setSelectedCategories] = useState<string[]>([]);

  const handleSelect = (values: string[]) => {
    _setSelectedCategories(values);
    setSelectedCategories(values);
  };

  return (
    <div>
      <MultiSelect
        data={categoryData}
        valueComponent={Value}
        itemComponent={Item}
        searchable
        value={selectedCategories}
        onChange={handleSelect}
        placeholder="Filter by category"
      />
    </div>
  );
};

export default CategoryFilter;
