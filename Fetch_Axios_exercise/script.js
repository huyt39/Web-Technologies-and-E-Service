// bien toan cuc
let allUsers = [];
let filteredUsers = [];
let currentPage = 1;
const itemsPerPage = 5;

// lay cac phan tu DOM
const usersTableBody = document.getElementById('usersTableBody');
const addUserForm = document.getElementById('addUserForm');
const editUserForm = document.getElementById('editUserForm');
const searchInput = document.getElementById('searchInput');
const editModal = document.getElementById('editModal');
const closeModal = document.querySelector('.close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const errorMessage = document.getElementById('errorMessage');

// khoi tao ung dung
async function init() {
    try {
        await loadUsers();
        setupEventListeners();
    } catch (error) {
        showError('Lỗi khi tải dữ liệu: ' + error.message);
    }
}

// tai danh sach users tu API
async function loadUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Không thể tải dữ liệu');
        }
        allUsers = await response.json();
        filteredUsers = [...allUsers];
        renderUsers();
        updatePagination();
    } catch (error) {
        showError('Lỗi khi tải users: ' + error.message);
        throw error;
    }
}

// hien thi users len bang
function renderUsers() {
    usersTableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersToShow = filteredUsers.slice(startIndex, endIndex);
    
    usersToShow.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="openEditModal(${user.id})">Sửa</button>
                    <button class="btn-delete" onclick="deleteUser(${user.id})">Xóa</button>
                </div>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// them user moi
async function addUser(userData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Không thể thêm user');
        }
        
        const newUser = await response.json();
        // tao id moi cho user (vi API khong tra ve id that)
        if (allUsers.length > 0) {
            const maxId = Math.max(...allUsers.map(u => Number(u.id) || 0));
            newUser.id = maxId + 1;
        } else {
            newUser.id = 1;
        }
        
        // cap nhat UI thủ cong
        allUsers.push(newUser);
        applySearch();
        renderUsers();
        updatePagination();
        
        return newUser;
    } catch (error) {
        showError('Lỗi khi thêm user: ' + error.message);
        throw error;
    }
}

// cap nhat user
async function updateUser(userId, userData) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Không thể cập nhật user');
        }
        
        const updatedUser = await response.json();
        
        // cap nhat UI 
        const id = typeof userId === 'string' ? parseInt(userId) : userId;
        const index = allUsers.findIndex(u => Number(u.id) === Number(id));
        if (index !== -1) {
            // cap nhat truc tiep tu du lieu nguoi dung nhap vao
            allUsers[index] = { ...allUsers[index], ...userData, id: id };
            applySearch();
            renderUsers();
        } else {
            showError('Không tìm thấy user để cập nhật');
        }
        
        return updatedUser;
    } catch (error) {
        showError('Lỗi khi cập nhật user: ' + error.message);
        throw error;
    }
}

// xoa user
async function deleteUser(userId) {
    if (!confirm('Bạn có chắc chắn muốn xóa user này?')) {
        return;
    }
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Không thể xóa user');
        }
        
        // cap nhat UI thủ cong
        allUsers = allUsers.filter(u => u.id !== userId);
        applySearch();
        
        // dieu chinh trang hien tai neu can
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        
        renderUsers();
        updatePagination();
    } catch (error) {
        showError('Lỗi khi xóa user: ' + error.message);
    }
}

// mo popup chinh sua
function openEditModal(userId) {
    // chuyen doi userId sang number de so sanh
    const id = typeof userId === 'string' ? parseInt(userId) : userId;
    const user = allUsers.find(u => Number(u.id) === Number(id));
    if (!user) {
        showError('Không tìm thấy user');
        return;
    }
    
    document.getElementById('editId').value = user.id;
    document.getElementById('editName').value = user.name || '';
    document.getElementById('editEmail').value = user.email || '';
    document.getElementById('editPhone').value = user.phone || '';
    
    editModal.style.display = 'block';
}

// dong popup
function closeEditModal() {
    editModal.style.display = 'none';
}

// tim kiem users theo ten
function applySearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredUsers = [...allUsers];
    } else {
        filteredUsers = allUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderUsers();
    updatePagination();
}

// cap nhat phan trang
function updatePagination() {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
    pageInfo.textContent = `Trang ${currentPage} / ${totalPages || 1}`;
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
}

// chuyen trang
function goToPage(direction) {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    renderUsers();
    updatePagination();
}

// hien thi thong bao loi
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// thiet lap event listeners
function setupEventListeners() {
    // form them user
    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('addName').value;
        const email = document.getElementById('addEmail').value;
        const phone = document.getElementById('addPhone').value;
        
        try {
            await addUser({ name, email, phone });
            addUserForm.reset();
        } catch (error) {
            // loi da duoc xu ly trong addUser
        }
    });
    
    // form chinh sua user
    editUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = parseInt(document.getElementById('editId').value);
        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;
        const phone = document.getElementById('editPhone').value;
        
        try {
            await updateUser(id, { name, email, phone });
            closeEditModal();
        } catch (error) {
            // loi da duoc xu ly trong updateUser
        }
    });
    
    // tim kiem
    searchInput.addEventListener('input', applySearch);
    
    // dong popup
    closeModal.addEventListener('click', closeEditModal);
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
    
    // phan trang
    prevBtn.addEventListener('click', () => goToPage('prev'));
    nextBtn.addEventListener('click', () => goToPage('next'));
}

// khoi chay ung dung
init();

