import { 
  FigmaNode,
  BaseNode,
  TextNode,
  ImageNode,
  FrameNode,
  GroupNode
} from '../types/figma';

interface TransformContext {
  imageUrls?: Record<string, string>;
}

/**
 * Transforms Figma node coordinates into our internal format
 */
function transformPosition(node: FigmaNode): Pick<BaseNode, 'x' | 'y' | 'width' | 'height'> {
  const box = node.absoluteBoundingBox;
  if (!box) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  
  return {
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height
  };
}

/**
 * Transforms a Figma text node into our internal TextNode format
 */
function transformTextNode(node: FigmaNode): TextNode {
  const position = transformPosition(node);
  const style = node.style || {};
  
  // Extract text color from fills
  let color = '#000000';
  if (node.fills && node.fills.length > 0) {
    const solidFill = node.fills.find(fill => fill.type === 'SOLID');
    if (solidFill) {
      const { r = 0, g = 0, b = 0 } = solidFill.color || {};
      color = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
    }
  }
  
  return {
    id: node.id,
    name: node.name,
    type: 'text',
    ...position,
    content: node.characters || '',
    style: {
      font: style.fontFamily || 'Inter',
      size: style.fontSize || 16,
      weight: style.fontWeight || 400,
      color,
      align: {
        horizontal: (style.textAlignHorizontal as 'left' | 'center' | 'right') || 'left',
        vertical: (style.textAlignVertical as 'top' | 'center' | 'bottom') || 'top'
      },
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeightPx
    },
    editable: true
  };
}

/**
 * Transforms a Figma image node into our internal ImageNode format
 */
function transformImageNode(node: FigmaNode, context: TransformContext): ImageNode {
  const position = transformPosition(node);
  const imageUrl = context.imageUrls?.[node.id] || '';
  
  // Get scale from constraints if available
  const scale = {
    x: node.constraints?.horizontal === 'SCALE' ? 1 : 0,
    y: node.constraints?.vertical === 'SCALE' ? 1 : 0
  };
  
  return {
    id: node.id,
    name: node.name,
    type: 'image',
    ...position,
    src: imageUrl,
    alt: node.name,
    scale,
    editable: true
  };
}

/**
 * Transforms a Figma frame node into our internal FrameNode format
 */
function transformFrameNode(node: FigmaNode): FrameNode {
  const position = transformPosition(node);
  
  // Extract auto-layout properties
  const layout = node.layoutMode ? {
    type: 'auto' as const,
    direction: node.layoutMode.toLowerCase() as 'horizontal' | 'vertical',
    padding: {
      top: node.paddingTop || 0,
      right: node.paddingRight || 0,
      bottom: node.paddingBottom || 0,
      left: node.paddingLeft || 0
    },
    spacing: node.itemSpacing || 0,
    align: {
      main: (node.primaryAxisAlignItems?.toLowerCase() === 'MIN' ? 'start' :
             node.primaryAxisAlignItems?.toLowerCase() === 'MAX' ? 'end' :
             node.primaryAxisAlignItems?.toLowerCase() === 'CENTER' ? 'center' :
             node.primaryAxisAlignItems?.toLowerCase() === 'SPACE_BETWEEN' ? 'space-between' : 'start') as 'start' | 'center' | 'end' | 'space-between',
      cross: (node.counterAxisAlignItems?.toLowerCase() === 'MIN' ? 'start' :
              node.counterAxisAlignItems?.toLowerCase() === 'MAX' ? 'end' :
              node.counterAxisAlignItems?.toLowerCase() === 'CENTER' ? 'center' :
              node.counterAxisAlignItems?.toLowerCase() === 'STRETCH' ? 'stretch' : 'start') as 'start' | 'center' | 'end' | 'stretch'
    }
  } : {
    type: 'none' as const
  };
  
  return {
    id: node.id,
    name: node.name,
    type: 'frame',
    ...position,
    layout
  };
}

/**
 * Transforms a Figma group node into our internal GroupNode format
 */
function transformGroupNode(node: FigmaNode): GroupNode {
  const position = transformPosition(node);
  
  return {
    id: node.id,
    name: node.name,
    type: 'group',
    ...position
  };
}

/**
 * Recursively transforms a Figma node and its children into our internal format
 */
export function transformNode(node: FigmaNode, context: TransformContext = {}): BaseNode | null {
  let transformed: BaseNode | null = null;
  
  switch (node.type) {
    case 'DOCUMENT':
      transformed = transformFrameNode({
        ...node,
        id: 'document-root',
        name: 'Document Root'
      });
      break;
    case 'CANVAS':
      transformed = transformFrameNode(node);
      break;
    case 'TEXT':
      transformed = transformTextNode(node);
      break;
    case 'RECTANGLE':
    case 'VECTOR':
    case 'ELLIPSE':
    case 'LINE':
    case 'REGULAR_POLYGON':
    case 'STAR':
    case 'BOOLEAN_OPERATION':
      // Check if node has image fill or is a vector
      if (node.fills?.some(fill => fill.type === 'IMAGE') || 
          ['VECTOR', 'LINE', 'REGULAR_POLYGON', 'ELLIPSE', 'STAR'].includes(node.type)) {
        transformed = transformImageNode(node, context);
      } else {
        // Treat as a frame if it has children, otherwise skip
        transformed = node.children ? transformFrameNode(node) : null;
      }
      break;
    case 'FRAME':
    case 'COMPONENT':
    case 'COMPONENT_SET':
      transformed = transformFrameNode(node);
      break;
    case 'GROUP':
      transformed = transformGroupNode(node);
      break;
    default:
      console.log(`Skipping unsupported node type: ${node.type}`);
      return null;
  }
  
  if (transformed && node.children) {
    transformed.children = node.children
      .map(child => transformNode(child, context))
      .filter((child): child is BaseNode => child !== null);
  }
  
  return transformed;
}

/**
 * Transforms an entire Figma document into our internal format
 */
export function transformDocument(node: FigmaNode, imageUrls?: Record<string, string>): BaseNode | null {
  const transformed = transformNode(node, { imageUrls });
  
  if (!transformed) {
    console.error('Failed to transform document root node');
    return null;
  }
  
  // Set parent references using IDs
  function setParentReferences(node: BaseNode) {
    if (node.children) {
      node.children.forEach(child => {
        child.parentId = node.id;
        setParentReferences(child);
      });
    }
  }
  
  setParentReferences(transformed);
  return transformed;
} 