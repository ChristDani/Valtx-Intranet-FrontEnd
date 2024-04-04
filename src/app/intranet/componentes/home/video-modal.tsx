// components/VideoModal.js
import React from 'react';

const VideoModal = ({ onClose, videoUrl }) => {
  return (
    <>
      <div className="flex fixed align-middle justify-center m-auto top-0 left-0 w-full h-full modal z-40">
        {/** Capa opacidad */}
        <div className="fixed top-0 left-0 bg-black opacity-50 h-full w-full modal-overlay"
              onClick={onClose}>
        
        </div>

        {/** Contenedor de video */}
        <div className="relative video-container m-auto z-50">
          <span className="flex absolute top-0 right-0 bg-white cursor-pointer font-bold items-center 
                justify-center rounded-full translate-x-4 -translate-y-4 w-[30px] h-[30px]"
                onClick={onClose}
                >X</span>

          <video width={700} height={700} controls autoPlay>
              <source src={`/videos/${videoUrl}`} type="video/mp4"></source>
          </video>
        </div>

        </div>
    </>
  );
};

export default VideoModal;
