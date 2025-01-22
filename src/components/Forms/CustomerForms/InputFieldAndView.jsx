import { CustomerViewCommon } from "@/Commons/CustomerViewCommon";
import { InputCommon } from "@/Commons/FormCommons";
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
            VALUE={VALUE || "N/A"}
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
