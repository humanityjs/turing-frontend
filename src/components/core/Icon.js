import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Icon({ icon, ...rest }) {
  return <FontAwesomeIcon {...rest} icon={icon} />;
}
