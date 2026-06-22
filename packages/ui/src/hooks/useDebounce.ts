import { useEffect, useState } from "react";

/**
 * Hook để trì hoãn việc cập nhật giá trị (ví dụ: từ khóa tìm kiếm)
 * @param value Giá trị cần trì hoãn
 * @param delay Thời gian trễ tính bằng mili-giây
 * @returns Giá trị đã được trì hoãn
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
