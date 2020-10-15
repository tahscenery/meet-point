import React, { useContext } from "react";
import { Tag } from "carbon-components-react";

import RegistrationContext, {
  CurrentProgress,
} from "../../../context/register-context";
import { Form } from "../../../components";
import "./Confirm.scss";

const Confirm = () => {
  const context = useContext(RegistrationContext);
  console.log(context.registrationDetails);

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.setCurrentProgress(CurrentProgress.SELECT_INTERESTS);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form
      title="Summary"
      caption="Please review the details you have provided"
      submitButtonText="Create account"
      showPreviousButton={true}
      onSubmit={handleSubmit}
      onPrevious={handlePrevious}>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{context.registrationDetails.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{context.registrationDetails.email}</td>
          </tr>
          <tr>
            <td>Selected interests</td>
            <td>
              {context.registrationDetails.interests.map((interest, i) => (
                <Tag key={i} title="Clear filter" type="cool-gray">
                  {interest}
                </Tag>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  );
};

export default Confirm;
