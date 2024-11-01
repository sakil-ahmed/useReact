// import { useState, useEffect, useRef, useCallback, RefObject } from 'react';
//
//
// // useBattery
// export function useBattery() {
//     const [battery, setBattery] = useState<any>(null);
//
//     useEffect(() => {
//         let mounted = true;
//
//         const getBattery = async () => {
//             if ('getBattery' in navigator) {
//                 const batteryManager = await (navigator as any).getBattery();
//                 if (mounted) {
//                     setBattery(batteryManager);
//                 }
//             }
//         };
//
//         getBattery();
//
//         return () => {
//             mounted = false;
//         };
//     }, []);
//
//     return battery;
// }
//
// // useDeviceMotion
// export function useDeviceMotion() {
//     const [motion, setMotion] = useState<DeviceMotionEvent | null>(null);
//
//     useEffect(() => {
//         const handler = (event: DeviceMotionEvent) => {
//             setMotion(event);
//         };
//
//         window.addEventListener('devicemotion', handler);
//         return () => {
//             window.removeEventListener('devicemotion', handler);
//         };
//     }, []);
//
//     return motion;
// }
//
// // useDeviceOrientation
// export function useDeviceOrientation() {
//     const [orientation, setOrientation] = useState<DeviceOrientationEvent | null>(null);
//
//     useEffect(() => {
//         const handler = (event: DeviceOrientationEvent) => {
//             setOrientation(event);
//         };
//
//         window.addEventListener('deviceorientation', handler);
//         return () => {
//             window.removeEventListener('deviceorientation', handler);
//         };
//     }, []);
//
//     return orientation;
// }
//
// // useDevicePixelRatio
// export function useDevicePixelRatio() {
//     const [dpr, setDpr] = useState(window.devicePixelRatio);
//
//     useEffect(() => {
//         const handler = () => {
//             setDpr(window.devicePixelRatio);
//         };
//
//         window.addEventListener('resize', handler);
//         return () => {
//             window.removeEventListener('resize', handler);
//         };
//     }, []);
//
//     return dpr;
// }
//
// // useDevicesList
// export function useDevicesList(kind: MediaDeviceKind) {
//     const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
//
//     useEffect(() => {
//         const getDevices = async () => {
//             const devices = await navigator.mediaDevices.enumerateDevices();
//             setDevices(devices.filter(device => device.kind === kind));
//         };
//
//         getDevices();
//         navigator.mediaDevices.addEventListener('devicechange', getDevices);
//
//         return () => {
//             navigator.mediaDevices.removeEventListener('devicechange', getDevices);
//         };
//     }, [kind]);
//
//     return devices;
// }
//
// // useDisplayMedia
// export function useDisplayMedia() {
//     const [stream, setStream] = useState<MediaStream | null>(null);
//
//     const startCapture = useCallback(async () => {
//         try {
//             const mediaStream = await navigator.mediaDevices.getDisplayMedia();
//             setStream(mediaStream);
//         } catch (err) {
//             console.error("Error: " + err);
//         }
//     }, []);
//
//     const stopCapture = useCallback(() => {
//         if (stream) {
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//             setStream(null);
//         }
//     }, [stream]);
//
//     return { stream, startCapture, stopCapture };
// }
//
//
// // useElementHover
// export function useElementHover<T extends HTMLElement = HTMLElement>() {
//     const [isHovered, setIsHovered] = useState(false);
//     const ref = useRef<T>(null);
//
//     useEffect(() => {
//         const element = ref.current;
//         if (!element) return;
//
//         const handleMouseEnter = () => setIsHovered(true);
//         const handleMouseLeave = () => setIsHovered(false);
//
//         element.addEventListener('mouseenter', handleMouseEnter);
//         element.addEventListener('mouseleave', handleMouseLeave);
//
//         return () => {
//             element.removeEventListener('mouseenter', handleMouseEnter);
//             element.removeEventListener('mouseleave', handleMouseLeave);
//         };
//     }, []);
//
//     return [ref, isHovered] as const;
// }
//
// // useFocus
// export function useFocus<T extends HTMLElement = HTMLElement>() {
//     const [isFocused, setIsFocused] = useState(false);
//     const ref = useRef<T>(null);
//
//     useEffect(() => {
//         const element = ref.current;
//         if (!element) return;
//
//         const handleFocus = () => setIsFocused(true);
//         const handleBlur = () => setIsFocused(false);
//
//         element.addEventListener('focus', handleFocus);
//         element.addEventListener('blur', handleBlur);
//
//         return () => {
//             element.removeEventListener('focus', handleFocus);
//             element.removeEventListener('blur', handleBlur);
//         };
//     }, []);
//
//     return [ref, isFocused] as const;
// }
//
// // useFocusWithin
// export function useFocusWithin<T extends HTMLElement = HTMLElement>() {
//     const [isFocusWithin, setIsFocusWithin] = useState(false);
//     const ref = useRef<T>(null);
//
//     useEffect(() => {
//         const element = ref.current;
//         if (!element) return;
//
//         const handleFocusIn = () => setIsFocusWithin(true);
//         const handleFocusOut = () => setIsFocusWithin(false);
//
//         element.addEventListener('focusin', handleFocusIn);
//         element.addEventListener('focusout', handleFocusOut);
//
//         return () => {
//             element.removeEventListener('focusin', handleFocusIn);
//             element.removeEventListener('focusout', handleFocusOut);
//         };
//     }, []);
//
//     return [ref, isFocusWithin] as const;
// }
//
// // useFps
// export function useFps() {
//     const [fps, setFps] = useState(0);
//     const frames = useRef(0);
//     const prevTime = useRef(performance.now());
//
//     useEffect(() => {
//         const animationFrame = requestAnimationFrame(function loop() {
//             const time = performance.now();
//             frames.current++;
//             if (time >= prevTime.current + 1000) {
//                 setFps((frames.current * 1000) / (time - prevTime.current));
//                 frames.current = 0;
//                 prevTime.current = time;
//             }
//             requestAnimationFrame(loop);
//         });
//
//         return () => cancelAnimationFrame(animationFrame);
//     }, []);
//
//     return Math.round(fps);
// }
//
// // useGeolocation
// export function useGeolocation() {
//     const [position, setPosition] = useState<GeolocationPosition | null>(null);
//     const [error, setError] = useState<GeolocationPositionError | null>(null);
//
//     useEffect(() => {
//         const successHandler = (pos: GeolocationPosition) => {
//             setPosition(pos);
//             setError(null);
//         };
//
//         const errorHandler = (err: GeolocationPositionError) => {
//             setError(err);
//             setPosition(null);
//         };
//
//         const id = navigator.geolocation.watchPosition(successHandler, errorHandler);
//
//         return () => navigator.geolocation.clearWatch(id);
//     }, []);
//
//     return { position, error };
// }
//
// // useIdle
// export function useIdle(ms: number) {
//     const [isIdle, setIsIdle] = useState(false);
//
//     useEffect(() => {
//         let timeoutId: NodeJS.Timeout;
//         const handleActivity = () => {
//             setIsIdle(false);
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => setIsIdle(true), ms);
//         };
//
//         const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
//         events.forEach(event => document.addEventListener(event, handleActivity));
//
//         handleActivity();
//
//         return () => {
//             events.forEach(event => document.removeEventListener(event, handleActivity));
//             clearTimeout(timeoutId);
//         };
//     }, [ms]);
//
//     return isIdle;
// }
//
//
// // useKeyModifier
// export function useKeyModifier(modifier: 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey') {
//     const [isModifierPressed, setIsModifierPressed] = useState(false);
//
//     useEffect(() => {
//         const handleKeyDown = (event: KeyboardEvent) => {
//             setIsModifierPressed(event[modifier]);
//         };
//
//         const handleKeyUp = (event: KeyboardEvent) => {
//             setIsModifierPressed(event[modifier]);
//         };
//
//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);
//
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, [modifier]);
//
//     return isModifierPressed;
// }
//
// // useMagicKeys
// export function useMagicKeys() {
//     const [pressedKeys, setPressedKeys] = useState(new Set<string>());
//
//     useEffect(() => {
//         const handleKeyDown = (event: KeyboardEvent) => {
//             setPressedKeys(prev => new Set(prev).add(event.key));
//         };
//
//         const handleKeyUp = (event: KeyboardEvent) => {
//             setPressedKeys(prev => {
//                 const next = new Set(prev);
//                 next.delete(event.key);
//                 return next;
//             });
//         };
//
//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);
//
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, []);
//
//     return pressedKeys;
// }
//
//
// // useMousePressed
// export function useMousePressed() {
//     const [isPressed, setIsPressed] = useState(false);
//
//     useEffect(() => {
//         const handleMouseDown = () => setIsPressed(true);
//         const handleMouseUp = () => setIsPressed(false);
//
//         window.addEventListener('mousedown', handleMouseDown);
//         window.addEventListener('mouseup', handleMouseUp);
//
//         return () => {
//             window.removeEventListener('mousedown', handleMouseDown);
//             window.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, []);
//
//     return isPressed;
// }
//
// // useNavigatorLanguage
// export function useNavigatorLanguage() {
//     const [language, setLanguage] = useState(navigator.language);
//
//     useEffect(() => {
//         const handleLanguageChange = () => {
//             setLanguage(navigator.language);
//         };
//
//         window.addEventListener('languagechange', handleLanguageChange);
//
//         return () => {
//             window.removeEventListener('languagechange', handleLanguageChange);
//         };
//     }, []);
//
//     return language;
// }
//
// // useNetwork
// export function useNetwork() {
//     const [networkState, setNetworkState] = useState({
//         online: navigator.onLine,
//         effectiveType: (navigator as  any).connection?.effectiveType,
//         downlink: (navigator as any).connection?.downlink,
//         rtt: (navigator as any).connection?.rtt,
//     });
//
//     useEffect(() => {
//         const updateNetworkState = () => {
//             setNetworkState({
//                 online: navigator.onLine,
//                 effectiveType: (navigator as any).connection?.effectiveType,
//                 downlink: (navigator as any).connection?.downlink,
//                 rtt: (navigator as any).connection?.rtt,
//             });
//         };
//
//         window.addEventListener('online', updateNetworkState);
//         window.addEventListener('offline', updateNetworkState);
//         (navigator as any).connection?.addEventListener('change', updateNetworkState);
//
//         return () => {
//             window.removeEventListener('online', updateNetworkState);
//             window.removeEventListener('offline', updateNetworkState);
//             (navigator as any).connection?.removeEventListener('change', updateNetworkState);
//         };
//     }, []);
//
//     return networkState;
// }
//
// // useOnline
// export function useOnline() {
//     const [isOnline, setIsOnline] = useState(navigator.onLine);
//
//     useEffect(() => {
//         const handleOnline = () => setIsOnline(true);
//         const handleOffline = () => setIsOnline(false);
//
//         window.addEventListener('online', handleOnline);
//         window.addEventListener('offline', handleOffline);
//
//         return () => {
//             window.removeEventListener('online', handleOnline);
//             window.removeEventListener('offline', handleOffline);
//         };
//     }, []);
//
//     return isOnline;
// }
//
// // usePageLeave
// export function usePageLeave(callback: () => void) {
//     useEffect(() => {
//         const handleMouseLeave = (event: MouseEvent) => {
//             if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
//                 callback();
//             }
//         };
//
//         document.addEventListener('mouseleave', handleMouseLeave);
//
//         return () => {
//             document.removeEventListener('mouseleave', handleMouseLeave);
//         };
//     }, [callback]);
// }
//
//
// // usePointer
// export function usePointer() {
//     const [pointer, setPointer] = useState({ x: 0, y: 0 });
//
//     useEffect(() => {
//         const updatePointer = (event: PointerEvent) => {
//             setPointer({ x: event.clientX, y: event.clientY });
//         };
//
//         window.addEventListener('pointermove', updatePointer);
//
//         return () => {
//             window.removeEventListener('pointermove', updatePointer);
//         };
//     }, []);
//
//     return pointer;
// }
//
// // usePointerLock
// export function usePointerLock(ref: RefObject<HTMLElement>) {
//     const [isLocked, setIsLocked] = useState(false);
//
//     useEffect(() => {
//         const element = ref.current;
//         if (!element) return;
//
//         const handleLockChange = () => {
//             setIsLocked(document.pointerLockElement === element);
//         };
//
//         document.addEventListener('pointerlockchange', handleLockChange);
//
//         return () => {
//             document.removeEventListener('pointerlockchange', handleLockChange);
//         };
//     }, [ref]);
//
//     const requestLock = useCallback(() => {
//         const element = ref.current;
//         if (element) {
//             element.requestPointerLock();
//         }
//     }, [ref]);
//
//     const exitLock = useCallback(() => {
//         document.exitPointerLock();
//     }, []);
//
//     return { isLocked, requestLock, exitLock };
// }
//
// // usePointerSwipe
// export function usePointerSwipe(options = { threshold: 50 }) {
//     const [swipe, setSwipe] = useState({ direction: '', distance: 0 });
//     const startPosition = useRef({ x: 0, y: 0 });
//
//     useEffect(() => {
//         const handlePointerDown = (event: PointerEvent) => {
//             startPosition.current = { x: event.clientX, y: event.clientY };
//         };
//
//         const handlePointerUp = (event: PointerEvent) => {
//             const deltaX = event.clientX - startPosition.current.x;
//             const deltaY = event.clientY - startPosition.current.y;
//             const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//
//             if (distance >= options.threshold) {
//                 const absX = Math.abs(deltaX);
//                 const absY = Math.abs(deltaY);
//                 let direction = '';
//
//                 if (absX > absY) {
//                     direction = deltaX > 0 ? 'right' : 'left';
//                 } else {
//                     direction = deltaY > 0 ? 'down' : 'up';
//                 }
//
//                 setSwipe({ direction, distance });
//             }
//         };
//
//         window.addEventListener('pointerdown', handlePointerDown);
//         window.addEventListener('pointerup', handlePointerUp);
//
//         return () => {
//             window.removeEventListener('pointerdown', handlePointerDown);
//             window.removeEventListener('pointerup', handlePointerUp);
//         };
//     }, [options.threshold]);
//
//     return swipe;
// }
//
//
//
// // useScrollLock
// export function useScrollLock() {
//     const [isLocked, setIsLocked] = useState(false);
//
//     useEffect(() => {
//         if (isLocked) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = '';
//         }
//
//         return () => {
//             document.body.style.overflow = '';
//         };
//     }, [isLocked]);
//
//     const lock = () => setIsLocked(true);
//     const unlock = () => setIsLocked(false);
//
//     return { isLocked, lock, unlock };
// }
//
// // useSpeechRecognition
// export function useSpeechRecognition() {
//     const [transcript, setTranscript] = useState('');
//     const [isListening, setIsListening] = useState(false);
//
//     const recognition = useRef<SpeechRecognition | null>(null);
//
//     useEffect(() => {
//         if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
//             recognition.current = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
//             recognition.current.continuous = true;
//             recognition.current.interimResults = true;
//
//             recognition.current.onresult = (event: SpeechRecognitionEvent) => {
//                 const transcript = Array.from(event.results)
//                     .map(result => result[0].transcript)
//                     .join('');
//                 setTranscript(transcript);
//             };
//
//             recognition.current.onend = () => {
//                 setIsListening(false);
//             };
//         }
//     }, []);
//
//     const startListening = () => {
//         if (recognition.current) {
//             recognition.current.start();
//             setIsListening(true);
//         }
//     };
//
//     const stopListening = () => {
//         if (recognition.current) {
//             recognition.current.stop();
//             setIsListening(false);
//         }
//     };
//
//     return { transcript, isListening, startListening, stopListening };
// }
//
// // useSpeechSynthesis
// export function useSpeechSynthesis() {
//     const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
//     const [speaking, setSpeaking] = useState(false);
//     const synthesis = useRef(window.speechSynthesis);
//
//     useEffect(() => {
//         const updateVoices = () => {
//             setVoices(synthesis.current.getVoices());
//         };
//
//         updateVoices();
//         synthesis.current.onvoiceschanged = updateVoices;
//
//         return () => {
//             synthesis.current.onvoiceschanged = null;
//         };
//     }, []);
//
//     const speak = (text: string, voice?: SpeechSynthesisVoice) => {
//         if (synthesis.current) {
//             const utterance = new SpeechSynthesisUtterance(text);
//             if (voice) utterance.voice = voice;
//
//             utterance.onstart = () => setSpeaking(true);
//             utterance.onend = () => setSpeaking(false);
//
//             synthesis.current.speak(utterance);
//         }
//     };
//
//     const cancel = () => {
//         if (synthesis.current) {
//             synthesis.current.cancel();
//             setSpeaking(false);
//         }
//     };
//
//     return { voices, speaking, speak, cancel };
// }
//
// // useSwipe
// export function useSwipe(ref: RefObject<HTMLElement>, options = { threshold: 50 }) {
//     const [swipe, setSwipe] = useState({ direction: '', distance: 0 });
//     const startPosition = useRef({ x: 0, y: 0 });
//
//     useEffect(() => {
//         const element = ref.current;
//         if (!element) return;
//
//         const handleTouchStart = (event: TouchEvent) => {
//             startPosition.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
//         };
//
//         const handleTouchEnd = (event: TouchEvent) => {
//             const deltaX = event.changedTouches[0].clientX - startPosition.current.x;
//             const deltaY = event.changedTouches[0].clientY - startPosition.current.y;
//             const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//
//             if (distance >= options.threshold) {
//                 const absX = Math.abs(deltaX);
//                 const absY = Math.abs(deltaY);
//                 let direction = '';
//
//                 if (absX > absY) {
//                     direction = deltaX > 0 ? 'right' : 'left';
//                 } else {
//                     direction = deltaY > 0 ? 'down' : 'up';
//                 }
//
//                 setSwipe({ direction, distance });
//             }
//         };
//
//         element.addEventListener('touchstart', handleTouchStart);
//         element.addEventListener('touchend', handleTouchEnd);
//
//         return () => {
//             element.removeEventListener('touchstart', handleTouchStart);
//             element.removeEventListener('touchend', handleTouchEnd);
//         };
//     }, [ref, options.threshold]);
//
//     return swipe;
// }
//
//
// // useUserMedia
// export function useUserMedia(constraints: MediaStreamConstraints) {
//     const [stream, setStream] = useState<MediaStream | null>(null);
//     const [error, setError] = useState<Error | null>(null);
//
//     useEffect(() => {
//         let mounted = true;
//
//         const getUserMedia = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia(constraints);
//                 if (mounted) {
//                     setStream(stream);
//                 }
//             } catch (err) {
//                 if (mounted) {
//                     setError(err instanceof Error ? err : new Error('An error occurred'));
//                 }
//             }
//         };
//
//         getUserMedia();
//
//         return () => {
//             mounted = false;
//             if (stream) {
//                 stream.getTracks().forEach(track => track.stop());
//             }
//         };
//     }, [constraints]);
//
//     return { stream, error };
// }