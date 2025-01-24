import Avatar from '@mui/material/Avatar';

type StringAvatarProps = {
  name: string
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
    var names = name.split(' ');
    var avatarString = names.length == 1 ? names[0][0] : names.length >= 2 ? names[0][0] + names[1][0] : '';
    return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${avatarString}`,
  };
}

const StringAvatar: React.FC<StringAvatarProps> = ({ name }: StringAvatarProps) => {
  return (
    <Avatar {...stringAvatar(name)} />
  );
}

export default StringAvatar;
