// Components
import { Breadcrumb } from '@components/client';
import { Container } from '@components/shared';
import { PageTransition } from '@components/shared/animations';

export default function SinglePage() {
    return (
        <PageTransition>
            <Container>
                <Breadcrumb title='Chính sách vận chuyển và kiểm tra hàng' />
                <h1 className='text-center font-garamond text-5xl'>Chính sách vận chuyển và kiểm tra hàng</h1>
                <div className='mx-auto px-6 lg:max-w-screen-md py-8 lg:py-16'>
                    Junie hỗ trợ hai phương thức vận chuyển: Giao hàng tiêu chuẩn (đồng giá toàn quốc): 30.000đ Giao
                    hàng ưu tiên: 40.000đ Đơn hàng giao ưu tiên không những được ưu tiên phương thức giao hàng nhanh hơn
                    (1-2 ngày so với tiêu chuẩn) mà còn được ưu tiên xử lý trước. Junie MIỄN PHÍ SHIP (giao hàng tiêu
                    chuẩn) với đơn hàng từ 150,000đ (Không áp dụng đồng thời với các chương trình khuyến mãi khác) Thời
                    Gian Vận Chuyển KHU VỰC THỜI GIAN Các tỉnh phía Bắc 1-3 ngày Các tỉnh miền Trung 2-4 ngày Các tỉnh
                    phía Nam 3-5 ngày Lưu ý: Thời gian vận chuyển chỉ là dự kiến của đơn vị vận chuyển trong điều kiện
                    bình thường. Với các trường hợp đặc biệt như thiên tai, dịch bệnh,... thời gian vận chuyển có thể
                    thay đổi mà không kịp báo trước. Mọi thắc mắc vui lòng liên hệ hotline 0862 658 643 hoặc email tới
                    cskh@junie.vn Phân định trách nhiệm của thương nhân, tổ chức cung ứng dịch vụ logistics về cung cấp
                    chứng từ hàng hóa trong quá trình giao nhận. Đơn vị cung cấp dịch vụ logistic có trách nhiệm cung
                    cấp bằng chứng giao nhận hàng hóa (ảnh chụp và chữ ký người nhận hàng) tới người mua và người bán
                    khi có yêu cầu. Chính sách kiểm hàng: Khi nhận hàng quý khách có quyền yêu cầu nhân viên giao hàng
                    mở cho kiểm. Trường hợp đơn hàng đặt mà bên bán giao không đúng loại sản phẩm quý khách có quyền trả
                    hàng và không không thanh toán tiền. Trường hợp quý khách đã thanh toán trước nhưng đơn hàng không
                    đúng quý khách yêu cầu hoàn toàn hoặc giao lại đơn mới như đã đặt. Trong trường hợp yêu cầu hoàn
                    tiền hoặc đổi đơn quý khách liên hệ qua Email: cskh@junie.vn hoặc số điện thoại 0862658643 chúng tôi
                    cam kết sẽ giải quyết mọi yêu cầu của quý khách.
                </div>
            </Container>
        </PageTransition>
    );
}
