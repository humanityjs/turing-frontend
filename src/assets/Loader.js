import React from 'react';

const Loader = ({ fill = '#f33361', size = '44', ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    xmlns="http://www.w3.org/2000/svg"
    stroke={fill}
  >
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx={size / 2} cy={size / 2} r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values={`1; ${size * 0.45}`}
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={size / 2} cy={size / 2} r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values={`1; ${size * 0.45}`}
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

export default Loader;
