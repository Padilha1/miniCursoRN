import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { s } from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={s.container} {...rest} activeOpacity={0.7}>
      <Text style={s.title}>{title}</Text>
    </TouchableOpacity>
  );
}
