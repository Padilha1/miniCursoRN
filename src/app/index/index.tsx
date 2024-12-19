import { useCallback, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  Alert,
  Linking,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { s } from "./styles";
import { colors } from "@/src/styles/colors";
import { Categories } from "@/src/components/categories";
import { Option } from "@/src/components/option";
import { Link } from "@/src/components/link";
import { categories } from "@/src/utils/categories";
import { linkStorage, LinkStorage } from "@/src/storage/link-storage";

export default function Index() {
  const [category, setCategory] = useState(categories[0].name);
  const [links, setLinks] = useState<LinkStorage[]>([]);
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
  const [isOpenModal, setIsOpenModal] = useState(false);

  async function getLinks() {
    try {
      const response = await linkStorage.get();
      const filtered = response.filter((links) => links.category === category);
      setLinks(filtered);
    } catch (error) {
      Alert.alert("Erro", "Erro ao listar os links!");
    }
  }
  function handleDetails(selected: LinkStorage = {} as LinkStorage) {
    setIsOpenModal(!isOpenModal);
    setLink(selected);
  }

  async function removeLink() {
    try {
      await linkStorage.remove(link.id);
      getLinks();
      setIsOpenModal(false);
    } catch (error) {
      Alert.alert("Erro", "Erro ao remover o link!");
    }
  }
  async function handleRemove() {
    Alert.alert("Confirmação", "Deseja realmente excluir o link?", [
      { style: "cancel", text: "Nao" },
      { text: "Sim", onPress: () => removeLink() },
    ]);
  }

  async function handleOpen() {
    try {
      const isOpenable = await Linking.canOpenURL(link.url);
      if (!isOpenable) {
        return Alert.alert("Erro", "Link inválido!");
      }
      await Linking.openURL(link.url);
      setIsOpenModal(false);
    } catch (error) {
      Alert.alert("Erro", "Erro ao abrir o link!");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, [category])
  );

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Image source={require("@/assets/images/logo.png")} style={s.logo} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => router.navigate("/add")}
        >
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>

      <Categories onChange={setCategory} selected={category} />

      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            name={item.name}
            url={item.url}
            onDetails={() => handleDetails(item)}
          />
        )}
        style={s.links}
        contentContainerStyle={s.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={isOpenModal} animationType="slide">
        <View style={s.modal}>
          <View style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalCategory}>{link.category}</Text>
              <TouchableOpacity onPress={() => handleDetails()}>
                <MaterialIcons
                  name="close"
                  size={20}
                  color={colors.gray[400]}
                />
              </TouchableOpacity>
            </View>

            <Text style={s.modalLinkName}> {link.name}</Text>
            <Text style={s.modalUrl}>{link.url}</Text>
            <View style={s.modalFooter}>
              <Option
                name="Excluir"
                icon="delete"
                variant="secondary"
                onPress={handleRemove}
              />
              <Option name="Abrir" icon="language" onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
