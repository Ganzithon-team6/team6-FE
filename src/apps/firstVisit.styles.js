import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 40,
    textAlign: "center",
    color: "#222",
  },
  buttonWrapper: {
    width: "100%",
    gap: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#1E90FF",
    paddingVertical: 18,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonSecondary: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1E90FF",
  },
  buttonTextSecondary: {
    color: "#1E90FF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
