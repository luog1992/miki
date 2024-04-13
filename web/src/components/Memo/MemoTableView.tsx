import * as modReact from "react";
import * as protoMemo from "@/types/proto/api/v2/memo_service";
import * as utilsMemo from "@/utils/memo";
import MemoActionView from "./MemoActionView";

interface Props {
  memoList: protoMemo.Memo[];
  className?: string;
}

const MemoTableView: React.FC<Props> = (props: Props) => {
  const memoList = props.memoList;
  return (
    <div className="w-full shadow flex flex-row justify-start items-start px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-400">
      <table className="table-auto min-w-full divide-y divide-gray-300 dark:divide-zinc-600">
        <thead>
          <tr>
            <th scope="col" className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-400">
              Creator
            </th>
            <th scope="col" className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-400">
              Content
            </th>
            <th scope="col" className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-400">
              CreatedAt
            </th>
            <th scope="col" className="p-3 text-right relative">
              Ops
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
          {memoList.map((memo) => (
            <tr key={`${memo.name}-${memo.updateTime}`}>
              <td className="p-2 whitespace-nowrap text-sm">{memo.creator}</td>
              <td className="p-2 whitespace-nowrap text-sm">
                {utilsMemo.ExtractMemoSummary(memo.content, 1).map((l) => (
                  <p key={l.slice(0, 8)}>{l.slice(0, 50)}</p>
                ))}
              </td>
              <td className="p-2 whitespace-nowrap text-sm">
                <relative-time
                  datetime={memo.createTime?.toISOString()}
                  format={Date.now() - memo.createTime!.getTime() > 1000 * 60 * 60 * 24 ? "datetime" : "auto"}
                  tense="past"
                ></relative-time>
              </td>
              <td className="relative p-2 whitespace-nowrap text-rightXXX text-sm">
                <MemoActionView memo={memo} showVisibility showPinned />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default modReact.memo(MemoTableView);
