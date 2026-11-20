import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';
import { webcrypto } from 'node:crypto';

// Polyfill crypto.subtle para o ambiente jsdom em testes
if (!globalThis.crypto || !globalThis.crypto.subtle) {
  // @ts-ignore
  globalThis.crypto = webcrypto;
}

// Mock next/image para ambiente de testes jsdom
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    const { fill: _fill, priority: _priority, ...rest } = props;
    return React.createElement('img', rest);
  },
}));

// Mock window.open para testes
if (typeof window !== 'undefined') {
  window.open = vi.fn();
}

