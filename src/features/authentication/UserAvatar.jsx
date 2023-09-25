import styled from "styled-components";
import { useUser } from "./useUser";

const Image = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 999rem;
  object-fit: cover;
  object-position: center;
  border: 1px solid var(--color-gray-100);
`;

function UserAvatar() {
  const { user } = useUser();
  const avatar = user.user_metadata.avatar;

  return <Image src={avatar || "default-user.jpg"} />;
}

export default UserAvatar;
