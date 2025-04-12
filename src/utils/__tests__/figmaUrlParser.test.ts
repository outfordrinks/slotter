import { describe, it, expect } from 'vitest';
import { parseFigmaUrl, isValidFigmaUrl, FigmaUrlError } from '../figmaUrlParser';

describe('figmaUrlParser', () => {
  describe('parseFigmaUrl', () => {
    it('should parse valid Figma file URL', () => {
      const url = 'https://www.figma.com/file/abc123/My-Design-File';
      const result = parseFigmaUrl(url);
      expect(result).toEqual({
        fileKey: 'abc123',
        nodeId: undefined,
        title: 'My-Design-File'
      });
    });

    it('should parse valid Figma prototype URL', () => {
      const url = 'https://www.figma.com/proto/abc123/My-Design-File';
      const result = parseFigmaUrl(url);
      expect(result).toEqual({
        fileKey: 'abc123',
        nodeId: undefined,
        title: 'My-Design-File'
      });
    });

    it('should parse valid Figma design URL', () => {
      const url = 'https://www.figma.com/design/abc123/My-Design-File';
      const result = parseFigmaUrl(url);
      expect(result).toEqual({
        fileKey: 'abc123',
        nodeId: undefined,
        title: 'My-Design-File'
      });
    });

    it('should parse URL with node ID using dash format', () => {
      const url = 'https://www.figma.com/design/abc123/My-Design-File?node-id=1-2';
      const result = parseFigmaUrl(url);
      expect(result).toEqual({
        fileKey: 'abc123',
        nodeId: '1:2',
        title: 'My-Design-File'
      });
    });

    it('should parse URL with node ID using colon format', () => {
      const url = 'https://www.figma.com/file/abc123/My-Design-File?node-id=1:2';
      const result = parseFigmaUrl(url);
      expect(result).toEqual({
        fileKey: 'abc123',
        nodeId: '1:2',
        title: 'My-Design-File'
      });
    });

    it('should parse URL with @ prefix', () => {
      const url = '@https://www.figma.com/design/abc123/My-Design-File';
      const result = parseFigmaUrl(url);
      expect(result).toEqual({
        fileKey: 'abc123',
        nodeId: undefined,
        title: 'My-Design-File'
      });
    });

    it('should parse real-world Figma URL example', () => {
      const url = '@https://www.figma.com/design/AbpZ8AaAufHspfWIHqOdmZ/Slotto--mvp?node-id=1-6&t=WXkmhAOVIYk6antn-4';
      const result = parseFigmaUrl(url);
      expect(result).toEqual({
        fileKey: 'AbpZ8AaAufHspfWIHqOdmZ',
        nodeId: '1:6',
        title: 'Slotto--mvp'
      });
    });

    it('should throw error for non-Figma URL', () => {
      const url = 'https://example.com/file/abc123';
      expect(() => parseFigmaUrl(url)).toThrow(FigmaUrlError);
    });

    it('should throw error for invalid URL format', () => {
      const url = 'https://www.figma.com/invalid/abc123';
      expect(() => parseFigmaUrl(url)).toThrow(FigmaUrlError);
    });

    it('should throw error for malformed URL', () => {
      const url = 'not-a-url';
      expect(() => parseFigmaUrl(url)).toThrow(FigmaUrlError);
    });
  });

  describe('isValidFigmaUrl', () => {
    it('should return true for valid Figma URLs', () => {
      expect(isValidFigmaUrl('https://www.figma.com/file/abc123/My-Design-File')).toBe(true);
      expect(isValidFigmaUrl('https://www.figma.com/proto/abc123/My-Design-File')).toBe(true);
      expect(isValidFigmaUrl('https://www.figma.com/design/abc123/My-Design-File')).toBe(true);
      expect(isValidFigmaUrl('@https://www.figma.com/design/abc123/My-Design-File')).toBe(true);
      expect(isValidFigmaUrl('https://www.figma.com/design/abc123/My-Design-File?node-id=1-6')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidFigmaUrl('https://example.com/file/abc123')).toBe(false);
      expect(isValidFigmaUrl('https://www.figma.com/invalid/abc123')).toBe(false);
      expect(isValidFigmaUrl('not-a-url')).toBe(false);
    });
  });
}); 