import { createContext } from "react";

export enum CurrentProgress {
  ACCOUNT,
  PERSONALIZATION,
  SELECT_INTERESTS,
  CONFIRM,
}

export interface RegistrationDetails {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: Buffer;
  interests?: string[];
}

export interface RegistrationContextProps {
  currentProgress: CurrentProgress;
  registrationDetails: RegistrationDetails;
  setCurrentProgress: (_: CurrentProgress) => void;
  setRegistrationDetails: (_: RegistrationDetails) => void;
}

const RegistrationContext = createContext<RegistrationContextProps>({
  currentProgress: CurrentProgress.ACCOUNT,
  registrationDetails: {},
  setCurrentProgress: _ => {},
  setRegistrationDetails: _ => {},
});

export default RegistrationContext;
