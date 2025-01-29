import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";
import {
  CheckboxCommon,
  ComboboxCommon,
  InputCommon,
  RadioGroupCommon,
  SwitchCommon,
} from "@/Commons/FormCommons";
import { Badge } from "@/components/ui/badge";
import { DATA_VIEW_MODE } from "@/Constant";

export const InputFieldAndView = ({
  LABEL,
  NAME,
  TYPE,
  PLACEHOLDER,
  ICON,
  VALUE,
  IS_REQUIRED = false,
  MODE,
  EDIT,
  FORM,
}) => {
  return (
    <>
      {MODE === DATA_VIEW_MODE.VIEW && !EDIT ? (
        <CustomerViewCommon
          TITLE={LABEL}
          ICON={ICON}
          VALUE={VALUE == 0 ? 0 : VALUE || "N/A"}
        />
      ) : (
        <InputCommon
          LABEL={LABEL}
          IS_REQUIRED={IS_REQUIRED}
          NAME={NAME}
          TYPE={TYPE}
          PLACEHOLDER={PLACEHOLDER}
          CONTROL={FORM.control}
          ICON={ICON}
          VALUE={VALUE}
        />
      )}
    </>
  );
};

export const CheckboxFieldAndView = ({
  LABEL,
  NAME,
  ICON,
  VALUE,
  MODE,
  EDIT,
  FORM,
}) => {
  return (
    <>
      {MODE === DATA_VIEW_MODE.VIEW && !EDIT ? (
        <CustomerViewCommon TITLE={LABEL} ICON={ICON} VALUE={VALUE || "N/A"} />
      ) : (
        <CheckboxCommon LABEL={LABEL} NAME={NAME} CONTROL={FORM.control} />
      )}
    </>
  );
};
export const RadioGroupAndView = ({
  LABEL,
  NAME,
  ICON,
  OPTIONS,
  VALUE,
  MODE,
  EDIT,
  FORM,
  DEFAULT_VALUE,
}) => {
  return (
    <>
      {MODE === DATA_VIEW_MODE.VIEW && !EDIT ? (
        <CustomerViewCommon TITLE={LABEL} ICON={ICON} VALUE={VALUE || "N/A"} />
      ) : (
        <RadioGroupCommon
          LABEL={LABEL}
          IS_REQUIRED={true}
          NAME={NAME}
          OPTIONS={OPTIONS}
          CONTROL={FORM.control}
          ICON={ICON}
          DEFAULT_VALUE={DEFAULT_VALUE}
        />
      )}
    </>
  );
};
export const SelectAndView = ({
  LABEL,
  NAME,
  PLACEHOLDER,
  OPTIONS,
  ICON,
  VALUE,
  IS_REQUIRED = false,
  MODE,
  EDIT,
  FORM,
}) => {
  return (
    <>
      {MODE === DATA_VIEW_MODE.VIEW && !EDIT ? (
        <CustomerViewCommon TITLE={LABEL} ICON={ICON} VALUE={VALUE || "N/A"} />
      ) : (
        <ComboboxCommon
          LABEL={LABEL}
          NAME={NAME}
          OPTIONS={OPTIONS}
          CONTROL={FORM.control}
          IS_REQUIRED={IS_REQUIRED}
          PLACEHOLDER={PLACEHOLDER}
        />
      )}
    </>
  );
};
export const SwitchAndView = ({
  LABEL,
  NAME,
  ICON,
  VALUE,
  IS_REQUIRED = false,
  MODE,
  EDIT,
  FORM,
  DEFAULT_VALUE,

}) => {
  return (
    <>
      {MODE === DATA_VIEW_MODE.VIEW && !EDIT ? (
        <CustomerViewCommon
          TITLE={LABEL}
          ICON={ICON}
          VALUE={VALUE == false ? <Badge variant="secondary">Disable</Badge>: <Badge>Enable</Badge> || "N/A"}
        />
      ) : (
        <SwitchCommon
          LABEL={LABEL}
          IS_REQUIRED={IS_REQUIRED}
          VALUE={VALUE}
          NAME={NAME}
          CONTROL={FORM.control}
          ICON={ICON}
          DEFAULT_VALUE={DEFAULT_VALUE}

        />
      )}
    </>
  );
};