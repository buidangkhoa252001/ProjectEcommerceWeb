
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
                    console.log(res)
                    setProduct(res.data)
                    setImages(res.data.images)

                } catch (err) {
                    console.log(err)
                }
            }
            getProductDetail()

        } else {
            console.log(currentToken.accesstoken)
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
            console.log(res)
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

            navigate("/products", { replace: true })

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
                                        <i class="fa-solid fa-image"></i>
                                        <h2>Choose Photo Product</h2>
                                        <span>or drag and drop image here</span>
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
                            <div className="box-detail_configuation-title1">
                                <h2>Configuration</h2>
                            </div>
                            <div className="box-detail_configuation-table">
                                <table>
                                    <tr>
                                        <td>CPU</td>
                                        <td><input autoComplete="nope" placeholder="Enter CPU" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Graphics card type</td>
                                        <td><input autoComplete="nope" placeholder="Enter Card" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Amount of RAM</td>
                                        <td><input autoComplete="nope" placeholder="Enter RAM" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Hard Drive</td>
                                        <td><input autoComplete="nope" placeholder="Enter Hard Drive" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Screen size</td>
                                        <td><input autoComplete="nope" placeholder="Enter Screen size" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Screen resolution</td>
                                        <td><input autoComplete="nope" placeholder="Enter Screen resolution" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>The web of communication</td>
                                        <td><input autoComplete="nope" placeholder="Enter The web of communication" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Operating system</td>
                                        <td><input autoComplete="nope" placeholder="Enter operating system" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>The battery</td>
                                        <td><input autoComplete="nope" placeholder="Enter the battery" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td><input autoComplete="nope" placeholder="Enter weight" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Screen technology</td>
                                        <td><input autoComplete="nope" placeholder="Enter screen technology" type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                    <tr>
                                        <td>Bluetooth</td>
                                        <td><input autoComplete="nope" placeholder="Enter detail bluetooth " type="text" name="title" id="title" required
                                    value={product.title} onChange={handleChangeInput} /></td>
                                    </tr>
                                </table>
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