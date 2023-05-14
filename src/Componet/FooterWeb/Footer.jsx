import style from '../FooterWeb/Footer.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
    return (

        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2023 Company, Inc</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a href="https://www.instagram.com/mediopelo.barbershop/"> <ion-icon name="logo-instagram"> </ion-icon> </a></li>
                    <li class="ms-3"><a href="/"> <ion-icon name="logo-whatsapp"> </ion-icon> </a></li>
                </ul>
            </footer>
        </div>

    )
}

export default Footer