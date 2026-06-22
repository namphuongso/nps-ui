import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NpsInfiniteAutoComplete } from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("NpsInfiniteAutoComplete", () => {
  it("renders correctly with QueryClientProvider", async () => {
    const mockQueryFn = vi.fn().mockResolvedValue({
      data: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ],
      totalRecord: 2,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <NpsInfiniteAutoComplete
          queryKey={["test-autocomplete"]}
          queryFn={mockQueryFn}
          placeholder="Chọn dữ liệu"
        />
      </QueryClientProvider>
    );

    // Kiểm tra xem có render đúng placeholder của Select không
    expect(screen.getByText("Chọn dữ liệu")).toBeInTheDocument();

    // Kiểm tra xem hàm queryFn đã được gọi chưa
    expect(mockQueryFn).toHaveBeenCalled();
  });
});
