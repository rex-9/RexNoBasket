import { ITeamUnitProps } from "./team";

export interface IInputProps {
  required: boolean;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  register: any;
  error: string | undefined;
  disabled: boolean;
}

export interface IButtonProps {
  variant: "primary" | "bordered" | "danger" | "icon";
  type: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  disabled: boolean;
  label?: string | undefined;
  icon?: React.ReactElement<any> | undefined;
  handleClick?: () => void;
}

export interface ISelectProps {
  value: number | string;
  options: ITeamUnitProps[];
  handleSelectTeam: (teamId: number) => void;
}
