import React from 'react';
import style from './style.module.scss';

export const Button = ({ link, title, ...props }: { link: string; title: string }) =>
  link ? (
    <a href={link} className={style.container}>
      <button className={style.button} {...props}>
        {title}
      </button>
    </a>
  ) : (
    <button className={style.button} {...props}></button>
  );
