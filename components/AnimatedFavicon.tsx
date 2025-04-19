'use client'

import { useEffect } from 'react'

export default function AnimatedFavicon() {
  useEffect(() => {
    // Use .jpg extension since that's what your files have
    const frames = [
      '/f1.jpg', '/f2.jpg', '/f3.jpg', '/f4.jpg', '/f5.jpg', 
      '/f6.jpg', '/f7.jpg', '/f8.jpg', '/f9.jpg', '/f10.jpg', '/f11.jpg'
    ];
    let currentFrame = 0;
    
    // Initial setup to ensure we have a favicon element
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/jpeg'; // Use image/jpeg for JPG files
      document.head.appendChild(link);
    } else {
      // Update the type if the link already exists
      link.type = 'image/jpeg';
    }
    
    // Set initial favicon
    link.href = frames[0];
    
    const interval = setInterval(() => {
      currentFrame = (currentFrame + 1) % frames.length;
      link.href = frames[currentFrame];
      console.log("Changing favicon to:", frames[currentFrame]); // Debug logging
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return null;
}