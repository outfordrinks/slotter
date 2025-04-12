import { FigmaRequestParams, FigmaApiResponse, FigmaNode } from '../types/figma';

const FIGMA_ACCESS_TOKEN = import.meta.env.VITE_FIGMA_ACCESS_TOKEN;
const FIGMA_API_BASE = 'https://api.figma.com/v1';

interface ImageParams {
  fileKey: string;
  nodeIds: string[];
  format?: 'jpg' | 'png' | 'svg' | 'pdf';
  scale?: number;
}

interface VectorParams {
  fileKey: string;
  nodeIds: string[];
}

/**
 * Fetches Figma file data
 */
export async function fetchFigmaFile({ fileKey, nodeId }: FigmaRequestParams): Promise<FigmaApiResponse> {
  try {
    const url = `${FIGMA_API_BASE}/files/${fileKey}${nodeId ? `?node-id=${nodeId}` : ''}`;
    console.log('📤 Fetching Figma file from:', url);

    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN
      }
    });
    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error response:', error);
      return { error: { status: response.status, err: error.message || 'Unknown error' } };
    }

    const data = await response.json();
    const requestedNode = nodeId ? findNodeById(data.document, nodeId) : data.document;
    
    // Collect all nodes with images
    const imageNodes: string[] = [];
    const vectorNodes: string[] = [];
    collectImageNodes(requestedNode || data.document, imageNodes, vectorNodes);
    
    // Fetch image URLs if needed
    let imageUrls: Record<string, string> = {};
    if (imageNodes.length > 0) {
      console.log('🖼️ Found image nodes:', imageNodes)
      const urls = await fetchImageUrls({ fileKey, nodeIds: imageNodes });
      console.log('🔗 Fetched image URLs:', urls)
      imageUrls = urls;
    }
    
    // Fetch vector URLs if needed
    const vectorUrls = vectorNodes.length > 0 ? await fetchVectorUrls({ fileKey, nodeIds: vectorNodes }) : {};
    
    // Add URLs to the response
    data.imageUrls = { ...imageUrls, ...vectorUrls };
    
    console.log('✨ Success response details:', {
      fileName: data.name,
      lastModified: data.lastModified,
      version: data.version,
      thumbnailUrl: data.thumbnailUrl,
      imageNodesCount: imageNodes.length,
      vectorNodesCount: vectorNodes.length
    });
    
    return { file: data };
  } catch (error) {
    console.error('💥 Error fetching Figma file:', error);
    return { error: { status: 500, err: 'Failed to fetch Figma file' } };
  }
}

/**
 * Recursively collects nodes with image fills and vector nodes
 */
function collectImageNodes(node: FigmaNode, imageNodes: string[], vectorNodes: string[]) {
  // Check for image fills
  if (node.fills?.some(fill => fill.type === 'IMAGE')) {
    imageNodes.push(node.id);
  }
  
  // Check for vector types
  if (['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE', 'STAR'].includes(node.type)) {
    vectorNodes.push(node.id);
  }
  
  // Recursively check children
  if (node.children) {
    node.children.forEach(child => collectImageNodes(child, imageNodes, vectorNodes));
  }
}

/**
 * Fetches image URLs for nodes with image fills
 */
export async function fetchImageUrls({ fileKey, nodeIds, format = 'png', scale = 2 }: ImageParams): Promise<Record<string, string>> {
  try {
    const url = `${FIGMA_API_BASE}/images/${fileKey}?ids=${nodeIds.join(',')}&format=${format}&scale=${scale}`;
    console.log('📸 Fetching image URLs for nodes:', nodeIds);

    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN
      }
    });

    if (!response.ok) {
      console.error('❌ Error fetching image URLs:', response.status);
      return {};
    }

    const data = await response.json();
    console.log('🖼️ Received image URLs:', data.images);
    return data.images;
  } catch (error) {
    console.error('💥 Error fetching image URLs:', error);
    return {};
  }
}

/**
 * Fetches vector URLs for vector nodes
 */
export async function fetchVectorUrls({ fileKey, nodeIds }: VectorParams): Promise<Record<string, string>> {
  try {
    const url = `${FIGMA_API_BASE}/images/${fileKey}?ids=${nodeIds.join(',')}&format=svg`;
    console.log('🎨 Fetching vector URLs for nodes:', nodeIds);

    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN
      }
    });

    if (!response.ok) {
      console.error('❌ Error fetching vector URLs:', response.status);
      return {};
    }

    const data = await response.json();
    console.log('✨ Received vector URLs:', data.images);
    return data.images;
  } catch (error) {
    console.error('💥 Error fetching vector URLs:', error);
    return {};
  }
}

/**
 * Counts total number of nodes in the document
 */
function countNodes(node: FigmaNode): number {
  let count = 1; // Count current node
  if (node.children) {
    count += node.children.reduce((acc: number, child: FigmaNode) => acc + countNodes(child), 0);
  }
  return count;
}

/**
 * Finds a node by its ID in the document tree
 */
function findNodeById(node: FigmaNode, id: string): FigmaNode | null {
  if (node.id === id) {
    return node;
  }
  
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  
  return null;
} 