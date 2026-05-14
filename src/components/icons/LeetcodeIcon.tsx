import React from 'react';

export const LeetcodeIcon = ({ size = 24, ...props }: { size?: number; [key: string]: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.105 18.562a5.011 5.011 0 0 1-3.731 1.476 4.992 4.992 0 0 1-4.992-4.992 4.992 4.992 0 0 1 5.032-4.992 5.012 5.012 0 0 1 3.731 1.476l2.673-2.673A8.991 8.991 0 0 0 12.446 6.02 9.031 9.031 0 0 0 3.415 15.051a9.031 9.031 0 0 0 9.031 9.031 8.991 8.991 0 0 0 6.332-2.854l-2.673-2.666z" />
    <path d="M15.012 13.845l5.573-5.573-1.414-1.414-5.573 5.573z" />
    <path d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </svg>
);
