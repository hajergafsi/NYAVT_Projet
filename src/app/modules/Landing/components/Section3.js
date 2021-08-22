import React from 'react'
import img from '../../../../assets/images/pages/landing/img1.svg'
import Blob2 from './Blob2'

const Section1 = () => {
    return (
        <section id="section-3" className="px-3 bg-light-primary">
            <div>
                <h1>Bağlantılarınızın güvenli olduğunu bilerek içiniz rahat olsun.</h1>
                <h3>MakasDigi, bağlantılarınızın güvenli ve güvenilir olmasını sağlamaktadır. MakasDigi kullanarak oluşturduğunuz her bağlantı, üçüncü şahıslar tarafından gizlice dinlemeye veya saldırmaya karşı korumayı en üst düzeye çıkarmak için HTTPS ile şifrelenir ve içeriğinizi kötü niyetli kullanıcılardan korur.</h3>
            </div>
            <img src={img} alt="preview" width="400" heigh="auto" className="img-fluid my-3" />
            <Blob2 />
        </section>
    )
}

export default Section1
