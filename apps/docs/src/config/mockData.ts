export interface MockItem {
  id: string;
  name: string;
}

export const mockItems: MockItem[] = Array.from({ length: 80 }, (_, i) => ({
  id: `id-${i + 1}`,
  name: `Nam Phương Technology Component ${i + 1}`,
}));

export const mockQueryFn = async (
  params: { keyword?: string; pageIndex?: number; pageSize?: number },
  options?: { signal?: AbortSignal }
) => {
  // Simulating small network latency
  await new Promise((resolve) => {
    if (options?.signal?.aborted) return;
    const timer = setTimeout(resolve, 500);
    options?.signal?.addEventListener("abort", () => {
      clearTimeout(timer);
    });
  });

  const { keyword = "", pageIndex = 1, pageSize = 20 } = params;

  const filtered = mockItems.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;
  const data = filtered.slice(start, end);

  return {
    data,
    totalRecord: filtered.length,
  };
};
