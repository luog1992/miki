import * as modJoy from "@mui/joy";
import classNames from "classnames";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useFilterStore } from "@/store/module";
import Icon from "./Icon";

interface Props {
  className?: string;
  setMemoListLayout?: any;
}

const MemoFilter = (props: Props) => {
  // const t = useTranslate();
  const user = useCurrentUser();
  const location = useLocation();
  const filterStore = useFilterStore();
  const filter = filterStore.state;
  const { tag: tagQuery, text: textQuery, visibility } = filter;
  const showFilter = Boolean(tagQuery || textQuery || visibility);
  const showSetMemoListLayout = Boolean(props.setMemoListLayout && user);

  useEffect(() => {
    filterStore.clearFilter();
  }, [location]);

  if (!showFilter && !showSetMemoListLayout) {
    return null;
  }

  return (
    <div
      className={classNames(
        `w-full flex flex-row justify-start items-start flex-wrap gap-2 text-sm leading-7 dark:text-gray-400`,
        props.className,
      )}
    >
      <div className="shrink-0 flex flex-row justify-start items-center text-gray-400">
        {user && props.setMemoListLayout && (
          <modJoy.IconButton
            variant="plain"
            size="sm"
            onClick={() => {
              props.setMemoListLayout("default");
            }}
          >
            <Icon.Layers2 className="w-4 h-auto mr-1" />
          </modJoy.IconButton>
        )}
        {user && props.setMemoListLayout && (
          <modJoy.IconButton
            size="sm"
            onClick={() => {
              props.setMemoListLayout("table");
            }}
          >
            <Icon.Table2 className="w-4 h-auto mr-1" />
          </modJoy.IconButton>
        )}
        {/* <span>{t("common.filter")}:</span> */}
        {/* {showFilter ? <Icon.Filter className="w-4 h-auto mr-1" /> : <></>} */}
      </div>
      <div
        className={
          "max-w-xs flex flex-row justify-start items-center px-2 mr-2 cursor-pointer dark:text-gray-400 bg-gray-200 dark:bg-zinc-800 rounded whitespace-nowrap truncate hover:line-through " +
          (tagQuery ? "" : "!hidden")
        }
        onClick={() => {
          filterStore.setTagFilter(undefined);
        }}
      >
        <Icon.Hash className="w-4 h-auto mr-1 text-gray-500 dark:text-gray-400" /> {tagQuery}
        <Icon.X className="w-4 h-auto ml-1 opacity-40" />
      </div>
      <div
        className={
          "max-w-xs flex flex-row justify-start items-center px-2 mr-2 cursor-pointer dark:text-gray-400 bg-gray-200 dark:bg-zinc-800 rounded whitespace-nowrap truncate hover:line-through " +
          (visibility ? "" : "!hidden")
        }
        onClick={() => {
          filterStore.setMemoVisibilityFilter(undefined);
        }}
      >
        <Icon.Eye className="w-4 h-auto mr-1 text-gray-500 dark:text-gray-400" /> {visibility}
        <Icon.X className="w-4 h-auto ml-1 opacity-40" />
      </div>
      <div
        className={
          "max-w-xs flex flex-row justify-start items-center px-2 mr-2 cursor-pointer dark:text-gray-400 bg-gray-200 dark:bg-zinc-800 rounded whitespace-nowrap truncate hover:line-through " +
          (textQuery ? "" : "!hidden")
        }
        onClick={() => {
          filterStore.setTextFilter(undefined);
        }}
      >
        <Icon.Search className="w-4 h-auto mr-1 text-gray-500 dark:text-gray-400" /> {textQuery}
        <Icon.X className="w-4 h-auto ml-1 opacity-40" />
      </div>
    </div>
  );
};

export default MemoFilter;
