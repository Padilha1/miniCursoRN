import { Text, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { s } from "./styles";
import { colors } from "@/src/styles/colors";

type Props = PressableProps & {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isSelected: boolean;
};

export function Category({ name, icon, isSelected, ...rest }: Props) {
  const color = isSelected ? colors.green[300] : colors.gray[400];
  return (
    <Pressable style={s.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={color} />

      <Text style={[s.name, { color }]}>{name}</Text>
    </Pressable>
  );
}
