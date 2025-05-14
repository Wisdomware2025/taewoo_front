// utils/dateUtils.ts
export function formatChatDate(dateString: string): string {
  const msgDate = new Date(dateString);
  const now = new Date();

  // 자정 기준으로 비교
  const today = new Date(now.setHours(0, 0, 0, 0));
  const target = new Date(msgDate.setHours(0, 0, 0, 0));

  const diffTime = today.getTime() - target.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';

  return `${msgDate.getFullYear()}년 ${msgDate.getMonth() + 1}월 ${msgDate.getDate()}일`;
}
