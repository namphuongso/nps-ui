export const infiniteAutoCompleteLocales = {
  en: {
    description: "A high-performance React Autocomplete component with built-in infinite scroll pagination, query caching, and search debouncing, built on top of Ant Design Select and TanStack Query.",
    whenToUse: {
      title: "When to Use",
      items: [
        "When implementing search inputs that query large dynamic datasets from the server.",
        "When you want automatic next-page loading (infinite scroll) as the user scrolls down the search dropdown.",
        "When editing records, ensuring the selected item's label is correctly fetched by its ID without loading the entire list.",
        "When integrating seamlessly with Ant Design Forms with native form-level validation."
      ],
    },
    examples: {
      title: "Examples",
      subtitle: "Common use cases for NpsInfiniteAutoComplete.",
      basic: {
        title: "Basic Usage",
        desc: "A basic implementation showing mock items from a simulated paginated API with search.",
      },
    },
    api: {
      queryKey: "Unique cache key array used by TanStack Query to manage fetch caches.",
      queryFn: "Async function that handles the actual API request. Receives paging and query params (keyword, pageIndex, pageSize).",
      pageSize: "Number of records to load per page.",
      getResponse: "Callback helper to extract the array of data records from the API response.",
      getTotalRecord: "Callback helper to extract the total number of records from the API response for pagination limits.",
      getLabel: "Callback to resolve the display label text from a data item.",
      getValue: "Callback to resolve the value/ID from a data item.",
      editId: "The current selected ID(s) when editing a record, used to query and show the correct initial label.",
      getEditQueryParams: "Callback to construct specific query parameters when fetching editing IDs.",
      getEditResponse: "Callback helper to extract data records specifically from the edit query response.",
      defaultItems: "Initial static options list displayed when the search bar is empty and no queries have executed.",
      setFlatData: "Callback triggered to return the complete accumulated flat array of loaded items to parent components.",
      debounceTime: "Input typing delay (in ms) to debounce request calls while searching.",
    }
  },
  vi: {
    description: "Component gợi ý (Autocomplete) hiệu năng cao hỗ trợ phân trang cuộn vô hạn, tự động cache dữ liệu và debounce tìm kiếm, xây dựng trên Select của Ant Design và TanStack Query.",
    whenToUse: {
      title: "Khi nào cần sử dụng",
      items: [
        "Khi triển khai các ô nhập tìm kiếm cần truy vấn tập dữ liệu lớn phía máy chủ.",
        "Khi cần tính năng tự động tải trang tiếp theo (cuộn vô hạn) khi người dùng kéo xuống dưới cùng của danh sách lựa chọn.",
        "Khi chỉnh sửa biểu mẫu (edit mode), đảm bảo nhãn của mục đã chọn được tải chính xác theo ID mà không cần tải toàn bộ dữ liệu.",
        "Khi muốn tích hợp mượt mà với Ant Design Form cùng khả năng validate biểu mẫu mặc định."
      ],
    },
    examples: {
      title: "Ví dụ",
      subtitle: "Các kịch bản sử dụng thực tế của NpsInfiniteAutoComplete.",
      basic: {
        title: "Cách sử dụng cơ bản",
        desc: "Một triển khai cơ bản hiển thị danh sách giả lập với API phân trang và tìm kiếm hoàn chỉnh.",
      },
    },
    api: {
      queryKey: "Mảng chứa key duy nhất dùng để quản lý cache và trạng thái trong React Query.",
      queryFn: "Hàm bất đồng bộ thực hiện cuộc gọi API. Nhận vào các tham số phân trang và tìm kiếm (keyword, pageIndex, pageSize).",
      pageSize: "Số lượng dòng dữ liệu được tải trên mỗi trang.",
      getResponse: "Hàm callback để trích xuất mảng dữ liệu gốc từ kết quả trả về của API.",
      getTotalRecord: "Hàm callback để trích xuất tổng số lượng bản ghi từ kết quả trả về của API nhằm xác định giới hạn phân trang.",
      getLabel: "Hàm callback để trích xuất nhãn hiển thị (label) từ đối tượng dữ liệu.",
      getValue: "Hàm callback để trích xuất giá trị/ID (value) từ đối tượng dữ liệu.",
      editId: "ID hoặc danh sách ID đang được chọn ở chế độ chỉnh sửa, dùng để gọi API riêng biệt hiển thị đúng nhãn ban đầu.",
      getEditQueryParams: "Hàm callback để tạo tham số truy vấn đặc thù khi lấy dữ liệu cho editId.",
      getEditResponse: "Hàm callback để trích xuất dữ liệu từ kết quả trả về của API dành riêng cho chế độ chỉnh sửa.",
      defaultItems: "Danh sách các lựa chọn tĩnh mặc định hiển thị khi ô tìm kiếm trống và chưa có dữ liệu tải về.",
      setFlatData: "Callback trả về toàn bộ danh sách dữ liệu phẳng đã được tải cho component cha quản lý.",
      debounceTime: "Thời gian trễ (ms) để trì hoãn việc gọi API tìm kiếm khi người dùng đang nhập từ khóa.",
    }
  },
};
