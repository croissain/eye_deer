import { FluidLayout } from "layouts";

import GroupInfo from "../GroupInfo";
import "../styles.scss";
import ChapterList from "./ChapterList";

const Chapter = () => {
  return (
    <FluidLayout>
      <ChapterList name="" />
      <GroupInfo />
    </FluidLayout>
  );
};

export default Chapter;
