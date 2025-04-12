import { FigmaRequestParams, FigmaApiResponse, FigmaNode } from '../types/figma';

const FIGMA_ACCESS_TOKEN = import.meta.env.VITE_FIGMA_ACCESS_TOKEN;

/**
 * Fetches Figma file data through our proxy
 */
export async function fetchFigmaFile({ fileKey, nodeId }: FigmaRequestParams): Promise<FigmaApiResponse> {
  try {
    const url = `https://api.figma.com/v1/files/${fileKey}${nodeId ? `?node-id=${nodeId}` : ''}`;
    console.log('📤 Fetching Figma file from:', url);

    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN || ''
      }
    });
    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error response:', error);
      return { error: { status: response.status, err: error.message || 'Unknown error' } };
    }

    const data = await response.json();
    
    // Находим запрошенный фрейм
    const requestedNode = nodeId ? findNodeById(data.document, nodeId) : data.document;
    
    console.log('✨ Success response details:', {
      fileName: data.name,
      lastModified: data.lastModified,
      version: data.version,
      thumbnailUrl: data.thumbnailUrl,
      requestedFrame: requestedNode ? {
        id: requestedNode.id,
        name: requestedNode.name,
        type: requestedNode.type,
        size: requestedNode.absoluteBoundingBox ? {
          width: requestedNode.absoluteBoundingBox.width,
          height: requestedNode.absoluteBoundingBox.height
        } : null,
        childrenCount: requestedNode.children?.length || 0,
        childrenTypes: requestedNode.children?.map((child: FigmaNode) => child.type)
      } : null,
      documentStructure: {
        nodeCount: countNodes(data.document),
        topLevelNodes: data.document.children?.map((node: FigmaNode) => ({
          id: node.id,
          name: node.name,
          type: node.type
        }))
      }
    });
    
    return { file: data };
  } catch (error) {
    console.error('💥 Error fetching Figma file:', error);
    return { error: { status: 500, err: 'Failed to fetch Figma file' } };
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