import { StyleSheet } from "react-native";
import { colors } from "@/src/styles/colors";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: colors.gray[200],
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    color: colors.gray[400],
    paddingHorizontal: 24,
  },
  form: {
    padding: 24,
    gap: 16,
  },
});
