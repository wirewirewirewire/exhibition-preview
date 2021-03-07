import {
  faCode,
  faPaperPlane,
  faPhotoVideo,
  faTvMusic,
} from "@fortawesome/pro-light-svg-icons";

import {
  faCode as faCodeDuo,
  faPaperPlane as faPaperPlaneDuo,
  faPhotoVideo as faPhotoVideoDuo,
  faTvMusic as faTvMusicDuo,
} from "@fortawesome/pro-duotone-svg-icons";

const deviceKindLookUp = {
  "players.react-mediaplayer": { icon: faPhotoVideo, iconDuo: faPhotoVideoDuo },
  "players.mediaplayer": { icon: faTvMusic, iconDuo: faTvMusicDuo },
  "players.jsonplayer": { icon: faCode, iconDuo: faCodeDuo },
  default: { icon: faPaperPlane, iconDuo: faPaperPlaneDuo },
};
export default deviceKindLookUp;
