import React from 'react';
import 'tippy.js/dist/tippy.css';
import Tooltip from '@tippyjs/react';
import infoIcon from '../../assets/svg/required-icon.svg';
import '../../assets/styles/authenticationStyles/PasswordInfo.scss';

const PasswordInfo: React.FC = () => {
  return (
    <Tooltip
      content={
        <div>
          <p>Passwords must contain at least 8 characters, including UPPERCASE, lowercase letters, number and a special character(@#$%^&*?)</p>
        </div>
      }
      arrow={false}
      placement='bottom'
      animation='shift-away'
      maxWidth='240px'
      duration={300}
      offset={[-100, 10]}
      className='custom-tooltip'
    >
      <img src={infoIcon} alt="info icon" className='icon'/>
    </Tooltip>
  );
};

export default PasswordInfo;
