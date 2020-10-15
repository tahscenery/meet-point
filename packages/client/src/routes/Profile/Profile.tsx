import React, { useEffect, useState } from "react";
import { Button, InlineNotification, Tile } from "carbon-components-react";

import { AuthApi, UserApi } from "../../api";
import "./Profile.scss";

type ProfileDetails = {
  name: string;
  email: string;
  created: Date;
};

const ProfileTile = ({ name, email, created }: ProfileDetails) => {
  return (
    <div className="profile-page__container">
      <div className="profile-page__container-left">
        <Tile>
          <ul>
            <li>You are: {name}.</li>
            <li>Your email is: {email}.</li>
            <li>You created your account on {created.toLocaleDateString()}.</li>
          </ul>
        </Tile>
      </div>
      <div className="profile-page__container-right">
        <Button>Hello!</Button>
      </div>
    </div>
  );
};

type ProfileProps = {
  id: string;
};

const Profile = ({ id }: ProfileProps) => {
  const { token } = AuthApi.authentication();

  type Outcome = { didFail: boolean; message?: string };
  const [outcome, setOutcome] = useState<Outcome>({ didFail: false });
  const [loading, setLoading] = useState(true);

  const [values, setValues] = useState<ProfileDetails>({
    name: "",
    email: "",
    created: new Date(),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await UserApi.readUser({ id, token });
      if (response.type === "Success") {
        setOutcome({ didFail: false });
        const { name, email, created } = response.data;
        setValues({ name, email, created: new Date(created) });
      } else {
        setOutcome({ didFail: true, message: response.error });
      }
    };

    fetchUser().then(_ => setLoading(false));
  }, [id, token]);

  return (
    <div className="profile-page">
      {loading ? (
        <p>Loading...</p>
      ) : outcome.didFail ? (
        <InlineNotification
          hideCloseButton
          lowContrast
          kind="error"
          title="Error:"
          subtitle={outcome.message || "An unknown error occurred"}
        />
      ) : (
        <ProfileTile {...values} />
      )}
    </div>
  );
};

export default Profile;
