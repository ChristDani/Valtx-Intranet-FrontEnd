import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = () => {
    return (
        <ContentLoader
        viewBox="0 0 400 160"
        speed={3}
        style={{ width: '100%' , textAlign: 'center', top: '50%' }}
        height={160}
        width={400}
        backgroundColor="transparent"
      >
            <circle cx="150" cy="86" r="8" />
            <circle cx="194" cy="86" r="8" />
            <circle cx="238" cy="86" r="8" />
      </ContentLoader>
    );
}

export default Loader;
