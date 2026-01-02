import ScreenContainer from "@/components/ScreenContainer";
import { commonStyles } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TextInput
} from "react-native";

const Routine = () => {
  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>Rutinas</Text>
      <Text style={commonStyles.subtitle}>Tus rutinas en un solo lugar</Text>
      <Ionicons name="barbell" size={150} color='black' />
      <TextInput style={commonStyles.input} defaultValue="Ingresa el nombre de la rutina" />
    </ScreenContainer>
  );
}

export default Routine;
