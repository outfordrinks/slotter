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
  fills?: any[];
  strokes?: any[];
  effects?: any[];
  constraints?: {
    horizontal: string;
    vertical: string;
  };
}

export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaNode;
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