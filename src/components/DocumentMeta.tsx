import { formatDateToBuddhistEra } from "@/utils/date-format";
import { Calendar, Eye, User } from "lucide-react";

export function DocumentMeta({
    viewer,
    createdAt,
    createdBy,
  }: {
    viewer: number;
    createdAt: string;
    createdBy: string;
  }) {
    return (
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="bg-amber-200 flex size-6 items-center justify-center rounded-full">
            <Eye size={18} />
          </div>
          <span>{viewer} คนดู</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-amber-200 flex size-6 items-center justify-center rounded-full">
            <Calendar size={18} />
          </div>
          <span>{formatDateToBuddhistEra(createdAt, 'DD MMMM BBBB')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-amber-200 flex size-6 items-center justify-center rounded-full">
            <User size={18} />
          </div>
          <span>Author : {createdBy}</span>
        </div>
      </div>
    );
  }