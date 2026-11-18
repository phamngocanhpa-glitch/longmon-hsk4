/* Long Môn HSK4 — Dữ liệu bài học 11–20 (Giáo trình Hán ngữ quyển 4)
   vocab: [chữ Hán, pinyin, nghĩa tiếng Việt]
   grammar: các điểm ngữ pháp (tóm tắt)
   exercises: mc = trắc nghiệm, order = sắp xếp từ thành câu */
window.LESSONS = [
  {
    id: 11,
    glyph: "越",
    color: "blue",
    title: "前边开过来一辆空车",
    vi: "Phía trước có một chiếc xe trống đang đi tới",
    topics: ["Câu tồn hiện (存现句)", "越来越… / 越…越…"],
    vocab: [
      ["空车", "kōng chē", "xe trống (taxi không khách)"],
      ["打车", "dǎ chē", "bắt taxi"],
      ["四合院", "sìhéyuàn", "tứ hợp viện"],
      ["院子", "yuànzi", "sân nhà"],
      ["枣树", "zǎoshù", "cây táo tàu"],
      ["尝", "cháng", "nếm, ăn thử"],
      ["甜", "tián", "ngọt"],
      ["楼房", "lóufáng", "nhà lầu, nhà tầng"],
      ["搬", "bān", "chuyển, dọn (nhà)"],
      ["舍不得", "shěbude", "không nỡ, tiếc"],
      ["现代化", "xiàndàihuà", "hiện đại hóa"],
      ["打扮", "dǎban", "ăn diện, trang điểm"],
      ["进步", "jìnbù", "tiến bộ"],
      ["丰富", "fēngfù", "phong phú"],
      ["联欢会", "liánhuānhuì", "buổi liên hoan"]
    ],
    grammar: [
      {
        name: "Câu tồn hiện 存现句",
        formula: "Nơi chốn + Động từ + 着 / 了 / Bổ ngữ xu hướng + (Số lượng) + Danh từ",
        note: "Diễn tả người/vật tồn tại, xuất hiện hoặc biến mất ở một nơi. Danh từ phía sau thường là thông tin mới, không xác định.",
        examples: [
          ["桌子上放着一本书。", "Trên bàn có đặt một quyển sách."],
          ["前边开过来一辆空车。", "Phía trước có một chiếc xe trống chạy tới."],
          ["我们楼里搬走了一家人。", "Tòa nhà chúng tôi có một gia đình chuyển đi."]
        ]
      },
      {
        name: "越来越… / 越A越B",
        formula: "越来越 + Tính từ/Động từ tâm lý · 越 + A + 越 + B",
        note: "越来越: mức độ tăng dần theo thời gian (không dùng thêm 很/非常). 越A越B: B thay đổi theo A.",
        examples: [
          ["天气越来越冷了。", "Thời tiết ngày càng lạnh."],
          ["汉语越学越有意思。", "Tiếng Trung càng học càng thú vị."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "前边开过来___空车。", options: ["一辆", "一个", "一张", "一本"], answer: 0, explain: "Câu tồn hiện: Nơi chốn + V + 过来 + số lượng + danh từ. Xe cộ dùng lượng từ 辆." },
      { type: "mc", prompt: "Chọn câu tồn hiện đúng:", options: ["桌子上放着一本书。", "一本书放着桌子上。", "桌子上一本书放着。", "放着一本书桌子上。"], answer: 0, explain: "Trật tự đúng: Nơi chốn (桌子上) + động từ + 着 + số lượng + danh từ." },
      { type: "mc", zh: "我们班___两个新同学。", options: ["来了", "来着", "了来", "过来来"], answer: 0, explain: "Diễn tả sự xuất hiện: Nơi chốn + 来了 + người mới." },
      { type: "mc", zh: "天气___冷了，你要多穿点儿衣服。", options: ["越来越", "越……越", "越来", "更来更"], answer: 0, explain: "越来越 + tính từ: ngày càng… (biến đổi theo thời gian)." },
      { type: "mc", zh: "雨越下___大。", options: ["越", "越来越", "很", "更加"], answer: 0, explain: "Cấu trúc 越A越B: mưa càng rơi càng to." },
      { type: "order", tokens: ["墙上", "挂着", "一张", "中国", "地图"], explain: "墙上挂着一张中国地图。— Trên tường treo một tấm bản đồ Trung Quốc." },
      { type: "order", tokens: ["他的", "汉语", "说得", "越来越", "流利了"], explain: "他的汉语说得越来越流利了。— Tiếng Trung của anh ấy nói ngày càng lưu loát." },
      { type: "mc", zh: "汉字我越写___喜欢。", options: ["越", "越来越", "很", "都"], answer: 0, explain: "越写越喜欢: càng viết càng thích." },
      { type: "mc", zh: "我们楼里搬___了一家人。", options: ["走", "着", "过", "在"], answer: 0, explain: "Câu tồn hiện diễn tả sự biến mất: 搬走了一家人 (một gia đình chuyển đi)." },
      { type: "mc", prompt: "Câu nào SAI?", options: ["他越来越胖了。", "他越来越很胖了。", "天越来越黑了。", "东西越来越贵了。"], answer: 1, explain: "越来越 đã mang nghĩa mức độ, không dùng thêm 很." }
    ]
  },
  {
    id: 12,
    glyph: "把",
    color: "red",
    title: "我们把教室布置成礼堂",
    vi: "Chúng tôi bày trí phòng học thành hội trường",
    topics: ["Câu chữ 把 (1)", "把 + V + 在/到/给/成"],
    vocab: [
      ["礼堂", "lǐtáng", "hội trường"],
      ["布置", "bùzhì", "bày trí, trang trí"],
      ["节目", "jiémù", "tiết mục"],
      ["表演", "biǎoyǎn", "biểu diễn"],
      ["晚会", "wǎnhuì", "dạ hội, buổi tối liên hoan"],
      ["春节", "Chūn Jié", "Tết Nguyên Đán"],
      ["包饺子", "bāo jiǎozi", "gói sủi cảo"],
      ["倒", "dào", "ngược, lộn ngược"],
      ["贴", "tiē", "dán"],
      ["福", "fú", "phúc"],
      ["对联", "duìlián", "câu đối"],
      ["挂", "guà", "treo"],
      ["打扫", "dǎsǎo", "quét dọn"],
      ["翻译", "fānyì", "dịch, phiên dịch"]
    ],
    grammar: [
      {
        name: "Câu chữ 把",
        formula: "Chủ ngữ + 把 + Tân ngữ (xác định) + Động từ + Thành phần khác",
        note: "Nhấn mạnh việc chủ thể xử lý tân ngữ và kết quả của việc đó. Tân ngữ phải xác định; động từ không đứng một mình. Phủ định 没/不 và động từ năng nguyện đặt TRƯỚC 把.",
        examples: [
          ["请你把门关上。", "Bạn đóng cửa lại giúp."],
          ["我没把作业带来。", "Tôi không mang bài tập đến."]
        ]
      },
      {
        name: "把 + V + 在 / 到 / 给 / 成",
        formula: "把 + O + V + 在/到 + nơi chốn · 给 + người · 成 + kết quả",
        note: "Bắt buộc dùng 把 khi sau động từ có 在/到/给/成 + tân ngữ.",
        examples: [
          ["他把“福”字倒贴在门上。", "Anh ấy dán ngược chữ “Phúc” lên cửa."],
          ["我们把教室布置成礼堂。", "Chúng tôi bày trí phòng học thành hội trường."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "请你___门关上。", options: ["把", "被", "给", "让"], answer: 0, explain: "Câu chữ 把: 把 + tân ngữ (门) + động từ + kết quả (关上)." },
      { type: "order", tokens: ["我们", "把", "教室", "布置成", "礼堂", "了"], explain: "我们把教室布置成礼堂了。— Chúng tôi đã bày trí phòng học thành hội trường." },
      { type: "mc", prompt: "Câu nào đúng?", options: ["我把那本书看完了。", "我把一本书看完了。", "我把书看。", "我看完把书了。"], answer: 0, explain: "Tân ngữ của 把 phải xác định (那本书) và động từ phải có thành phần khác (看完了)." },
      { type: "mc", zh: "他把“福”字倒贴___门上。", options: ["在", "到", "给", "成"], answer: 0, explain: "把 + O + V + 在 + nơi chốn: dán ở trên cửa." },
      { type: "mc", zh: "请把这件礼物送___王老师。", options: ["给", "在", "成", "到"], answer: 0, explain: "把 + O + V + 给 + người nhận." },
      { type: "mc", zh: "你把这个句子翻译___英文吧。", options: ["成", "在", "给", "着"], answer: 0, explain: "把 + O + V + 成 + kết quả biến đổi: dịch thành tiếng Anh." },
      { type: "order", tokens: ["请", "把", "你的", "名字", "写在", "这儿"], explain: "请把你的名字写在这儿。— Hãy viết tên của bạn vào đây." },
      { type: "mc", prompt: "Vị trí phủ định nào đúng?", options: ["我没把钱包带来。", "我把钱包没带来。", "我把没钱包带来。", "没我把钱包带来。"], answer: 0, explain: "Phủ định 没 đặt trước 把." },
      { type: "mc", zh: "他们把桌子搬___楼下去了。", options: ["到", "给", "成", "在"], answer: 0, explain: "把 + O + V + 到 + nơi chốn + 去: chuyển cái bàn xuống tầng dưới." },
      { type: "mc", zh: "春节前，我们把房子打扫___干干净净。", options: ["得", "的", "地", "了"], answer: 0, explain: "把 + O + V + 得 + bổ ngữ trạng thái: quét dọn sạch sẽ." }
    ]
  },
  {
    id: 13,
    glyph: "搬",
    color: "yellow",
    title: "请你把灯打开",
    vi: "Bạn bật đèn lên đi",
    topics: ["Câu chữ 把 (2)", "把 + V + bổ ngữ xu hướng / kết quả"],
    vocab: [
      ["灯", "dēng", "đèn"],
      ["打开", "dǎkāi", "mở, bật"],
      ["箱子", "xiāngzi", "va li, thùng"],
      ["矮", "ǎi", "thấp"],
      ["交", "jiāo", "nộp, giao"],
      ["作业", "zuòyè", "bài tập"],
      ["整理", "zhěnglǐ", "sắp xếp, chỉnh lý"],
      ["收拾", "shōushi", "dọn dẹp"],
      ["抽屉", "chōuti", "ngăn kéo"],
      ["地图", "dìtú", "bản đồ"],
      ["墙", "qiáng", "tường"],
      ["还", "huán", "trả lại"],
      ["护照", "hùzhào", "hộ chiếu"],
      ["宿舍", "sùshè", "ký túc xá"]
    ],
    grammar: [
      {
        name: "把 + V + bổ ngữ xu hướng",
        formula: "把 + O + V + 上/下/进/出/回/过/起 + (来/去)",
        note: "Diễn tả tân ngữ được di chuyển theo hướng nhất định do hành động.",
        examples: [
          ["你把这些椅子搬出去吧。", "Bạn chuyển mấy cái ghế này ra ngoài đi."],
          ["请大家把作业交上来。", "Mời mọi người nộp bài tập lên."]
        ]
      },
      {
        name: "Động từ không dùng với 把",
        formula: "是、有、在、认识、知道、喜欢、觉得、来、去…",
        note: "Các động từ không mang tính xử lý (quan hệ, tâm lý, cảm giác, di chuyển của bản thân) không dùng trong câu 把.",
        examples: [
          ["✗ 我把他认识了。", "Sai — 认识 không có tính xử lý."],
          ["✓ 我认识他。", "Tôi quen anh ấy."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "屋子里太黑了，你把灯打___吧。", options: ["开", "上", "下", "起"], answer: 0, explain: "打开灯: bật đèn. 把 + O + V + bổ ngữ kết quả." },
      { type: "mc", zh: "你把这些椅子搬___去吧。", options: ["出", "着", "了", "过了"], answer: 0, explain: "搬出去: chuyển ra ngoài (bổ ngữ xu hướng kép)." },
      { type: "order", tokens: ["她", "把", "衣服", "洗得", "干干净净"], explain: "她把衣服洗得干干净净。— Cô ấy giặt quần áo sạch tinh tươm." },
      { type: "mc", zh: "上课以前，请大家把作业交___。", options: ["上来", "起来", "下去", "出去"], answer: 0, explain: "交上来: nộp lên (về phía người nói — giáo viên)." },
      { type: "mc", prompt: "Câu nào KHÔNG dùng được 把?", options: ["我把这个菜吃了。", "我把他认识了。", "我把房间打扫了一下。", "他把车开走了。"], answer: 1, explain: "认识 không mang tính xử lý nên không dùng với 把." },
      { type: "mc", zh: "他把护照忘___宿舍里了。", options: ["在", "到", "给", "成"], answer: 0, explain: "把 + O + 忘在 + nơi chốn: để quên ở…" },
      { type: "order", tokens: ["别", "把", "箱子", "放在", "门口"], explain: "别把箱子放在门口。— Đừng để va li ở cửa." },
      { type: "mc", zh: "大卫把那本书还___图书馆了。", options: ["给", "成", "着", "过"], answer: 0, explain: "还给 + đối tượng: trả lại cho thư viện." },
      { type: "order", tokens: ["我们", "把", "桌子", "搬到", "楼上", "去吧"], explain: "我们把桌子搬到楼上去吧。— Chúng ta chuyển bàn lên tầng trên đi." },
      { type: "mc", zh: "这张桌子有点儿矮，我们把它换___吧。", options: ["了", "着", "过", "得"], answer: 0, explain: "把它换了吧: thay nó đi. Động từ + 了 làm thành phần khác." }
    ]
  },
  {
    id: 14,
    glyph: "被",
    color: "green",
    title: "我的腿被自行车撞伤了",
    vi: "Chân của tôi bị xe đạp đâm bị thương",
    topics: ["Câu chữ 被 (bị động)", "Phó từ 又"],
    vocab: [
      ["腿", "tuǐ", "chân"],
      ["撞", "zhuàng", "va, đâm"],
      ["伤", "shāng", "bị thương"],
      ["摔", "shuāi", "ngã"],
      ["骨头", "gǔtou", "xương"],
      ["小偷", "xiǎotōu", "kẻ trộm"],
      ["偷", "tōu", "trộm"],
      ["钱包", "qiánbāo", "ví tiền"],
      ["倒霉", "dǎoméi", "xui xẻo"],
      ["丢", "diū", "mất, đánh rơi"],
      ["报警", "bàojǐng", "báo cảnh sát"],
      ["批评", "pīpíng", "phê bình"],
      ["吹", "chuī", "thổi"],
      ["淋", "lín", "dầm, ướt (mưa)"]
    ],
    grammar: [
      {
        name: "Câu chữ 被",
        formula: "Chủ ngữ (bị tác động) + 被 + (Người thực hiện) + Động từ + Thành phần khác",
        note: "Câu bị động, thường mang sắc thái không như ý. Động từ phải có thành phần khác. Phủ định 没 đặt trước 被.",
        examples: [
          ["我的钱包被小偷偷走了。", "Ví của tôi bị kẻ trộm lấy mất."],
          ["衣服被雨淋湿了。", "Quần áo bị mưa làm ướt."]
        ]
      },
      {
        name: "又 và 再",
        formula: "又 + V (đã lặp lại) · 再 + V (sẽ lặp lại)",
        note: "又 dùng cho sự việc đã lặp lại; 再 dùng cho sự việc chưa xảy ra. 又A又B: vừa A vừa B.",
        examples: [
          ["他昨天迟到了，今天又迟到了。", "Hôm qua anh ấy đến muộn, hôm nay lại muộn."],
          ["请你再说一遍。", "Xin bạn nói lại một lần nữa."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "我的自行车___小偷偷走了。", options: ["被", "把", "给了", "让了"], answer: 0, explain: "Câu bị động: Chủ ngữ + 被 + người thực hiện + V + 走了." },
      { type: "order", tokens: ["他的", "腿", "被", "自行车", "撞伤了"], explain: "他的腿被自行车撞伤了。— Chân anh ấy bị xe đạp đâm bị thương." },
      { type: "mc", prompt: "Câu nào đúng?", options: ["我的钱包被偷了。", "我的钱包被偷。", "被我的钱包偷了。", "我的钱包被了偷。"], answer: 0, explain: "Động từ trong câu 被 cần thành phần khác (了, bổ ngữ…)." },
      { type: "mc", zh: "那本词典___人借走了。", options: ["被", "把", "对", "跟"], answer: 0, explain: "那本词典 là đối tượng chịu tác động → dùng 被." },
      { type: "mc", zh: "他昨天迟到了，今天___迟到了。", options: ["又", "再", "还", "才"], answer: 0, explain: "Sự việc lặp lại đã xảy ra → 又." },
      { type: "mc", zh: "这个电影太好看了，我明天想___看一遍。", options: ["再", "又", "还是", "就"], answer: 0, explain: "Sự việc lặp lại chưa xảy ra (ngày mai) → 再." },
      { type: "mc", prompt: "Vị trí phủ định nào đúng?", options: ["我的照相机没被弟弟弄坏。", "我的照相机被弟弟没弄坏。", "我的照相机被没弟弟弄坏。", "没我的照相机被弟弟弄坏。"], answer: 0, explain: "Phủ định 没 đặt trước 被." },
      { type: "order", tokens: ["衣服", "被", "雨", "淋湿了"], explain: "衣服被雨淋湿了。— Quần áo bị mưa làm ướt." },
      { type: "mc", zh: "窗户___风吹开了。", options: ["被", "把", "给我", "由"], answer: 0, explain: "Cửa sổ bị gió thổi mở → 被." },
      { type: "mc", zh: "这家饭馆的菜___便宜___好吃。", options: ["又……又", "越……越", "一边……一边", "先……再"], answer: 0, explain: "又A又B: vừa rẻ vừa ngon." }
    ]
  },
  {
    id: 15,
    glyph: "懂",
    color: "red",
    title: "京剧我看得懂，但是听不懂",
    vi: "Kinh kịch tôi xem hiểu nhưng nghe không hiểu",
    topics: ["Bổ ngữ khả năng (可能补语)", "V + 得/不 + 了 / 下"],
    vocab: [
      ["京剧", "jīngjù", "kinh kịch"],
      ["懂", "dǒng", "hiểu"],
      ["字幕", "zìmù", "phụ đề"],
      ["演员", "yǎnyuán", "diễn viên"],
      ["脸谱", "liǎnpǔ", "mặt nạ vẽ (kinh kịch)"],
      ["唱", "chàng", "hát"],
      ["动作", "dòngzuò", "động tác"],
      ["有事", "yǒu shì", "có việc"],
      ["约", "yuē", "hẹn"],
      ["座位", "zuòwèi", "chỗ ngồi"],
      ["来得及", "láidejí", "kịp"],
      ["来不及", "láibují", "không kịp"],
      ["清楚", "qīngchu", "rõ ràng"],
      ["修", "xiū", "sửa"]
    ],
    grammar: [
      {
        name: "Bổ ngữ khả năng",
        formula: "V + 得 + Bổ ngữ (có thể) · V + 不 + Bổ ngữ (không thể)",
        note: "Bổ ngữ là kết quả/xu hướng: 看得懂, 听不懂, 上得去, 回不来. Câu hỏi: 看得懂吗？ / 看得懂看不懂？",
        examples: [
          ["京剧我看得懂，但是听不懂。", "Kinh kịch tôi xem hiểu nhưng nghe không hiểu."],
          ["黑板上的字我看不清楚。", "Chữ trên bảng tôi nhìn không rõ."]
        ]
      },
      {
        name: "V + 得/不 + 了 (liǎo) · V + 得/不 + 下",
        formula: "了: có thể thực hiện được / hết · 下: có đủ chỗ chứa",
        note: "去不了: không đi được. 吃不了: ăn không hết. 坐不下: ngồi không đủ chỗ.",
        examples: [
          ["她晚上有事，去不了。", "Tối cô ấy có việc, không đi được."],
          ["这个房间坐不下十个人。", "Phòng này không đủ chỗ cho mười người."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "京剧我看得懂，但是听___。", options: ["不懂", "没懂", "不懂了", "得懂"], answer: 0, explain: "Dạng phủ định của bổ ngữ khả năng: V + 不 + bổ ngữ (听不懂)." },
      { type: "mc", zh: "这么多菜，我们两个人吃得___吗？", options: ["了", "下了", "完着", "过"], answer: 0, explain: "吃得了 (liǎo): ăn hết nổi." },
      { type: "mc", zh: "这个房间太小，坐___十个人。", options: ["不下", "不了下", "没下", "不上"], answer: 0, explain: "坐不下: không đủ chỗ ngồi." },
      { type: "mc", zh: "她晚上有事，去___了。", options: ["不", "没", "得不", "别"], answer: 0, explain: "去不了: không đi được." },
      { type: "mc", zh: "黑板上的字太小，我看___清楚。", options: ["不", "没", "得不", "很"], answer: 0, explain: "看不清楚: nhìn không rõ." },
      { type: "order", tokens: ["这个", "箱子", "太重", "我", "拿不动"], explain: "这个箱子太重，我拿不动。— Va li này nặng quá, tôi xách không nổi." },
      { type: "mc", prompt: "Câu nào đúng?", options: ["我听得懂他的话。", "我听懂得他的话。", "我得听懂他的话了。", "我听不得懂他的话。"], answer: 0, explain: "Trật tự: V + 得 + bổ ngữ (听得懂) + tân ngữ." },
      { type: "mc", zh: "现在去机场还来得___吗？", options: ["及", "了", "到", "上"], answer: 0, explain: "来得及: còn kịp." },
      { type: "mc", prompt: "Câu hỏi dùng bổ ngữ khả năng nào đúng?", options: ["你看得见看不见？", "你看不得见吗？", "你看得不见吗？", "你得看见不见？"], answer: 0, explain: "Câu hỏi chính phản: V得C + V不C (看得见看不见)." },
      { type: "mc", zh: "他的话太长了，我记___住，你再说一遍吧。", options: ["不", "没", "得不", "别"], answer: 0, explain: "记不住: không nhớ nổi." }
    ]
  },
  {
    id: 16,
    glyph: "演",
    color: "blue",
    title: "我怕演得不好",
    vi: "Em sợ mình diễn không tốt",
    topics: ["Bổ ngữ khả năng (tiếp)", "只要……就……"],
    vocab: [
      ["排练", "páiliàn", "tập dượt"],
      ["紧张", "jǐnzhāng", "căng thẳng"],
      ["怕", "pà", "sợ"],
      ["台词", "táicí", "lời thoại"],
      ["记住", "jìzhù", "nhớ kỹ"],
      ["放心", "fàngxīn", "yên tâm"],
      ["积极", "jījí", "tích cực"],
      ["鼓励", "gǔlì", "khích lệ, động viên"],
      ["成功", "chénggōng", "thành công"],
      ["坚持", "jiānchí", "kiên trì"],
      ["爬", "pá", "leo, bò"],
      ["山顶", "shāndǐng", "đỉnh núi"],
      ["努力", "nǔlì", "cố gắng"],
      ["回答", "huídá", "trả lời"]
    ],
    grammar: [
      {
        name: "只要……就……",
        formula: "只要 + Điều kiện, (Chủ ngữ) + 就 + Kết quả",
        note: "“Chỉ cần… thì…”: điều kiện đủ — có điều kiện này là có kết quả.",
        examples: [
          ["只要你努力，就一定能学好汉语。", "Chỉ cần bạn cố gắng thì nhất định học tốt tiếng Trung."],
          ["只要明天不下雨，我们就去爬山。", "Chỉ cần mai không mưa, chúng ta sẽ đi leo núi."]
        ]
      },
      {
        name: "Bổ ngữ khả năng với 动 / 上 / 完",
        formula: "走不动 · 爬不上去 · 做得完",
        note: "动: đủ sức để di chuyển; 上去: lên được; 完: làm xong được.",
        examples: [
          ["他累得走不动了。", "Anh ấy mệt đến mức đi không nổi."],
          ["山太高了，我爬不上去。", "Núi cao quá, tôi leo không lên được."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "___你努力，就一定能学好汉语。", options: ["只要", "只有", "虽然", "因为"], answer: 0, explain: "只要……就……: chỉ cần… thì…" },
      { type: "mc", zh: "只要明天不下雨，我们___去爬山。", options: ["就", "才", "都", "也"], answer: 0, explain: "只要 đi với 就." },
      { type: "mc", zh: "我怕台词记___住。", options: ["不", "没", "得不", "了"], answer: 0, explain: "记不住: không nhớ được." },
      { type: "order", tokens: ["只要", "你", "多练习", "就", "能", "演好"], alts: [["只要", "多练习", "你", "就", "能", "演好"]], explain: "只要你多练习，就能演好。— Chỉ cần bạn luyện tập nhiều là diễn tốt." },
      { type: "mc", zh: "山太高了，我爬___上去。", options: ["不", "没", "得不", "别"], answer: 0, explain: "爬不上去: leo không lên được." },
      { type: "mc", zh: "这么多作业，今天做得___吗？", options: ["完", "成了", "到了", "起"], answer: 0, explain: "做得完: làm xong được." },
      { type: "mc", prompt: "Câu nào đúng?", options: ["他累得走不动了。", "他累得没走动了。", "他累得不走动了。", "他累得走得不动了。"], answer: 0, explain: "走不动: đi không nổi (bổ ngữ khả năng)." },
      { type: "mc", prompt: "“我上不去” nghĩa là gì?", options: ["Tôi không lên được", "Tôi không muốn lên", "Tôi chưa lên", "Tôi đừng lên"], answer: 0, explain: "V + 不 + 上去: không có khả năng lên." },
      { type: "mc", zh: "这个问题太难，我回答___。", options: ["不了", "没了", "不得", "得不"], answer: 0, explain: "回答不了: không trả lời được." },
      { type: "mc", zh: "别紧张，___你准备好了，就一定能成功。", options: ["只要", "只有", "虽然", "不但"], answer: 0, explain: "只要……就……: chỉ cần chuẩn bị tốt thì sẽ thành công." }
    ]
  },
  {
    id: 17,
    glyph: "起",
    color: "yellow",
    title: "我想起来了",
    vi: "Thầy nhớ ra rồi",
    topics: ["Nghĩa mở rộng của bổ ngữ xu hướng", "只有……才……"],
    vocab: [
      ["想起来", "xiǎng qǐlai", "nhớ ra"],
      ["认出来", "rèn chūlai", "nhận ra"],
      ["毕业", "bìyè", "tốt nghiệp"],
      ["公司", "gōngsī", "công ty"],
      ["经理", "jīnglǐ", "giám đốc"],
      ["变化", "biànhuà", "thay đổi"],
      ["胖", "pàng", "béo"],
      ["停", "tíng", "dừng"],
      ["考上", "kǎoshàng", "thi đỗ"],
      ["爱上", "àishàng", "yêu, phải lòng"],
      ["关心", "guānxīn", "quan tâm"],
      ["联系", "liánxì", "liên lạc"],
      ["主意", "zhǔyi", "ý kiến, chủ ý"],
      ["终于", "zhōngyú", "cuối cùng"]
    ],
    grammar: [
      {
        name: "Nghĩa mở rộng của bổ ngữ xu hướng",
        formula: "起来 · 出来 · 下来 · 下去 · 上",
        note: "想起来: nhớ lại; 笑起来: bắt đầu cười. 认出来/想出来: nhận ra, nghĩ ra. 记下来/停下来: ghi lại, dừng lại. 坚持下去: tiếp tục. 考上/爱上: đạt được mục tiêu.",
        examples: [
          ["我想起来了，他是我的学生。", "Tôi nhớ ra rồi, cậu ấy là học sinh của tôi."],
          ["你要坚持下去。", "Bạn phải kiên trì tiếp."]
        ]
      },
      {
        name: "只有……才……",
        formula: "只有 + Điều kiện duy nhất, (Chủ ngữ) + 才 + Kết quả",
        note: "“Chỉ có… mới…”: điều kiện cần — thiếu điều kiện này không có kết quả. So sánh: 只要……就 (điều kiện đủ).",
        examples: [
          ["只有多听多说，才能学好口语。", "Chỉ có nghe nhiều nói nhiều mới học tốt khẩu ngữ."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "我想___了，他是我三年前的学生。", options: ["起来", "下去", "出来", "下来"], answer: 0, explain: "想起来: nhớ ra (điều đã biết trước đây)." },
      { type: "mc", zh: "他变化太大了，我没认___。", options: ["出来", "起来", "下去", "上来"], answer: 0, explain: "认出来: nhận ra." },
      { type: "mc", zh: "请把这个电话号码记___。", options: ["下来", "起来", "出去", "上去"], answer: 0, explain: "记下来: ghi lại (cố định lại)." },
      { type: "mc", zh: "不管多难，你都要坚持___。", options: ["下去", "下来", "起来", "出来"], answer: 0, explain: "坚持下去: tiếp tục kiên trì từ nay về sau." },
      { type: "mc", zh: "前边是红灯，车停___了。", options: ["下来", "下去", "起来", "出来"], answer: 0, explain: "停下来: dừng lại (từ động sang tĩnh)." },
      { type: "mc", zh: "___多听多说，___能学好口语。", options: ["只有……才", "只要……才", "只有……就", "虽然……但是"], answer: 0, explain: "只有 đi với 才 (điều kiện cần)." },
      { type: "mc", zh: "他终于考___了北京大学。", options: ["上", "下", "出", "起"], answer: 0, explain: "考上: thi đỗ (đạt được mục tiêu)." },
      { type: "order", tokens: ["只有", "努力学习", "才能", "考上", "大学"], explain: "只有努力学习，才能考上大学。— Chỉ có học hành chăm chỉ mới thi đỗ đại học." },
      { type: "mc", zh: "大家听了他的话，都笑___了。", options: ["起来", "下来", "出去", "上去"], answer: 0, explain: "笑起来: bắt đầu cười." },
      { type: "mc", zh: "这个好主意是谁想___的？", options: ["出来", "起来", "下去", "上来"], answer: 0, explain: "想出来: nghĩ ra (cái mới). Khác 想起来: nhớ lại cái đã biết." }
    ]
  },
  {
    id: 18,
    glyph: "边",
    color: "green",
    title: "吃什么都行",
    vi: "Ăn gì cũng được",
    topics: ["Đại từ nghi vấn dùng phiếm chỉ", "一边……一边……", "先……再……然后……最后……"],
    vocab: [
      ["随便", "suíbiàn", "tùy ý"],
      ["饿", "è", "đói"],
      ["菜单", "càidān", "thực đơn"],
      ["点菜", "diǎn cài", "gọi món"],
      ["冰灯", "bīngdēng", "đèn băng"],
      ["哈尔滨", "Hā'ěrbīn", "Cáp Nhĩ Tân"],
      ["旅行", "lǚxíng", "du lịch"],
      ["暖和", "nuǎnhuo", "ấm áp"],
      ["计划", "jìhuà", "kế hoạch"],
      ["安排", "ānpái", "sắp xếp"],
      ["景色", "jǐngsè", "phong cảnh"],
      ["照相", "zhào xiàng", "chụp ảnh"],
      ["参观", "cānguān", "tham quan"],
      ["博物馆", "bówùguǎn", "bảo tàng"]
    ],
    grammar: [
      {
        name: "Đại từ nghi vấn dùng phiếm chỉ",
        formula: "什么/哪儿/谁/怎么 + 都/也 · 疑问词…就…疑问词",
        note: "Không dùng để hỏi mà chỉ “bất cứ”: 吃什么都行 (ăn gì cũng được). Cặp hô ứng: 哪儿冷就去哪儿 (chỗ nào lạnh thì đi chỗ đó).",
        examples: [
          ["我很饿，什么都想吃。", "Tôi đói lắm, cái gì cũng muốn ăn."],
          ["谁想去谁去。", "Ai muốn đi thì người đó đi."]
        ]
      },
      {
        name: "一边……一边…… / 先……再……然后……最后……",
        formula: "一边 V1 一边 V2 · 先 V1，再 V2，然后 V3，最后 V4",
        note: "一边…一边: hai hành động đồng thời. 先…再…然后…最后: trình tự các hành động.",
        examples: [
          ["他一边吃饭一边看电视。", "Anh ấy vừa ăn cơm vừa xem TV."],
          ["我们先去哈尔滨，然后去北京。", "Chúng tôi đi Cáp Nhĩ Tân trước, sau đó đi Bắc Kinh."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "A：你想吃什么？ B：我很饿，___都行。", options: ["什么", "哪儿", "怎么", "谁"], answer: 0, explain: "什么都行: cái gì cũng được (phiếm chỉ)." },
      { type: "mc", zh: "哪儿冷我们就去___。", options: ["哪儿", "那儿", "这儿", "什么"], answer: 0, explain: "Cặp hô ứng: 哪儿……就……哪儿." },
      { type: "mc", zh: "他___吃饭___看电视。", options: ["一边……一边", "又……又", "越……越", "只要……就"], answer: 0, explain: "一边…一边: vừa… vừa… (hai hành động đồng thời)." },
      { type: "order", tokens: ["我们", "先", "去哈尔滨", "然后", "去北京"], explain: "我们先去哈尔滨，然后去北京。— Chúng tôi đi Cáp Nhĩ Tân trước, sau đó đi Bắc Kinh." },
      { type: "mc", zh: "谁想去___去。", options: ["谁", "他", "都", "就"], answer: 0, explain: "谁想去谁去: ai muốn đi thì người đó đi." },
      { type: "mc", zh: "你想怎么做就___做。", options: ["怎么", "什么", "哪儿", "多少"], answer: 0, explain: "怎么……就……怎么: muốn làm thế nào thì làm thế đó." },
      { type: "mc", zh: "___洗手，再吃饭。", options: ["先", "然后", "最后", "一边"], answer: 0, explain: "先……再……: trước… rồi…" },
      { type: "mc", zh: "我们先参观博物馆，___去公园，最后去吃饭。", options: ["然后", "先", "最后", "一边"], answer: 0, explain: "Trình tự: 先 → 然后 → 最后." },
      { type: "mc", prompt: "“我不想买什么” nghĩa là gì?", options: ["Tôi không muốn mua gì cả", "Tôi muốn mua cái gì?", "Tôi mua gì cũng được", "Tôi không biết mua ở đâu"], answer: 0, explain: "什么 ở đây là phiếm chỉ (cái gì đó), không phải để hỏi." },
      { type: "order", tokens: ["她", "一边", "唱歌", "一边", "跳舞"], alts: [["她", "一边", "跳舞", "一边", "唱歌"]], explain: "她一边唱歌一边跳舞。— Cô ấy vừa hát vừa nhảy." }
    ]
  },
  {
    id: 19,
    glyph: "梅",
    color: "red",
    title: "有困难找警察",
    vi: "Có khó khăn thì tìm cảnh sát",
    topics: ["Câu phức không có từ nối", "Lặp lại số lượng từ", "Bổ ngữ trạng thái (2)"],
    vocab: [
      ["困难", "kùnnan", "khó khăn"],
      ["警察", "jǐngchá", "cảnh sát"],
      ["迷路", "mílù", "lạc đường"],
      ["热情", "rèqíng", "nhiệt tình"],
      ["帮助", "bāngzhù", "giúp đỡ"],
      ["松", "sōng", "cây tùng"],
      ["竹", "zhú", "cây trúc"],
      ["梅", "méi", "hoa mai"],
      ["岁寒三友", "suìhán sānyǒu", "tuế hàn tam hữu"],
      ["象征", "xiàngzhēng", "tượng trưng"],
      ["坚强", "jiānqiáng", "kiên cường"],
      ["精神", "jīngshen", "tinh thần"],
      ["激动", "jīdòng", "xúc động"],
      ["开放", "kāifàng", "nở (hoa)"]
    ],
    grammar: [
      {
        name: "Câu phức không có từ nối",
        formula: "Vế 1 (điều kiện/nguyên nhân) + Vế 2 (kết quả)",
        note: "Khẩu ngữ thường lược bỏ từ nối, quan hệ được hiểu qua ngữ cảnh: 有困难找警察 = 如果有困难，就找警察.",
        examples: [
          ["有困难找警察。", "Có khó khăn thì tìm cảnh sát."],
          ["不去不行。", "Không đi không được."]
        ]
      },
      {
        name: "Lặp số lượng từ & Bổ ngữ trạng thái",
        formula: "一 + LT + 一 + LT (lần lượt) · LT LT (mỗi, đều) · V/Adj + 得 + cụm từ/câu",
        note: "一个一个地走进来: lần lượt từng người. 天天/个个: ngày nào/ai cũng. Bổ ngữ trạng thái có thể là cả một cụm: 高兴得跳了起来.",
        examples: [
          ["同学们一个一个地走进教室。", "Các bạn lần lượt từng người vào lớp."],
          ["他高兴得跳了起来。", "Anh ấy vui đến mức nhảy cẫng lên."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "同学们___地走进教室。", options: ["一个一个", "一个个个", "个一个", "一一个个"], answer: 0, explain: "一 + lượng từ + 一 + lượng từ: lần lượt từng…" },
      { type: "mc", zh: "她汉字写___很漂亮。", options: ["得", "的", "地", "了"], answer: 0, explain: "Bổ ngữ trạng thái: V + 得 + bổ ngữ." },
      { type: "mc", prompt: "“有困难找警察” nghĩa là gì?", options: ["Có khó khăn thì tìm cảnh sát", "Vì khó khăn nên cảnh sát đến", "Cảnh sát gặp khó khăn", "Khó tìm được cảnh sát"], answer: 0, explain: "Câu phức không từ nối, quan hệ điều kiện: (如果)有困难，(就)找警察." },
      { type: "mc", zh: "他跑___满头大汗。", options: ["得", "地", "的", "着"], answer: 0, explain: "跑得满头大汗: chạy đến mức mồ hôi đầy đầu." },
      { type: "mc", zh: "他把书___地放好。", options: ["一本一本", "一本本本", "本一本", "一一本本"], answer: 0, explain: "一本一本地: từng quyển một." },
      { type: "order", tokens: ["他", "高兴得", "跳了", "起来"], explain: "他高兴得跳了起来。— Anh ấy vui đến mức nhảy cẫng lên." },
      { type: "mc", zh: "中国人把松、竹、梅叫做“___”。", options: ["岁寒三友", "四合院", "京剧", "对联"], answer: 0, explain: "岁寒三友: ba người bạn mùa đông lạnh — tùng, trúc, mai." },
      { type: "mc", prompt: "“天天” nghĩa là gì?", options: ["mỗi ngày, ngày nào cũng", "hai ngày", "ngày mai", "ngày kia"], answer: 0, explain: "Lặp lượng từ/danh từ đơn âm tiết: 天天 = mỗi ngày." },
      { type: "mc", zh: "她激动___说不出话来。", options: ["得", "地", "的", "了"], answer: 0, explain: "激动得说不出话来: xúc động đến mức không nói nên lời." },
      { type: "order", tokens: ["我们", "把", "松竹梅", "叫做", "岁寒三友"], explain: "我们把松竹梅叫做“岁寒三友”。" }
    ]
  },
  {
    id: 20,
    glyph: "福",
    color: "blue",
    title: "吉利的数字",
    vi: "Con số may mắn",
    topics: ["Câu phản vấn (反问句)", "连……也/都……", "Phủ định kép"],
    vocab: [
      ["数字", "shùzì", "con số"],
      ["吉利", "jílì", "may mắn, cát lợi"],
      ["发财", "fācái", "phát tài"],
      ["谐音", "xiéyīn", "đồng âm"],
      ["号码", "hàomǎ", "số (điện thoại…)"],
      ["结婚", "jiéhūn", "kết hôn"],
      ["日子", "rìzi", "ngày (sự kiện)"],
      ["讲究", "jiǎngjiu", "chú trọng, cầu kỳ"],
      ["难道", "nándào", "lẽ nào"],
      ["连", "lián", "ngay cả"],
      ["不得不", "bù dé bù", "buộc phải"],
      ["习俗", "xísú", "phong tục"],
      ["迷信", "míxìn", "mê tín"],
      ["幸运", "xìngyùn", "may mắn"]
    ],
    grammar: [
      {
        name: "Câu phản vấn 反问句",
        formula: "不是……吗？ · 难道……吗？ · 怎么/哪儿……？",
        note: "Dùng hình thức câu hỏi để khẳng định (hoặc phủ định) mạnh, không cần trả lời.",
        examples: [
          ["我不是告诉你了吗？", "Tôi đã nói với bạn rồi mà!"],
          ["难道你不知道吗？", "Lẽ nào bạn không biết?"]
        ]
      },
      {
        name: "连……也/都…… · Phủ định kép",
        formula: "连 + (đối tượng nhấn mạnh) + 也/都 + V · 不得不 / 没有……不……",
        note: "连…也/都: ngay cả… cũng… Phủ định kép mang nghĩa khẳng định mạnh: 不得不去 = buộc phải đi.",
        examples: [
          ["他忙得连饭也没吃。", "Anh ấy bận đến mức ngay cả cơm cũng không ăn."],
          ["没有人不喜欢她。", "Không ai không thích cô ấy."]
        ]
      }
    ],
    exercises: [
      { type: "mc", zh: "这么简单的问题，你___不知道吗？", options: ["难道", "连", "只要", "越"], answer: 0, explain: "难道……吗？: lẽ nào… sao? (phản vấn)." },
      { type: "mc", zh: "他忙得___饭也没吃。", options: ["连", "就", "都", "才"], answer: 0, explain: "连……也……: ngay cả… cũng…" },
      { type: "mc", zh: "连小孩子___知道这个道理。", options: ["都", "才", "就", "再"], answer: 0, explain: "连 đi với 都/也." },
      { type: "mc", prompt: "“我不是告诉你了吗？” nghĩa là gì?", options: ["Tôi đã nói với bạn rồi mà", "Tôi chưa nói với bạn", "Tôi có nói với bạn không?", "Tôi sẽ nói với bạn"], answer: 0, explain: "不是……吗？ là câu phản vấn mang nghĩa khẳng định." },
      { type: "mc", prompt: "“我不得不去” nghĩa là gì?", options: ["Tôi buộc phải đi", "Tôi không được đi", "Tôi không muốn đi", "Tôi có thể không đi"], answer: 0, explain: "Phủ định kép 不得不 = buộc phải." },
      { type: "mc", prompt: "“没有人不喜欢她” nghĩa là gì?", options: ["Ai cũng thích cô ấy", "Không ai thích cô ấy", "Có người không thích cô ấy", "Cô ấy không thích ai"], answer: 0, explain: "没有……不……: phủ định kép → khẳng định: ai cũng thích." },
      { type: "order", tokens: ["他", "连", "一句", "汉语", "也", "不会说"], explain: "他连一句汉语也不会说。— Anh ấy ngay cả một câu tiếng Trung cũng không biết nói." },
      { type: "mc", zh: "中国人喜欢数字“8”，因为它和“发”___。", options: ["谐音", "吉利", "讲究", "号码"], answer: 0, explain: "谐音: đồng âm — “八 bā” gần âm với “发 fā” (phát tài)." },
      { type: "mc", zh: "你怎么___这个也不懂？", options: ["连", "难道", "越", "又"], answer: 0, explain: "连这个也不懂: ngay cả cái này cũng không hiểu." },
      { type: "mc", prompt: "“他不会不来的” nghĩa là gì?", options: ["Anh ấy chắc chắn sẽ đến", "Anh ấy sẽ không đến", "Anh ấy không biết đường đến", "Anh ấy có thể không đến"], answer: 0, explain: "不会不: phủ định kép → chắc chắn sẽ." }
    ]
  }
];
