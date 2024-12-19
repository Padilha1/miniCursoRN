import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors } from "@/src/styles/colors";
import { s } from "./styles";
import { Categories } from "@/src/components/categories";
import { Input } from "@/src/components/input";
import { Button } from "@/src/components/button";
import { linkStorage } from "@/src/storage/link-storage";

export default function Add() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert("Categoria", "Selecione uma categoria!");
      }
      if (!name.trim()) return Alert.alert("Nome", "Informe o nome!");
      if (!url.trim()) return Alert.alert("URL", "Informe a url!");

      await linkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      });

      Alert.alert("Sucesso", "Link adicionado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao adicionar link!");
      console.log(error);
    }
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>
        <Text style={s.title}>Novo</Text>
      </View>

      <Text style={s.label}>Selecione uma categoria</Text>
      <Categories onChange={setCategory} selected={category} />

      <View style={s.form}>
        <Input placeholder="Nome do Link" onChangeText={setName} />
        <Input placeholder="URL" onChangeText={setUrl} autoCapitalize="none" />

        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  );
}
