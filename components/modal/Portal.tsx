'use client';

import ReactDOM from 'react-dom';
import { isBrowser } from 'utils/isBrowser';

type PortalProps = {
  children: React.ReactNode;
  selector: string;
};

const Portal = ({ children, selector }: PortalProps) => {
  const element = isBrowser() && document.getElementById(selector);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
