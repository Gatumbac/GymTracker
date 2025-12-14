import ScreenContainer from "@/components/ScreenContainer";
import { styles } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TextInput
} from "react-native";

const Routine = () => {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Rutinas</Text>
      <Text style={styles.subtitle}>Tus rutinas en un solo lugar</Text>
      <Ionicons name="barbell" size={150} color='black' /> 
      <TextInput style={styles.input} defaultValue="Ingresa el nombre de la rutina" />
    </ScreenContainer>
  );
}

export default Routine;
