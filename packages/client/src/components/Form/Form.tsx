import React from "react";
import { Add16 } from "@carbon/icons-react";
import { Button, Form as CarbonForm, Tile } from "carbon-components-react";

import "./Form.scss";

function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log("Form.handleOnSubmit");
}

type FormProps = {
  title: string;
  caption: string;
  captionLink: { link: string; text: string } | null;
  submitButtonText: string;
  children: any[];
};

const Form = (props: FormProps) => {
  const { title, caption, captionLink, submitButtonText, children } = props;

  return (
    <div className="form">
      <Tile style={{ padding: 0 }}>
        <CarbonForm onSubmit={handleOnSubmit}>
          <div className="form-content">
            <div className="form-header">
              <h3>{title}</h3>
              <p>
                {caption}{" "}
                {captionLink && (
                  <a href={captionLink.link}>{captionLink.text}</a>
                )}
              </p>
            </div>

            <div className="form-body">
              <hr className="form-body-element" />
              {children.map(child => (
                <div className="form-body-element">{child}</div>
              ))}
            </div>
          </div>

          <div className="form-footer">
            <Button
              icon={Add16}
              style={{ minWidth: "50%", minHeight: "4rem", paddingTop: "0" }}
            >
              {submitButtonText}
            </Button>
          </div>
        </CarbonForm>
      </Tile>
    </div>
  );
};

export default Form;
