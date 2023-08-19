using Store.Core.Entities;
using Store.Core.Identity;
using Store.Data.Contexts;
using System.Collections.Generic;

namespace Store.Data.Seeder;

public class DataSeeder : IDataSeeder
{
	private readonly StoreDbContext _dbContext;
	private readonly IPasswordHasher _hasher;

	public DataSeeder(StoreDbContext dbContext, IPasswordHasher hasher)
	{
		_dbContext = dbContext;
		_hasher = hasher;
	}

	public void Initialize()
	{
		_dbContext.Database.EnsureCreated();

		if (_dbContext.Users.Any())
		{
			return;
		}

		//var categories = AddCategories();
		//var discounts = AddDiscount();
		//var products = AddProduct(categories);

		var roles = AddRoles();
		var users = AddUsers(roles);
	}

	private IList<Role> AddRoles()
	{
		var roles = new List<Role>()
		{
			new() {Id = Guid.NewGuid(), Name = "Admin"},
			new() {Id = Guid.NewGuid(), Name = "Manager"},
		};

		_dbContext.Roles.AddRange(roles);
		_dbContext.SaveChanges();
		return roles;
	}

	private IList<User> AddUsers(IList<Role> roles)
	{
		var users = new List<User>()
		{
			new ()
			{
				Id = Guid.NewGuid(),
				Name = "Admin",
				Email = "Admin@gmail.com",
				Address = "DLU",
				Phone = "0123456789",
				Username = "admin",
				CreatedDate = DateTime.Now,
				Password = _hasher.Hash("admin123"),
				Roles = new List<Role>()
				{
					roles[0],
					roles[1]
				}
			}
		};

		_dbContext.Users.AddRange(users);
		_dbContext.SaveChanges();

		return users;
	}

	private IList<Category> AddCategories()
	{
		var categories = new List<Category>()
		{
			new() {Id = Guid.NewGuid(), Name = "Light novel", Description = "Light novel", UrlSlug = "light-novel"},
			new() {Id = Guid.NewGuid(), Name = "Manga", Description = "Manga", UrlSlug = "manga"},
			new() {Id = Guid.NewGuid(), Name = "Novel", Description = "Novel", UrlSlug = "novel"},
			new() {Id = Guid.NewGuid(), Name = "Comic", Description = "Comic", UrlSlug = "comic"},
		};

		_dbContext.Categories.AddRange(categories);
		_dbContext.SaveChanges();
		return categories;
	}

	private IList<Discount> AddDiscount()
	{
		var discount = new List<Discount>()
		{
			new() {Id = Guid.NewGuid(), Code = "100000001", Active = true, DiscountPercentage = 50, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
			new() {Id = Guid.NewGuid(), Code = "100000002", Active = true, DiscountPercentage = 50, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
			new() {Id = Guid.NewGuid(), Code = "100000003", Active = true, DiscountPercentage = 50, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
			new() {Id = Guid.NewGuid(), Code = "100000004", Active = true, DiscountPercentage = 50, ExpiryDate = DateTime.Now.AddMonths(2), MinPrice = 0, Quantity = 100},
		};

		_dbContext.Discounts.AddRange(discount);
		_dbContext.SaveChanges();
		return discount;
	}

	private IList<Product> AddProduct(IList<Category> categories)
	{
		var product = new List<Product>()
		{
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				Name = "Subaru Và Vì Tinh Tú Thứ Bảy – Tập 1",
				CreateDate = DateTime.Now,
				CategoryId = categories[0].Id,
				ShortIntro = "Một Kaze hòa đồng, tươi sáng và một Moto giản đơn, nghiêm túc lại là bạn thân từ nhỏ.",
				Description = "Tại thế giới game nổi tiếng “Union”, có một nhóm người chơi đã trở thành huyền thoại. " +
				              "Tên của họ là Subaru. Họ là nhóm học sinh tiểu học đã thân thiết với nhau từ bé, cùng với Sense của mỗi người, " +
				              "họ đã chạm đến đỉnh cao nhất của game. Thế nhưng, sự kiện chết người đó đã khiến “Union” chấm dứt hoạt động." +
				              " Nhóm bạn thân thiết cũng chia xa. 6 năm sau, Haruto giờ đã là học sinh trung học phổ thông. " +
				              "Cậu lần nữa đăng nhập vào thế giới game mới là “ReUnion”, rồi có cuộc hội ngộ với thiếu nữ nọ. " +
				              "Cô ấy là Asahi – đồng đội của cậu khi còn ở Subaru, là bạn thanh mai trúc mã, và cũng là người đã chết sáu năm trước." +
				              " Liệu Asahi là hồn ma điện tử, hay thứ gì khác…? Giao giữa hiện thực và thế giới trong game, " +
				              "tiểu thuyết thanh xuân đầy đột phá!",
				Active = true,
				Discount = 10,
				Price = 100000,
				UrlSlug = "subaru-va-vi-tinh-tu-thu-bay-tap-1",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Mừng cậu trở về",
				CategoryId = categories[0].Id,
				ShortIntro = "Một Kaze hòa đồng, tươi sáng và một Moto giản đơn, nghiêm túc lại là bạn thân từ nhỏ.",
				Description = "Dù khi trưởng thành và có những nhóm bạn khác nhau, hai chàng trai vẫn luôn hiểu rõ người kia hơn ai hết." +
				              " Cho đến một ngày, Kaze chợt nhận ra tình cảm mình dành cho Moto đã vượt quá ngưỡng tình bạn." +
				              " Dẫu có cố gắng coi tình cảm ấy là hiểu nhầm đến thế nào hay cố gắng gạt bỏ nó ra sao, " +
				              "Kazu cũng dần phải thừa nhận, tấm chân tình này là thật…",
				Active = true,
				Discount = 10,
				Price = 100000,
				UrlSlug = "mung-cau-tro-ve",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "ARIFURETA – Từ Tầm Thường Đến Bất Khả Chiến Bại – Tập 6",
				CategoryId = categories[0].Id,
				ShortIntro = "ARIFURETA – Từ Tầm Thường Đến Bất Khả Chiến Bại – Tập 6",
				Description = "Sau khi chinh phục thành công Di tích biển sâu Melusine, trên con đường di chuyển đến mục tiêu tiếp theo trong " +
				              "Thất đại mê cung - Rừng rậm Haltina, nhóm Hajime đã có dịp tái ngộ với công chúa Liliana của vương quốc Heiligh." +
				              " Đồng thời, bọn họ cũng phải đón nhận một tin xấu: cô Aiko, người vẫn luôn tin tưởng," +
				              " bảo ban Hajime dù cậu đã thay đổi, đã bị một kẻ lạ mặt bắt cóc. ",
				Active = true,
				Discount = 20,
				Price = 169000,
				UrlSlug = "arifureta-tu-tam-thuong-den-bat-kha-chien-bai-tap-6",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "GAMERS! – Tập 5",
				CategoryId = categories[0].Id,
				ShortIntro = "GAMERS! – Tập 5",
				Description = "“Ưu tiên Aguri hơn việc chơi game”, Amano Keita, một nhân vật chính tầm thường như quần chúng, " +
				              "đã phá vỡ thiết lập nhân vật của mình. Chưa kể còn “chim chuột” với Chiaki ở quán ăn gia đình," +
				              " xxx với Konoha giống như game khiêu dâm, có khác gì nhân vật chính trong tiểu thuyết harem đâu chứ!" +
				              " Uehara và Tendo không cách nào chúc phúc được cho cái thế giới không hề tuyệt vời này." +
				              " Mặc dù rất muốn bắt đầu lại từ con số 0 từ thế giới khác, nhưng phong cách của tác phẩm lại không cho phép chuyển trường…",
				Active = true,
				Discount = 20,
				Price = 108000,
				UrlSlug = "gamers-5",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "DATE A LIVE 14 - Mukuro Planet",
				CategoryId = categories[0].Id,
				ShortIntro = "DATE A LIVE 14 - Mukuro Planet",
				Description = "Đón giao thừa vào tháng Giêng, các Tinh linh vô cùng nhộn nhịp với việc đi chùa đầu năm. " +
				              "Một học kỳ mới lại bắt đầu tại trường trung học Raizen. " +
				              "Đối với cậu học sinh cấp ba Itsuka Shidou, chuỗi ngày yên bình đã bị phá hủy bởi một thiên thạch đến từ vũ trụ.",
				Active = true,
				Discount = 20,
				Price = 120000,
				UrlSlug = "date-a-live-14-mukuro-planet",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Hành Trình Của Elaina - Tập 12",
				CategoryId = categories[0].Id,
				ShortIntro = "Hành Trình Của Elaina - Tập 12",
				Description = "Ngày xửa ngày xưa, có một cô phù thủy tên Elaina. " +
				              "\r\n\r\nCô đang trong chuyến hành trình chu du tự do, không bị ràng buộc bởi bất cứ ai hay bất cứ chuyện gì. " +
				              "\r\n\r\nLần này, chuyến ngao du sẽ đưa cô đến gặp những con người đầy cá tính…",
				Active = true,
				Discount = 20,
				Price = 110000,
				UrlSlug = "hanh-trinh-cua-elaina-tap-12",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Hành Trình Của Elaina - Tập 11",
				CategoryId = categories[0].Id,
				ShortIntro = "Hành Trình Của Elaina - Tập 11",
				Description = "Tiếp nối với nội dung của tập truyện trước, cô nàng Elaina tiếp tục chuyến ngao du khắp thế gian một mình" +
				              " và tận hưởng cuộc sống một cách trọn vẹn.",
				Active = true,
				Discount = 20,
				Price = 110000,
				UrlSlug = "hanh-trinh-cua-elaina-tap-11",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "GAMERS! – Tập 4",
				CategoryId = categories[0].Id,
				ShortIntro = "GAMERS! – Tập 4",
				Description = "Đối với Hoshinomori Chiaki, [Yama] là ân nhân rất đỗi quan trọng với cô trên không gian mạng, " +
				              "thậm chí còn quan trọng hơn cả gia đình. \r\n \r\nGiây phút Chiaki phát hiện ra danh tính thật sự " +
				              "của người ấy chính là Amano Keita – kẻ thù không đội trời chung, cũng chính là khoảnh khắc mối tình đầu chớm nở.",
				Active = true,
				Discount = 20,
				Price = 129000,
				UrlSlug = "gamers-tap-4",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Date A Live Encore – Tập 4",
				CategoryId = categories[0].Id,
				ShortIntro = "Date A Live Encore – Tập 4",
				Description = "“Xin chào mọi người,  đã lâu không gặp. Là tôi,  Tachibana Koushi đây." +
				              "\r\nLần này tôi xin phép được gửi đến các bạn độc giả ‘Date a live Encore tập 4’" +
				              " với trang bìa là cô gái chỉ huy trẻ tuổi của chúng ta.",
				Active = true,
				Discount = 20,
				Price = 110000,
				UrlSlug = "date-a-live-encore-tap-4",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Hành trình của Elaina tập 10",
				CategoryId = categories[0].Id,
				ShortIntro = "Hành trình của Elaina tập 10",
				Description = "Trong tập 10 này, Elaina sẽ dẫn các bạn độc giả đi chu du từ trang sách qua những bãi biển trong xanh cát trắng," +
				              " ghé qua 1 ngọn hải đăng, … và còn điều gì hấp dẫn đang chờ các bạn? " +
				              "Mời các bạn đón đọc tập 10 của bộ truyện Hành trình của Elaina!!!",
				Active = true,
				Discount = 0,
				Price = 128000,
				UrlSlug = "hanh-trinh-cua-elaina-tap-10",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Date A Live Encore – Tập 3",
				CategoryId = categories[0].Id,
				ShortIntro = "Date A Live Encore – Tập 3",
				Description = "Nối tiếp tập 2, Date a live Encore 3 mang đến cho độc giả 7 chương truyện ngắn, " +
				              "trong đó mỗi chương là một câu chuyện khác nhau về các tinh linh. Điều đặc biệt trong " +
				              "tập 3 này chính là sự xuất hiện tới 2 lần của Tinh linh Kurumi trong chương Catcafe A Live và Cô gái Noel Kurumi. " +
				              "Tràn ngập trong câu chuyện là không khí Giáng sinh ấm áp, trùng hợp với thời điểm phát hành tập truyện tại Việt Nam lúc này.",
				Active = true,
				Discount = 20,
				Price = 100000,
				UrlSlug = "date-a-live-encore-tap-3",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Người Lạ Dưới Gió Xuân Tập 2 (L'étranger du zéphyr)",
				CategoryId = categories[1].Id,
				ShortIntro = "Người Lạ Dưới Gió Xuân Tập 2 (L'étranger du zéphyr)",
				Description = "Shun, tiểu thuyết gia trẻ tuổi, đã dẫn người mình thương - Mio, trở lại quê nhà sau nhiều năm bặt vô âm tín.",
				Active = true,
				Discount = 15,
				Price = 90000,
				UrlSlug = "nguoi-la-duoi-gio-xuan-tap-2-l-etranger-du-zephyr",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Kase Và Bìm Bìm Biếc",
				CategoryId = categories[1].Id,
				ShortIntro = "Kase Và Bìm Bìm Biếc",
				Description = "Cô bạn Kase lớp bên vừa xinh đẹp, lại còn là át chủ bài của CLB Điền kinh. Còn Yamada là thành viên của ban Phủ xanh, tính tình hướng nội.",
				Active = true,
				Discount = 15,
				Price = 80000,
				UrlSlug = "kase-va-bim-bim-biec",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Thực Đơn Của Bar Mao",
				CategoryId = categories[1].Id,
				ShortIntro = "Thực Đơn Của Bar Mao",
				Description = "Nếu bước xuống cầu thang dẫn đến tầng hầm của ngôi nhà kế bên miếu thờ miêu thần, " +
				              "bạn sẽ tới được Bar Mao, nơi tụ tập bí mật của bầy mèo. " +
				              "Ở đây, những chú mèo có thể hóa thành người để thưởng thức những món cao lương mỹ vị như " +
				              "socola hay cơm mèo phong cách Trung Hoa,v.v…," +
				              " và có những cuộc gặp gỡ thú vị…",
				Active = true,
				Discount = 15,
				Price = 92000,
				UrlSlug = "thuc-don-cua-bar-mao",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Tạm Biệt Chim Diệc",
				CategoryId = categories[1].Id,
				ShortIntro = "Tạm Biệt Chim Diệc",
				Description = "Hai người họ gặp nhau trên sân thượng trường cấp 3 vào năm 16 tuổi. Souji thích ở 1 mình còn Mika thì vui vẻ và hòa đồng. " +
				              "Thoạt nhìn, họ có vẻ trái ngược nhau, nhưng trong tim cả hai đều giấu trăm mối ngổn ngang vì hoàn cảnh gia đình ko hạnh phúc.",
				Active = true,
				Discount = 15,
				Price = 99000,
				UrlSlug = "tam-biet-chim-diec",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Nhật Ký Quan Sát Poyo Poyo – Tập 7",
				CategoryId = categories[1].Id,
				ShortIntro = "Nhật Ký Quan Sát Poyo Poyo – Tập 7",
				Description = "Cục bông béo tròn Poyopoyo – vị big boss của gia đình vẫn chưa dừng lại những trò con bò của mình." +
				              " Chú mèo béo tròn vẫn là một niềm vui của Moe còn Hide càng ngày càng thân thiết với Poyopoyo hơn nữa",
				Active = true,
				Discount = 15,
				Price = 35000,
				UrlSlug = "nhat-ky-quan-sat-poyo-poyo-tap-7",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Nhật Ký Quan Sát Poyo Poyo – Tập 5",
				CategoryId = categories[1].Id,
				ShortIntro = "Nhật Ký Quan Sát Poyo Poyo – Tập 5",
				Description = "Vẫn là những câu chuyện hàng ngày xung quanh chú mèo Poyo Poyo vô cùng béo và đáng yêu. " +
				              "Mỗi ngày sẽ là niềm vui nếu được cầm trên tay cuộc sống của mèo béo này.",
				Active = true,
				Discount = 15,
				Price = 35000,
				UrlSlug = "nhat-ky-quan-sat-poyo-poyo-tap-5",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Nhật Ký Quan Sát Poyo Poyo – Tập 2",
				CategoryId = categories[1].Id,
				ShortIntro = "Nhật Ký Quan Sát Poyo Poyo – Tập 2",
				Description = "Một cái gối?! Không, là chú mèo đấy. " +
				              "Poyo là một chúc mèo vàng với hình dáng đặc biệt – tròn vo, được gia đình cô chủ Satou nhận nuôi. " +
				              "Lúc đầu, em trai Hide rất ghét Poyo, nhưng qua từng ngày, Hide càng gần gũi với Poyo hơn. " +
				              "Những mẩu chuyện xoay quanh Poyo và gia đình Satou nhận nuôi Poyo đầy hài hước sẽ khiến bạn bật cười vui vẻ. " +
				              "Một tác phẩm thể loại đời thường, nhẹ nhàng mà đầy hài hước, đặc biệt dành cho những người yêu thích những chú mèo đáng yêu.",
				Active = true,
				Discount = 15,
				Price = 35000,
				UrlSlug = "nhat-ky-quan-sat-poyo-poyo-tap-2",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Bạch Tuyết Và Bảy Chú Mèo",
				CategoryId = categories[2].Id,
				ShortIntro = "Bạch Tuyết Và Bảy Chú Mèo",
				Description = "Bạch tuyết và Bảy chú mèo là một tập truyện ngắn về cuộc sống của 7 chú mèo và được cô gái Phấn Muội hầu hạ mỗi ngày. " +
				              "Những câu chuyện rất đỗi quen thuộc với những ai nuôi mèo. ",
				Active = true,
				Discount = 50,
				Price = 95000,
				UrlSlug = "bach-tuyet-va-bay-chu-meo",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
			new ()
			{
				Id = Guid.NewGuid(),
				Quantity = 10,
				CreateDate = DateTime.Now,
				Name = "Love Sick 2 - Thanh Xuân Không Hối Tiếc",
				CategoryId = categories[2].Id,
				ShortIntro = "Love Sick 2 - Thanh Xuân Không Hối Tiếc",
				Description = "“Nếu trên đời xuất hiện một người yêu con trai của mẹ bằng tất cả tấm lòng, " +
				              "nhưng tình cảm ấy không được xã hội chấp nhận. Liệu đó có được xem là tình yêu đẹp không mẹ …”",
				Active = true,
				Discount = 15,
				Price = 90000,
				UrlSlug = "love-sick-2-thanh-xuan-khong-hoi-tiec",
				Pictures = new List<Picture>()
				{
					new ()
					{
						Path = "images/default.png",
						Active = true
					}
				}
			},
		};

		_dbContext.Products.AddRange(product);
		_dbContext.SaveChanges();
		return product;
	}


}