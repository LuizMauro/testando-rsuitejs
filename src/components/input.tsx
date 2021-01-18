import React from "react";
import {
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
  InputProps,
} from "rsuite";

// import { Container } from './styles';
interface IProps extends InputProps {
  name: string;
  message?: string;
  label: string;
  accepter: any;
  error: any;
}

const components: React.FC<IProps> = ({
  accepter,
  error,
  label,
  message,
  name,
  ...rest
}) => {
  return (
    <>
      <FormGroup className={error ? "has-error" : ""}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...rest}
        />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    </>
  );
};

export default components;
