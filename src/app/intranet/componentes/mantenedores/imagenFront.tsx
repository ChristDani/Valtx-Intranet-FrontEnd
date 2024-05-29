import React from 'react'

const ImagenFront = ({className = '', src, alt = ''} : {className?: string, src: string, alt?: string}) => {
  return (
    <img src={process.env.NEXT_PUBLIC_RUTA+src} className={className} alt={alt} crossOrigin='anonymous' />
  )
}

export default ImagenFront