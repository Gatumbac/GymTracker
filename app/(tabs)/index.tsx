import ScreenContainer from "@/components/ScreenContainer";
import { commonStyles } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TextInput
} from "react-native";

const Index = () => {
  return (
    <ScreenContainer>
      <Text style={commonStyles.title}>GymTracker!</Text>
      <Text style={commonStyles.subtitle}>Registrar tus entrenamientos nunca fue tan fácil</Text>
      <Ionicons name="barbell" size={150} color='black' />
      <TextInput style={commonStyles.input} defaultValue="Ingresa tu nombre" />
    </ScreenContainer>
  );
}

export default Index;

