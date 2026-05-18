import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };

    const onEnter = () => document.body.classList.add('cursor-hovering');
    const onLeave = () => document.body.classList.remove('cursor-hovering');

    document.addEventListener('mousemove', onMove);

    const setupHoverListeners = () => {
      const hoverTargets = document.querySelectorAll('a, button, [data-cursor-hover]');
      hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    setupHoverListeners();

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      setupHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="cursor-dot" ref={dotRef} />
  );
};

export default CustomCursor;
