/**
 * Interface for parsed Figma URL parameters
 */
interface FigmaUrlParams {
  fileKey: string;
  nodeId?: string;
  title?: string;
}

/**
 * Error class for invalid Figma URLs
 */
export class FigmaUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FigmaUrlError';
  }
}

/**
 * Validates and parses a Figma URL to extract fileKey and nodeId
 * Supports URLs:
 * - https://www.figma.com/file/[fileKey]/[title]
 * - https://www.figma.com/proto/[fileKey]/[title]
 * - https://www.figma.com/design/[fileKey]/[title]
 * - https://www.figma.com/file/[fileKey]/[title]?node-id=[nodeId]
 * - https://www.figma.com/design/[fileKey]/[title]?node-id=[nodeId]
 * 
 * @param url Figma URL to parse
 * @returns Object containing fileKey and optional nodeId
 * @throws FigmaUrlError if URL is invalid
 */
export function parseFigmaUrl(url: string): FigmaUrlParams {
  try {
    // Remove @ symbol if present at the start
    const cleanUrl = url.startsWith('@') ? url.slice(1) : url;
    const urlObj = new URL(cleanUrl);

    // Validate that this is a Figma URL
    if (!urlObj.hostname.includes('figma.com')) {
      throw new FigmaUrlError('Not a Figma URL');
    }

    // Split the pathname to get segments
    const segments = urlObj.pathname.split('/').filter(Boolean);

    // Validate URL structure
    if (segments.length < 3 || !['file', 'proto', 'design'].includes(segments[0])) {
      throw new FigmaUrlError('Invalid Figma URL format');
    }

    // Extract fileKey
    const fileKey = segments[1];
    if (!fileKey) {
      throw new FigmaUrlError('No file key found in URL');
    }

    // Extract title if present
    const title = segments[2] || undefined;

    // Extract nodeId from query parameters if present
    // Support both formats: node-id=1-6 and node-id=1:6
    const nodeId = urlObj.searchParams.get('node-id')?.replace('-', ':') || undefined;

    return { fileKey, nodeId, title };
  } catch (error) {
    if (error instanceof FigmaUrlError) {
      throw error;
    }
    throw new FigmaUrlError('Invalid URL format');
  }
}

/**
 * Validates if a string is a valid Figma URL
 * @param url URL to validate
 * @returns boolean indicating if URL is valid
 */
export function isValidFigmaUrl(url: string): boolean {
  try {
    parseFigmaUrl(url);
    return true;
  } catch {
    return false;
  }
} 