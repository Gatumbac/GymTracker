// ============ Profile Validation Types ============
export interface ProfileValidationErrors {
  birth_date?: string;
  height?: string;
  weight?: string;
  bio?: string;
}

// ============ Login Validation Types ============
export interface LoginValidationErrors {
  username?: string;
  password?: string;
}

// ============ Register Validation Types ============
export interface RegisterValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
}

export const validateProfileData = (data: {
  birth_date: string;
  height: string;
  weight: string;
  bio: string;
}): ProfileValidationErrors => {
  const errors: ProfileValidationErrors = {};

  // Validar fecha de nacimiento
  if (!data.birth_date) {
    errors.birth_date = 'La fecha de nacimiento es requerida';
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.birth_date)) {
      errors.birth_date = 'Formato inválido (YYYY-MM-DD)';
    } else {
      const birthDate = new Date(data.birth_date);
      const today = new Date();

      if (birthDate > today) {
        errors.birth_date = 'La fecha no puede ser futura';
      } else {
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) {
          errors.birth_date = 'Debes tener al menos 13 años';
        }
      }
    }
  }

  // Validar altura
  if (!data.height) {
    errors.height = 'La altura es requerida';
  } else if (data.height.split('.').length === 2 && data.height.split('.')[1].length > 2) {
    errors.height = 'Formato inválido (máximo dos decimales)';
  } else {
    const heightNum = parseFloat(data.height);
    if (isNaN(heightNum)) {
      errors.height = 'Debe ser un número válido';
    } else if (heightNum < 100 || heightNum > 250) {
      errors.height = 'Altura debe estar entre 100-250 cm';
    }
  }

  // Validar peso
  if (!data.weight) {
    errors.weight = 'El peso es requerido';
  } else if (data.weight.split('.').length === 2 && data.weight.split('.')[1].length > 2) {
    errors.weight = 'Formato inválido (máximo dos decimales)';
  } else {
    const weightNum = parseFloat(data.weight);
    if (isNaN(weightNum)) {
      errors.weight = 'Debe ser un número válido';
    } else if (weightNum < 30 || weightNum > 300) {
      errors.weight = 'Peso debe estar entre 30-300 kg';
    }
  }

  // Validar biografía (opcional)
  if (data.bio && data.bio.length > 500) {
    errors.bio = 'Máximo 500 caracteres';
  }

  return errors;
};

// ============ Login Validation ============
export const validateLoginData = (data: {
  username: string;
  password: string;
}): LoginValidationErrors => {
  const errors: LoginValidationErrors = {};

  // Validar username
  if (!data.username) {
    errors.username = 'El usuario es requerido';
  } else if (data.username.length < 3) {
    errors.username = 'Mínimo 3 caracteres';
  } else if (data.username.length > 150) {
    errors.username = 'Máximo 150 caracteres';
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.username = 'Solo letras, números y guión bajo';
  }

  // Validar password
  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  } else if (data.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres';
  }

  return errors;
};

// ============ Register Validation ============
export const validateRegisterData = (data: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}): RegisterValidationErrors => {
  const errors: RegisterValidationErrors = {};

  // Validar username
  if (!data.username) {
    errors.username = 'El usuario es requerido';
  } else if (data.username.length < 3) {
    errors.username = 'Mínimo 3 caracteres';
  } else if (data.username.length > 150) {
    errors.username = 'Máximo 150 caracteres';
  } else if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.username = 'Solo letras, números y guión bajo';
  }

  // Validar email
  if (!data.email) {
    errors.email = 'El email es requerido';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = 'Email inválido';
    }
  }

  // Validar password
  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  } else if (data.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres';
  } else if (!/[A-Z]/.test(data.password)) {
    errors.password = 'Debe contener al menos una mayúscula';
  } else if (!/[a-z]/.test(data.password)) {
    errors.password = 'Debe contener al menos una minúscula';
  } else if (!/[0-9]/.test(data.password)) {
    errors.password = 'Debe contener al menos un número';
  }

  // Validar first_name
  if (!data.first_name) {
    errors.first_name = 'El nombre es requerido';
  } else if (data.first_name.length < 2) {
    errors.first_name = 'Mínimo 2 caracteres';
  } else if (data.first_name.length > 50) {
    errors.first_name = 'Máximo 50 caracteres';
  }

  // Validar last_name
  if (!data.last_name) {
    errors.last_name = 'El apellido es requerido';
  } else if (data.last_name.length < 2) {
    errors.last_name = 'Mínimo 2 caracteres';
  } else if (data.last_name.length > 50) {
    errors.last_name = 'Máximo 50 caracteres';
  }

  return errors;
};
