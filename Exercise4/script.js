//lấy các phần tử cần thiết
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');

//xử lý sự kiện tìm kiếm
searchBtn.addEventListener('click', function() {
    //lấy giá trị từ ô nhập, chuyển về chữ thường
    const searchTerm = searchInput.value.toLowerCase();
    
    //lấy tất cả sản phẩm
    const products = document.querySelectorAll('.product-item');
    
    //duyệt qua từng sản phẩm
    products.forEach(function(product) {
        //lấy tên sản phẩm 
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        //kiểm tra xem tên có chứa từ khóa tìm kiếm không
        if (productName.includes(searchTerm)) {
            //hiển thị sản phẩm
            product.style.display = '';
        } else {
            //ẩn sản phẩm
            product.style.display = 'none';
        }
    });
});

//xử lý sự kiện nút add sản phẩm
addProductBtn.addEventListener('click', function() {
    //toggle hiển thị form
    if (addProductForm.style.display === 'none' || addProductForm.style.display === '') {
        addProductForm.style.display = 'block';
    } else {
        addProductForm.style.display = 'none';
    }
});

//bắt sự kiện submit của form
addProductForm.addEventListener('submit', function(event) {
    //ngăn form gửi yêu cầu HTTP và reload trang
    event.preventDefault();
    
    //lấy giá trị từ các trường input
    const name = document.getElementById('newName').value.trim();
    const price = document.getElementById('newPrice').value.trim();
    const desc = document.getElementById('newDesc').value.trim();
    
    //validate dữ liệu
    if (name === '' || price === '' || Number(price) <= 0 || isNaN(price)) {
        //hiển thị thông báo lỗi
        errorMsg.textContent = 'Vui lòng nhập tên và giá hợp lệ!';
        return;
    }
    
    //xóa thông báo lỗi nếu hợp lệ
    errorMsg.textContent = '';
    
    //tạo phần tử sản phẩm mới
    const newItem = document.createElement('article');
    newItem.className = 'product-item';
    
    //tạo các phần tử con và thêm vào newItem
    newItem.innerHTML = `
        <h3>${name}</h3>
        <p>${desc}</p>
        <p><strong>Giá:</strong> ${price} VNĐ</p>
    `;
    
    //chèn sản phẩm mới vào danh sách
    const productList = document.getElementById('product-list');
    productList.prepend(newItem);
    
    //reset form
    addProductForm.reset();
    
    //ẩn form
    addProductForm.style.display = 'none';
});

//xử lý sự kiện nút Hủy
cancelBtn.addEventListener('click', function() {
    //ẩn form
    addProductForm.style.display = 'none';
    //reset form
    addProductForm.reset();
    //xóa thông báo lỗi
    errorMsg.textContent = '';
});
