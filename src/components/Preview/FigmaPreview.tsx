import React, { useEffect, useState } from 'react';
import { BaseNode, FrameNode, TextNode, ImageNode } from '@/types/figma';
import { useFigmaStore } from '@/store';
import { cn } from '@/lib/utils';

interface FigmaPreviewProps {
  className?: string;
}

function findNodeById(node: BaseNode, targetId: string): BaseNode | null {
  if (node.id === targetId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, targetId);
      if (found) return found;
    }
  }
  return null;
}

const getRelativePosition = (node: BaseNode, frame: FrameNode) => {
  return {
    x: node.x - frame.x,
    y: node.y - frame.y
  };
};

const calculateScale = (frameWidth: number, frameHeight: number, containerWidth: number, containerHeight: number) => {
  // Вычисляем масштаб, чтобы фрейм занимал 80% от доступного пространства
  const targetWidth = containerWidth * 0.8;
  const targetHeight = containerHeight * 0.8;
  
  const scaleX = targetWidth / frameWidth;
  const scaleY = targetHeight / frameHeight;
  
  // Берем минимальный масштаб, чтобы сохранить пропорции
  return Math.min(scaleX, scaleY);
};

export function FigmaPreview({ className }: FigmaPreviewProps) {
  const rootNode = useFigmaStore(state => state.rootNode);
  const nodeId = useFigmaStore(state => state.nodeId);
  const [targetFrame, setTargetFrame] = useState<BaseNode | null>(null);
  const [scale, setScale] = useState(1);

  // Найти целевой фрейм и рассчитать масштаб
  useEffect(() => {
    if (!rootNode || !nodeId) return;
    
    const frame = findNodeById(rootNode, nodeId);
    if (!frame) return;

    setTargetFrame(frame);

    // Рассчитываем масштаб
    const containerWidth = 400;
    const containerHeight = 400;
    const newScale = calculateScale(frame.width, frame.height, containerWidth, containerHeight);
    setScale(newScale);
  }, [rootNode, nodeId]);

  if (!rootNode || !nodeId || !targetFrame) {
    return (
      <div className={cn("w-full h-[400px] flex items-center justify-center p-4 bg-card", className)}>
        <p className="text-muted-foreground">No preview available</p>
      </div>
    );
  }

  // Вычисляем финальные размеры для фрейма
  const scaledWidth = targetFrame.width * scale;
  const scaledHeight = targetFrame.height * scale;

  return (
    <div className={cn("w-full h-[400px] flex items-center justify-center p-4 bg-card", className)}>
      <div 
        className="relative bg-background shadow-md rounded-lg overflow-hidden"
        style={{
          width: scaledWidth,
          height: scaledHeight,
        }}
      >
        <div
          className="origin-top-left absolute"
          style={{
            transform: `scale(${scale})`,
            width: targetFrame.width,
            height: targetFrame.height,
          }}
        >
          {targetFrame.children?.map(child => (
            <NodeRenderer 
              key={child.id} 
              node={child} 
              frame={targetFrame as FrameNode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface NodeRendererProps {
  node: BaseNode;
  frame: FrameNode;
}

function NodeRenderer({ node, frame }: NodeRendererProps) {
  const { x, y } = getRelativePosition(node, frame);
  
  console.log('🎨 Rendering node:', {
    id: node.id,
    type: node.type,
    name: node.name,
    imageUrl: node.type === 'image' ? (node as ImageNode).src : undefined
  });
  
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${node.width}px`,
    height: `${node.height}px`,
  };

  switch (node.type) {
    case 'text': {
      const textNode = node as TextNode;
      return (
        <div style={style} className="text-foreground">
          <p style={{
            fontFamily: textNode.style.font,
            fontSize: `${textNode.style.size}px`,
            fontWeight: textNode.style.weight,
            color: textNode.style.color,
            textAlign: textNode.style.align.horizontal,
            letterSpacing: textNode.style.letterSpacing ? `${textNode.style.letterSpacing}px` : undefined,
            lineHeight: textNode.style.lineHeight ? `${textNode.style.lineHeight}px` : undefined,
          }}>
            {textNode.content}
          </p>
        </div>
      );
    }
    case 'image': {
      const imageNode = node as ImageNode;
      // Добавляем отладочный вывод
      console.log('🖼️ Image node details:', {
        id: imageNode.id,
        name: imageNode.name,
        src: imageNode.src,
        dimensions: `${imageNode.width}x${imageNode.height}`
      });
      
      if (!imageNode.src) {
        console.warn('⚠️ Image node has no src:', imageNode.id);
        return <div style={style} className="bg-muted" />;
      }

      return (
        <img 
          src={imageNode.src} 
          alt={imageNode.name}
          style={style}
          className="object-cover"
        />
      );
    }
    default:
      return <div style={style}>{node.children?.map(child => (
        <NodeRenderer key={child.id} node={child} frame={frame} />
      ))}</div>;
  }
} 