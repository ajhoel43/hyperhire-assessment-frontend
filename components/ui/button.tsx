import type React from "react";
import {
  TouchableOpacity,
  type TouchableOpacityProps
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode
};

const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity className="p-3 rounded-full shadow-md bg-gray-50" onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
