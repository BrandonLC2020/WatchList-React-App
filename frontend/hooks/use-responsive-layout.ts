import { useMemo } from 'react';
import { useWindowDimensions, Platform } from 'react-native';

/**
 * Breakpoints for responsive design.
 * These can be adjusted based on design requirements.
 */
const BREAKPOINTS = {
  mobile: 480, // Below this is considered "mobile"
  tablet: 768, // Below this is considered "tablet" (if above mobile)
  desktop: 1024, // Above this is desktop
};

interface ResponsiveLayoutConfig {
  /**
   * Base number of columns for mobile. Default is 2.
   */
  mobileColumns?: number;
  /**
   * Base number of columns for tablet. Default is 3.
   */
  tabletColumns?: number;
  /**
   * Base number of columns for desktop. Default is 4 or dynamic based on width.
   */
  desktopColumns?: number;
  /**
   * Gap between items in the grid. Default 12.
   */
  gap?: number;
  /**
   * Horizontal padding of the container. Default 20.
   */
  containerPadding?: number;
}

export function useResponsiveLayout(config: ResponsiveLayoutConfig = {}) {
  const { width } = useWindowDimensions();

  const {
    mobileColumns = 3, // Defaulting to 3 as requested in original code, but often 2 is better for mobile
    tabletColumns = 4,
    desktopColumns = 6,
    gap = 16,
    containerPadding = 32, // Left + Right padding usually
  } = config;

  const layout = useMemo(() => {
    let numColumns = mobileColumns;
    let isMobile = true;

    if (width >= BREAKPOINTS.desktop) {
      numColumns = desktopColumns;
      isMobile = false;
    } else if (width >= BREAKPOINTS.tablet) {
      numColumns = tabletColumns;
      isMobile = false;
    } else {
      // Mobile
      // If the screen is very narrow (iPhone SE), maybe stick to 2
      // If it's a large phone, 3 might work depending on content
      // For now, simple breakpoint logic
      numColumns = mobileColumns;
      isMobile = true;
    }

    // Calculate item width
    // Available width = Screen Width - Container Padding - (Gap * (Columns - 1))
    // Item Width = Available Width / Columns
    
    // Note: We need to handle the case where containerPadding is passed as total horizontal padding
    const totalGapSpace = gap * (numColumns - 1);
    const availableWidth = width - containerPadding - totalGapSpace;
    const itemWidth = availableWidth / numColumns;

    return {
      numColumns,
      itemWidth,
      isMobile,
      gap,
      width,
    };
  }, [width, mobileColumns, tabletColumns, desktopColumns, gap, containerPadding]);

  return layout;
}
