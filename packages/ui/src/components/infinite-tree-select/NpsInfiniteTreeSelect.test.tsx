import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NpsInfiniteTreeSelect } from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("NpsInfiniteTreeSelect", () => {
  it("renders correctly with QueryClientProvider", async () => {
    const mockQueryFn = vi.fn().mockResolvedValue({
      data: [
        {
          value: "1",
          label: "Parent Node",
          children: [
            { value: "1-1", label: "Child Node 1" },
            { value: "1-2", label: "Child Node 2" },
          ],
        },
      ],
      totalRecord: 1,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <NpsInfiniteTreeSelect
          queryKey={["test-tree-select"]}
          queryFn={mockQueryFn}
          placeholder="Chọn cây thư mục"
        />
      </QueryClientProvider>
    );

    // Kiểm tra xem có render đúng placeholder của TreeSelect không
    expect(screen.getByText("Chọn cây thư mục")).toBeInTheDocument();

    // Kiểm tra xem hàm queryFn đã được gọi chưa
    expect(mockQueryFn).toHaveBeenCalled();
  });

  it("exports Ant Design TreeSelect static constants correctly", () => {
    expect(NpsInfiniteTreeSelect.SHOW_PARENT).toBeDefined();
    expect(NpsInfiniteTreeSelect.SHOW_ALL).toBeDefined();
    expect(NpsInfiniteTreeSelect.SHOW_CHILD).toBeDefined();
  });
});
