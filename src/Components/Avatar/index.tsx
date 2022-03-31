import React from 'react';
import Avatar from 'react-avatar';

type Props = {
  name: string;
  size: string;
};

const AvatarComponent = (props: Props): JSX.Element => {
  return <Avatar color="#808080" size={props.size} name={props.name} />;
};

export default AvatarComponent;
