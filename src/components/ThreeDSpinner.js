
export function createThreeDSpinner() {
    const wrapper = document.createElement('div');
    wrapper.className = 'spinner-wrapper';
  
    const cube = document.createElement('div');
    cube.className = 'cube-spinner';
  
    const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  
    faces.forEach((face) => {
      const div = document.createElement('div');
      div.className = `cube-face cube-face-${face}`;
      cube.appendChild(div);
    });
  
    wrapper.appendChild(cube);
  
    if (!document.getElementById('cube-spinner-style')) {
      const style = document.createElement('style');
      style.id = 'cube-spinner-style';
      style.innerHTML = `
        .spinner-wrapper {
          width: 100%;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
        }
  
        .cube-spinner {
          position: relative;
          width: 50px;
          height: 50px;
          transform-style: preserve-3d;
          animation: spinCube 2s infinite linear;
        }
  
        .cube-face {
          position: absolute;
          width: 50px;
          height: 50px;
          background: #8b5cf6;
          opacity: 0.9;
          border: 2px solid white;
        }
  
        .cube-face-front  { transform: translateZ(25px); }
        .cube-face-back   { transform: rotateY(180deg) translateZ(25px); }
        .cube-face-right  { transform: rotateY(90deg) translateZ(25px); }
        .cube-face-left   { transform: rotateY(-90deg) translateZ(25px); }
        .cube-face-top    { transform: rotateX(90deg) translateZ(25px); }
        .cube-face-bottom { transform: rotateX(-90deg) translateZ(25px); }
  
        @keyframes spinCube {
          0%   { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  
    return wrapper;
  }
  