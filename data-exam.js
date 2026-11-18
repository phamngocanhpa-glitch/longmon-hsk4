/* Long Môn HSK4 — Luyện thi theo dạng đề HSK4
   Nội dung soạn mới, bám sát ngữ pháp & chủ đề Giáo trình Hán ngữ quyển 4. */
window.EXAM = {
  nghe: {
    label: "Luyện nghe",
    parts: [
      {
        id: "nghe-1",
        title: "Phần 1: Phán đoán đúng sai",
        desc: "Nghe một đoạn, xác định câu ★ đúng hay sai.",
        type: "tf",
        items: [
          { audio: "我们家附近新开了一家超市，东西又便宜又新鲜，我经常去那儿买菜。", stmt: "他常去那家超市买东西。", answer: true, vi: "Gần nhà tôi mới mở một siêu thị, đồ vừa rẻ vừa tươi, tôi thường đến đó mua rau." },
          { audio: "今天的会议改到下午三点了，请大家互相通知一下，别迟到。", stmt: "会议在上午开。", answer: false, vi: "Cuộc họp hôm nay đổi sang 3 giờ chiều, mọi người báo cho nhau, đừng đến muộn." },
          { audio: "这本小说我看了一半就看不下去了，内容太无聊了。", stmt: "他把那本小说看完了。", answer: false, vi: "Quyển tiểu thuyết này tôi đọc được một nửa thì không đọc nổi nữa, nội dung chán quá." },
          { audio: "我弟弟从小就喜欢画画儿，现在他已经是一名有名的画家了。", stmt: "弟弟现在是画家。", answer: true, vi: "Em trai tôi từ nhỏ đã thích vẽ, bây giờ đã là một họa sĩ nổi tiếng." },
          { audio: "因为路上堵车，我们到机场的时候，飞机已经起飞了。", stmt: "他们没赶上飞机。", answer: true, vi: "Vì tắc đường, khi chúng tôi đến sân bay thì máy bay đã cất cánh." },
          { audio: "只要每天坚持跑步半个小时，身体就会越来越好。", stmt: "跑步对身体有好处。", answer: true, vi: "Chỉ cần mỗi ngày kiên trì chạy bộ nửa tiếng, sức khỏe sẽ ngày càng tốt." },
          { audio: "我的手机被弟弟弄坏了，明天得拿去修一修。", stmt: "手机是他自己弄坏的。", answer: false, vi: "Điện thoại của tôi bị em trai làm hỏng, mai phải mang đi sửa." },
          { audio: "这家饭馆的菜虽然有点儿贵，但是味道很好，所以客人很多。", stmt: "那家饭馆的客人不多。", answer: false, vi: "Món ăn quán này tuy hơi đắt nhưng rất ngon, nên khách rất đông." },
          { audio: "春节的时候，很多人家把“福”字倒着贴在门上，意思是“福到了”。", stmt: "“福”字倒贴表示福到了。", answer: true, vi: "Dịp Tết, nhiều nhà dán ngược chữ “Phúc” lên cửa, ý là “Phúc đến rồi”." },
          { audio: "我连续加了一个星期的班，今天终于可以好好休息一下了。", stmt: "他今天还要加班。", answer: false, vi: "Tôi tăng ca liền một tuần, hôm nay cuối cùng cũng được nghỉ ngơi." }
        ]
      },
      {
        id: "nghe-2",
        title: "Phần 2: Hội thoại ngắn",
        desc: "Nghe đoạn hội thoại 2 câu và câu hỏi, chọn đáp án đúng.",
        type: "listen",
        items: [
          { audio: "女：你怎么才来？电影都开始半个小时了。\n男：别提了，路上出了交通事故，堵了很久。\n问：男的为什么来晚了？", options: ["起晚了", "堵车了", "走错路了", "忘了时间"], answer: 1, vi: "Nữ: Sao giờ anh mới đến? Phim chiếu được nửa tiếng rồi. — Nam: Đừng nhắc nữa, trên đường có tai nạn, tắc rất lâu." },
          { audio: "男：这件衣服你穿着有点儿大，换一件小号的吧。\n女：好的，那我试试这件。\n问：他们最可能在哪儿？", options: ["商店", "医院", "银行", "教室"], answer: 0, vi: "Nam: Cái áo này em mặc hơi rộng, đổi cỡ nhỏ đi. — Nữ: Được, để em thử cái này." },
          { audio: "女：你的汉语说得越来越流利了！\n男：哪里哪里，我每天都跟中国朋友聊天儿。\n问：男的的汉语怎么样？", options: ["越来越好", "不太好", "跟以前一样", "不会说"], answer: 0, vi: "Nữ: Tiếng Trung của anh ngày càng lưu loát! — Nam: Đâu có, ngày nào tôi cũng nói chuyện với bạn Trung Quốc." },
          { audio: "男：听说你搬家了？新房子怎么样？\n女：比以前的大多了，就是离公司有点儿远。\n问：新房子有什么缺点？", options: ["太小", "太贵", "离公司远", "太旧"], answer: 2, vi: "Nam: Nghe nói em chuyển nhà rồi? Nhà mới thế nào? — Nữ: Rộng hơn trước nhiều, chỉ là hơi xa công ty." },
          { audio: "女：明天的晚会你能参加吗？\n男：恐怕去不了，我明天得去机场接我妈妈。\n问：男的明天要做什么？", options: ["参加晚会", "去机场接人", "坐飞机", "去上班"], answer: 1, vi: "Nữ: Dạ hội ngày mai anh tham gia được không? — Nam: E là không đi được, mai anh phải ra sân bay đón mẹ." },
          { audio: "男：小王，你的脸色不太好，怎么了？\n女：昨天晚上发烧了，一夜都没睡好。\n问：女的怎么了？", options: ["生病了", "迟到了", "丢东西了", "考试没考好"], answer: 0, vi: "Nam: Tiểu Vương, sắc mặt em không tốt, sao vậy? — Nữ: Tối qua em bị sốt, cả đêm ngủ không ngon." },
          { audio: "女：这个周末我们去爬山吧？\n男：只要不下雨，我就跟你去。\n问：男的是什么意思？", options: ["不想去", "天气好就去", "一定不去", "已经去过了"], answer: 1, vi: "Nữ: Cuối tuần này mình đi leo núi nhé? — Nam: Chỉ cần không mưa là anh đi cùng em." },
          { audio: "男：服务员，我们点的菜怎么还没上？\n女：对不起，今天客人太多了，马上就好。\n问：他们最可能在哪儿？", options: ["饭馆", "图书馆", "机场", "公园"], answer: 0, vi: "Nam: Phục vụ ơi, món chúng tôi gọi sao chưa lên? — Nữ: Xin lỗi, hôm nay khách đông quá, có ngay ạ." },
          { audio: "女：你把我的词典放在哪儿了？我找了半天也没找到。\n男：在你的书包里，我早上帮你放进去了。\n问：词典在哪儿？", options: ["桌子上", "书包里", "图书馆", "男的那儿"], answer: 1, vi: "Nữ: Anh để từ điển của em ở đâu rồi? Em tìm mãi không thấy. — Nam: Trong cặp sách của em, sáng nay anh cất vào giúp em." },
          { audio: "男：这次考试你考得怎么样？\n女：别提了，听力部分好多题我都没听懂。\n问：女的觉得考试怎么样？", options: ["很简单", "考得不好", "听力很容易", "还没考"], answer: 1, vi: "Nam: Lần thi này em làm bài thế nào? — Nữ: Đừng nhắc nữa, phần nghe có nhiều câu em không nghe hiểu." }
        ]
      },
      {
        id: "nghe-3",
        title: "Phần 3: Hội thoại & đoạn văn dài",
        desc: "Nghe hội thoại dài hoặc đoạn văn, chọn đáp án đúng.",
        type: "listen",
        items: [
          { audio: "男：你好，我想租一套房子，离地铁站近一点儿的。\n女：您看这套怎么样？两室一厅，走路到地铁站只要五分钟。\n男：房租多少钱一个月？\n女：三千五，包括水电费。\n男：有点儿贵，有没有便宜一点儿的？\n女：还有一套三千的，不过离地铁站远一些。\n问：男的觉得第一套房子怎么样？", options: ["太远", "太贵", "太小", "很满意"], answer: 1, vi: "Người nam muốn thuê nhà gần ga tàu điện; căn đầu tiên 3500/tháng, anh ấy thấy hơi đắt." },
          { audio: "很多人觉得只有考出好成绩才算成功，其实不是这样。每个人都有自己的长处，只要找到自己喜欢做的事情，并且坚持下去，就能做出成绩。\n问：这段话主要想告诉我们什么？", options: ["成绩最重要", "要坚持做喜欢的事", "不要参加考试", "成功很容易"], answer: 1, vi: "Nhiều người nghĩ chỉ có điểm cao mới là thành công. Thực ra chỉ cần tìm được việc mình thích và kiên trì thì sẽ có thành tích." },
          { audio: "女：周末你一般做什么？\n男：以前我常常在家睡觉、上网，现在我每个周末都去学太极拳。\n女：是吗？难不难？\n男：刚开始觉得很难，动作记不住，现在越练越有意思了。\n问：男的现在周末常做什么？", options: ["睡觉", "上网", "学太极拳", "去公司"], answer: 2, vi: "Trước đây cuối tuần anh ấy ngủ, lên mạng; giờ cuối tuần nào cũng đi học Thái Cực quyền, càng tập càng thấy thú vị." },
          { audio: "哈尔滨的冬天非常冷，最低气温能到零下三十度。但是每年冬天还是有很多人从各地来到这里，因为这里有美丽的冰灯。晚上，五颜六色的冰灯把整个城市装饰得像童话世界一样。\n问：人们冬天去哈尔滨主要是为了什么？", options: ["滑雪", "看冰灯", "吃东西", "工作"], answer: 1, vi: "Mùa đông Cáp Nhĩ Tân rất lạnh, nhưng nhiều người vẫn đến vì có đèn băng tuyệt đẹp, biến cả thành phố thành thế giới cổ tích." },
          { audio: "男：喂，李经理，我是小张，我现在在路上，可能要晚到十分钟。\n女：没关系，客人还没到。你直接到三楼会议室吧。\n男：好的，我需要带什么材料吗？\n女：把上次的合同带来就行了。\n问：男的要带什么？", options: ["电脑", "合同", "礼物", "照片"], answer: 1, vi: "Tiểu Trương gọi báo đến muộn 10 phút; giám đốc Lý dặn chỉ cần mang hợp đồng lần trước." },
          { audio: "在中国，数字“八”很受欢迎，因为“八”和“发财”的“发”发音差不多。所以很多人选电话号码、车牌号的时候，都希望里面有“八”。连结婚的日子，也有不少人愿意选在八号。\n问：中国人为什么喜欢“八”？", options: ["“八”很好写", "“八”的发音像“发”", "“八”是最大的数", "“八”很少见"], answer: 1, vi: "Ở Trung Quốc số 8 được ưa chuộng vì “bā” gần âm với “fā” (phát tài); ngay cả ngày cưới cũng nhiều người chọn ngày 8." }
        ]
      }
    ]
  },
  doc: {
    label: "Luyện đọc",
    parts: [
      {
        id: "doc-1",
        title: "Phần 1: Chọn từ điền vào chỗ trống",
        desc: "Chọn từ thích hợp trong ô từ cho sẵn (có 1 từ thừa).",
        type: "bank",
        groups: [
          {
            bank: ["坚持", "打扮", "来不及", "布置", "倒霉", "只要"],
            items: [
              { zh: "今天真___，一出门就被雨淋湿了。", answer: 4, vi: "Hôm nay thật xui xẻo, vừa ra khỏi cửa đã bị mưa ướt." },
              { zh: "快点儿走吧，再不走就___了。", answer: 2, vi: "Đi nhanh lên, không đi nữa là không kịp." },
              { zh: "___你努力，就一定会成功。", answer: 5, vi: "Chỉ cần bạn cố gắng thì nhất định sẽ thành công." },
              { zh: "同学们正在___教室，准备开晚会。", answer: 3, vi: "Các bạn đang bày trí lớp học, chuẩn bị tổ chức dạ hội." },
              { zh: "学外语要每天___练习，不能三天打鱼，两天晒网。", answer: 0, vi: "Học ngoại ngữ phải kiên trì luyện mỗi ngày, không thể “bữa đực bữa cái”." }
            ]
          },
          {
            bank: ["联系", "吉利", "积极", "热情", "丰富", "习惯"],
            items: [
              { zh: "来北京半年了，我已经___这里的天气了。", answer: 5, vi: "Đến Bắc Kinh nửa năm rồi, tôi đã quen thời tiết ở đây." },
              { zh: "毕业以后，我们一直保持___。", answer: 0, vi: "Sau khi tốt nghiệp, chúng tôi vẫn luôn giữ liên lạc." },
              { zh: "他上课回答问题非常___。", answer: 2, vi: "Trên lớp anh ấy trả lời câu hỏi rất tích cực." },
              { zh: "这个周末的活动很___，有唱歌、跳舞，还有京剧表演。", answer: 4, vi: "Hoạt động cuối tuần này rất phong phú: hát, nhảy, còn có biểu diễn kinh kịch." },
              { zh: "那里的人对客人特别___。", answer: 3, vi: "Người ở đó đặc biệt nhiệt tình với khách." }
            ]
          }
        ]
      },
      {
        id: "doc-2",
        title: "Phần 2: Sắp xếp thứ tự câu",
        desc: "Chạm vào các vế A, B, C theo đúng thứ tự.",
        type: "order",
        items: [
          { tokens: ["今天外面下大雨，", "而且我也有点儿感冒，", "所以我决定在家休息。"], vi: "Hôm nay ngoài trời mưa to, hơn nữa tôi hơi cảm, nên tôi quyết định ở nhà nghỉ." },
          { tokens: ["我第一次去看京剧，", "只看得懂演员的动作，", "但是听不懂他们唱的是什么。"], vi: "Lần đầu đi xem kinh kịch, tôi chỉ xem hiểu động tác của diễn viên, nhưng không nghe hiểu họ hát gì." },
          { tokens: ["先把面和好，", "然后把饺子包好，", "最后放进锅里煮。"], vi: "Trước tiên nhào bột, sau đó gói sủi cảo, cuối cùng cho vào nồi luộc." },
          { tokens: ["小王今天去买东西，", "到了商店付钱的时候，", "他才发现钱包被偷了。"], vi: "Hôm nay Tiểu Vương đi mua đồ, đến lúc trả tiền ở cửa hàng mới phát hiện ví bị trộm." },
          { tokens: ["只要明天天气好，", "我们就去长城，", "你别忘了带照相机。"], vi: "Chỉ cần mai trời đẹp, chúng ta sẽ đi Vạn Lý Trường Thành, bạn đừng quên mang máy ảnh." },
          { tokens: ["随着生活水平的提高，", "越来越多的年轻人", "喜欢在假期出国旅游。"], vi: "Cùng với mức sống nâng cao, ngày càng nhiều người trẻ thích đi du lịch nước ngoài vào kỳ nghỉ." },
          { tokens: ["他工作起来非常认真，", "有时候一忙就是一整天，", "连饭都忘了吃。"], vi: "Anh ấy làm việc rất nghiêm túc, có lúc bận cả ngày, ngay cả cơm cũng quên ăn." },
          { tokens: ["你这样做不是帮忙，", "而是给大家添麻烦，", "所以还是别去了。"], vi: "Bạn làm thế không phải giúp đỡ mà là gây phiền cho mọi người, nên tốt nhất đừng đi." }
        ]
      },
      {
        id: "doc-3",
        title: "Phần 3: Đọc hiểu đoạn văn",
        desc: "Đọc đoạn văn và chọn đáp án đúng.",
        type: "mc",
        items: [
          { passage: "我家以前住在四合院里，院子里有一棵大枣树。每到秋天，树上结满了红红的枣，又大又甜。后来四合院拆了，我们搬进了楼房。虽然新家很舒服，但是我常常想起那棵枣树。", q: "作者常常想起什么？", options: ["楼房", "枣树", "秋天", "新家"], answer: 1, vi: "Nhà tôi trước ở tứ hợp viện, trong sân có cây táo lớn… Tuy nhà mới thoải mái nhưng tôi thường nhớ cây táo ấy." },
          { passage: "小李以前很胖，医生让他多运动。他开始每天早上跑步，刚开始跑不了多远就累了，可是他一直坚持下去。半年以后，他瘦了十公斤，身体也越来越好。", q: "关于小李，可以知道什么？", options: ["不喜欢运动", "跑步没有用", "坚持跑步变瘦了", "现在还很胖"], answer: 2, vi: "Tiểu Lý trước béo, bắt đầu chạy bộ mỗi sáng và kiên trì; nửa năm sau giảm 10kg." },
          { passage: "很多外国人第一次看京剧时会觉得奇怪：演员的脸为什么画得红红绿绿的？其实，这叫“脸谱”，不同的颜色代表不同的性格。比如，红色表示忠诚勇敢，黑色表示正直，白色常常表示奸诈。", q: "京剧中红色脸谱一般表示什么？", options: ["奸诈", "忠诚勇敢", "正直", "聪明"], answer: 1, vi: "Mặt nạ kinh kịch: đỏ = trung thành dũng cảm, đen = chính trực, trắng = gian trá." },
          { passage: "上周六我和朋友去郊区爬山。山不高，可是路很难走。爬到一半，朋友说他爬不动了，想回去。我鼓励他说：“只要再坚持一下，就能看到最美的风景。”最后我们终于爬上了山顶。", q: "朋友爬到一半时怎么了？", options: ["迷路了", "爬不动了", "受伤了", "饿了"], answer: 1, vi: "Leo được nửa đường, bạn tôi nói leo không nổi nữa, muốn quay về." },
          { passage: "中国人过春节有很多习俗，比如贴春联、吃饺子、给孩子压岁钱等。春节前，家家户户都要把房子打扫得干干净净，表示把旧的一年里不好的东西都扫出去。", q: "春节前打扫房子表示什么？", options: ["欢迎客人", "扫走不好的东西", "准备吃饺子", "给孩子礼物"], answer: 1, vi: "Trước Tết nhà nào cũng quét dọn sạch sẽ, tượng trưng quét đi những điều không tốt của năm cũ." },
          { passage: "现在越来越多的人喜欢在网上买东西。网上购物不但方便，而且价格常常比商店便宜。不过，因为看不到真东西，有时候买到的东西和照片上的不一样。", q: "网上购物有什么缺点？", options: ["不方便", "价格贵", "看不到真东西", "送货太慢"], answer: 2, vi: "Mua sắm online tiện và rẻ, nhưng vì không thấy hàng thật nên đôi khi hàng không giống ảnh." },
          { passage: "在中国，如果你迷路了或者遇到困难，可以找警察帮忙。警察一般都很热情，会耐心地告诉你怎么走。所以人们常说：“有困难，找警察。”", q: "这段话主要说的是什么？", options: ["警察很忙", "遇到困难可以找警察", "不要迷路", "中国很大"], answer: 1, vi: "Ở Trung Quốc, lạc đường hay gặp khó khăn có thể tìm cảnh sát giúp đỡ." },
          { passage: "松树、竹子和梅花都不怕冷：松树和竹子冬天也是绿的，梅花在寒冷的冬天开放。所以中国人把它们叫做“岁寒三友”，用来比喻坚强的品格。", q: "“岁寒三友”比喻什么？", options: ["美丽的风景", "坚强的品格", "寒冷的冬天", "好朋友"], answer: 1, vi: "Tùng, trúc, mai không sợ lạnh nên được gọi là “tuế hàn tam hữu”, ví với phẩm cách kiên cường." }
        ]
      }
    ]
  },
  viet: {
    label: "Luyện viết",
    parts: [
      {
        id: "viet-1",
        title: "Phần 1: Hoàn thành câu",
        desc: "Sắp xếp các từ cho sẵn thành câu hoàn chỉnh.",
        type: "order",
        items: [
          { tokens: ["那本书", "被", "小王", "借走了"], vi: "Quyển sách đó bị Tiểu Vương mượn mất rồi." },
          { tokens: ["请", "你", "把", "门", "关上"], vi: "Mời bạn đóng cửa lại." },
          { tokens: ["天气", "越来越", "暖和了"], vi: "Thời tiết ngày càng ấm áp." },
          { tokens: ["上海话", "我", "一点儿也", "听不懂"], alts: [["我", "一点儿也", "听不懂", "上海话"]], vi: "Tiếng Thượng Hải tôi chẳng nghe hiểu chút nào." },
          { tokens: ["他", "连", "名字", "都", "写错了"], vi: "Anh ấy ngay cả tên cũng viết sai." },
          { tokens: ["墙上", "挂着", "一张", "照片"], vi: "Trên tường treo một tấm ảnh." },
          { tokens: ["他", "一边", "喝咖啡", "一边", "看报纸"], alts: [["他", "一边", "看报纸", "一边", "喝咖啡"]], vi: "Anh ấy vừa uống cà phê vừa đọc báo." },
          { tokens: ["他", "跑", "得", "很快"], vi: "Anh ấy chạy rất nhanh." },
          { tokens: ["只有", "多练习", "才能", "说好汉语"], vi: "Chỉ có luyện tập nhiều mới nói tốt tiếng Trung." },
          { tokens: ["难道", "你", "不知道", "这件事", "吗"], alts: [["这件事", "难道", "你", "不知道", "吗"]], vi: "Lẽ nào bạn không biết chuyện này?" }
        ]
      },
      {
        id: "viet-2",
        title: "Phần 2: Viết câu với từ cho sẵn",
        desc: "Dựa vào tình huống, viết một câu có dùng từ cho sẵn rồi tự đối chiếu với câu mẫu.",
        type: "write",
        items: [
          { word: "打扮", scene: "Một cô gái đang trang điểm trước khi đi dự tiệc.", sample: "她打扮得非常漂亮，准备去参加晚会。", vi: "Cô ấy ăn diện rất đẹp, chuẩn bị đi dự dạ hội." },
          { word: "倒霉", scene: "Một người bị mưa ướt sũng vì quên mang ô.", sample: "今天真倒霉，忘了带伞，衣服全被雨淋湿了。", vi: "Hôm nay thật xui, quên mang ô, quần áo bị mưa ướt hết." },
          { word: "坚持", scene: "Một người đàn ông chạy bộ mỗi sáng trong công viên.", sample: "他每天早上都坚持跑步，身体越来越好。", vi: "Sáng nào anh ấy cũng kiên trì chạy bộ, sức khỏe ngày càng tốt." },
          { word: "来不及", scene: "Một người nhìn đồng hồ, vội vàng chạy ra ga tàu.", sample: "快点儿走吧，再不走就来不及了。", vi: "Đi nhanh lên, không đi nữa thì không kịp." },
          { word: "吉利", scene: "Một người chọn biển số xe có nhiều số 8.", sample: "很多中国人觉得“八”是一个吉利的数字。", vi: "Nhiều người Trung Quốc cho rằng 8 là con số may mắn." },
          { word: "热情", scene: "Chủ nhà mỉm cười mời khách vào nhà, rót trà.", sample: "主人非常热情地请我们进去喝茶。", vi: "Chủ nhà rất nhiệt tình mời chúng tôi vào uống trà." }
        ]
      }
    ]
  }
};
