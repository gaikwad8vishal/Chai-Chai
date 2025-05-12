// src/types/recharts.d.ts
import { ComponentType } from "react";

// Extend recharts types
declare module "recharts" {
  // Common props for XAxis and YAxis
  interface AxisProps {
    dataKey?: string;
    tick?: any;
    domain?: any[];
    [key: string]: any; // For other props
  }

  // Props for other components
  interface ResponsiveContainerProps {
    width?: string | number;
    height?: string | number;
    children?: React.ReactNode;
  }

  interface BarChartProps {
    data: any[];
    children?: React.ReactNode;
    [key: string]: any; // For other props
  }

  interface BarProps {
    dataKey: string;
    fill?: string;
    barSize?: number;
    [key: string]: any; // For other props
  }

  interface PieChartProps {
    data?: any[];
    children?: React.ReactNode;
    [key: string]: any; // For other props
  }

  interface PieProps {
    data: any[];
    dataKey: string;
    nameKey: string;
    cx?: string | number;
    cy?: string | number;
    outerRadius?: number;
    label?: boolean;
    children?: React.ReactNode;
    [key: string]: any; // For other props
  }

  interface CellProps {
    fill?: string;
    [key: string]: any; // For other props
  }

  interface TooltipProps {
    [key: string]: any; // For other props
  }

  // Declare components
  export const ResponsiveContainer: ComponentType<ResponsiveContainerProps>;
  export const BarChart: ComponentType<BarChartProps>;
  export const Bar: ComponentType<BarProps>;
  export const XAxis: ComponentType<AxisProps>;
  export const YAxis: ComponentType<AxisProps>;
  export const Tooltip: ComponentType<TooltipProps>;
  export const PieChart: ComponentType<PieChartProps>;
  export const Pie: ComponentType<PieProps>;
  export const Cell: ComponentType<CellProps>;
}