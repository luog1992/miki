import * as modReact from "react";
import * as protoMemo from "@/types/proto/api/v2/memo_service";
import MemoView from "../MemoView";

interface Props {
  memoList: protoMemo.Memo[];
  className?: string;
}

const MemoListView: React.FC<Props> = (props: Props) => {
  const memoList = props.memoList;
  return (
    <>
      {memoList.map((memo) => (
        <MemoView key={`${memo.name}-${memo.updateTime}`} memo={memo} showVisibility showPinned />
      ))}
    </>
  );
};

export default modReact.memo(MemoListView);
