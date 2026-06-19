import { Composition } from "remotion";
import { WowDemo, TOTAL } from "./WowDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WowDemo"
      component={WowDemo}
      durationInFrames={TOTAL}
      fps={30}
      width={1080}
      height={1080}
    />
  );
};
