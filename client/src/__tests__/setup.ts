import "@testing-library/jest-dom";

// IntersectionObserver ist in jsdom nicht verfügbar – no-op Mock für Tests
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;
