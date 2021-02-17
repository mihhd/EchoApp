import React from "react";
import { Text } from "react-native";

function AppText({ children, style, textColor, ...otherProps }) {
  return (
    <Text style={[textColor, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
