import React from "react";
import { ArrowRight16 } from "@carbon/icons-react";
import {
  Button,
  Form as CarbonForm,
  InlineNotification,
  Tile,
} from "carbon-components-react";

function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("Form.handleOnSubmit");
}

type FormProps = {
  title: string;
  caption: string;
  captionLink?: { link: string; text: string };
  submitButtonText?: string;
  canSubmit?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isError?: boolean;
  errorMessage?: string;
  children?: React.ReactChild[];
};

const Form = (props: FormProps) => {
  const {
    title,
    caption,
    captionLink,
    submitButtonText,
    canSubmit,
    onSubmit,
    isError,
    errorMessage,
    children,
  } = props;

  return (
    <div className="form">
      <Tile style={{ padding: 0 }}>
        <CarbonForm onSubmit={onSubmit ? onSubmit : handleOnSubmit}>
          <div className="form-content">
            <div className={isError ? "form-header-error" : "form-header"}>
              <h3>{title}</h3>
              <p>
                {caption}{" "}
                {captionLink && (
                  <a href={captionLink.link}>{captionLink.text}</a>
                )}
              </p>
            </div>

            {isError && (
              <InlineNotification
                hideCloseButton
                lowContrast
                kind="error"
                title="Error:"
                subtitle={errorMessage || "An error occurred"}
              />
            )}

            <div className="form-body">
              <hr className="form-body-element" />
              {children.map((child, i) => (
                <div key={i} className="form-body-element">
                  {child}
                </div>
              ))}
            </div>
          </div>

          <div className="form-footer">
            <Button
              type="submit"
              renderIcon={ArrowRight16}
              disabled={!canSubmit}
              style={{ minWidth: "50%", minHeight: "4rem", paddingTop: "0" }}
            >
              {submitButtonText || "Continue"}
            </Button>
          </div>
        </CarbonForm>
      </Tile>
    </div>
  );
};

export default Form;
