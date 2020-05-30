import React from 'react';

import s from './MoreWork.module.css';

const MoreWork = _ => {
  const works = [1, 2, 3];

  return (
    <div className={s.moreWork}>
      <div className={s.headingWrapper}>
        <h2 className={s.heading}>More work</h2>
        <button className={s.btnNext} />
      </div>

      <div className={s.works}>
        {works.map((work, i) => (
          <div key={i} className={s.work + ' ' + (i === 0 ? s.active : '')}>
            <img
              alt="as"
              src="https://i.pravatar.cc/300/350"
              className={s.img}
            />

            <div className={s.bottom}>
              <img
                alt="as"
                src="https://i.pravatar.cc/70"
                className={s.avatar}
              />

              <div>
                <h1 className={s.subHeading}>Heading here</h1>
                <p className={s.date}>13 December 2020</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreWork;
