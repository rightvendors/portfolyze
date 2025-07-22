import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface StaggeredRevealProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  threshold?: number;
  rootMargin?: string;
}

const StaggeredReveal: React.FC<StaggeredRevealProps> = ({ 
  children, 
  className = '',
  staggerDelay = 150,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(children.length).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * staggerDelay);
          });
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [children.length, staggerDelay, threshold, rootMargin]);

  const getItemClasses = (index: number) => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!visibleItems[index]) {
      switch (direction) {
        case 'up':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'down':
          return `${baseClasses} opacity-0 -translate-y-8`;
        case 'left':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'right':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'fade':
          return `${baseClasses} opacity-0`;
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
  };

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <div key={index} className={getItemClasses(index)}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredReveal;