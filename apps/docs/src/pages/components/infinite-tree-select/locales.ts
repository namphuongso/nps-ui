export const infiniteTreeSelectLocales = {
  en: {
    description:
      "A tree selection component with infinite scrolling, built on Ant Design's TreeSelect and TanStack Query. It is optimized for large hierarchical datasets and lazy-loading.",
    whenToUse: {
      title: "When to Use",
      items: [
        "When you need to select values from a hierarchical tree structure.",
        "When the dataset is large and needs paginated dynamic loading (infinite scrolling).",
        "When you want checkboxes in front of nodes for multiple selection (Check Tree).",
      ],
    },
    examples: {
      title: "Examples",
      subtitle: "Example usage of the InfiniteTreeSelect component.",
      basic: {
        title: "Basic Usage",
        desc: "Basic usage of NpsInfiniteTreeSelect for single hierarchical selection.",
      },
      checkTree: {
        title: "Checkbox Selection (Check Tree)",
        desc: "Using NpsInfiniteTreeSelect with treeCheckable to display checkboxes for multiple selections.",
      },
    },
    api: {
      queryKey:
        "Unique cache key array used by TanStack Query to manage fetch caches.",
      queryFn:
        "Async function that handles the actual API request. Receives paging and query params (keyword, pageIndex, pageSize).",
      pageSize: "Number of records to load per page.",
      getResponse:
        "Callback helper to extract the array of data records from the API response.",
      getTotalRecord:
        "Callback helper to extract the total number of records from the API response for pagination limits.",
      getLabel: "Callback to resolve the display label text from a data item.",
      getValue: "Callback to resolve the value/ID from a data item.",
      getChildren:
        "Callback to resolve the child items array from a hierarchical data item.",
      editId:
        "The current selected ID(s) when editing a record, used to query and show the correct initial label.",
      getEditQueryParams:
        "Callback to construct specific query parameters when fetching editing IDs.",
      getEditResponse:
        "Callback helper to extract data records specifically from the edit query response.",
      defaultItems:
        "Initial static options list displayed when the search bar is empty and no queries have executed.",
      setFlatData:
        "Callback triggered to return the complete accumulated flat array of loaded items to parent components.",
      debounceTime:
        "Input typing delay (in ms) to debounce request calls while searching.",
    },
  },
  vi: {
    description:
      "Ô chọn dạng cây phân cấp (Tree Select) hỗ trợ cuộn trang vô hạn, xây dựng trên TreeSelect của Ant Design và TanStack Query. Tối ưu cho lượng dữ liệu dạng cây siêu lớn cần tải phân trang.",
    whenToUse: {
      title: "Khi nào cần sử dụng",
      items: [
        "Khi cần chọn các giá trị từ cấu trúc dạng cây phân cấp cha-con.",
        "Khi lượng dữ liệu lớn và cần tải phân trang tự động khi cuộn xuống (infinite scrolling).",
        "Khi muốn hiển thị các ô checkbox trước mỗi node để chọn nhiều mục (Check Tree).",
      ],
    },
    examples: {
      title: "Ví dụ",
      subtitle: "Ví dụ thực tế sử dụng component NpsInfiniteTreeSelect.",
      basic: {
        title: "Cách sử dụng cơ bản",
        desc: "Cách sử dụng cơ bản của NpsInfiniteTreeSelect cho việc chọn đơn giá trị phân cấp cây.",
      },
      checkTree: {
        title: "Chọn nhiều có Checkbox (Check Tree)",
        desc: "Sử dụng NpsInfiniteTreeSelect kết hợp với treeCheckable để hiển thị checkbox và hỗ trợ chọn nhiều phần tử trong cây.",
      },
    },
    api: {
      queryKey:
        "Mảng chứa key duy nhất dùng để quản lý cache và trạng thái trong React Query.",
      queryFn:
        "Hàm bất đồng bộ thực hiện cuộc gọi API. Nhận vào các tham số phân trang và tìm kiếm (keyword, pageIndex, pageSize).",
      pageSize: "Số lượng dòng dữ liệu được tải trên mỗi trang.",
      getResponse:
        "Hàm callback để trích xuất mảng dữ liệu gốc từ kết quả trả về của API.",
      getTotalRecord:
        "Hàm callback để trích xuất tổng số lượng bản ghi từ kết quả trả về của API nhằm xác định giới hạn phân trang.",
      getLabel: "Hàm callback để trích xuất nhãn hiển thị (label) từ đối tượng dữ liệu.",
      getValue: "Hàm callback để trích xuất giá trị/ID (value) từ đối tượng dữ liệu.",
      getChildren:
        "Hàm callback để lấy danh sách phần tử con từ một đối tượng dữ liệu dạng cây.",
      editId:
        "ID hoặc danh sách ID đang được chọn ở chế độ chỉnh sửa, dùng để gọi API riêng biệt hiển thị đúng nhãn ban đầu.",
      getEditQueryParams:
        "Hàm callback để tạo tham số truy vấn đặc thù khi lấy dữ liệu cho editId.",
      getEditResponse:
        "Hàm callback để trích xuất dữ liệu từ kết quả trả về của API dành riêng cho chế độ chỉnh sửa.",
      defaultItems:
        "Danh sách các lựa chọn tĩnh mặc định hiển thị khi ô tìm kiếm trống và chưa có dữ liệu tải về.",
      setFlatData:
        "Callback trả về toàn bộ danh sách dữ liệu phẳng đã được tải cho component cha quản lý.",
      debounceTime:
        "Thời gian trễ (ms) để trì hoãn việc gọi API tìm kiếm khi người dùng đang nhập từ khóa.",
    },
  },
};
