import { showMessage } from "react-native-flash-message";
import { color } from '../theme/color';
import { font } from '../theme/font';

export const showSuccessMessage = (message) => {
  showMessage({
    message: message,
    // description: description,
    type: "default",
    backgroundColor: color.GREEN,
    color: color.WHITE,
    floating: true,
    icon:{
      icon:"success",
      position:"left"
    },
    titleStyle:{
      fontFamily: font.REGULAR
    }
  });
};

export const showErrorMessage = (message) => {
  showMessage({
    message: message,
    // description: description,
    type: "default",
    backgroundColor: color.RED_PRIMARY,
    color: color.WHITE,
    floating: true,
    icon:{
      icon:"danger",
      position:"left"
    },
    titleStyle:{
      fontFamily: font.REGULAR
    }
  });
};

