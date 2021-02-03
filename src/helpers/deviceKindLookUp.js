import {
  faCode,
  faPaperPlane,
  faPhotoVideo,
  faTvMusic,
} from "@fortawesome/pro-light-svg-icons";

const deviceKindLookUp = {
  "players.react-mediaplayer": { icon: faPhotoVideo },
  "players.mediaplayer": { icon: faTvMusic },
  "players.jsonplayer": { icon: faCode },
  default: { icon: faPaperPlane },
};
export default deviceKindLookUp;
