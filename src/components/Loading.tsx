import React from 'react';

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loading loading-bars loading-lg"></div>
    </div>
  );
};

export default LoadingComponent;
