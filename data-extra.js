/* Long Môn HSK4 — Bộ câu hỏi bổ sung (đợt 2).
   Câu mới được NỐI VÀO SAU câu cũ để giữ nguyên tiến độ đã lưu. */
(function () {
  const extraLessons = {
    11: [
      { type: "mc", zh: "床上躺着___孩子。", options: ["一个", "一辆", "一张", "一条"], answer: 0, explain: "Câu tồn hiện chỉ người: Nơi chốn + V + 着 + 一个 + người." },
      { type: "mc", prompt: "Câu nào là câu tồn hiện diễn tả sự xuất hiện?", options: ["前面走过来一个人。", "那个人走到前面了。", "他在前面走。", "前面的人走了。"], answer: 0, explain: "Nơi chốn (前面) + V + 过来 + 一个人 (người mới xuất hiện)." },
      { type: "order", tokens: ["院子里", "种着", "一棵", "大枣树"], explain: "院子里种着一棵大枣树。— Trong sân có trồng một cây táo lớn." },
      { type: "mc", zh: "你越解释，他___不相信。", options: ["越", "越来越", "很", "都"], answer: 0, explain: "越A越B: bạn càng giải thích, anh ấy càng không tin." },
      { type: "mc", zh: "人们的生活水平___高了。", options: ["越来越", "越……越", "越高", "更越"], answer: 0, explain: "越来越 + tính từ: ngày càng cao." }
    ],
    12: [
      { type: "mc", zh: "她把大衣挂___衣柜里了。", options: ["在", "给", "成", "着"], answer: 0, explain: "把 + O + 挂在 + nơi chốn." },
      { type: "order", tokens: ["你", "把", "这些书", "放到", "书架上", "吧"], explain: "你把这些书放到书架上吧。— Bạn để mấy quyển sách này lên giá đi." },
      { type: "mc", prompt: "Câu nào đúng?", options: ["我想把这件事告诉妈妈。", "我把这件事想告诉妈妈。", "我把想这件事告诉妈妈。", "想我把这件事告诉妈妈。"], answer: 0, explain: "Động từ năng nguyện (想、要、能…) đặt trước 把." },
      { type: "mc", zh: "春节的时候，人们把对联贴___门的两边。", options: ["在", "给", "成", "得"], answer: 0, explain: "贴在 + nơi chốn: dán ở hai bên cửa." },
      { type: "mc", zh: "请把“福”字___过来贴。", options: ["倒", "到", "道", "刀"], answer: 0, explain: "倒 (dào): lộn ngược. 倒过来贴 = dán ngược lại." }
    ],
    13: [
      { type: "mc", zh: "你把抽屉里的东西拿___来吧。", options: ["出", "着", "了", "得"], answer: 0, explain: "拿出来: lấy ra." },
      { type: "order", tokens: ["请你", "把", "地图", "挂在", "墙上"], explain: "请你把地图挂在墙上。— Bạn treo bản đồ lên tường giúp." },
      { type: "mc", zh: "他把房间收拾___很干净。", options: ["得", "的", "地", "了"], answer: 0, explain: "把 + O + V + 得 + bổ ngữ trạng thái." },
      { type: "mc", prompt: "Câu nào KHÔNG dùng được 把?", options: ["我把作业交了。", "我把这个消息知道了。", "我把门打开了。", "我把书还了。"], answer: 1, explain: "知道 là động từ nhận thức, không có tính xử lý nên không dùng với 把." },
      { type: "mc", zh: "我把箱子从楼上搬___来了。", options: ["下", "着", "得", "过了"], answer: 0, explain: "从楼上搬下来: chuyển từ tầng trên xuống." }
    ],
    14: [
      { type: "mc", zh: "我的自行车被人骑___了。", options: ["走", "着", "过", "得"], answer: 0, explain: "骑走了: bị người ta đạp đi mất." },
      { type: "order", tokens: ["我的", "钱包", "被", "小偷", "偷走了"], explain: "我的钱包被小偷偷走了。— Ví của tôi bị kẻ trộm lấy mất." },
      { type: "mc", zh: "他上课又迟到了，被老师___了。", options: ["批评", "表演", "打扮", "布置"], answer: 0, explain: "被老师批评: bị thầy giáo phê bình." },
      { type: "mc", zh: "你怎么___感冒了？上个星期不是刚好吗？", options: ["又", "再", "还", "才"], answer: 0, explain: "Sự việc đã lặp lại → 又." },
      { type: "mc", prompt: "Câu nào đúng?", options: ["我的自行车被他骑走了。", "我的自行车被他骑。", "他被我的自行车骑走了。", "我的自行车他被骑走了。"], answer: 0, explain: "Chủ ngữ bị tác động + 被 + người thực hiện + V + thành phần khác." }
    ],
    15: [
      { type: "mc", zh: "这儿太吵了，我听___清楚你说的话。", options: ["不", "没", "得不", "别"], answer: 0, explain: "听不清楚: nghe không rõ." },
      { type: "mc", zh: "这么多东西，一个箱子装得___吗？", options: ["下", "了下", "完着", "起来"], answer: 0, explain: "装得下: chứa vừa, đủ chỗ." },
      { type: "order", tokens: ["京剧", "我", "看得懂", "但是", "听不懂"], explain: "京剧我看得懂，但是听不懂。" },
      { type: "mc", zh: "电影七点开始，现在已经六点五十五了，___了！", options: ["来不及", "来得及", "去得了", "看得见"], answer: 0, explain: "Chỉ còn 5 phút → 来不及 (không kịp)." },
      { type: "mc", zh: "我的电脑坏了，你修得___吗？", options: ["好", "完了", "下", "着"], answer: 0, explain: "修得好: sửa được (tốt)." }
    ],
    16: [
      { type: "mc", zh: "只要你___，我就放心了。", options: ["没事", "有事", "不来", "紧张"], answer: 0, explain: "只要你没事，我就放心了: chỉ cần bạn không sao là tôi yên tâm." },
      { type: "mc", zh: "他太紧张了，台词说___出来。", options: ["不", "没", "得", "别"], answer: 0, explain: "说不出来: không nói ra được." },
      { type: "order", tokens: ["只要", "坚持下去", "就", "一定能", "成功"], explain: "只要坚持下去，就一定能成功。— Chỉ cần kiên trì là nhất định thành công." },
      { type: "mc", zh: "这个箱子不重，我一个人拿得___。", options: ["动", "下", "了下", "着"], answer: 0, explain: "拿得动: xách nổi." },
      { type: "mc", prompt: "Câu nào dùng 只要 đúng?", options: ["只要有时间，我就去看你。", "只要有时间，我才去看你。", "只要有时间，我都去看你了。", "只要有时间，我再去看你。"], answer: 0, explain: "只要 đi với 就, không đi với 才." }
    ],
    17: [
      { type: "mc", zh: "这个句子很重要，你把它写___吧。", options: ["下来", "起来", "下去", "出去"], answer: 0, explain: "写下来: viết lại, ghi lại." },
      { type: "mc", zh: "春天到了，天气慢慢暖和___了。", options: ["起来", "下来", "出来", "下去"], answer: 0, explain: "Tính từ + 起来: trạng thái bắt đầu và tăng dần." },
      { type: "mc", zh: "___你亲自去请他，他___会来。", options: ["只有……才", "只要……才", "虽然……也", "因为……所以"], answer: 0, explain: "只有……才……: chỉ khi bạn đích thân đi mời, anh ấy mới đến." },
      { type: "order", tokens: ["我", "终于", "想起来", "他的名字", "了"], explain: "我终于想起来他的名字了。— Cuối cùng tôi cũng nhớ ra tên anh ấy." },
      { type: "mc", zh: "这首歌太好听了，我一听就爱___了。", options: ["上", "下", "出", "起"], answer: 0, explain: "爱上: yêu thích, phải lòng." }
    ],
    18: [
      { type: "mc", zh: "你想去哪儿就去___，我都陪你。", options: ["哪儿", "那儿", "什么", "谁"], answer: 0, explain: "Cặp hô ứng 哪儿……就……哪儿." },
      { type: "mc", zh: "这个周末我没有___地方想去，就在家休息吧。", options: ["什么", "怎么", "谁", "多少"], answer: 0, explain: "没有什么地方: không có chỗ nào (phiếm chỉ)." },
      { type: "order", tokens: ["他", "一边", "走", "一边", "打电话"], alts: [["他", "一边", "打电话", "一边", "走"]], explain: "他一边走一边打电话。— Anh ấy vừa đi vừa gọi điện." },
      { type: "mc", zh: "包饺子：先和面，___包饺子，最后煮饺子。", options: ["再", "最后", "一边", "先"], answer: 0, explain: "先……再……最后……" },
      { type: "mc", zh: "A：我们吃什么？ B：___，你点吧。", options: ["随便", "哪儿", "一边", "然后"], answer: 0, explain: "随便: tùy ý, gì cũng được." }
    ],
    19: [
      { type: "mc", zh: "这些苹果___都很甜。", options: ["个个", "一个个个", "个一", "一一个"], answer: 0, explain: "Lặp lượng từ 个个: quả nào cũng…" },
      { type: "mc", zh: "他累___一句话也不想说。", options: ["得", "地", "的", "了"], answer: 0, explain: "累得 + cụm từ: mệt đến mức…" },
      { type: "mc", prompt: "“不去不行” nghĩa là gì?", options: ["Không đi không được (phải đi)", "Không muốn đi", "Đi cũng không được", "Có thể không đi"], answer: 0, explain: "Câu phức không từ nối: (如果)不去，(就)不行." },
      { type: "order", tokens: ["同学们", "一个一个地", "走进了", "教室"], explain: "同学们一个一个地走进了教室。" },
      { type: "mc", zh: "梅花在寒冷的冬天___。", options: ["开放", "迷路", "帮助", "象征"], answer: 0, explain: "开放 (hoa) nở." }
    ],
    20: [
      { type: "mc", zh: "你___是想去北京吗？怎么买了去上海的票？", options: ["不", "难道", "连", "越"], answer: 0, explain: "不是……吗？: câu phản vấn — bạn chẳng phải muốn đi Bắc Kinh sao?" },
      { type: "mc", zh: "他连一个汉字___不认识。", options: ["也", "才", "就", "再"], answer: 0, explain: "连……也……" },
      { type: "order", tokens: ["难道", "你", "连", "这个字", "也", "不认识", "吗"], explain: "难道你连这个字也不认识吗？— Lẽ nào bạn ngay cả chữ này cũng không biết?" },
      { type: "mc", prompt: "“这个问题，谁不知道？” nghĩa là gì?", options: ["Ai cũng biết vấn đề này", "Không ai biết vấn đề này", "Ai là người không biết?", "Tôi không biết vấn đề này"], answer: 0, explain: "Câu phản vấn với 谁: khẳng định mạnh — ai mà chẳng biết." },
      { type: "mc", zh: "雨太大了，我们___取消了比赛。", options: ["不得不", "不会不", "难道", "连"], answer: 0, explain: "不得不: buộc phải." }
    ]
  };

  window.LESSONS.forEach((L) => { (extraLessons[L.id] || []).forEach((ex) => L.exercises.push(ex)); });

  const part = (id) => {
    for (const s in window.EXAM) { const p = window.EXAM[s].parts.find((x) => x.id === id); if (p) return p; }
  };

  part("nghe-1").items.push(
    { audio: "我本来打算周末去爬山，可是天气预报说周末有大雨，只好改到下个星期了。", stmt: "他这个周末去爬山。", answer: false, vi: "Tôi định cuối tuần đi leo núi, nhưng dự báo có mưa to nên đành dời sang tuần sau." },
    { audio: "这件衬衫是我妈妈送给我的生日礼物，颜色和样子我都很喜欢。", stmt: "衬衫是他自己买的。", answer: false, vi: "Chiếc áo sơ mi này là quà sinh nhật mẹ tặng tôi, màu và kiểu tôi đều thích." },
    { audio: "小李把房间收拾得干干净净，因为今天晚上有朋友要来他家做客。", stmt: "今天有客人去小李家。", answer: true, vi: "Tiểu Lý dọn phòng sạch sẽ vì tối nay có bạn đến nhà chơi." },
    { audio: "我已经习惯了北京的生活。刚来的时候常常感冒，现在身体好多了。", stmt: "他现在常常感冒。", answer: false, vi: "Tôi đã quen cuộc sống ở Bắc Kinh. Mới đến hay bị cảm, giờ khỏe hơn nhiều." },
    { audio: "这个问题太难了，连老师都回答不出来。", stmt: "老师也回答不了这个问题。", answer: true, vi: "Câu hỏi này khó quá, ngay cả thầy giáo cũng không trả lời được." },
    { audio: "去长城的人越来越多，最好早上早点儿出发，不然要排很长时间的队。", stmt: "去长城最好早点儿出发。", answer: true, vi: "Người đi Trường Thành ngày càng đông, tốt nhất nên xuất phát sớm, không thì phải xếp hàng lâu." },
    { audio: "我的汉语水平不高，看中文报纸还有点儿困难，只能看懂一些简单的新闻。", stmt: "他能看懂所有的中文报纸。", answer: false, vi: "Trình độ tiếng Trung của tôi chưa cao, đọc báo còn khó, chỉ hiểu được tin đơn giản." },
    { audio: "她一边听音乐一边做作业，结果作业里错了好几道题。", stmt: "她的作业一道题也没错。", answer: false, vi: "Cô ấy vừa nghe nhạc vừa làm bài, kết quả sai mấy câu." },
    { audio: "哥哥大学毕业以后，在一家公司工作，现在已经当上经理了。", stmt: "哥哥现在是经理。", answer: true, vi: "Anh trai tốt nghiệp đại học rồi làm ở một công ty, giờ đã lên làm giám đốc." },
    { audio: "我们先去银行取钱，然后去商店买东西，最后去饭馆吃饭。", stmt: "他们最后去银行。", answer: false, vi: "Chúng tôi ra ngân hàng rút tiền trước, sau đó đi mua đồ, cuối cùng đi ăn." }
  );

  part("nghe-2").items.push(
    { audio: "男：你看见我的手机了吗？\n女：是不是被你放在沙发上了？刚才我好像在那儿看见了。\n问：手机可能在哪儿？", options: ["沙发上", "桌子上", "书包里", "车里"], answer: 0, vi: "Nam: Em thấy điện thoại của anh không? — Nữ: Có phải anh để trên sofa không? Lúc nãy hình như em thấy ở đó." },
    { audio: "女：这次的京剧表演你看懂了吗？\n男：动作我看得懂，可是唱的我一句也听不懂。\n问：男的哪部分听不懂？", options: ["动作", "唱的内容", "字幕", "服装"], answer: 1, vi: "Nữ: Lần biểu diễn kinh kịch này anh xem hiểu không? — Nam: Động tác thì hiểu, phần hát không nghe hiểu câu nào." },
    { audio: "男：明天的会几点开始？\n女：本来是九点，现在改到十点了。\n问：会议几点开始？", options: ["八点", "九点", "十点", "十一点"], answer: 2, vi: "Nam: Cuộc họp mai mấy giờ? — Nữ: Vốn là 9 giờ, giờ đổi sang 10 giờ rồi." },
    { audio: "女：你怎么一个人搬这么重的箱子？\n男：没关系，我搬得动。\n问：男的是什么意思？", options: ["搬不动", "能搬动", "不想搬", "需要帮忙"], answer: 1, vi: "Nữ: Sao anh một mình bê cái thùng nặng thế? — Nam: Không sao, anh bê nổi." },
    { audio: "男：听说你考上北京大学了，祝贺你！\n女：谢谢！我准备了整整一年呢。\n问：女的怎么了？", options: ["考上大学了", "没考上", "要去工作", "准备出国"], answer: 0, vi: "Nam: Nghe nói em thi đỗ Đại học Bắc Kinh, chúc mừng! — Nữ: Cảm ơn! Em chuẩn bị tròn một năm đấy." },
    { audio: "女：服务员，这个菜太咸了，能换一个吗？\n男：对不起，我马上给您换。\n问：女的觉得菜怎么样？", options: ["太甜", "太咸", "太辣", "太少"], answer: 1, vi: "Nữ: Phục vụ ơi, món này mặn quá, đổi món khác được không? — Nam: Xin lỗi, tôi đổi ngay ạ." },
    { audio: "男：你是怎么来的？坐地铁还是打车？\n女：本来想打车，可是一辆空车也没有，只好坐地铁了。\n问：女的是怎么来的？", options: ["打车", "坐地铁", "骑车", "走路"], answer: 1, vi: "Nam: Em đến bằng gì? Tàu điện ngầm hay taxi? — Nữ: Định bắt taxi nhưng không có xe trống nào, đành đi tàu điện." },
    { audio: "女：周末我们去看冰灯吧！\n男：好啊，不过听说那儿特别冷，我们得多穿点儿衣服。\n问：男的提醒女的什么？", options: ["早点儿出发", "多穿衣服", "带照相机", "提前买票"], answer: 1, vi: "Nữ: Cuối tuần mình đi xem đèn băng nhé! — Nam: Được, nhưng nghe nói ở đó rất lạnh, phải mặc nhiều áo." },
    { audio: "男：老师，这个词是什么意思？我查了词典也没弄明白。\n女：下课以后你来我办公室，我给你讲讲。\n问：他们最可能是什么关系？", options: ["老师和学生", "医生和病人", "经理和职员", "售货员和顾客"], answer: 0, vi: "Nam: Thưa cô, từ này nghĩa là gì? Em tra từ điển vẫn chưa hiểu. — Nữ: Tan học em lên văn phòng, cô giảng cho." },
    { audio: "女：你的腿怎么了？\n男：昨天骑自行车的时候，被一辆汽车撞了一下，不过不太严重。\n问：男的怎么了？", options: ["腿受伤了", "自行车丢了", "汽车坏了", "迟到了"], answer: 0, vi: "Nữ: Chân anh sao vậy? — Nam: Hôm qua đi xe đạp bị một chiếc ô tô va phải, nhưng không nghiêm trọng lắm." }
  );

  part("nghe-3").items.push(
    { audio: "女：你的中文说得这么好，学了多长时间了？\n男：差不多两年了。\n女：你是怎么学的？\n男：我每天都看中国电视剧，一边看一边学，有不懂的就问中国朋友。刚开始只能听懂几个词，现在大部分都听得懂了。\n问：男的是怎么学中文的？", options: ["上补习班", "看电视剧", "读小说", "听广播"], answer: 1, vi: "Anh ấy học gần 2 năm, mỗi ngày xem phim truyền hình Trung Quốc, vừa xem vừa học, không hiểu thì hỏi bạn." },
    { audio: "小王是个“马大哈”，常常丢东西。上个月他把钥匙忘在了出租车上，这个星期又把手机丢在了饭馆里。朋友们都劝他：出门以前，先检查一下自己的东西。\n问：小王有什么问题？", options: ["常常迟到", "常常丢东西", "不爱说话", "身体不好"], answer: 1, vi: "Tiểu Vương là người đãng trí, hay làm mất đồ: tháng trước quên chìa khóa trên taxi, tuần này lại để quên điện thoại ở quán ăn." },
    { audio: "男：周末的联欢会准备得怎么样了？\n女：节目都准备好了，有唱歌、跳舞，还有一个京剧表演。\n男：教室布置好了吗？\n女：还没有，我们打算明天下午把教室布置成礼堂。\n问：他们明天下午要做什么？", options: ["排练节目", "布置教室", "买东西", "上课"], answer: 1, vi: "Tiết mục đã chuẩn bị xong; chiều mai họ định bày trí lớp học thành hội trường." },
    { audio: "每年春节以前，很多在外地工作的人都要回老家和家人一起过年。所以，春节前后火车票特别难买。有的人提前一个月就开始在网上买票，可是常常还是买不到。\n问：春节前火车票为什么难买？", options: ["票太贵", "回家的人很多", "火车太少", "网上不能买"], answer: 1, vi: "Trước Tết rất nhiều người làm ăn xa về quê đón Tết, nên vé tàu rất khó mua." }
  );

  part("doc-1").groups.push(
    {
      bank: ["舍不得", "紧张", "放心", "讲究", "来得及", "随便"],
      items: [
        { zh: "别___，你准备得这么好，一定能演好。", answer: 1, vi: "Đừng căng thẳng, bạn chuẩn bị tốt thế, nhất định diễn tốt." },
        { zh: "这件衣服是奶奶送给我的，我一直___穿。", answer: 0, vi: "Bộ quần áo này bà tặng, tôi vẫn không nỡ mặc." },
        { zh: "中国人选结婚的日子很___，常常选吉利的日子。", answer: 3, vi: "Người Trung Quốc rất chú trọng chọn ngày cưới, thường chọn ngày tốt." },
        { zh: "我吃什么都行，你___点吧。", answer: 5, vi: "Tôi ăn gì cũng được, bạn cứ gọi tùy ý." },
        { zh: "我到了就给你打电话，你___吧。", answer: 2, vi: "Đến nơi tôi sẽ gọi cho bạn, bạn yên tâm nhé." }
      ]
    },
    {
      bank: ["丰富", "批评", "安排", "迷路", "象征", "终于"],
      items: [
        { zh: "在中国，松、竹、梅___坚强的品格。", answer: 4, vi: "Ở Trung Quốc, tùng, trúc, mai tượng trưng cho phẩm cách kiên cường." },
        { zh: "这次旅行的日程都___好了，你不用担心。", answer: 2, vi: "Lịch trình chuyến đi đã sắp xếp xong, bạn không cần lo." },
        { zh: "他第一次来北京，在胡同里___了。", answer: 3, vi: "Lần đầu đến Bắc Kinh, anh ấy bị lạc trong ngõ." },
        { zh: "经过一年的努力，他___考上了大学。", answer: 5, vi: "Sau một năm cố gắng, cuối cùng anh ấy đã đỗ đại học." },
        { zh: "上课的时候他一直玩手机，被老师___了。", answer: 1, vi: "Trong giờ học anh ấy cứ chơi điện thoại, bị thầy phê bình." }
      ]
    }
  );

  part("doc-2").items.push(
    { tokens: ["我本来想今天去看你，", "可是公司突然有事，", "只好改到明天了。"], vi: "Tôi định hôm nay đến thăm bạn, nhưng công ty đột nhiên có việc, đành dời sang mai." },
    { tokens: ["只有多听多说，", "才能提高口语水平，", "光看书是不够的。"], vi: "Chỉ có nghe nhiều nói nhiều mới nâng cao khẩu ngữ, chỉ đọc sách thì không đủ." },
    { tokens: ["昨天我在街上遇到一位老人，", "他迷路了，", "我就帮他找到了家。"], vi: "Hôm qua tôi gặp một cụ già trên phố, cụ bị lạc đường, tôi giúp cụ tìm được nhà." },
    { tokens: ["这家饭馆的菜又便宜又好吃，", "所以每天中午", "都有很多人在这儿排队。"], vi: "Món ở quán này vừa rẻ vừa ngon, nên trưa nào cũng có nhiều người xếp hàng." },
    { tokens: ["虽然我已经离开家乡十年了，", "但是我常常想起", "院子里那棵大枣树。"], vi: "Tuy đã rời quê mười năm, nhưng tôi vẫn thường nhớ cây táo lớn trong sân." },
    { tokens: ["下课以后，", "他先去图书馆还书，", "然后去食堂吃饭。"], vi: "Sau khi tan học, anh ấy đến thư viện trả sách trước, sau đó đến nhà ăn ăn cơm." }
  );

  part("doc-3").items.push(
    { passage: "大卫来中国一年了。刚来的时候，他连“你好”都不会说，买东西只能用手比划。现在，他不但能跟中国人聊天儿，而且还能看懂中文电影了。他说，这是因为他每天坚持练习口语。", q: "大卫的汉语为什么进步得这么快？", options: ["他以前学过", "他每天坚持练口语", "他常看书", "他有中国老师"], answer: 1, vi: "David mới đến không biết nói cả “xin chào”, nay đã trò chuyện và xem phim tiếng Trung được nhờ kiên trì luyện nói mỗi ngày." },
    { passage: "京剧是中国的“国粹”，已经有两百多年的历史了。京剧演员的表演包括唱、念、做、打四个方面。很多年轻人觉得京剧太慢，听不懂，但是现在也有越来越多的年轻人开始喜欢京剧了。", q: "关于京剧，下面哪个说法正确？", options: ["只有一百年历史", "年轻人都不喜欢", "表演包括唱念做打", "很容易听懂"], answer: 2, vi: "Kinh kịch có hơn 200 năm lịch sử, biểu diễn gồm hát, nói, diễn, đánh; ngày càng nhiều người trẻ yêu thích." },
    { passage: "很多人把手机当成了生活中离不开的东西，吃饭的时候看，走路的时候也看。医生提醒大家：走路时看手机很危险，很容易被车撞到；晚上睡觉前看手机，也会影响睡眠。", q: "医生提醒大家什么？", options: ["多用手机", "走路时别看手机", "睡觉前看手机", "手机很贵"], answer: 1, vi: "Bác sĩ nhắc: vừa đi vừa xem điện thoại rất nguy hiểm, dễ bị xe đâm; xem trước khi ngủ ảnh hưởng giấc ngủ." },
    { passage: "我的邻居王奶奶今年八十岁了，身体还很好。她每天早上六点起床，先去公园打太极拳，然后去市场买菜，下午在家看看书、画画儿。她说，只要心情好，身体就会好。", q: "王奶奶认为身体好的原因是什么？", options: ["吃得好", "心情好", "睡得多", "常去医院"], answer: 1, vi: "Bà Vương 80 tuổi vẫn khỏe; bà nói chỉ cần tâm trạng tốt thì sức khỏe sẽ tốt." },
    { passage: "上个周末我去朋友家做客。刚进门，我就看见门上倒贴着一个大大的“福”字。朋友告诉我，“倒”和“到”的发音一样，“福”倒了，就是“福到了”的意思。", q: "为什么把“福”字倒着贴？", options: ["贴错了", "表示福到了", "这样更好看", "为了欢迎客人"], answer: 1, vi: "“倒” (ngược) đồng âm với “到” (đến), nên dán ngược chữ Phúc mang ý “phúc đến rồi”." },
    { passage: "现在城市里的高楼越来越多，四合院越来越少了。有人觉得住楼房方便、干净；也有人觉得在四合院里，邻居们互相帮助，生活更有人情味儿。", q: "有人喜欢四合院的原因是什么？", options: ["方便", "干净", "邻居之间关系好", "房子很高"], answer: 2, vi: "Có người thích tứ hợp viện vì hàng xóm giúp đỡ nhau, cuộc sống tình người hơn." }
  );

  part("viet-1").items.push(
    { tokens: ["他", "把", "作业", "做完了"], vi: "Anh ấy làm xong bài tập rồi." },
    { tokens: ["我的", "自行车", "被", "弟弟", "骑走了"], vi: "Xe đạp của tôi bị em trai đạp đi rồi." },
    { tokens: ["桌子上", "放着", "一个", "生日蛋糕"], vi: "Trên bàn có đặt một chiếc bánh sinh nhật." },
    { tokens: ["汉语", "越", "学", "越", "有意思"], vi: "Tiếng Trung càng học càng thú vị." },
    { tokens: ["这个房间", "坐不下", "二十个人"], vi: "Căn phòng này không đủ chỗ cho hai mươi người." },
    { tokens: ["只要", "明天", "不下雨", "我们就", "去爬山"], alts: [["明天", "只要", "不下雨", "我们就", "去爬山"]], vi: "Chỉ cần mai không mưa, chúng ta sẽ đi leo núi." },
    { tokens: ["他的名字", "我", "想不起来", "了"], alts: [["我", "想不起来", "他的名字", "了"]], vi: "Tên anh ấy tôi không nhớ ra được." },
    { tokens: ["我们", "先", "去吃饭", "再", "去看电影"], alts: [["我们", "先", "去看电影", "再", "去吃饭"]], vi: "Chúng ta đi ăn trước rồi đi xem phim." },
    { tokens: ["她", "高兴得", "说不出话来"], vi: "Cô ấy vui đến mức không nói nên lời." },
    { tokens: ["连", "小孩子", "都", "知道", "这个道理"], alts: [["这个道理", "连", "小孩子", "都", "知道"]], vi: "Ngay cả trẻ con cũng biết đạo lý này." }
  );

  part("viet-2").items.push(
    { word: "舍不得", scene: "Một người đứng nhìn lại căn nhà cũ lần cuối trước khi chuyển đi.", sample: "要搬家了，我真舍不得离开这个四合院。", vi: "Sắp chuyển nhà rồi, tôi thật không nỡ rời tứ hợp viện này." },
    { word: "紧张", scene: "Một học sinh đứng trên sân khấu, tay cầm micro hơi run.", sample: "第一次上台表演，她紧张得说不出话来。", vi: "Lần đầu lên sân khấu biểu diễn, cô ấy căng thẳng đến mức không nói được." },
    { word: "迷路", scene: "Một khách du lịch cầm bản đồ, đứng giữa ngã tư nhìn quanh.", sample: "他在胡同里迷路了，只好找警察帮忙。", vi: "Anh ấy lạc đường trong ngõ, đành nhờ cảnh sát giúp." },
    { word: "布置", scene: "Các bạn sinh viên đang treo bóng bay và đèn lồng trong lớp học.", sample: "同学们正在把教室布置成联欢会的会场。", vi: "Các bạn đang bày trí lớp học thành hội trường liên hoan." }
  );
})();
