const express = require('express');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products');


const storage = multer.diskStorage({
    destination: function(request, file, clbk) {
        clbk(null, './uploads/');
    },
    filename: function(request, file, clbk) {
        clbk(null, new Date().getTime() + ' ' + file.originalname);
    }
});

const fileFilter = (request, file, clbk) => {
    switch (file.mimetype) {
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/png':
            clbk(null, true);
            break;
        default:
            clbk(null, false);
    }
};

// const upload = multer({dest: 'uploads/'});
const upload = multer({ storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
    fileFilter: fileFilter
});

// Initialize express router
const router = express.Router();

router.get('/', ProductController.getProducts);

router.post('/', upload.single('productImage'), checkAuth, ProductController.postProduct);

router.get('/:productId', ProductController.getProduct);

router.patch('/:productId', checkAuth, ProductController.updateProduct);

router.delete('/:productId', checkAuth, ProductController.deleteProduct);

module.exports = router;