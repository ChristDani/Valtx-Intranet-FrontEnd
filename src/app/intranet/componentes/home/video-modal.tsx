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
        <div className="video-container m-auto z-50">
          <video width={700} height={700} controls autoPlay>
              <source src={videoUrl} type="video/mp4"></source>
          </video>
        </div>

        </div>
    </>
  );
};

export default VideoModal;
