import React from 'react';
import style from './style.module.scss';

interface IProps {
  src: React.ReactElement;
  size: 'small' | 'medium';
  cb?: () => void;
}

const Icon = ({ size, src, cb }: IProps): React.ReactElement => {
  return (
    <div
      role='img'
      className={`${style[`icon-${size}`]} ${style['icon-wrapper']} ${
        !!cb ? style['icon-wrapper-clickable'] : ''
      }`}
      onClick={() => !!cb && cb()}
    >
      {src}
    </div>
  );
};

Icon.defaultProps = {
  alt: 'Ícone',
  size: 'small',
};

export default Icon;
