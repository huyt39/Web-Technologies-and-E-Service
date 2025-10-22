//lấy các phần tử cần thiết
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');
const productList = document.getElementById('product-list');

//mảng lưu trữ sản phẩm mẫu ban đầu
const sampleProducts = [
    {
        name: 'Giày chạy bộ Nike Air Zoom Pegasus',
        price: '2.500.000',
        desc: 'Giày chạy bộ với công nghệ đệm Air Zoom mang lại cảm giác êm ái và đàn hồi tốt. Thiết kế thoáng khí, phù hợp cho cả chạy đường dài và tập luyện hàng ngày.'
    },
    {
        name: 'Giày bóng đá Adidas Predator',
        price: '3.200.000',
        desc: 'Giày bóng đá chuyên nghiệp với công nghệ Controlframe giúp kiểm soát bóng tốt hơn. Đế đinh AG phù hợp cho sân cỏ nhân tạo, mang lại độ bám và ổn định cao.'
    },
    {
        name: 'Giày tập gym Puma Cell',
        price: '1.800.000',
        desc: 'Giày training đa năng với công nghệ Cell cushioning cung cấp độ đệm vượt trội. Thiết kế ôm chân, hỗ trợ tốt cho các bài tập cardio và nâng tạ.'
    }
];

//hàm lưu danh sách sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

//hàm lấy danh sách sản phẩm từ localStorage
function loadProducts() {
    const stored = localStorage.getItem('products');
    if (stored) {
        return JSON.parse(stored);
    }
    return null;
}

//hàm render danh sách sản phẩm ra giao diện
function renderProducts(products) {
    //xóa tất cả sản phẩm hiện tại (trừ tiêu đề và ô tìm kiếm)
    const productItems = productList.querySelectorAll('.product-item');
    productItems.forEach(item => item.remove());
    
    //render từng sản phẩm
    products.forEach(product => {
        const newItem = document.createElement('article');
        newItem.className = 'product-item';
        newItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <p><strong>Giá:</strong> ${product.price} VNĐ</p>
        `;
        productList.appendChild(newItem);
    });
}

//khởi tạo khi trang load
window.addEventListener('DOMContentLoaded', function() {
    //kiểm tra xem localStorage có dữ liệu không
    let products = loadProducts();
    
    if (!products) {
        //nếu chưa có, khởi tạo với sản phẩm mẫu
        products = sampleProducts;
        saveProducts(products);
    }
    
    //render sản phẩm ra giao diện
    renderProducts(products);
});

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
    
    //tạo đối tượng sản phẩm mới
    const newProduct = {
        name: name,
        price: price,
        desc: desc
    };
    
    //lấy danh sách sản phẩm hiện tại từ localStorage
    let products = loadProducts();
    if (!products) {
        products = [];
    }
    
    //thêm sản phẩm mới vào mảng
    products.push(newProduct);
    
    //lưu mảng vào localStorage
    saveProducts(products);
    
    //render lại danh sách sản phẩm
    renderProducts(products);
    
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