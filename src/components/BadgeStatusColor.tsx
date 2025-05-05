import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";
import type { OrderStatus } from "@/types";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function BadgeStatusColor({ status }: StatusBadgeProps) {
  const colorClass = getStatusColor(status);

  return (
    <Badge
      className={`${colorClass} uppercase font-bold text-xs px-3 py-1 rounded-md`}
    >
      {status.replace("_", " ")}
    </Badge>
  );
}
