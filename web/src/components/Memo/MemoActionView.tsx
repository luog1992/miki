import { Tooltip } from "@mui/joy";
import classNames from "classnames";
import * as modReact from "react";
import * as modRouter from "react-router-dom";
import * as hooksUser from "@/hooks/useCurrentUser";
import * as protoMemoRelation from "@/types/proto/api/v2/memo_relation_service";
import { Memo, Visibility } from "@/types/proto/api/v2/memo_service";
import * as utilsI18n from "@/utils/i18n";
import { convertVisibilityToString } from "@/utils/memo";
import Icon from "../Icon";
import ReactionSelector from "../ReactionSelector";
import VisibilityIcon from "../VisibilityIcon";
import MemoActionMenu from "./MemoActionMenu";

interface Props {
  memo: Memo;
  showVisibility?: boolean;
  showPinned?: boolean;
}

const MemoActionView: React.FC<Props> = (props: Props) => {
  const { memo } = props;
  const t = utilsI18n.useTranslate();
  const location = modRouter.useLocation();
  const currentUser = hooksUser.useCurrentUser();
  const readonly = memo.creator !== currentUser?.name;
  const isInMemoDetailPage = location.pathname.startsWith(`/m/${memo.uid}`);
  const commentAmount = memo.relations.filter(
    (relation) => relation.type === protoMemoRelation.MemoRelation_Type.COMMENT && relation.relatedMemo === memo.name,
  ).length;

  return (
    <div className="flex flex-row justify-end items-center select-none shrink-0 gap-2">
      <div className="w-auto visible group-hover:visible flex flex-row justify-between items-center gap-2">
        {props.showVisibility && memo.visibility !== Visibility.PRIVATE && (
          <Tooltip title={t(`memo.visibility.${convertVisibilityToString(memo.visibility).toLowerCase()}` as any)} placement="top">
            <span className="flex justify-center items-center hover:opacity-70">
              <VisibilityIcon visibility={memo.visibility} />
            </span>
          </Tooltip>
        )}
        {currentUser && <ReactionSelector className="border-none w-auto h-auto" memo={memo} />}
      </div>
      {!isInMemoDetailPage && (
        <modRouter.Link
          className={classNames(
            "flex flex-row justify-start items-center hover:opacity-70",
            commentAmount === 0 && "visible group-hover:visible",
          )}
          to={`/m/${memo.uid}#comments`}
          unstable_viewTransition
        >
          <Icon.MessageCircleMore className="w-4 h-4 mx-auto text-gray-500 dark:text-gray-400" />
          {commentAmount > 0 && <span className="text-xs text-gray-500 dark:text-gray-400">{commentAmount}</span>}
        </modRouter.Link>
      )}
      {props.showPinned && memo.pinned && (
        <Tooltip title={"Pinned"} placement="top">
          <Icon.Bookmark className="w-4 h-auto text-amber-500" />
        </Tooltip>
      )}
      {!readonly && <MemoActionMenu className="-ml-1" memo={memo} hiddenActions={props.showPinned ? [] : ["pin"]} />}
    </div>
  );
};

export default modReact.memo(MemoActionView);
