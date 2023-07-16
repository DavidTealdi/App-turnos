import style from './Title.module.css'
import img from '../../asset/img/peluqueria2.png'

const Title = () => {
    return (
        <div className={style.div}>
            <h1 className={style.title}>Mediopelo.barbershop <img src={img} alt="img" className={style.img}/></h1>
        </div>
    )
}

export default Title