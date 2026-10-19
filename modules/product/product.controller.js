/*
Định nghĩa URL cho đường dẫn controller
*/
/*
Controller có 3 nhiệm vụ: 
+ Tiếp nhận thông tin
+ Nhận thông tin request từ client
+ Phản hồi thông tin response cho phía client
*/
const hello = [
    {
        id: 1,
        name: "Huy"
    },
    {
        id: 2,
        name: "Hà"
    }
]
exports.getAllProduct = (req, res) => {
    const products = [
        {
            id: 1,
            name: 'Ảnh',
            descriptione: '25000000',
            image: '2a42e480-384d-47ba-9804-c9429c85fb4f.jpg'
        }
    ];
    const data = {
        title: 'NodeJs Ninedev 2026',
        message: 'Welcome to my website',
        products: products
    };
    res.render('index', data)
}

exports.getProductById = (req, res) => {
    const { id } = req.params;
    res.json(`${hello.findIndex(item => item.id === id)}`)
}


exports.create =(req, res) => {
    const { body } = req.body;
    res.json(body)
}

exports.put = (req, res) => {
    res.json('Update')
}

exports.delete =  (req, res) => {
    res.json('Delete')
}