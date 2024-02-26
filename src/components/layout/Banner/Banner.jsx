import './Banner.css'
import banner from '../../../assets/images/banner.jpg'

const Banner = () => {
  return (
    <div className="main-banner">

        <img className='banner-img' src={banner} alt="Banner principal de el home" />
        <div className="banner-info">
            <h1>Bienvenidos a NeoGamer</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta officia exercitationem explicabo quaerat adipisci dicta voluptate voluptatum numquam.</p>
        </div>
    </div>
  )
}

export default Banner
