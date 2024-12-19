import { FlatList } from "react-native";
import { s } from "./styles";
import { Category } from "../category";
import { categories } from "@/src/utils/categories";

type Props = {
  selected: string;
  onChange: (category: string) => void;
};

export function Categories({ selected, onChange }: Props) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          icon={item.icon}
          isSelected={item.name === selected}
          onPress={() => onChange(item.name)}
        />
      )}
      horizontal
      style={s.container}
      contentContainerStyle={s.content}
      showsHorizontalScrollIndicator={false}
    />
  );
}
