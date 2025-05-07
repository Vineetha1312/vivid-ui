import React from 'react';
import { FiSun, FiMoon, FiCloud, FiDroplet } from 'react-icons/fi';
import { FiStar } from 'react-icons/fi';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

// Icon for 'light' theme
export const SunIcon: React.FC<IconProps> = (props) => (
  <FiSun {...props} />
);

// Icon for 'light-alt' theme
export const SparklesIcon: React.FC<IconProps> = (props) => (
  <FiStar {...props} />
);

// Icon for 'dark' theme
export const MoonIcon: React.FC<IconProps> = (props) => (
  <FiMoon {...props} />
);

// Icon for 'dark-alt' theme
export const LeafIcon: React.FC<IconProps> = (props) => (
  <FiCloud {...props} />
);

// Icon for 'dark-alt-2' theme (Sunflower/Yellow theme)
export const SunflowerIcon: React.FC<IconProps> = (props) => (
  <FiDroplet {...props} />
);
