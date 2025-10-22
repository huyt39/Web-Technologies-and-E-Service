//lấy các phần tử cần thiết
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');

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

