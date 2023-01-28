import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import style from './style.module.scss';

interface IProps {
  link: string;
  title: string;
  hasDropdown?: boolean;
}

export const SidebarButton = ({
  link,
  title,
  hasDropdown,
  ...props
}: IProps): React.ReactElement => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {link ? (
        <a href={link} className={style.container}>
          <button className={style.button} {...props}>
            {title}
            {!!hasDropdown && (
              <div onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={!!open ? faAngleUp : faAngleDown} />
              </div>
            )}
          </button>
        </a>
      ) : (
        <div className={style.container}>
          <button className={style.button} {...props}>
            {title}
            {!!hasDropdown && (
              <div onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={!!open ? faAngleUp : faAngleDown} />
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

SidebarButton.defaultProps = {
  hasDropdown: false,
};
