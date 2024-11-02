// import React from 'react';
// import { renderHook, act } from '@testing-library/react-hooks';
// import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import {
//     useOnClickOutside,
//     useKeyStroke,
//     useLongPress,
//     useStartTyping,
//     useElementByPoint,
//     useInfiniteScroll,
//     useMouse,
//     useParallax,
//     useScroll,
//     useTextSelection
// } from '../index';
//
// describe('useOnClickOutside', () => {
//     it('should call handler when clicked outside', () => {
//         const handler = jest.fn();
//         const { result } = renderHook(() => {
//             const ref = React.useRef(null);
//             useOnClickOutside(ref, handler);
//             return ref;
//         });
//
//         const div = document.createElement('div');
//         document.body.appendChild(div);
//
//         act(() => {
//             fireEvent.mouseDown(document.body);
//         });
//
//         expect(handler).toHaveBeenCalledTimes(1);
//
//         act(() => {
//             fireEvent.mouseDown(div);
//         });
//
//         expect(handler).toHaveBeenCalledTimes(2);
//
//         document.body.removeChild(div);
//     });
// });
//
// describe('useKeyStroke', () => {
//     it('should call handler when specified key is pressed', () => {
//         const handler = jest.fn();
//         renderHook(() => useKeyStroke('Enter', handler));
//
//         act(() => {
//             fireEvent.keyDown(document, { key: 'Enter' });
//         });
//
//         expect(handler).toHaveBeenCalledTimes(1);
//
//         act(() => {
//             fireEvent.keyDown(document, { key: 'Escape' });
//         });
//
//         expect(handler).toHaveBeenCalledTimes(1);
//     });
// });
//
// describe('useLongPress', () => {
//     it('should call handler after long press', () => {
//         jest.useFakeTimers();
//         const handler = jest.fn();
//         const { result } = renderHook(() => useLongPress(handler, 500));
//
//         act(() => {
//             fireEvent.mouseDown(document);
//         });
//
//         expect(handler).not.toHaveBeenCalled();
//
//         act(() => {
//             jest.advanceTimersByTime(600);
//         });
//
//         expect(handler).toHaveBeenCalledTimes(1);
//
//         act(() => {
//             fireEvent.mouseUp(document);
//         });
//
//         jest.useRealTimers();
//     });
// });
//
// describe('useStartTyping', () => {
//     it('should call handler when user starts typing', () => {
//         const handler = jest.fn();
//         renderHook(() => useStartTyping(handler));
//
//         act(() => {
//             fireEvent.keyDown(document, { key: 'a' });
//         });
//
//         expect(handler).toHaveBeenCalledTimes(1);
//
//         act(() => {
//             fireEvent.keyDown(document, { key: 'Enter' });
//         });
//
//         expect(handler).toHaveBeenCalledTimes(1);
//     });
// });
//
// describe('useElementByPoint', () => {
//     it('should return element at given point', () => {
//         const { result } = renderHook(() => useElementByPoint(50, 50));
//
//         const div = document.createElement('div');
//         div.getBoundingClientRect = jest.fn(() => ({
//             x: 0,
//             y: 0,
//             width: 100,
//             height: 100,
//             top: 0,
//             right: 100,
//             bottom: 100,
//             left: 0,
//         }));
//         document.body.appendChild(div);
//
//         act(() => {
//             document.elementFromPoint = jest.fn(() => div);
//         });
//
//         expect(result.current).toBe(div);
//
//         document.body.removeChild(div);
//     });
// });
//
// describe('useInfiniteScroll', () => {
//     it('should call callback when scrolled to bottom', () => {
//         const callback = jest.fn();
//         const { result } = renderHook(() => useInfiniteScroll(callback));
//
//         const observerCallback = jest.fn();
//         const mockIntersectionObserver = jest.fn(() => ({
//             observe: jest.fn(),
//             unobserve: jest.fn(),
//             disconnect: jest.fn(),
//         }));
//
//         window.IntersectionObserver = mockIntersectionObserver;
//
//         const element = document.createElement('div');
//         act(() => {
//             result.current.lastElementRef(element);
//         });
//
//         expect(mockIntersectionObserver).toHaveBeenCalled();
//
//         const [observerInstance] = mockIntersectionObserver.mock.instances;
//         const [observerCallback] = mockIntersectionObserver.mock.calls[0];
//
//         act(() => {
//             observerCallback([{ isIntersecting: true }]);
//         });
//
//         expect(callback).toHaveBeenCalled();
//     });
// });
//
// describe('useMouse', () => {
//     it('should update mouse position', () => {
//         const { result } = renderHook(() => useMouse());
//
//         act(() => {
//             fireEvent.mouseMove(document, { clientX: 100, clientY: 200 });
//         });
//
//         expect(result.current).toEqual({ x: 100, y: 200 });
//     });
// });
//
// describe('useParallax', () => {
//     it('should update position based on scroll', () => {
//         const ref = { current: document.createElement('div') };
//         const { result } = renderHook(() => useParallax(ref, 0.5));
//
//         act(() => {
//             Object.defineProperty(window, 'scrollY', { value: 100 });
//             fireEvent.scroll(window);
//         });
//
//         expect(result.current.y).toBeLessThan(0);
//     });
// });
//
// describe('useScroll', () => {
//     it('should update scroll position', () => {
//         const { result } = renderHook(() => useScroll());
//
//         act(() => {
//             fireEvent.scroll(window, { target: { scrollY: 100, scrollX: 50 } });
//         });
//
//         expect(result.current).toEqual({ x: 50, y: 100 });
//     });
// });
//
// describe('useTextSelection', () => {
//     it('should update selected text', () => {
//         const { result } = renderHook(() => useTextSelection());
//
//         act(() => {
//             const range = document.createRange();
//             const textNode = document.createTextNode('Hello, world!');
//             range.setStart(textNode, 0);
//             range.setEnd(textNode, 5);
//             window.getSelection()?.removeAllRanges();
//             window.getSelection()?.addRange(range);
//             fireEvent(document, new Event('selectionchange'));
//         });
//
//         expect(result.current).toBe('Hello');
//     });
// });