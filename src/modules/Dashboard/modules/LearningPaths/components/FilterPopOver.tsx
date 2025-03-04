import React, { useState } from 'react';
import { IoIosFunnel } from "react-icons/io";
import * as Popover from '@radix-ui/react-popover';
import styles from '../pages/LearningPathOne/LearningPathOne.module.css'

interface FilterState {
  sortBy: 'relevance' | 'latest' | 'mostEnrolled';
  category: 'creative' | 'software' | 'hardware' | 'management' | 'all';
}

interface FilterPopoverProps {
  onFilterChange: (filters: FilterState) => void;
}

const FilterPopover = ({ onFilterChange }: FilterPopoverProps) => {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'relevance',
    category: 'all'
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="filter-btn">
          <IoIosFunnel /> Filter
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="filter-popover" sideOffset={5}>
          <div className="filter-section">
            <h3>Sort By</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${filters.sortBy === 'relevance' ? 'active' : ''}`}
                onClick={() => handleFilterChange('sortBy', 'relevance')}
              >
                Relevance
              </button>
              <button
                className={`filter-option ${filters.sortBy === 'latest' ? 'active' : ''}`}
                onClick={() => handleFilterChange('sortBy', 'latest')}
              >
                Latest
              </button>
              <button
                className={`filter-option ${filters.sortBy === 'mostEnrolled' ? 'active' : ''}`}
                onClick={() => handleFilterChange('sortBy', 'mostEnrolled')}
              >
                Most Enrolled
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              <button
                className={`filter-option ${filters.category === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('category', 'all')}
              >
                All
              </button>
              <button
                className={`filter-option ${filters.category === 'creative' ? 'active' : ''}`}
                onClick={() => handleFilterChange('category', 'creative')}
              >
                Creative
              </button>
              <button
                className={`filter-option ${filters.category === 'software' ? 'active' : ''}`}
                onClick={() => handleFilterChange('category', 'software')}
              >
                Software
              </button>
              <button
                className={`filter-option ${filters.category === 'hardware' ? 'active' : ''}`}
                onClick={() => handleFilterChange('category', 'hardware')}
              >
                Hardware
              </button>
              <button
                className={`filter-option ${filters.category === 'management' ? 'active' : ''}`}
                onClick={() => handleFilterChange('category', 'management')}
              >
                Management
              </button>
            </div>
          </div>

          <Popover.Arrow className="filter-popover-arrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterPopover;