import Accordian from './Accordian';

export default function ProductDescriptionSection() {
    return (
        <section className='my-8 lg:my-16 border-t border-b border-gray divide-y divide-gray'>
            <Accordian
                autoShow
                title='Mô tả'
                content={`Chiếc lá dịu dàng gợi nhớ đến mùa thu bình yên, thơ mộng và lãng mạn, nhẫn Leaf sẽ làm tôn lên nét đẹp yêu kiều, uyển chuyển của các cô gái trong mọi khoảnh khắc.\nNhững chiếc lá mong manh nhưng bền bỉ, đơn thuần nhưng thiết yếu, tràn đầy sức sống không mệt mỏi. Và Junie mong rằng, mỗi người đều có một tình yêu như vậy, có thể không vồn vã lãng mạn nhưng đôi bên đều hiểu rằng thuộc về nhau là điều đương nhiên.\nNhẫn Leaf là một món quà thích hợp để tặng người yêu hoặc nàng có thể tặng cho chính bản thân mình.`}
            />
            <Accordian
                title='Sử dụng & bảo quản'
                content={`Được làm từ những chất liệu cao cấp và bền bỉ nhưng do đặc tính cơ bản của chất liệu, Junie khuyến khích khách hàng nên tuân theo các nguyên tắc bảo quản trang sức nói chung.\nNên tháo trang sức ra trước khi tiếp xúc với bất kỳ môi trường ẩm hoặc ma sát mạnh (vd: rửa tay, đi ngủ, tắm rửa,...) để đảm bảo và duy trì độ bóng của sản phẩm cũng như kéo dài tuổi thọ của sản phẩm.`}
            />
        </section>
    );
}
