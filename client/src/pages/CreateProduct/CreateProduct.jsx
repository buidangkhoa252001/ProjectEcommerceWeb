
import axios from '../../axios/axios';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "./createProduct.css"
import Loading from '../../utils/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

const CreateProduct = () => {

    /*  const state = useContext(GlobalState) */
    const [product, setProduct] = useState(initialState)
    /* const [categories] = state.categoriesAPI.categories */
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const { categories } = useSelector(state => state.categories)
    const { currentToken } = useSelector(state => state.login)
    const { user } = useSelector(state => state.user)

    const [onEdit, setOnEdit] = useState(false)
    const navigate = useNavigate()
    const param = useParams()
    /*    navigate("/login", { replace: true }) */
    const dispatch = useDispatch();
    const styleUpload = {
        display: images ? "block" : "none"
    }

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            const getProductDetail = async () => {
                try {
                    const res = await axios.get(`/api/products/${param.id}`)
                    setProduct(res.data)
                    setImages(res.data.images)

                } catch (err) {
                    console.log(err)
                }
            }
            getProductDetail()

        } else {
            setProduct(initialState)
            setImages(false)
            setOnEdit(false)

        }
    }, [param.id])

    const handleUpload = async (e) => {

        e.preventDefault()
        try {

            if (user.role !== 1) return alert("you are not admin")
            const file = e.target.files[0]

            if (!file) return alert("file is not exist!")
            if (file.size > 1024 * 1024) return alert("Size is too large")
            if (file.type !== "image/jpeg" && file.type !== "image/png") return alert("File is not the image")
            console.log(file)
            let formData = new FormData()
            formData.append('file', file);
            setLoading(true)
            const res = await axios.post("/api/upload", formData, {
                headers: { "content-type": "multipart/form-data", Authorization: currentToken.accesstoken }
            })
            setLoading(false)
            setImages(res.data)
        }
        catch (err) {
            alert(err.respone.data.msg)
        }
    }
    const handleDelete = async (e) => {

        e.preventDefault()
        try {
            if (user.role !== 1) return alert("you are not admin")
            setLoading(true)
            await axios.post("/api/destroy", { public_id: images.public_id }, {
                headers: { Authorization: currentToken.accesstoken }
            })
            setLoading(false)
            setImages(false)

        }
        catch (err) {
            alert(err.respone.data.msg)
        }

    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target

        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (user.role !== 1) return alert("you are not admin")
            if (!images) return alert("you are not have the image")
            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images },
                    {
                        headers: { Authorization: currentToken.accesstoken }
                    })
            }
            else {
                await axios.post("/api/products", { ...product, images },
                    {
                        headers: { Authorization: currentToken.accesstoken }
                    }
                )
            }
            setOnEdit(false)
            setImages(false)
            setProduct(initialState)

            navigate("/productTable", { replace: true })

        }

        catch (err) {
            alert(err.respone.data.msg)
        }
    }
    return (
        <div className="create">
            <div className="create_detail">
                <div className="create_detail-title">
                    <i className="fa-solid fa-folder-plus"></i>
                    <h1>create product</h1>
                </div>
                <div className="create_detail-layout">
                    <div className="create_detail-col1">

                        {
                            loading ? <Loading />
                                :
                                <div className="upload">
                                    <input type="file" name="file" id="file_up" onChange={handleUpload} />
                                    <label htmlFor="file_up" className="input-label">
                                 {
                                     images ?  <div></div>
                                     :<div className="clickphoto"> <i className="fa-solid fa-image"></i>
                                     <h2>Choose Photo Product</h2>
                                     <span>or drag and drop image here</span></div>
                                 }      
                                    </label>
                                    <div id="file_img" style={styleUpload}>
                                        <img src={images ? images.url : ""} alt="" />
                                        <span onClick={handleDelete}>X</span>
                                    </div>
                                </div>
                        }
                        <div className="create_detail-img-note">
                            <h2>Upload Image</h2>
                            <span>Image format .jpg .jpeg .png and minimum size 300x300px (For optimal image use minimum size 700x700 px)</span>
                        </div>
                    </div>
                    <div className="create_product">
                        <form onSubmit={handleSubmit} >
                            <div className="row">
                                <label htmlFor="product_id">Product ID</label>
                                <input autoComplete="nope" type="text" name="product_id" id="product_id" required
                                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} placeholder="Enter Product ID" />
                            </div>

                            <div className="row">
                                <label htmlFor="title">Title</label>
                                <input autoComplete="nope" placeholder="Enter title" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} />
                            </div>

                            <div className="row">
                                <label htmlFor="price">Price</label>
                                <input autoComplete="nope" type="number" name="price" id="price" required
                                    value={product.price} onChange={handleChangeInput} />
                            </div>

                            <div className="row">
                                <label htmlFor="description">Description</label>
                                <textarea placeholder="Enter Description" type="text" name="description" id="description" required
                                    value={product.description} rows="5" onChange={handleChangeInput} />
                            </div>

                            <div className="row">
                                <label htmlFor="content">Content</label>
                                <textarea placeholder="Enter Content" type="text" name="content" id="content" required
                                    value={product.content} rows="7" onChange={handleChangeInput} />
                            </div>

                            <div className="row">
                                <label htmlFor="categories">Categories</label>
                                <select name="category" value={product.category} onChange={handleChangeInput}  >
                                    <option value="">Please select a category</option>
                                    {
                                        categories.map(category => (
                                            <option value={category._id} key={category._id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                          
                            <button type="submit">{onEdit ? "Update" : "Create"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default CreateProduct