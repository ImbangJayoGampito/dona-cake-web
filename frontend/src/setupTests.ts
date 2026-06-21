import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder for environments (some Node versions) used by dependencies
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;