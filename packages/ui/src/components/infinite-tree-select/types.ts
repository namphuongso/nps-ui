import type { TreeSelectProps } from "antd";
import type { ReactNode } from "react";
import type { NpsBaseSchema } from "../infinite-auto-complete/types";

export type { NpsBaseSchema };

/**
 * Props cho component NpsInfiniteTreeSelect
 * @template T - Kiểu dữ liệu của item gốc từ API
 */
export interface NpsInfiniteTreeSelectProps<T>
  extends Omit<
    TreeSelectProps,
    "treeData" | "loading" | "onSearch" | "searchValue"
  > {
  /** Key duy nhất dùng cho React Query cache */
  queryKey: unknown[];

  /**
   * Hàm gọi API để fetch dữ liệu phân trang
   * Có cấu hình signal hỗ trợ hủy request (abort request)
   */
  queryFn: (
    params: NpsBaseSchema,
    options?: { signal?: AbortSignal }
  ) => Promise<unknown>;

  /**
   * Số lượng record trên mỗi trang (mặc định: 20)
   */
  pageSize?: number;

  /**
   * Hàm chuyển đổi response từ API thành mảng các item dữ liệu
   * @default (response) => response.data || response
   */
  getResponse?: (response: unknown) => T[];

  /**
   * Hàm lấy tổng số record từ response của API
   * @default (response) => response.TotalRecord || response.totalRecord || 0
   */
  getTotalRecord?: (response: unknown) => number;

  /**
   * Hàm lấy nhãn (Label) hiển thị từ item dữ liệu gốc
   * @default (item) => String(item.label || item.name || "")
   */
  getLabel?: (item: T) => ReactNode;

  /**
   * Hàm lấy giá trị (Value) từ item dữ liệu gốc
   * @default (item) => String(item.value || item.id || "")
   */
  getValue?: (item: T) => string | number;

  /**
   * Hàm lấy danh sách phần tử con của một item gốc
   * @default (item) => item.children
   */
  getChildren?: (item: T) => T[] | undefined;

  /**
   * Danh sách ID cần query khi edit để hiển thị chính xác label ban đầu
   */
  editId?: string | number | (string | number)[];

  /**
   * Hàm tạo tham số query cho chế độ edit dựa trên editId
   * @default (editId) => ({ keyword: Array.isArray(editId) ? undefined : String(editId), pageIndex: 1, pageSize: Array.isArray(editId) ? editId.length : 1 })
   */
  getEditQueryParams?: (
    editId: string | number | (string | number)[]
  ) => NpsBaseSchema;

  /**
   * Hàm parse response từ chế độ edit thành mảng dữ liệu
   * @default (response) => response.data || response
   */
  getEditResponse?: (response: unknown) => T[];

  /**
   * Các option mặc định hiển thị khi ô tìm kiếm trống và trước khi tải
   */
  defaultItems?: { label: ReactNode; value: string | number }[];

  /**
   * Callback trả về toàn bộ dữ liệu đã được load (flat) cho component cha sử dụng
   */
  setFlatData?: (data: T[]) => void;

  /**
   * Thời gian trễ (ms) để debounce việc gọi tìm kiếm khi gõ (mặc định: 300)
   */
  debounceTime?: number;
}
