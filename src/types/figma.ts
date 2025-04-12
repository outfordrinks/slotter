/**
 * Types for Figma API responses and requests
 */

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  characters?: string;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    textAlignHorizontal?: string;
    textAlignVertical?: string;
    letterSpacing?: number;
    lineHeightPx?: number;
    fills?: any[];
  };
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fills?: Array<{
    type: string;
    color?: {
      r: number;
      g: number;
      b: number;
      a?: number;
    };
    imageRef?: string;
  }>;
  strokes?: any[];
  effects?: any[];
  constraints?: {
    horizontal: string;
    vertical: string;
  };
  // Auto-layout properties
  layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE';
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  itemSpacing?: number;
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
}

export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaNode;
  imageUrls?: Record<string, string>;
}

export interface FigmaError {
  status: number;
  err: string;
}

export interface FigmaApiResponse {
  error?: FigmaError;
  file?: FigmaFile;
}

export interface FigmaRequestParams {
  fileKey: string;
  nodeId?: string;
}

/**
 * Internal application types for processed Figma data
 */

export type NodeType = 'text' | 'image' | 'frame' | 'group';

export interface BaseNode {
  id: string;
  name: string;
  type: NodeType;
  x: number;
  y: number;
  width: number;
  height: number;
  children?: BaseNode[];
  parentId?: string;
}

export interface TextNode extends BaseNode {
  type: 'text';
  content: string;
  style: {
    font: string;
    size: number;
    weight: number;
    color: string;
    align: {
      horizontal: 'left' | 'center' | 'right';
      vertical: 'top' | 'center' | 'bottom';
    };
    letterSpacing?: number;
    lineHeight?: number;
  };
  editable: boolean;
}

export interface ImageNode extends BaseNode {
  type: 'image';
  src: string;
  alt?: string;
  scale: {
    x: number;
    y: number;
  };
  editable: boolean;
}

export interface FrameNode extends BaseNode {
  type: 'frame';
  layout?: {
    type: 'auto' | 'none';
    direction?: 'horizontal' | 'vertical';
    padding?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    spacing?: number;
    align?: {
      main: 'start' | 'center' | 'end' | 'space-between';
      cross: 'start' | 'center' | 'end' | 'stretch';
    };
  };
}

export interface GroupNode extends BaseNode {
  type: 'group';
} 