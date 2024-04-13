import { Visibility } from "@/types/proto/api/v2/memo_service";
import { TAG_REG1 } from "./tag";

export const convertVisibilityFromString = (visibility: string) => {
  switch (visibility) {
    case "PUBLIC":
      return Visibility.PUBLIC;
    case "PROTECTED":
      return Visibility.PROTECTED;
    case "PRIVATE":
      return Visibility.PRIVATE;
    default:
      return Visibility.PUBLIC;
  }
};

export const convertVisibilityToString = (visibility: Visibility) => {
  switch (visibility) {
    case Visibility.PUBLIC:
      return "PUBLIC";
    case Visibility.PROTECTED:
      return "PROTECTED";
    case Visibility.PRIVATE:
      return "PRIVATE";
    default:
      return "PRIVATE";
  }
};

export const ExtractMemoSummary = (content: string, limit: number): string[] => {
  const rs: string[] = [];
  if (!content) {
    return rs;
  }
  const s = content
    .replace(TAG_REG1, "") // 移除 tags
    .replace(/^#+\s*/gm, "") // 移除 md heading, # xxx
    .replace(/\*\*(.*?)\*\*/g, "$1") // 移除 **bold**
    .replace(/\*(.*?)\*/g, "$1") // 移除 *italic*
    .replace(/```[a-zA-Z]+\s*([\s\S]*?)```/g, (_, code) => code.trim()) // 移除 ```code```
    .replace(/`([^`]+)`/g, "$1") // 移除 `code`
    .replace(/- \[ \] /g, "⬜ ")
    .replace(/- \[x\] /g, "✅ ");

  const lines = s.split("\n");
  for (const line of lines) {
    const l = line.trim();
    if (l) {
      rs.push(l);
    }
    if (rs.length >= limit) {
      return rs;
    }
  }
  if (rs) {
    return rs;
  }
  return lines.slice(0, limit);
};
