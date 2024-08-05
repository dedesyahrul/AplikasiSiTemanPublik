import React from 'react';
import {Text} from 'react-native';

const CustomText = ({style, children, ...props}) => {
  return (
    <Text style={style} allowFontScaling={false} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
