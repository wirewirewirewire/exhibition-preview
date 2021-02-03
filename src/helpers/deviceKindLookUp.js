import {
  faCode,
  faPaperPlane,
  faPhotoVideo,
  faTvMusic,
} from "@fortawesome/pro-duotone-svg-icons";
import { faRectanglePortrait } from "@fortawesome/pro-regular-svg-icons";
import { faTreasureChest } from "@fortawesome/pro-solid-svg-icons";

const deviceKindLookUp = {
  "players.react-mediaplayer": { icon: faPhotoVideo },
  "players.mediaplayer": { icon: faTvMusic },
  "players.jsonplayer": { icon: faCode },
  default: { icon: faPaperPlane },
};
export default deviceKindLookUp;
