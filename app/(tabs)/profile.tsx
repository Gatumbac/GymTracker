import Button from "@/components/Button";
import ScreenContainer from "@/components/ScreenContainer";
import { styles } from "@constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks/useAuth";
import {
  Text
} from 'react-native';

const Profile = () => {
  const { handleLogout } = useAuth();
  return (
    <ScreenContainer>
      <Text style={styles.title}>Perfil </Text>
      <Text style={styles.subtitle}>Maneja tu información personal</Text>
      <Ionicons name="person" size={150} color='black' /> 
      <Button title="Cerrar Sesion" onPress={handleLogout}/>
    </ScreenContainer>
  );
}

export default Profile;
