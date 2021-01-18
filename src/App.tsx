import React from "react";

import ReactJson from "react-json-view";
import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  FormGroup,
  Input,
  InputNumber,
  IntlProvider,
  Radio,
  RadioGroup,
  Schema,
  SelectPicker,
} from "rsuite";
import ptBR from "rsuite/lib/IntlProvider/locales/pt_BR";
import "rsuite/dist/styles/rsuite-default.css";

import CustomField from "./components/input";

import { MaskCPFeCNPJ } from "./utils/util";

const data = {
  number: 10,
  skills: ["Node.js"],
  browser: "Chrome",
  status: "open",
  documento: "",
};

interface IForm {
  number: number;
  skills: string[];
  browser: string;
  status: string;
  documento: string;
}

interface IError {
  number: string;
  skills: string;
  browser: string;
  status: string;
  documento: string;
}

const { ArrayType, StringType } = Schema.Types;
const model = Schema.Model({
  documento: StringType()
    .addRule((value, data) => {
      return new RegExp(
        "([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})"
      ).test(value);
    }, "Please enter legal characters")
    .isRequired("This field is required."),
  skills: ArrayType()
    .minLength(2, "Selecione pelo menos 2 skills")
    .isRequired("This field is required."),
  status: StringType()
    .minLength(2, "Selecione pelo menos 2 status")
    .isRequired("This field is required."),
});

const App: React.FC = () => {
  const [formValue, setFormValue] = React.useState<IForm>(data);
  const [formError, setFormError] = React.useState<IError>({} as IError);

  const form = React.useRef<any>(null);

  const handleSubmit = () => {
    console.log(formValue);

    // formValue.number = 666;
    // form.current.formValue = formValue; // para setar dados diretamente no formulario

    if (!form.current.check()) {
      Alert.error("Error");
      return;
    }
    Alert.success("Success");
  };

  return (
    <IntlProvider locale={ptBR}>
      <div>
        {/* <JSONView formValue={formValue} formError={formError} /> */}
        <ReactJson src={formValue} />
        <ReactJson src={formError} />
        <Form
          style={{ padding: 20 }}
          ref={form}
          onChange={(formValue: any) => {
            formValue.documento = MaskCPFeCNPJ(formValue.documento).valueModify;
            setFormValue(formValue);
          }}
          onCheck={(formError: any) => {
            console.log(formError, "formError");
            setFormError(formError);
          }}
          formValue={formValue}
          model={model}
        >
          <CustomField
            name="documento"
            label="Documento"
            accepter={Input}
            error={formError.documento}
            maxLength={18}
          />

          <CustomField
            name="number"
            label="Number"
            accepter={InputNumber}
            error={formError.number}
          />

          <CustomField
            name="skills"
            label="Skills"
            accepter={CheckboxGroup}
            error={formError.skills}
          >
            <Checkbox value={"Node.js"}>Node.js</Checkbox>
            <Checkbox value={"CSS3"}>CSS3</Checkbox>
            <Checkbox value={"Javascript"}>Javascript</Checkbox>
            <Checkbox value={"HTML5"}>HTML5</Checkbox>
          </CustomField>

          <CustomField
            name="browser"
            label="Browser"
            accepter={RadioGroup}
            error={formError.browser}
            inline
          >
            <Radio value={"Chrome"}>Chrome</Radio>
            <Radio value={"FireFox"}>FireFox</Radio>
            <Radio value={"IE"}>IE</Radio>
          </CustomField>

          <CustomField
            disabled
            name="status"
            label="Status"
            accepter={SelectPicker}
            error={formError.status}
            style={{ display: "inline-block", width: 200 }}
            data={[
              { label: "Todo", value: "todo" },
              { label: "Open", value: "open" },
              { label: "Close", value: "close" },
              { label: "Error", value: "error" },
              { label: "Processing", value: "processing" },
              { label: "Done", value: "done" },
            ]}
          />

          <FormGroup>
            <Button appearance="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </FormGroup>
        </Form>
      </div>
    </IntlProvider>
  );
};

export default App;
