import { TextInput, TextInputProps } from "react-native";

import { s } from "./styles";
import { colors } from "@/src/styles/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      autoComplete="off"
      autoCorrect={false}
      style={s.container}
      {...rest}
      placeholderTextColor={colors.gray[400]}
    />
  );
}
