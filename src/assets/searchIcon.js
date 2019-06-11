import React from 'react';

const SearchIcon = ({ fill = '#fff', ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={fill}
    {...rest}
  >
    <path
      id="ic_search_24px"
      d="M14.435,13.063h-.723l-.256-.247a5.955,5.955,0,1,0-.64.64l.247.256v.723L17.637,19,19,17.637Zm-5.489,0a4.117,4.117,0,1,1,4.117-4.117A4.111,4.111,0,0,1,8.946,13.063Z"
      transform="translate(-3 -3)"
    />
  </svg>
);

export default SearchIcon;
