import React from 'react';

const BubbleBackground = ({ variant = 'default', bubbleCount = 8, className = '' }) => {
  // Define different bubble style variants
  const variants = {
    default: {
      baseColor: 'bg-[#6f8aff]/20',
      bubbleCount: bubbleCount,
      sizeRange: { min: 20, max: 60 },
      animations: ['animate-float', 'animate-float-reverse', 'animate-float-slow']
    },
    light: {
      baseColor: 'bg-white/20',
      bubbleCount: bubbleCount,
      sizeRange: { min: 15, max: 50 },
      animations: ['animate-float', 'animate-float-reverse', 'animate-float-horizontal']
    },
    colorful: {
      baseColor: '',
      bubbleCount: bubbleCount,
      sizeRange: { min: 20, max: 70 },
      animations: ['animate-float-fast', 'animate-float-reverse', 'animate-float-horizontal']
    }
  };

  // Get the selected variant or default
  const selectedVariant = variants[variant] || variants.default;
  
  // Colors for the colorful variant
  const colors = [
    'bg-[#6f8aff]/20',
    'bg-[#ff6f8a]/20',
    'bg-[#8aff6f]/20',
    'bg-[#f8aff6]/20'
  ];

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(selectedVariant.bubbleCount)].map((_, i) => {
        // Randomize properties for each bubble
        const size = Math.random() * 
          (selectedVariant.sizeRange.max - selectedVariant.sizeRange.min) + 
          selectedVariant.sizeRange.min;
        
        const animation = selectedVariant.animations[
          Math.floor(Math.random() * selectedVariant.animations.length)
        ];
        
        const delay = `${i * 2}s`;
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        
        // For colorful variant, pick a random color
        const color = variant === 'colorful' 
          ? colors[Math.floor(Math.random() * colors.length)]
          : selectedVariant.baseColor;
        
        // Add pulse animation to some bubbles for extra effect
        const extraAnimation = Math.random() > 0.7 ? 'animate-pulse' : '';
        
        return (
          <div
            key={i}
            className={`absolute rounded-full ${color} ${animation} ${extraAnimation}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left,
              top,
              animationDelay: delay,
              opacity: Math.random() * 0.3 + 0.1
            }}
          />
        );
      })}
    </div>
  );
};

export default BubbleBackground;