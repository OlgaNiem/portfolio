"use client"
import { ImageField } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef } from "react";
import { clsx } from "clsx";



type AvatarProps = {
  image: ImageField;
  className?: string;
}

export default function Avatar({image, className}: AvatarProps) {
  const component = useRef(null)

  useEffect(() => {
  }, []);

  return (
    <div ref ={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage 
          alt="" 
          field={image} 
          className="avatar-image h-full w-full object-fill"
          imgixParams={{q:90}}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
    
  )
}