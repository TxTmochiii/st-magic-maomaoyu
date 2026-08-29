import { getContext } from '../../../extensions.js';
import { generateQuietPrompt, characters } from '../../../../script.js';

// ================= 动态获取路径并去除参数 =================
let basePath = import.meta.url;
if (basePath.includes('?')) basePath = basePath.split('?')[0];
const extensionFolderPath = basePath.substring(0, basePath.lastIndexOf('/'));

console.log(`[st-magic-maomaoyu] 插件开始加载, 路径: ${extensionFolderPath}`);

// ================= 全局数据字典 =================
const HC_COMMON=["随机","樱花粉","银白霜雪","雾霾蓝","薄荷绿","玫瑰金","亚麻灰绿","琥珀茶棕","巧克力色","黑茶色","鸦青色","冰川蓝","极光紫","晨曦微光金","暮色橘","冷灰紫","香槟金","海王红","蜜桃粉","薰衣草紫","星空蓝紫渐变","奶茶棕","原生墨黑","白茶色","流沙金","深海蓝","复古红棕","青木亚麻","冷调铂金","暖阳橘棕","枫叶红","鸢尾紫","薄藤色","砂金","焦糖色","黑莓紫","极地银灰","初雪白","珊瑚橘","人鱼姬粉","冷翠绿","蓝莓色","香草金","栗子棕","粉紫渐变","黑白阴阳染","挂耳挑染银","裙摆染粉","奶霜白","星河银","孔雀蓝","酒红色","脏橘色","浅香槟","灰蓝渐变","樱花渐变白","曜石黑","深茶紫","奶茶灰棕","极昼白","暗夜紫"];
const EC_COMMON=["随机","曜石黑","琉璃蓝","翡翠绿","琥珀金","桃花粉","星空紫","异色瞳(蓝金)","异色瞳(红绿)","极地冰蓝","暮色橘","银灰霜雪","鸽血红","深海幽蓝","浅雾灰","茶棕色","薄荷青","紫水晶色","玫瑰红","流沙金","苍青色","猫眼金绿","孔雀蓝","红宝石色","清透水蓝","暖阳金","迷雾紫","初雪白","深空黑","冷月银","星芒异色瞳","碧水绿","琉璃浅棕","幽冥深紫","极光绿","幻彩人鱼瞳","樱花浅粉","黑珍珠色","深褐色","酒红色","琥珀澄黄","冷冽灰蓝","星辰大海色","温柔奶茶棕","魅惑狐金","冰湖蓝","月光石白","冷翡翠","血泊红","空灵浅紫","晶石蓝"];
const LOOKS_COMMON=["随机","清冷破碎感","清秀佳人","骨感纤细","雌雄莫辨","眼角泪痣","高冷厌世脸","完美建模脸","异域风情","精灵尖耳","桃花眼","丹凤眼","杏眼","狐狸眼","无辜狗狗眼","瑞凤眼","唇下痣","眉间雪","唇畔梨涡","可爱酒窝","俏皮虎牙","唇红齿白","浓颜系","淡颜系","混血感","冷白皮","健康小麦色","蜜香肤色","肌肉线条流畅","人鱼线/马甲线","天鹅颈","直角肩","漫画腿","九头身黄金比例","幼态娃娃脸","成熟御姐脸","清爽少年感","甜美少女感","贵气天成","慵懒风情","浓郁书卷气","英姿飒爽","温婉可人","甜美娇俏","痞帅","斯文败类金丝","泪眼盈盈","楚楚可怜","清瘦高挑","软萌可爱","奶凶奶凶","精致如洋娃娃","冰肌玉骨","容貌绝艳","清水出芙蓉","眉目如画","面如冠玉","剑眉星目","盛世美颜","病弱西子","战损斑驳的美感","神秘毛茸茸兽耳","柔软蓬松尾巴","锁骨纹身","冷艳高贵","纯欲风脸","又纯又钓","娇憨灵动","英气逼人","性感撩人"];
const PERS_COMMON=["随机","白切黑","清冷师尊","腹黑","傲娇","万人迷","高岭之花","毒舌","禁欲系","阳光开朗","温柔体贴","善解人意","纯真善良","热情似火","冰山冷酷","沉稳内敛","睿智从容","机智狡黠","呆萌可爱","天然黑","元气满满","慵懒散漫","随遇而安","执着坚韧","外柔内刚","飒爽利落","骄傲自信","自恋狂","戏精本精","小财迷","吃货属性","顶级颜控","声控","毛绒控","极致护短","妹控/弟控","宠妻狂魔","绝对事业脑","重度恋爱脑","傲骨铮铮","悲天悯人","乐天派","完美主义","重度洁癖","社恐透明人","社交悍匪","慢热","直球克星","刀子嘴豆腐心","极度闷骚","智性恋","纯情小白花","海王收心","忠犬护卫","小狼狗","温柔奶狗","爹系男友","知心大姐姐","顶级钓系","绿茶小作精","偏执疯狂","占有欲极强","缺乏安全感","敏感多疑","患得患失","理智至上","情感绝缘体","悲观厌世","享乐主义","无私奉献","极度慕强","慕弱保护欲","假正经","随心所欲乐子人","极致双标"];
const HS_COMMON=["高马尾", "低马尾", "双马尾", "侧马尾", "泡泡辫", "鱼骨辫", "蜈蚣辫", "拳击辫", "法式麻花辫", "荷兰辫", "瀑布辫", "脏辫", "侧麻花辫", "双麻花辫", "蝴蝶结编发", "皇冠编发", "光环编发", "麦穗辫", "拧转辫", "抽丝编发", "丸子头", "半扎丸子头", "双丸子头", "花苞头", "低盘发", "法式优雅盘发", "侧盘发", "法式慵懒卷", "大波浪卷发", "云朵卷", "麦穗卷", "蛋卷头", "大波浪", "人鱼卷", "芭比卷", "锡纸烫", "摩根烫", "黑长直", "中分长发", "四六分微卷", "三七分侧背", "锁骨微卷发", "公主切", "狼尾发型", "水母头", "鲻鱼头", "齐刘海", "空气刘海", "法式刘海", "八字刘海", "龙须刘海", "漫画刘海", "斜刘海", "胎毛刘海","男士三七分", "男士微分碎盖", "男士背头", "男士寸头"];
const HS_MODERN=["随机","黑长直","大波浪","羊毛卷","法式慵懒卷","利落高马尾","温婉低扎发","双马尾","公主切","锁骨发","一刀切短发","狼尾","水母头","鲻鱼头","丸子头","半扎花苞头","木马卷","蛋卷头","空气刘海","八字刘海","漫画刘海","龙须刘海","三七分偏分","大背头","微分碎盖","纹理烫","前刺","韩系中分","凌乱日系短发","湿发造型","高位丸子头","辫子盘发","精灵编发","清爽短碎发"];
const HS_ANCIENT=["随机","及踝长发","齐腰长发","高马尾","玉冠束发","垂挂髻","飞仙髻","随性披肩发","双环望仙髻","十字髻","凌云髻","流苏编发","木簪挽发","半扎披发","两把头","编发盘发","额饰点缀束发","散发","道士头","公子半束发","高高束起的马尾","长发及腰"];
const CLO_COMMON=["随机","魔法长袍","精灵装","修女服","神官服","基础日常装","冒险者轻甲"];
const CLO_MODERN=["随机","极简冷淡风","法式慵懒风","高定晚礼服","纯欲甜美风","千禧Y2K辣妹","新中式国潮","暗黑哥特风","废土机能风","赛博朋克装","复古港风","小香风","常青藤学院风","英伦绅士装","高街潮流","运动休闲装","洛丽塔茶会裙","JK/DK制服","美式复古风","波西米亚风","轻奢名媛风","干练职场OL装","白大褂制服","机车皮衣","工装酷盖","精致西装暴徒","丝绒睡衣风","居家服","重金属摇滚装","街头滑板风","复古胶片感穿搭","清雅森系","浪漫巴洛克","甜酷女团装","人鱼裙","高雅旗袍","休闲卫衣","打歌服","中山装","温柔针织衫"];
const CLO_ANCIENT=["随机","交领右衽汉服","齐胸襦裙","明制马面裙","飞鱼服","锦衣卫制服","大袖衫","道袍","粗布麻衣","广袖流仙裙","刺客夜行衣","华丽宫廷装","窄袖骑射服","狐皮大氅","素雅对襟襦裙","织金蟒袍","铠甲战袍","劲装短打","异域风情舞服","苗疆银饰服","谪仙白衣","权臣紫袍","龙袍凤袍","素色道服","青衫落拓","太极道袍","软烟罗裙","鹤氅","软甲","圆领袍","百迭裙"];
const ST_RELATIONS =["宿敌", "青梅竹马", "救赎者", "主仆", "师徒", "契约恋人", "天降系", "白月光与替身", "欢喜冤家", "相爱相杀", "灵魂伴侣", "跨越阶级的暗恋", "互相利用", "单向救赎", "金主与笼中鸟", "假戏真做", "破镜重圆", "绝对支配", "隐秘情人", "并肩战友"];

const configData={
    attitudes:["深爱/迷恋","暗恋/默默守护","生死之交","敬畏/仰望","表面和气/互相利用","相爱相杀","血海深仇","极度厌恶","玩物/算计","陌生/防备"],
    general:{era:["随机","跟随专属羁绊","现代繁华都市","古代架空乱世","西方奇幻大陆","赛博朋克近未来","蒸汽朋克机械城","废土末世绿洲","星际科幻宇宙","修真仙侠神界","无限流副本","欧式古典宫廷","维多利亚时代","昭和复古时代","平行多元宇宙","高魔剑与魔法","低魔位面世界","星际联邦统领","诸神黄昏纪元","冰川沉睡时代","地底神秘世界","浮空天空之城","赛博武侠江湖","黑暗童话镇","灵气复苏都市","末法神话纪元","大航海冒险时代","梦境深渊缝隙","镜面反转世界","时空管理局","精灵守护之森","末日伊甸园"],bg:["随机","顶级财阀唯一继承人","老牌簪缨世家","豪门科技新贵","破产千金/少爷","隐世修真宗门","孤儿院摸爬滚打","星际难民幸存者","普通温馨小康","天煞孤星命格","流浪天才歌手","顶级音乐世家","书香门第清流","铁血军人世家","顶尖科研家庭","没落贵族血脉","暴发户掌上明珠","皇室流落遗孤","权臣后代","商界巨头之子","平民逆袭天才","探险家神秘后代","古老遗迹守护者","纯血龙族后裔","精灵王室混血","神明虔诚眷属","被选召的救世主","时空旅者家族","占星大祭司后代","寻宝猎人世家","机械师公会会长","魔法学院特招生","圣殿骑士血脉","海岛原住渔民","极光之城皇族","商业联姻牺牲品","家族弃子逆袭","全息网游封神者","落魄流浪画家","王牌特工隐退后代"],hc:HC_COMMON,hs:HS_COMMON,ec:EC_COMMON,looks:LOOKS_COMMON,clo:CLO_COMMON,pers:PERS_COMMON,job:["随机","霸道总裁","娱乐圈断层顶流","三金影帝/影后","红圈金牌律师","神外顶尖医师","排行榜第一黑客","电竞世界冠军","全能ACE练习生","首席法医","刑侦大队长","犯罪心理学教授","华尔街投行精英","知名鬼才导演","金牌新锐编剧","灵魂原创音乐人","全球顶尖超模","独立小众设计师","国际米其林大厨","职业F1赛车手","民航机长","星际宇航员","天文物理学家","人工智能领军人","最高学府教授","战地摄影记者","千万粉UP主","全网头部主播","全息游戏制作人","奢牌公关总监","私人顶级保镖","王牌经纪人","无国界医生","古董文物修复师","高级精算师","皇家御用画师","魔法禁卫军首领","异星联邦指挥官"],npcPool:["父亲","母亲","哥哥","妹妹","青梅竹马","死敌","导师","挚友","初恋","前任","暗恋者","骑士","暗卫","管家","联姻对象","情侣","灵魂伴侣","恩人","师兄/师姐","长老","元帅","海盗","王子/公主","网友","情缘","邻居","总裁","狗仔","粉丝","金主","闺蜜","死党"]},
    modern:{era:["随机","跟随专属羁绊","顶级贵族私立学院","省重点全封闭高中","百年底蕴顶尖学府","硅谷高新科创园区","纸醉金迷不夜城","赛博朋克初显近未来","繁华一线都市CBD","宁静惬意大学城","国际顶尖艺术学院","偏远支教大山区","浪漫海滨旅游城市","历史底蕴老城区","旧工厂改造创意园","世界级电子竞技基地","顶流娱乐公司大楼","国内顶尖综合医院","市中心高级律所","全球顶尖时尚杂志社","爆款独立游戏工作室","地下独立Livehouse","巴黎高定奢侈品秀场","国际航班头等舱"],bg:["随机","京圈红墙大院子弟","跨国顶级财阀","互联网豪门新贵","真假千金/少爷纠葛","百年演艺世家","书香门第清流","小镇做题家逆袭","包租公/婆收租大户","煤老板低调二代","世代外交官家族","老牌军政世家","国内顶尖医学世家","三代法律世家","古典音乐世家","体育奥运冠军家庭","一夜暴富暴发户","普通温馨双职工家庭","单亲坚强独立家庭","孤儿院奋斗逆袭"],hc:HC_COMMON,hs:HS_MODERN,ec:EC_COMMON,looks:LOOKS_COMMON,clo:CLO_MODERN,pers:PERS_COMMON,job:["随机","霸道冷面总裁","娱乐圈断层顶流","三金影帝/影后","红圈金牌律师","神外顶尖主治医师","红客联盟天才黑客","电竞全明星大魔王","全能ACE练习生","市局首席法医","重案组刑警队长","犯罪心理学权威专家","华尔街投行精英","风投圈神话大佬","知名鬼才大导演","爆款剧新锐编剧","灵魂原创独立音乐人","时尚界顶级超模","独立小众潮牌设计师","国际米其林三星大厨","冠军级职业赛车手"],npcPool:["伴侣","死党","闺蜜","死对头","经纪人","联姻对象","绯闻对象","站姐","粉丝","霸总","甲方","乙方","实习生","上司","合伙人","助理"]},
    ancient:{era:["随机","跟随专属羁绊","隐世修真第一大宗门","九重天神界凌霄殿","幽冥忘川黄泉路","波谲云诡权谋朝堂","凡人修仙底层坊市","万国来朝盛世大唐","烟雨朦胧江南水乡","大漠孤烟铁血边关","诸侯割据烽火乱世","魏晋风骨名士时代","女尊帝国繁华皇都","仙魔交界无底深渊","十万大山妖族领地","龙宫四海八荒","昆仑瑶池缥缈仙境","蜀山剑派没落遗址"],bg:["随机","九五之尊皇室正统","没落前朝遗孤血脉","权倾朝野簪缨世家","剑宗掌门独生子/女","天生无暇剔透剑骨","镇国大将军之骄女","一手遮天丞相府嫡女/子","备受欺凌不受宠庶出","被掉包流落民间真千金/少爷","替嫁受辱新娘/郎","满门抄斩罪臣之后","富可敌国商贾首富之子","梨园名动天下名角后代","隐世绝顶高人关门弟子"],hc:HC_COMMON,hs:HS_ANCIENT,ec:EC_COMMON,looks:LOOKS_COMMON,clo:CLO_ANCIENT,pers:PERS_COMMON,job:["随机","剑尊","掌门","魔尊","摄政王","皇帝","女帝","锦衣卫","神捕","医师","琴师","将军","质子","公主/皇子","皇太女/太子","苗疆","世家千金"],npcPool:["师尊","大师兄","圣女","仙尊","剑灵","逆徒","暗卫","小师妹","二师兄","长老","掌门","公主/皇子","摄政王","皇帝","妃嫔","太后","国师","王爷","杀手","丫鬟","小厮","同门"]},
    cloakroom: {
        style:["通勤风", "休闲风", "极简风", "新中式", "lolita", "日系风", "韩系风", "美拉德风", "格雷系", "静奢风", "元气风", "甜酷风", "甜丧风", "盐系", "少年风", "慵懒风", "清冷风", "文艺风", "复古风", "轻欧美风", "森女系", "千金风", "街头风", "汉服", "dk制服", "jk制服", "公主风", "y2k风", "哥特风", "巴洛克风", "知性风", "赫本风"],
        hair:["蕾丝发带", "丝绒蝴蝶结", "珍珠发夹", "金属抓夹", "猫耳发箍", "兔耳发箍", "毛绒发圈", "复古发簪", "步摇", "钿子", "皇冠发饰", "恶魔角发饰", "法式发簪"],
        neck:["珍珠项链", "细软锁骨链", "丝绒Choker", "皮革项圈", "十字架吊坠", "星月项链", "字母项链", "诞生石项链", "纯银项链", "叠戴项链", "怀表项链", "极简细链", "情侣项链"],
        ear:["珍珠耳钉", "纯银耳钉", "几何耳钉", "流苏耳环", "长款耳线", "星星耳环", "十字架耳环", "复古耳夹", "无耳洞耳夹", "骨传导耳夹", "精灵耳饰", "耳骨钉"],
        jewel:["细软手链", "粗链条手链", "珍珠手链", "红绳手链", "银手镯", "金手镯", "玉手镯", "潘多拉风手链", "诞生石手链", "运动腕带", "机械腕表", "银质脚链", "铃铛脚链"],
        ring:["极简素圈", "碎钻排戒", "单钻戒指", "宝石戒指", "珍珠戒指", "关节戒", "尾戒", "食指戒", "拇指戒", "蛇形戒指", "复古雕花戒指", "叠戴对戒"],
        hat:["纯色贝雷帽", "羊毛毡礼帽", "棒球帽", "鸭舌帽", "报童帽", "渔夫帽", "针织毛线帽", "护耳冷帽", "雷锋帽", "钟形帽", "贝壳帽", "魔法帽", "皇冠帽"],
        bag:["帆布托特包", "简约腋下包", "法棍包", "马鞍包", "半月包", "水桶包", "邮差包", "流浪包", "云朵包", "晚宴手拿包", "迷你废话包", "双肩背包", "腰包"],
        shoes:["玛丽珍单鞋", "绑带芭蕾鞋", "运动老爹鞋", "切尔西靴", "马丁靴", "小白鞋", "细跟高跟鞋", "英伦乐福鞋", "布洛克鞋", "雪地靴", "骑士靴", "汉服弓鞋", "茶会鞋"],
        nails:["奶油法式", "极简裸色", "暗黑金属", "晶透猫眼美甲", "冰透蜜桃美甲", "水墨晕染美甲", "深邃星空美甲", "法式珍珠镶嵌", "碎玻璃折射甲", "仙气月亮美甲", "棋盘格美甲"],
        mu_style:["素颜妆", "淡妆", "韩妆", "日杂妆", "辣妹妆", "港风妆", "欧美妆", "哥特妆", "网感妆", "白开水妆", "泰妆"],
        mu_contacts:["混血灰", "狗狗眼黑", "自然棕", "精灵绿", "星空蓝", "吸血鬼红", "温柔粉棕", "冰川灰", "粉紫渐变", "猫眼特效", "欧美无边框", "深邃黑环"],
        mu_eye:["大地色眼影", "桃花眼妆", "烟熏妆", "截断式眼妆", "猫眼眼线", "下至眼睑", "卧蚕提亮", "闪片爆闪", "无辜下垂眼", "赛博朋克眼妆", "水钻点缀"],
        mu_blush:["微醺腮红", "苹果肌腮红", "眼下腮红", "鼻尖腮红", "修容式腮红", "晒伤妆腮红", "蜜桃粉", "奶油杏色", "日杂感腮红", "韩系氛围感腮红", "冻伤妆腮红"],
        mu_lip:["哑光唇釉", "镜面唇釉", "水光唇", "雾面口红", "果冻唇", "咬唇妆", "烂番茄色", "玫瑰豆沙色", "梅子色", "浆果色", "日系嘟嘟唇"],
        suits:["水手服套装", "小西装套装", "运动风套装", "JK制服全套", "DK制服全套", "法式复古套装", "机车皮衣套装", "汉元素套装", "洛丽塔全套", "废土风机能套装", "甜酷女团套装"],
        season:["随机", "春季", "夏季", "秋季", "冬季", "跨季混搭"],
        count:["1套", "2套", "3套", "4套", "5套"],
        bottoms:["裙装优先", "裤装优先", "裙裤皆可"]
    },
    relatives: {
        type:["父亲", "母亲", "哥哥", "弟弟", "姐姐", "妹妹", "青梅竹马", "挚友", "死敌", "初恋", "暗恋者", "联姻对象", "导师", "徒弟", "下属", "上司", "伴侣", "前任"],
        pers:["温柔体贴", "腹黑傲娇", "阳光开朗", "冰山冷酷", "偏执疯狂", "极度护短", "病娇", "乐观乐天", "沉稳内敛"],
        att:["深爱/迷恋", "默默守护", "互相利用", "相爱相杀", "血海深仇", "绝对忠诚", "暗藏杀机", "敬畏仰望"]
    },
    pets: {
        species:["猫咪(狸花/布偶/缅因等)", "狗狗(金毛/哈士奇/边牧等)", "飞禽(猫头鹰/鹦鹉/乌鸦等)", "爬宠(蛇/蜥蜴/龟等)", "奇幻生物(龙/精灵/幻兽)", "仓鼠/兔类等小型动物", "机械赛博宠物"],
        looks:["体态圆润", "修长矫健", "毛茸茸", "异色瞳", "长尾巴", "戴着特定项圈", "背部有特殊花纹", "体型巨大", "可藏于口袋的微小体型"],
        pers:["极其黏人", "高冷傲娇", "护主狂魔", "拆家小能手", "贪吃贪睡", "通人性/高智商", "胆小怕事", "调皮捣蛋"]
    },
    estate: {
        type:["市中心大平层", "郊区独栋别墅", "顶层奢华复式", "温馨单身公寓", "老城区别墅/四合院", "废土安全屋", "赛博朋克地下室", "魔法森林树屋", "星际战舰休息舱", "古典庄园/城堡", "海景房"],
        style:["极简冷淡风", "奢华欧式", "温馨日系", "赛博霓虹风", "暗黑哥特风", "新中式古典", "废土工业风", "魔法奇幻风", "童话奶油风", "美拉德复古"],
        fac:["超大衣帽间", "私人全景泳池", "地下酒窖", "顶配电竞房", "全息训练室", "秘密武器库", "温室花园", "天文观测台", "全屋智能管家", "魔法结界阵法", "逃生密道"]
    },
    details: {
        food:["蛋糕","烤肉","咖啡","奶茶","冰淇淋","炸鸡","汉堡","寿司","牛排","沙拉","火锅","烧烤","面包","糖果","芝士","酸奶","螺蛳粉","榴莲","苦瓜"],
        env:["晴天","雨天","阴天","雪天","暴雪","雷雨","清晨","正午","黄昏","午夜","极光","星空","海边","森林","高山","荒漠","阁楼","废墟","赛博城市","游乐园"],
        ent:["看书","写作","绘画","打游戏","剧本杀","密室逃脱","拼图","逛街","品酒","烘焙","养宠物","钓鱼","露营","冲浪","滑雪","跳舞","唱歌","听演唱会","逛展","收集手办"],
        music:["流行","摇滚","民谣","电子","嘻哈","R&B","爵士","古典","纯音乐","交响乐","朋克","赛博朋克风","动漫OST","国风","治愈系","悲伤情歌","舞曲"],
        other:["发呆","睡觉","冥想","旅行","冒险","宅家","赚钱","花钱","发疯","做自己","躺平","卷王","熬夜","早起","收集癖","强迫症","吃瓜","社交","独处","撸狗"],
        gifts:["鲜花","珠宝","戒指","项链","手表","香水","名牌包","定制西装","跑车","私人飞机","绝版书籍","游戏机","手办","亲手做的蛋糕","情书","拥抱","陪伴","宠物"],
        skills:["快速转笔","盲打键盘","极速拼魔方","完美削苹果","一秒入睡","控制梦境","动物亲和力","绝对音感","极其抗冻","百杯不醉","黑暗中视物","飞镖百发百中","腹语","花式调酒","烘焙零失败","过目不忘"],
        habits:["咬嘴唇","摸鼻子","挠头","卷头发","抖腿","转戒指","发呆","叹气","挑眉","翻白眼","托腮","整理衣领","交叉双臂","插兜","哼歌","收集票根","强迫症对称","睡觉抱东西","经常看手表"]
    },
    perfume: {
        body:["奶香","蜜桃香","玫瑰香","茉莉香","檀木香","雪松香","皂香","阳光晒过的味道","青草香","橙花香","晚香玉","琥珀","麝香","香草","焦糖","椰奶","绿茶","乌龙茶","咖啡香","烟草香"],
        top:["柠檬","佛手柑","甜橙","葡萄柚","薄荷","粉红胡椒","罗勒","醛香","尤加利","黑加仑"],
        mid:["玫瑰","茉莉","铃兰","紫罗兰","晚香玉","鸢尾花","薰衣草","天竺葵","橙花","依兰"],
        base:["檀香木","雪松","广藿香","香根草","琥珀","麝香","香草","零陵香豆","橡木苔","皮革"]
    },
    voice: {
        texture:["清冷","低沉","烟嗓","少年音","御姐音","萝莉音","正太音","大叔音","气泡音","温润如玉","磁性","嘶哑","空灵","慵懒","金属质感","软糯甜美","沙哑低语"],
        pitch:["极高音","高音","中高音","中音","中低音","低音","极低音/深沉"],
        speed:["极快(机关枪)","偏快(敏捷)","正常适中","偏慢(从容)","极慢(迟缓/慵懒)"],
        tone:["温柔","强硬","命令式","撒娇","冷漠","轻佻","严肃","慵懒","试探","傲娇","卑微","戏谑","暴躁","不耐烦","平淡无波","楚楚可怜"]
    },
    nsfw: {
        xp:[ "体型差", "身高差", "年龄差", "地位差", "纯爱", "强制爱", "病娇", "双向暗恋", "破镜重圆", "宿敌", "主仆", "师徒", "年下奶狗", "年上爹系", "骑乘", "后入", "强强", "人外/异种", "兽耳/兽尾", "触手", "吸血鬼", "神明与信徒", "ABO信息素", "易感期/发情期", "咬颈标记", "灵魂伴侣", "绝对支配", "臣服/依恋", "养成", "救赎", "金丝雀", "黑化", "病弱/战损", "反差萌", "西装暴徒", "高岭之花", "纯情修勾", "海王收心", "心机绿茶", "清冷仙尊", "疯批美人", "制服诱惑", "女仆/执事装", "禁欲系", "泪失禁体质", "超常敏感", "极致掌控", "视觉剥夺(蒙眼)", "束缚感", "密闭空间", "野外/环境刺激", "水下/温泉", "镜面映射", "办公室/书桌", "落地窗前", "温度差(冰块等)", "惩罚与管教", "恶劣戏弄", "温柔安抚", "事后温存", "咬痕/抓痕", "催眠/心理暗示", "感官共享"],
        pos:[]
    }
};

// ================= 状态变量 =================
window.savedCount = 0;
window.todayCount = 0;
window.totalChars = 0;
window.savedItems = [];
window.currentHeartTab = '全部';

// ================= DOM 和基础 UI =================
window.createBgDecorations = function() {
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    const colors =['rgba(248,164,184,0.4)','rgba(160,210,240,0.4)','rgba(168,230,207,0.4)','rgba(195,177,225,0.4)','rgba(255,240,165,0.4)','rgba(255,203,164,0.4)'];
    for(let i=0;i<5;i++){
        const blob = document.createElement('div');
        blob.className='bg-blob';
        blob.style.cssText=`width:${300+Math.random()*200}px;height:${300+Math.random()*200}px;background:radial-gradient(circle, ${colors[i%colors.length]} 0%, transparent 70%);top:${Math.random()*80}%;left:${Math.random()*80}%;animation:floatBlob ${15+Math.random()*10}s ease-in-out infinite alternate; transform:translateZ(0); will-change:transform; position:absolute; border-radius:50%;`;
        canvas.appendChild(blob);
    }
    for(let i=0;i<20;i++){
        const star = document.createElement('div');
        star.className='bg-star';
        const sz = 4+Math.random()*6;
        star.style.cssText=`width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${2+Math.random()*3}s; transform:translateZ(0); will-change:transform,opacity;`;
        canvas.appendChild(star);
    }
    for(let i=0;i<15;i++){
        const c = document.createElement('div');
        c.className='confetti';
        const confColors =['#F8A4B8','#FFCBA4','#FFF0A5','#A8E6CF','#A0D2F0','#C3B1E1','#DDA0DD','#81D8D0'];
        c.style.cssText=`left:${Math.random()*100}%;width:${5+Math.random()*6}px;height:${8+Math.random()*10}px;background:${confColors[Math.floor(Math.random()*confColors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*10}s;opacity:0; transform:translateZ(0); will-change:transform,opacity;`;
        canvas.appendChild(c);
    }
}

window.showToast = function(msg) {
    const t = document.getElementById('toast');
    if(t) {
        t.innerText = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3200);
    }
}

window.enterApp = function() {
    const intro = document.getElementById('intro-screen');
    if(intro) {
        intro.style.opacity = '0';
        intro.style.transform = 'scale(1.08)';
        setTimeout(() => {
            intro.classList.add('hidden');
            document.getElementById('menu-screen').classList.remove('hidden');
        }, 900);
    }
    const tools = document.getElementById('floating-tools');
    if(tools) tools.classList.remove('hidden');
}

window.goBack = function() {
    document.querySelectorAll('#magic_generator_app .gen-container').forEach(el => el.classList.add('hidden'));
    document.getElementById('menu-screen').classList.remove('hidden');
}

window.openGen = function(id) {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('result-card').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
    let selId = id === 'gen-general' ? 'g-bind-base' : id === 'gen-modern' ? 'm-bind-base' : 'a-bind-base';
    window.populateBindSelect(selId);
}

window.openGenExt = function(id) {
    document.querySelectorAll('#magic_generator_app .gen-container').forEach(el => el.classList.add('hidden'));
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('result-card').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
    let selectId = id === 'gen-cloakroom' ? 'bind-cloakroom' : 
                   id === 'gen-relatives' ? 'bind-relatives' : 
                   id === 'gen-pets' ? 'bind-pets' : 
                   id === 'gen-estate' ? 'bind-estate' : 
                   id === 'gen-details' ? 'bind-details' : 
                   id === 'gen-voice' ? 'bind-voice' : 
                   id === 'gen-nsfw' ? 'bind-nsfw' : 'bind-perfume';
    window.populateBindSelect(selectId);
}

window.openModal = function(id) {
    const m = document.getElementById(id);
    if(m) m.style.display = 'flex';
}

window.closeModal = function(id) {
    const m = document.getElementById(id);
    if(m) m.style.display = 'none';
}

// ================= ST 卡片与本地数据融合下拉框 =================
window.populateBindSelect = function(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const isBase = (selectId === 'g-bind-base' || selectId === 'm-bind-base' || selectId === 'a-bind-base');
    select.innerHTML = `<option value="">${isBase ? '导入已存设定或ST角色卡...' : '-- 自选：不关联角色卡 --'}</option>`;
    
    let hasChars = false;
    
    const localGroup = document.createElement('optgroup');
    localGroup.label = "--- 魔法工坊本地设定 ---";
    window.savedItems.forEach(item => {
        if(item.category === '人设') {
            const opt = document.createElement('option');
            opt.value = "local_" + item.id;
            opt.textContent = `[本地] ${item.title}`;
            localGroup.appendChild(opt);
            hasChars = true;
        }
    });
    if (localGroup.children.length > 0) select.appendChild(localGroup);

    if (characters && characters.length > 0) {
        const stGroup = document.createElement('optgroup');
        stGroup.label = "--- SillyTavern 角色卡 ---";
        characters.forEach((c, index) => {
            const opt = document.createElement('option');
            opt.value = "st_" + index; 
            opt.textContent = `[ST角色] ${c.name || '未知角色'}`;
            stGroup.appendChild(opt);
            hasChars = true;
        });
        select.appendChild(stGroup);
    }

    if(!hasChars && !isBase) {
        select.innerHTML = '<option value="">⚠️ 暂无可用角色，请先生成或在ST导入角色卡！</option>';
        select.disabled = true;
    } else {
        select.disabled = false;
    }
}

window.checkBindStatus = function(selectEl) {
    if(selectEl.value) {
        selectEl.style.borderColor = "var(--mc-mint)";
        window.showToast("魔法能量已连接！");
    } else {
        selectEl.style.borderColor = "";
    }
}

window.getBindContextText = function(selectValue) {
    if (!selectValue) return null;
    if (selectValue.startsWith("local_")) {
        const id = selectValue.replace("local_", "");
        const bItem = window.savedItems.find(s => s.id === id);
        return bItem ? bItem.content : null;
    } 
    else if (selectValue.startsWith("st_")) {
        const index = parseInt(selectValue.replace("st_", ""));
        if (characters && characters[index]) {
            const char = characters[index];
            return `【角色姓名】：${char.name || '未知'}\n【详细设定】：${char.description || '无'}\n【性格特征】：${char.personality || '无'}\n【剧情场景】：${char.scenario || '无'}`;
        }
    }
    return null;
}

// ================= 生成引擎核心对接 (完全使用 ST 的 generateQuietPrompt) =================
window.executeApiRequest = async function(promptText, titleText, saveCategory, saveTitlePrefix, saveName, bindId = null) {
    const magicOverlay = document.getElementById('magic-overlay');
    const resultCard = document.getElementById('result-card');
    const resultTextArea = document.getElementById('result-text-area');
    
    document.getElementById('result-title-text').innerHTML = `<span class="title-deco title-deco-l"></span>${titleText}<span class="title-deco title-deco-r"></span>`;
    
    magicOverlay.style.display = 'flex';
    resultCard.classList.add('hidden');
    resultTextArea.innerHTML = '';

    try {
        let fullText = await generateQuietPrompt(promptText, false);
        
        magicOverlay.style.display = 'none';
        resultCard.classList.remove('hidden');

        fullText = fullText.replace(/^```(yaml)?/im,'').replace(/```$/m,'').trim();
        resultTextArea.innerText = fullText;
        window.showToast('魔法档案渲染完成!');
        window.saveToHeart(saveCategory, saveTitlePrefix, saveName, fullText, bindId);
    } catch(error) {
        magicOverlay.style.display = 'none';
        resultCard.classList.remove('hidden');
        resultTextArea.innerHTML = `<span style="color:var(--mc-coral)">生成失败 (请检查ST中模型API连接状态): ${error.message}</span>`;
    }
}

// ================= 标签 UI 生成 =================
window.renderTags = function(containerId, dataArray, isRadio) {
    const container = document.getElementById(containerId); 
    if(!container) return;
    const inputGroup = container.querySelector('.custom-input-group');
    dataArray.forEach((text, index) => {
        const div = document.createElement('div');
        div.className = `tag ${index === 0 && isRadio ? 'selected' : ''}`; 
        div.innerText = text;
        div.onclick = function() {
            const isDual = container.classList.contains('dual-mode');
            if(isDual){
                if(this.classList.contains('selected-1')){this.classList.remove('selected','selected-1');let t2=container.querySelector('.selected-2');if(t2){t2.classList.remove('selected-2');t2.classList.add('selected-1')}}
                else if(this.classList.contains('selected-2')){this.classList.remove('selected','selected-2')}
                else{let s1=container.querySelector('.selected-1'),s2=container.querySelector('.selected-2');if(!s1)this.classList.add('selected','selected-1');else if(!s2)this.classList.add('selected','selected-2');else{s2.classList.remove('selected','selected-2');this.classList.add('selected','selected-2')}}
            } else {
                if(isRadio) Array.from(container.querySelectorAll('.tag')).forEach(t => t.classList.remove('selected'));
                this.classList.toggle('selected');
            }
        };
        container.insertBefore(div, inputGroup);
    });
    if(isRadio){const first=container.querySelector('.tag.selected');if(first)first.classList.add('selected-1');}
}

window.renderTriTags = function(containerId, dataArray) {
    const container = document.getElementById(containerId); if(!container) return;
    const inputGroup = container.querySelector('.custom-input-group');
    dataArray.forEach((text) => {
        const div = document.createElement('div');
        div.className = 'tag';
        div.innerText = text;
        div.onclick = function() {
            if (this.classList.contains('selected') && this.classList.contains('like')) {
                this.classList.remove('like');
                this.classList.add('dislike');
            } else if (this.classList.contains('selected') && this.classList.contains('dislike')) {
                this.classList.remove('selected', 'dislike');
            } else {
                this.classList.add('selected', 'like');
            }
        };
        container.insertBefore(div, inputGroup);
    });
}

window.initGenUI = function(type,eraId,bgId,hcId,hsId,ecId,looksId,cloId,persId,jobId) {
    const d = configData[type];
    const prefix = type === 'general' ? 'g' : type === 'modern' ? 'm' : 'a';
    
    window.renderTags(`${prefix}-st-rel-c`, ST_RELATIONS, true);
    window.renderTags(eraId,d.era,true); window.renderTags(bgId,d.bg,false);
    window.renderTags(hcId,d.hc,true); window.renderTags(hsId,d.hs,true);
    window.renderTags(ecId,d.ec,true); window.renderTags(looksId,d.looks,false);
    window.renderTags(cloId,d.clo,false); window.renderTags(persId,d.pers,false);
    window.renderTags(jobId,d.job,false);
    
    const pool = document.getElementById(`${prefix}-npc-pool`);
    if(pool) pool.innerHTML = d.npcPool.map(t => `<span class="pool-tag" onclick="stNpcCore.addNpc('${prefix}','${t}')">+ ${t}</span>`).join('');
}

window.addCustomTag = function(btn, isRadio=false) {
    const input = btn.previousElementSibling; const val = input.value.trim();
    if(val) {
        const container = btn.closest('.tags-container'); const isDual = container.classList.contains('dual-mode');
        if(!isDual && isRadio) Array.from(container.querySelectorAll('.tag')).forEach(t => t.classList.remove('selected','selected-1','selected-2'));
        const tag = document.createElement('div');
        tag.className = 'tag selected'; 
        tag.innerText = val;
        if(isDual){
            let s1=container.querySelector('.selected-1'),s2=container.querySelector('.selected-2');
            if(!s1) tag.classList.add('selected-1');
            else if(!s2) tag.classList.add('selected-2');
            else { s2.classList.remove('selected','selected-2'); tag.classList.add('selected-2'); }
        } else {
            tag.classList.add('selected-1');
        }
        tag.onclick = function() {
            if(isDual){
                if(this.classList.contains('selected-1')){
                    this.classList.remove('selected','selected-1');
                    let t2=container.querySelector('.selected-2');
                    if(t2){t2.classList.remove('selected-2');t2.classList.add('selected-1')}
                }else if(this.classList.contains('selected-2')){
                    this.classList.remove('selected','selected-2')
                }else{
                    let ss1=container.querySelector('.selected-1'),ss2=container.querySelector('.selected-2');
                    if(!ss1)this.classList.add('selected','selected-1');
                    else if(!ss2)this.classList.add('selected','selected-2');
                    else{ss2.classList.remove('selected','selected-2');this.classList.add('selected','selected-2')}
                }
            } else {
                if(isRadio) Array.from(container.querySelectorAll('.tag')).forEach(t => t.classList.remove('selected','selected-1'));
                this.classList.toggle('selected');
                if(this.classList.contains('selected')) this.classList.add('selected-1');
            }
        };
        container.insertBefore(tag, btn.closest('.custom-input-group')); input.value=''; window.showToast(`已添加：${val}`);
        const summary = container.parentElement.querySelector('summary .switch input');
        if(summary && !summary.checked) summary.checked = true;
    }
}

window.addCustomTriTag = function(btn) {
    const input=btn.previousElementSibling;const val=input.value.trim();
    if(val){
        const container=btn.closest('.tags-container');
        const tag=document.createElement('div');tag.className='tag selected like';tag.innerText=val;
        tag.onclick=function(){
            if (this.classList.contains('selected') && this.classList.contains('like')) {
                this.classList.remove('like'); this.classList.add('dislike');
            } else if (this.classList.contains('selected') && this.classList.contains('dislike')) {
                this.classList.remove('selected', 'dislike');
            } else {
                this.classList.add('selected', 'like');
            }
        };
        container.insertBefore(tag,btn.closest('.custom-input-group'));input.value='';window.showToast(`已添加：${val}`);
    }
}

window.toggleDualIdentity = function(event, containerId) {
    event.stopPropagation();event.preventDefault();
    const container = document.getElementById(containerId); const btn = event.target;
    container.classList.toggle('dual-mode');
    Array.from(container.querySelectorAll('.tag')).forEach(t => t.classList.remove('selected','selected-1','selected-2'));
    if(container.classList.contains('dual-mode')){ btn.classList.add('active'); btn.innerText='双重身份: 已开启'; }
    else { btn.classList.remove('active'); btn.innerText='开启双重身份'; }
}

window.updateSummary = function(container) {
    if (!container) return;
    const summaryId = "summary-" + container.id;
    const textArea = document.getElementById(summaryId);
    if (!textArea) return;
    
    let summaryText =[];
    const tagsContainers = container.querySelectorAll('.tags-container');
    tagsContainers.forEach(tc => {
        const sw = tc.closest('details').querySelector('summary label.switch input[type="checkbox"]');
        if(sw && !sw.checked) return;
        
        const detailsEl = tc.closest('details, .main-sec');
        if(!detailsEl) return;
        const titleEl = detailsEl.querySelector('summary span');
        if(!titleEl) return;
        let title = titleEl.innerText.replace(/\s*$.*$\s*/, '').trim();
        
        let selected = Array.from(tc.querySelectorAll('.tag.selected')).map(t => {
            if(t.classList.contains('like')) return t.innerText + "(喜欢)";
            if(t.classList.contains('dislike')) return t.innerText + "(厌恶)";
            return t.innerText;
        });
        
        selected = selected.filter(x => x !== '随机');
        if(selected.length > 0) {
            summaryText.push(`【${title}】：${selected.join('，')}`);
        }
    });

    const npcList = container.querySelector('.npc-list');
    if(npcList) {
        const sw = npcList.closest('details').querySelector('summary label.switch input[type="checkbox"]');
        if(!sw || sw.checked) {
            const npcs = Array.from(npcList.querySelectorAll('.npc-item')).map(item => {
                const name = item.querySelector('.npc-name').innerText;
                const att = item.querySelector('.npc-select').value;
                return `${name} (态度: ${att})`;
            });
            if(npcs.length > 0) {
                summaryText.push(`【核心羁绊人物】：${npcs.join('；')}`);
            }
        }
    }
    textArea.value = summaryText.join('\n');
}

window.stNpcCore = {
    state:{g:[],m:[],a:[]},
    addNpc(prefix,name){this.state[prefix].push({id:'npc_'+Math.random().toString(36).substr(2,9),name,attitude:configData.attitudes[0]});this.render(prefix)},
    removeNpc(prefix,id){this.state[prefix]=this.state[prefix].filter(n=>n.id!==id);this.render(prefix)},
    updateAttitude(prefix,id,val){const npc=this.state[prefix].find(n=>n.id===id);if(npc)npc.attitude=val},
    addCustomNpc(prefix){const input=document.getElementById(`${prefix}-npc-input`);const name=input.value.trim();if(name){this.addNpc(prefix,name);input.value=''}},
    render(prefix){
        const container=document.getElementById(`${prefix}-npc-list`);if(!container)return;
        if(!this.state[prefix].length){container.innerHTML='';return}
        container.innerHTML=this.state[prefix].map(n=>{
            const opts=configData.attitudes.map(a=>`<option value="${a}" ${a===n.attitude?'selected':''}>态度: ${a}</option>`).join('');
            return`<div class="npc-item"><div class="npc-name">${n.name}</div><select class="npc-select" onchange="stNpcCore.updateAttitude('${prefix}','${n.id}',this.value)">${opts}</select><div class="npc-del" onclick="stNpcCore.removeNpc('${prefix}','${n.id}')">x</div></div>`;
        }).join('');
    }
};

window.getValsArray = function(cid) { const c=document.getElementById(cid); return c ? Array.from(c.querySelectorAll('.tag.selected, .tag.selected-1, .tag.selected-2')).map(el=>el.innerText) : []; }
window.isSwitchOn = function(id) { const el=document.getElementById(id); return el ? el.checked : true; } 
window.escapeHtml = function(unsafe) { return (unsafe || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }

// ================= ST卡片解析相关 =================
window.handleStCardUpload = function(event, prefix) {
    const file = event.target.files[0];
    if (!file) return;
    document.getElementById(`${prefix}-st-filename`).innerText = file.name;
    const textArea = document.getElementById(`${prefix}-st-char-data`);
    const callback = (parsedText, worldbook) => {
        textArea.style.display = 'block';
        textArea.value = parsedText;
        window.renderWorldbook(prefix, worldbook);
        window.showToast("角色数据解析成功，已自动提取设定！");
    };
    const reader = new FileReader();
    if (file.name.toLowerCase().endsWith('.json')) {
        reader.onload = e => window.parseStJson(e.target.result, callback);
        reader.readAsText(file);
    } else if (file.name.toLowerCase().endsWith('.png')) {
        reader.onload = e => {
            const buffer = e.target.result; const dataView = new DataView(buffer);
            if (dataView.getUint32(0) !== 0x89504e47) { window.showToast("不是有效的PNG文件"); return; }
            let offset = 8, charaData = null;
            while (offset < dataView.byteLength) {
                const length = dataView.getUint32(offset);
                const type = String.fromCharCode(dataView.getUint8(offset+4), dataView.getUint8(offset+5), dataView.getUint8(offset+6), dataView.getUint8(offset+7));
                if (type === 'tEXt') {
                    const textData = new Uint8Array(buffer, offset + 8, length);
                    const textStr = new TextDecoder('utf-8').decode(textData);
                    const nullIdx = textStr.indexOf('\0');
                    const keyword = textStr.substring(0, nullIdx);
                    if (keyword === 'chara') { charaData = textStr.substring(nullIdx + 1); break; }
                }
                offset += 12 + length;
            }
            if (charaData) {
                try {
                    let bytes = Uint8Array.from(atob(charaData), c => c.charCodeAt(0));
                    window.parseStJson(new TextDecoder().decode(bytes), callback);
                } catch(err) {
                    try { window.parseStJson(decodeURIComponent(escape(atob(charaData))), callback); } 
                    catch (e) { window.showToast("无法解析该PNG中的角色数据"); }
                }
            } else window.showToast("未在PNG中找到有效角色卡数据！");
        };
        reader.readAsArrayBuffer(file);
    }
}

window.parseStJson = function(jsonStr, callback) {
    try {
        const data = JSON.parse(jsonStr);
        const char = data.data || data;
        let combined = `【对方姓名】：${char.name || "未知角色"}\n`;
        if (char.description) combined += `【详细设定】：\n${char.description}\n`;
        if (char.personality) combined += `【性格特征】：\n${char.personality}\n`;
        callback(combined, char.character_book || data.character_book || null);
    } catch(e) { window.showToast("JSON卡片解析失败"); }
}

window.renderWorldbook = function(prefix, book) {
    const container = document.getElementById(`${prefix}-worldbook-container`);
    if (!container) return;
    if (!book || !book.entries || book.entries.length === 0) { container.style.display = 'none'; container.innerHTML = ''; return; }

    let entriesHtml = book.entries.map((entry, idx) => {
        let entryName = (entry.name && entry.name.trim() !== "") ? entry.name : ((entry.comment && entry.comment.trim() !== "") ? entry.comment : ((entry.keys && entry.keys.length > 0) ? entry.keys[0] : `条目 ${idx + 1}`));
        const keys = (entry.keys ||[]).join(', ') || '无关键字';
        return `
        <details class="sub-sec wb-item" style="margin: 0 0 10px 0;">
            <summary style="padding: 10px 16px;"><div class="summary-content">
                    <span style="font-size: 0.95rem; display: flex; flex-direction: column; gap: 4px;"><strong>${window.escapeHtml(entryName)}</strong><span style="font-size: 0.8rem; color: var(--mc-text-light); font-weight: normal;">Keys: ${window.escapeHtml(keys)}</span></span>
                    <div class="summary-controls"><label class="switch" onclick="event.stopPropagation()"><input type="checkbox" class="wb-entry-toggle" ${entry.enabled !== false ? 'checked' : ''}><span class="slider-sw"></span></label></div>
            </div></summary>
            <div style="padding: 0 16px 16px;"><textarea class="fancy-input wb-content" style="width:100%; height:80px; resize:vertical; font-size:0.85rem;">${window.escapeHtml(entry.content || '')}</textarea></div>
        </details>`;
    }).join('');

    container.innerHTML = `<details class="main-sec" style="margin: 0 0 15px 0; border: 2px dashed rgba(160,210,240,0.6); box-shadow: none; background: rgba(255,255,255,0.5);"><summary style="padding: 14px 20px;"><div class="summary-content"><span style="font-size: 1rem;">📖 附属世界书 (Lorebook)</span><div class="summary-controls"><label class="switch" onclick="event.stopPropagation()"><input type="checkbox" class="wb-global-toggle" checked><span class="slider-sw"></span></label></div></div></summary><div style="padding: 0 20px 10px;">${entriesHtml}</div></details>`;
    container.style.display = 'block';
}

// ================= 主生成逻辑 =================
window.generatePersona = function(type) {
    const prefix = type==='general' ? 'g' : type==='modern' ? 'm' : 'a';
    const isRandName = document.getElementById(`t-${prefix}-rand-name`).checked;
    const nameVal = document.getElementById(`${prefix}-name`).value.trim();
    let finalNamePrompt = isRandName ? "【名字：根据背景生成极具韵味的名字，绝对不能出现括号等占位符】" : (nameVal === '' ? '(由AI根据背景起名)' : `【名字：绝对必须是 ${nameVal}】`);
    const safeSaveName = isRandName && nameVal === '' ? "随机角色" : (nameVal || '未命名');
    const gender = document.getElementById(`${prefix}-gender`).value.trim()||'(由AI设定)';
    const age = document.getElementById(`${prefix}-age`).value.trim()||'(由AI设定)';
    const wordCount = document.getElementById(`${prefix}-wordcount`).value.trim()||'1500';

    const summaryTextarea = document.getElementById(`summary-gen-${type}`);
    const userSummary = summaryTextarea ? summaryTextarea.value.trim() : "";
    
    let basePersonaContext = "";
    const bindSelect = document.getElementById(`${prefix}-bind-base`);
    if(bindSelect && bindSelect.value) {
        const bContext = window.getBindContextText(bindSelect.value);
        if(bContext) {
            basePersonaContext = `\n【重要！参考基础设定进行润色与融合】：\n${bContext}\n\n请在上述设定的基础上，结合本次选择的新标签进行深度润色、扩写或翻新生成。\n`;
        }
    }

    let stContext = "";
    const isStBondOn = window.isSwitchOn(`t-${prefix}-st-bond`); 
    const stCharData = document.getElementById(`${prefix}-st-char-data`).value.trim();
    
    if(isStBondOn && stCharData) {
        let wbContext = "";
        const wbContainer = document.getElementById(`${prefix}-worldbook-container`);
        if(wbContainer && wbContainer.style.display !== 'none') {
            const globalToggle = wbContainer.querySelector('.wb-global-toggle');
            if(globalToggle && globalToggle.checked) {
                const entries = wbContainer.querySelectorAll('.wb-item');
                entries.forEach(entry => {
                    const toggle = entry.querySelector('.wb-entry-toggle');
                    if(toggle && toggle.checked) {
                        const content = entry.querySelector('.wb-content').value.trim();
                        if(content) wbContext += `\n- ${content}`;
                    }
                });
            }
        }
        const stRelEls = window.getValsArray(`${prefix}-st-rel-c`).filter(x=>x!=='随机');
        const stRel = stRelEls.length > 0 ? stRelEls[0] : "自由发散合适的关系";
        stContext = `\n\n【🚀 特殊模式激活：羁绊 User 档案生成】\n已知对方核心角色 (Char) 的设定信息如下：\n${stCharData}\n${wbContext ? `\n【附加世界书设定参考(Lorebook)】：\n${wbContext}\n` : ""}我 (User) 与对方的命运关系强制设定为：【${stRel}】\n任务指令：请根据上述对方设定与我们的羁绊关系，完全以 User 的视角生成一份能与对方产生精彩化学反应的专属档案！\n注意：绝对不要重写对方信息，必须让 User 的背景、性格、身份等合理契合双人羁绊。\n`;
    }

    let promptText=`请你作为一名拥有神级文笔的大神作家，为我生成一份角色设定。
【字数警告】：严格遵循大约 ${wordCount} 字的内容输出！请在每个层级下进行极具画面感和深度的扩写！
【最高强制指令】：本次生成【必须且只能】以《用户已选标签汇总》里的内容为唯一核心基准！只能在这些已选标签的基础上润色。
【用户已选标签汇总（绝对基准）】：
${userSummary || "(用户未点选任何强制标签，请在给定时代背景下随机发散)"}
${basePersonaContext}${stContext}

【极其重要的格式规范】：
必须且只能输出合法的 YAML 格式。对于每一个带括号的提示指令，请用优美丰满的文字替换。

\`\`\`yaml
Basic_Info:
  name: "${finalNamePrompt}"
  nicknames:
    - "(根据背景脑补)"
  age: "【必须是：${age}】"
  gender: "【必须是：${gender}】"
  species: "(种族/物种)"
  birthday: "(生日)"
  zodiac_sign: "(星座/生肖)"
  blood_type: "(血型)"
  identity_and_occupation:
    - "(严格依照标签汇总的【身份/职业】扩写)"
  era_background: "(严格依照标签汇总的时代/主舞台背景扩写)"

Physical_Appearance:
  overall_vibe: "(气质总览)"
  height_and_weight: "(身高、体重与体型感受)"
  face_and_features: "(严格依照标签汇总的【外貌特征/瞳色】扩写)"
  hair: "(严格依照标签汇总的【发色/发型】扩写)"

Attire:
  style_preference: "(严格依照标签汇总的【穿搭/风格】扩写)"
  Outfit_Casual:
    Tops: "(常服上装)"
    Bottoms: "(常服下装)"
    Footwear: "(常服鞋靴)"
  Outfit_Formal_or_Combat:
    Tops: "(正装/战袍上装)"
    Bottoms: "(正装/战袍下装)"
    Footwear: "(鞋靴)"
  accessories:
    - "(常戴配饰)"

Personality:
  mbti: "(MBTI类型)"
  alignment: "(阵营)"
  core_traits: "(严格依照标签汇总的【性格】扩写)"
  positive_traits:
    - "(基于性格衍生的优点)"
  negative_traits:
    - "(基于性格衍生的缺点)"
  likes:
    - "(喜欢的事物)"
  dislikes:
    - "(讨厌的事物)"
  speech_style: "(说话方式/口头禅)"

Background:
  origin_family: "(严格依照标签汇总的【原生家庭/出身】扩写)"
  past_experience:
    - "(生平过往详细经历)"
  current_goal: "(当前目标)"
  hidden_secrets:
    - "(不为人知的秘密)"

Relationships:
  core_bonds: "(严格依照标签汇总的【核心社交圈与羁绊】扩写)"
  social_circle:
    - "(其他社交网络补充)"

Capabilities:
  combat_or_professional_skills: "(技能/战斗风格)"
  supernatural_powers: "(魔法/异能设定，无则写无)"
  weaknesses: "(弱点)"
\`\`\``;

    const titlePrefix = type==='general' ? '通用档案' : type==='modern' ? '现代档案' : '古风卷宗';
    const finalTitlePrefix = (isStBondOn && stCharData) ? `✨${titlePrefix}(User羁绊版)` : titlePrefix;
    window.executeApiRequest(promptText, "专属设定魔法卷宗", "人设", finalTitlePrefix, safeSaveName, null);
}

window.generateExpansion = function(type) {
    let selectId, baseTitle, summaryId;
    if(type === '衣帽间') { selectId = 'bind-cloakroom'; baseTitle = "专属魔法衣帽间"; summaryId = "summary-gen-cloakroom"; }
    else if(type === '亲友') { selectId = 'bind-relatives'; baseTitle = "亲友档案羁绊"; summaryId = "summary-gen-relatives"; }
    else if(type === '宠物') { selectId = 'bind-pets'; baseTitle = "宠物灵魂契约"; summaryId = "summary-gen-pets"; }
    else if(type === '住所') { selectId = 'bind-estate'; baseTitle = "私人住所档案"; summaryId = "summary-gen-estate"; }
    else if(type === '细节偏好') { selectId = 'bind-details'; baseTitle = "细节与喜恶偏好"; summaryId = "summary-gen-details"; }
    else if(type === '调香室') { selectId = 'bind-perfume'; baseTitle = "专属调香档案"; summaryId = "summary-gen-perfume"; }
    else if(type === '调音室') { selectId = 'bind-voice'; baseTitle = "专属调音档案"; summaryId = "summary-gen-voice"; }
    else if(type === '私密档案') { selectId = 'bind-nsfw'; baseTitle = "专属私密档案"; summaryId = "summary-gen-nsfw"; }
    
    const select = document.getElementById(selectId);
    if(!select || !select.value) { window.showToast("⚠️ 必须先选择关联的主角人设/卡片！"); return; }
    
    const bindContextRaw = window.getBindContextText(select.value);
    if(!bindContextRaw) { window.showToast("未能获取关联角色的背景数据"); return; }
    const bindContext = `【关联主体人设信息参考】：\n${bindContextRaw}\n\n`;

    let charName = "角色";
    let bindIdForSave = null;
    
    if(select.value.startsWith("local_")) {
        const realId = select.value.replace("local_", "");
        const bItem = window.savedItems.find(s => s.id === realId);
        if(bItem) {
            const boundNameMatch = bItem.title.match(/ - (.+)$/);
            charName = boundNameMatch ? boundNameMatch[1] : "角色";
            bindIdForSave = realId;
        }
    } else if (select.value.startsWith("st_")) {
        const idx = parseInt(select.value.replace("st_", ""));
        if(characters && characters[idx]) charName = characters[idx].name;
        bindIdForSave = select.value;
    }

    const summaryTextarea = document.getElementById(summaryId);
    const userSummary = summaryTextarea ? summaryTextarea.value.trim() : "";
    let promptText = "";

    if(type === '衣帽间') {
        promptText = `请作为顶级造型师，基于关联的【主体人设】为Ta量身定制衣帽间穿搭。\n${bindContext}
【最高强制指令】：绝对以【已选标签汇总】为唯一基准！
【已选标签汇总】：\n${userSummary || "(未点选特定穿搭标签，请根据主角人设自由设计)"}

【必须严格输出为合法的YAML格式】，多套数请以 Outfit_1, Outfit_2 展开。
\`\`\`yaml
Outfit_1:
  Theme: "(主题名称)"
  Vibe: "(整体氛围描述)"
  Color_Palette: ["(主色1)", "(主色2)", "(点缀色)"]
  Hairstyle_and_Makeup: "(基于标签里的发型和妆容扩写)"
  Apparel:
    Top: "(基于标签风格上装要求扩写)"
    Bottom: "(基于标签下装倾向扩写)"
    Outerwear: "(外套描述)"
  Footwear: "(鞋子描述)"
  Accessories:
    - "(配饰生动描述)"
\`\`\``;
    } else if(type === '亲友') {
        promptText = `请基于关联的【主体人设】，为Ta创作一名极其重要的关联人物。\n${bindContext}\n【已选标签汇总】：\n${userSummary || "(请根据主角人设自由发散)"}\n必须输出合法YAML，极具画面感且严格遵从上述基准：\n\`\`\`yaml\nRelative_Info:\n  name: "(亲友姓名)"\n  relationship: "(关系描述)"\n  attitude_to_mc: "(态度描述)"\n  age: "(年龄)"\n  gender: "(性别)"\n  occupation: "(职业)"\nAppearance:\n  overall_vibe: "(气质外貌)"\nPersonality:\n  core: "(核心性格)"\n  flaws: "(缺陷)"\nBackground:\n  history_with_mc: "(与主角过往)"\n\`\`\``;
    } else if(type === '宠物') {
        promptText = `请基于关联的【主体人设】，为Ta创作专属宠物。\n${bindContext}\n【已选标签汇总】：\n${userSummary || "(自由发散)"}\n输出合法YAML：\n\`\`\`yaml\nPet_Info:\n  name: "(名字)"\n  species: "(物种)"\nAppearance:\n  size: "(体型)"\n  features:\n    - "(特征)"\nPersonality_and_Habits:\n  core_vibe: "(性格)"\n  favorite_food: "(最爱食物)"\nBond_with_MC:\n  how_they_met: "(相遇)"\n  interaction_style: "(互动模式)"\n\`\`\``;
    } else if(type === '住所') {
        promptText = `请基于关联的【主体人设】，为Ta设计住所。\n${bindContext}\n【已选标签汇总】：\n${userSummary || "(自由发散)"}\n输出合法YAML：\n\`\`\`yaml\nEstate_Info:\n  name: "(命名)"\n  location: "(地段描述)"\nArchitecture_and_Decor:\n  exterior: "(外观)"\n  interior_style: "(室内风格)"\nSpecial_Facilities:\n  - "(特殊设施)"\nAtmosphere:\n  mc_favorite_spot: "(主角最爱待的角落)"\n\`\`\``;
    } else if(type === '细节偏好') {
        promptText = `请基于关联的【主体人设】，为Ta补充细节偏好设定。\n${bindContext}\n【已选标签汇总】：\n${userSummary || "(自由发散)"}\n输出合法YAML：\n\`\`\`yaml\nDetails_and_Preferences:\n  Likes:\n    - "(发散喜欢的事物和深层原因)"\n  Dislikes:\n    - "(发散厌恶的事物)"\n  Desired_Gifts:\n    - "(收到礼物的反应)"\n  Small_Skills:\n    - "(小技能在日常的体现)"\n  Quirks_and_Habits:\n    - "(生动描写小习惯发作的情境)"\n\`\`\``;
    } else if(type === '调香室') {
        promptText = `请作为顶级调香师，为Ta定制专属香气档案。\n${bindContext}\n【已选标签汇总】：\n${userSummary || "(自由调配)"}\n输出合法YAML：\n\`\`\`yaml\nScent_Profile:\n  Body_Scent:\n    scent: "(体香)"\n    description: "(体香给人的感觉)"\n  Signature_Perfume:\n    name: "(香水命名)"\n    Top_Notes: "(前调印象)"\n    Middle_Notes: "(中调核心展开)"\n    Base_Notes: "(后调余韵)"\n\`\`\``;
    } else if(type === '调音室') {
        promptText = `请为Ta定制专属声音档案。\n${bindContext}\n【已选标签汇总】：\n${userSummary || "(自由推导)"}\n输出合法YAML：\n\`\`\`yaml\nVoice_Profile:\n  voice_texture: "(嗓音特质，听起来像什么)"\n  pitch_and_speed: "(音高和语速在不同情绪的表现)"\n  tone_and_manner: "(口吻和说话习惯)"\n  laugh_and_sigh: "(笑声和叹息特征)"\n  example_quotes: \n    - "(经典台词及动作描写)"\n\`\`\``;
    } else if(type === '私密档案') {
        const wCount = document.getElementById('n-wordcount').value.trim() || '1500';
        promptText = `请作为顶级限制级记录者，为Ta定制一份极具张力的私密档案（约${wCount}字）。\n${bindContext}\n【已选标签汇总】：\n${userSummary || "(推测深层XP)"}\n输出合法YAML(画面感强)：\n\`\`\`yaml\nNSFW_Profile:\n  Core_Dynamics: "(关系核心张力)"\n  Body_Details:\n    Physique: "(体格特征)"\n    Sensitive_Spots: "(敏感带)"\n  Turn_ons_and_Turn_offs:\n    Turn_ons: \n      - "(唤起欲望的点)"\n  Sexual_Behavior:\n    Role: "(定位/主导性)"\n    Fetishes: \n      - "(深层性癖)"\n  Process_Preferences:\n    Foreplay: "(前戏习惯)"\n    Main_Act: "(中戏及体位偏好)"\n    Aftercare: "(事后温存)"\n\`\`\``;
    }
    
    window.executeApiRequest(promptText, baseTitle, type, `${type} (${charName})`, "", bindIdForSave);
}

// ================= 数据持久化与存盘 =================
window.syncLocalStorage = function() {
    localStorage.setItem('st_magic_maomaoyu_saved_items', JSON.stringify(window.savedItems));
    localStorage.setItem('st_magic_maomaoyu_saved_stats', JSON.stringify({savedCount: window.savedCount, todayCount: window.todayCount, totalChars: window.totalChars}));
}

window.initLoadedItems = function() {
    const storedItems = localStorage.getItem('st_magic_maomaoyu_saved_items');
    const storedStats = localStorage.getItem('st_magic_maomaoyu_saved_stats');
    if(storedStats) {
        try {
            const stats = JSON.parse(storedStats);
            window.savedCount = stats.savedCount || 0;
            window.todayCount = stats.todayCount || 0;
            window.totalChars = stats.totalChars || 0;
        } catch(e) {}
    }
    if(storedItems) {
        try {
            const items = JSON.parse(storedItems);
            const list = document.getElementById('saved-settings-list');
            items.forEach(item => {
                window.savedItems.push(item);
                const div = document.createElement('div');
                div.className = 'saved-item';
                div.id = item.id;
                div.dataset.category = item.category;
                div.dataset.title = item.title.toLowerCase();
                div.innerHTML=`
                    <div class="saved-item-header">
                        <div>
                            <div class="saved-item-title"><span class="saved-item-badge">${item.category}</span><span class="the-title">${item.title}</span></div>
                            <div class="saved-item-time">${item.time}</div>
                        </div>
                        <div class="saved-item-actions">
                            <button class="saved-item-btn edit-s" onclick="editSavedItemTitle(event, '${item.id}')" title="重命名档案"><svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>
                            <button class="saved-item-btn copy-s" onclick="copySavedItem(event, '${item.id}')" title="复制"><svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg></button>
                            <button class="saved-item-btn del-s" onclick="deleteSavedItem(event, '${item.id}')" title="删除"><svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
                        </div>
                    </div>
                    <textarea readonly onclick="this.select()">${window.escapeHtml(item.content)}</textarea>`;
                if(window.currentHeartTab !== '全部' && window.currentHeartTab !== item.category && window.currentHeartTab !== '合集卡片') div.style.display = 'none';
                list.appendChild(div);
            });
            window.updateHeartStats();
            window.checkEmptyList();
            if(window.savedItems.length > 0) {
                const badge = document.getElementById('heart-badge');
                if(badge) badge.classList.add('show');
            }
        } catch(e) {}
    }
}

window.toggleCustomSave = function() {
    const form = document.getElementById('custom-save-form');
    const btn = document.getElementById('btn-show-custom-save');
    if(form.style.display === 'none') {
        form.style.display = 'block'; btn.style.display = 'none';
    } else {
        form.style.display = 'none'; btn.style.display = 'block';
        document.getElementById('cs-title').value = '';
        document.getElementById('cs-content').value = '';
    }
}

window.submitCustomSave = function() {
    const cat = document.getElementById('cs-cat').value;
    const title = document.getElementById('cs-title').value.trim() || '未命名设定';
    const content = document.getElementById('cs-content').value.trim();
    if(!content) { window.showToast("设定内容不能为空哦！"); return; }
    window.saveToHeart(cat, title, "", content, null);
    window.showToast("自定义设定已保存入库！");
    window.toggleCustomSave();
}

window.switchHeartTab = function(category, btnEl) {
    window.currentHeartTab = category;
    document.querySelectorAll('.heart-tab').forEach(b => b.classList.remove('active'));
    if(btnEl) btnEl.classList.add('active');

    if(category === '合集卡片') {
        document.getElementById('saved-settings-list').style.display = 'none';
        document.getElementById('universe-list').style.display = 'flex';
        document.getElementById('heart-search').style.display = 'none';
        document.getElementById('heart-clear-wrap').style.display = 'none';
        document.getElementById('saved-empty-msg').style.display = 'none';
        document.getElementById('btn-show-custom-save').style.display = 'none';
        document.getElementById('custom-save-form').style.display = 'none';
        window.renderUniverseCards();
    } else {
        document.getElementById('saved-settings-list').style.display = 'block';
        document.getElementById('universe-list').style.display = 'none';
        document.getElementById('heart-search').style.display = 'block';
        document.getElementById('btn-show-custom-save').style.display = 'block';
        window.filterSaved();
    }
}

window.saveToHeart = function(category, titlePrefix, name, content, bindId = null) {
    const list=document.getElementById('saved-settings-list');
    const emptyMsg=document.getElementById('saved-empty-msg');
    if(emptyMsg) emptyMsg.style.display='none';
    document.getElementById('heart-clear-wrap').style.display='flex';

    window.savedCount++; window.todayCount++; window.totalChars+=content.length;
    const id = 'saved_'+Date.now();
    const fullTitle = name ? `${titlePrefix} - ${name}` : titlePrefix;

    window.savedItems.unshift({id, category, title: fullTitle, time:new Date().toLocaleTimeString(), content, bindId});
    window.syncLocalStorage();

    const div=document.createElement('div');
    div.className='saved-item'; div.id=id;
    div.dataset.category=category; div.dataset.title=fullTitle.toLowerCase();
    div.innerHTML=`
        <div class="saved-item-header">
            <div>
                <div class="saved-item-title"><span class="saved-item-badge">${category}</span><span class="the-title">${fullTitle}</span></div>
                <div class="saved-item-time">${new Date().toLocaleTimeString()}</div>
            </div>
            <div class="saved-item-actions">
                <button class="saved-item-btn edit-s" onclick="editSavedItemTitle(event, '${id}')" title="重命名档案"><svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>
                <button class="saved-item-btn copy-s" onclick="copySavedItem(event, '${id}')" title="复制"><svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg></button>
                <button class="saved-item-btn del-s" onclick="deleteSavedItem(event, '${id}')" title="删除"><svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
            </div>
        </div>
        <textarea readonly onclick="this.select()">${window.escapeHtml(content)}</textarea>`;
    
    if(window.currentHeartTab !== '全部' && window.currentHeartTab !== category && window.currentHeartTab !== '合集卡片') div.style.display = 'none';
    
    list.prepend(div);
    window.updateHeartStats();

    const heartBtn=document.getElementById('heart-float-btn');
    heartBtn.style.fill='var(--mc-rose)';
    const badge=document.getElementById('heart-badge'); badge.classList.add('show');
    setTimeout(()=>{heartBtn.style.animation='none'; heartBtn.style.fill=''},800);
}

window.editSavedItemTitle = function(event, id) {
    event.stopPropagation();
    const item = window.savedItems.find(s => s.id === id);
    if (!item) return;
    const newTitle = prompt("修改档案名称：", item.title);
    if (newTitle !== null && newTitle.trim() !== '') {
        item.title = newTitle.trim();
        const domItem = document.getElementById(id);
        if (domItem) {
            const titleEl = domItem.querySelector('.the-title');
            if(titleEl) titleEl.innerText = item.title;
            domItem.dataset.title = item.title.toLowerCase();
        }
        window.syncLocalStorage();
        if(window.currentHeartTab === '合集卡片') window.renderUniverseCards();
        window.showToast("名称修改成功");
    }
}

window.renderUniverseCards = function() {
    const container = document.getElementById('universe-list');
    container.innerHTML = '';
    const charas = window.savedItems.filter(s => s.category === '人设');
    if(charas.length === 0) {
        container.innerHTML = `<div class="heart-empty"><p style="color:var(--mc-text-light)">暂无角色合集，请先生成人设</p></div>`;
        return;
    }
    charas.forEach(chara => {
        const derivations = window.savedItems.filter(s => s.bindId === chara.id);
        const div = document.createElement('div');
        div.className = 'saved-item'; div.style.cursor = 'pointer'; div.style.display = 'block';
        div.onclick = () => window.openUniverseDetail(chara.id);
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px">
                <div style="font-size:1.1rem; font-weight:700; color:var(--mc-text-dark); display:flex; align-items:center; gap:8px;"><span style="font-size:1.4rem">🪐</span> ${chara.title}</div>
                <div class="saved-item-btn copy-s" style="background:var(--mc-sky-light); color:var(--mc-sky); padding: 4px 12px; border-radius: 50px; font-size:0.85rem; width:auto; height:auto; font-weight:bold;">点击展开全案</div>
            </div>
            <div style="font-size:0.85rem; color:var(--mc-text-light); line-height:1.6">
                <div>主体设定: 1 份</div>
                <div>衍生档案: ${derivations.length} 份 (包含: ${derivations.map(d=>d.category).join(', ') || '无'})</div>
            </div>`;
        container.appendChild(div);
    });
}

window.openUniverseDetail = function(id) {
    const chara = window.savedItems.find(s => s.id === id);
    if(!chara) return;
    const derivations = window.savedItems.filter(s => s.bindId === chara.id);
    let baseContent = chara.content;
    derivations.forEach(d => {
        if(d.category === '衣帽间') baseContent = baseContent.replace(/(^|\n)Attire:[\s\S]*?(?=\n[A-Z]|$)/, '$1  #[专属衣帽间] 穿搭极其丰富，详见后文衍生卷宗...');
        if(d.category === '调音室') baseContent = baseContent.replace(/(\n\s+)voice:.*/, '$1voice: "[已解锁专属调音室] 嗓音详情见后文"');
        if(d.category === '细节偏好') {
            baseContent = baseContent.replace(/(\n\s+)likes:[\s\S]*?(?=\n\s+[a-z_]+:|\n[A-Z]|$)/, '$1likes:[已解锁细节偏好，详见后文]');
            baseContent = baseContent.replace(/(\n\s+)dislikes:[\s\S]*?(?=\n\s+[a-z_]+:|\n[A-Z]|$)/, '$1dislikes:[已解锁细节偏好，详见后文]');
            baseContent = baseContent.replace(/(\n\s+)habits_and_quirks:[\s\S]*?(?=\n\s+[a-z_]+:|\n[A-Z]|$)/, '$1habits_and_quirks:[已解锁细节偏好，详见后文]');
        }
    });
    let text = `=======================================\n           【 ${chara.title} 】 全案\n=======================================\n\n[主体人设]\n${baseContent.trim()}\n\n`;
    derivations.forEach(d => { text += `---------------------------------------\n[${d.category}] ${d.title}\n${d.content}\n\n`; });
    document.getElementById('uni-title').innerText = chara.title + " 的专属宇宙";
    document.getElementById('uni-textarea').value = text;
    window.openModal('universe-modal');
}

window.copyUniverse = function() {
    const txt = document.getElementById('uni-textarea').value;
    navigator.clipboard.writeText(txt).then(()=>window.showToast('全案一键复制成功!')).catch(()=>window.showToast('复制失败'));
}

window.updateHeartStats = function() {
    let currentTotal = (window.currentHeartTab === '全部' || window.currentHeartTab === '合集卡片') ? window.savedCount : window.savedItems.filter(s => s.category === window.currentHeartTab).length;
    document.getElementById('hs-total').textContent = currentTotal;
    document.getElementById('hs-today').textContent = window.todayCount;
    document.getElementById('hs-chars').textContent = window.totalChars > 9999 ? (window.totalChars/1000).toFixed(1)+'k' : window.totalChars;
}

window.copySavedItem = function(event, id) {
    event.stopPropagation();
    const item = document.getElementById(id);
    if(!item) return;
    navigator.clipboard.writeText(item.querySelector('textarea').value).then(()=>window.showToast('复制成功!')).catch(()=>window.showToast('复制失败'));
}

window.deleteSavedItem = function(event, id) {
    event.stopPropagation();
    const item = document.getElementById(id);
    if(!item) return;
    const idx = window.savedItems.findIndex(s=>s.id===id);
    if(idx>-1){
        const sItem = window.savedItems[idx];
        window.totalChars -= sItem.content.length;
        window.savedItems.splice(idx,1);
        if(sItem.category === '人设') {
            const children = window.savedItems.filter(s => s.bindId === id);
            children.forEach(child => {
                window.totalChars -= child.content.length;
                const cDom = document.getElementById(child.id);
                if(cDom) cDom.remove();
                const cIdx = window.savedItems.findIndex(x => x.id === child.id);
                if(cIdx > -1) window.savedItems.splice(cIdx, 1);
                window.savedCount--;
            });
        }
    }
    window.syncLocalStorage();
    item.style.transition='all .4s'; item.style.opacity='0'; item.style.transform='translateX(40px)';
    setTimeout(()=>{
        item.remove(); window.savedCount--; window.updateHeartStats(); window.checkEmptyList();
        if(window.currentHeartTab === '合集卡片') window.renderUniverseCards();
    }, 400);
}

window.checkEmptyList = function() {
    const visibleCount = Array.from(document.querySelectorAll('.saved-item')).filter(el => el.style.display !== 'none').length;
    if(visibleCount === 0 && window.currentHeartTab !== '合集卡片') {
        document.getElementById('saved-empty-msg').style.display='';
        document.getElementById('heart-clear-wrap').style.display='none';
    } else if (window.currentHeartTab !== '合集卡片') {
        document.getElementById('saved-empty-msg').style.display='none';
        document.getElementById('heart-clear-wrap').style.display='flex';
    }
    if(window.savedCount === 0) document.getElementById('heart-badge').classList.remove('show');
}

window.clearAllSaved = function() {
    if(!confirm(`确定清空当前【${window.currentHeartTab}】分类下的所有设定？`))return;
    if(window.currentHeartTab === '全部') {
        document.getElementById('saved-settings-list').innerHTML='';
        window.savedCount=0; window.totalChars=0; window.savedItems.length=0;
    } else {
        for(let i=window.savedItems.length-1; i>=0; i--) {
            if(window.savedItems[i].category === window.currentHeartTab) {
                window.totalChars -= window.savedItems[i].content.length;
                const domEl = document.getElementById(window.savedItems[i].id);
                if(domEl) domEl.remove();
                if(window.savedItems[i].category === '人设') {
                   const cId = window.savedItems[i].id;
                   const children = window.savedItems.filter(s => s.bindId === cId);
                   children.forEach(child => {
                       window.totalChars -= child.content.length;
                       const cDom = document.getElementById(child.id);
                       if(cDom) cDom.remove();
                       const cIdx = window.savedItems.findIndex(x => x.id === child.id);
                       if(cIdx > -1) window.savedItems.splice(cIdx, 1);
                       window.savedCount--;
                   });
                }
                window.savedItems.splice(i, 1);
                window.savedCount--;
            }
        }
    }
    window.syncLocalStorage(); window.updateHeartStats(); window.checkEmptyList(); window.showToast('已清空');
}

window.filterSaved = function() {
    if(window.currentHeartTab === '合集卡片') return;
    const k = document.getElementById('heart-search').value.toLowerCase();
    let visibleCount = 0;
    document.querySelectorAll('#saved-settings-list .saved-item').forEach(item=>{
        const matchTab = (window.currentHeartTab === '全部' || item.dataset.category === window.currentHeartTab);
        const matchSearch = item.dataset.title.includes(k) || item.querySelector('textarea').value.toLowerCase().includes(k);
        if(matchTab && matchSearch) { item.style.display = 'block'; visibleCount++; } else { item.style.display = 'none'; }
    });
    document.getElementById('hs-total').textContent = visibleCount;
    if(visibleCount === 0) { document.getElementById('saved-empty-msg').style.display=''; document.getElementById('heart-clear-wrap').style.display='none'; } 
    else { document.getElementById('saved-empty-msg').style.display='none'; document.getElementById('heart-clear-wrap').style.display='flex'; }
}

window.copyResult = function() {
    const text = document.getElementById('result-text-area').innerText;
    if(!text) return window.showToast('还没有生成结果!');
    navigator.clipboard.writeText(text).then(()=>window.showToast('复制成功!')).catch(()=>window.showToast('复制失败'));
}

window.initExtUI = function() {
    const ck = configData.cloakroom;
    window.renderTags('ck-style-c', ck.style, false); window.renderTags('ck-hair-c', HS_COMMON, false);
    window.renderTags('ck-acc-hair-c', ck.hair, false); window.renderTags('ck-acc-neck-c', ck.neck, false);
    window.renderTags('ck-acc-ear-c', ck.ear, false); window.renderTags('ck-acc-jewel-c', ck.jewel, false);
    window.renderTags('ck-acc-ring-c', ck.ring, false); window.renderTags('ck-acc-hat-c', ck.hat, false);
    window.renderTags('ck-acc-bag-c', ck.bag, false); window.renderTags('ck-shoes-c', ck.shoes, false);
    window.renderTags('ck-mu-style-c', ck.mu_style, false); window.renderTags('ck-mu-contacts-c', ck.mu_contacts, false);
    window.renderTags('ck-mu-eye-c', ck.mu_eye, false); window.renderTags('ck-mu-blush-c', ck.mu_blush, false);
    window.renderTags('ck-mu-lip-c', ck.mu_lip, false); window.renderTags('ck-nails-c', ck.nails, false);
    window.renderTags('ck-suits-c', ck.suits, false);
    window.renderTags('ck-season-c', ck.season, true); window.renderTags('ck-count-c', ck.count, true); window.renderTags('ck-bottoms-c', ck.bottoms, true);
    
    window.renderTags('rel-type-c', configData.relatives.type, true); window.renderTags('rel-pers-c', configData.relatives.pers, false); window.renderTags('rel-att-c', configData.relatives.att, true);
    window.renderTags('pet-species-c', configData.pets.species, true); window.renderTags('pet-looks-c', configData.pets.looks, false); window.renderTags('pet-pers-c', configData.pets.pers, false);
    window.renderTags('est-type-c', configData.estate.type, true); window.renderTags('est-style-c', configData.estate.style, false); window.renderTags('est-fac-c', configData.estate.fac, false);

    window.renderTriTags('dt-food-c', configData.details.food); window.renderTriTags('dt-env-c', configData.details.env); window.renderTriTags('dt-ent-c', configData.details.ent); window.renderTriTags('dt-music-c', configData.details.music); window.renderTriTags('dt-other-c', configData.details.other);
    window.renderTags('dt-gifts-c', configData.details.gifts, false); window.renderTags('dt-skills-c', configData.details.skills, false); window.renderTags('dt-habits-c', configData.details.habits, false);

    window.renderTags('pf-body-c', configData.perfume.body, false); window.renderTags('pf-top-c', configData.perfume.top, false); window.renderTags('pf-mid-c', configData.perfume.mid, false); window.renderTags('pf-base-c', configData.perfume.base, false);

    window.renderTags('vo-texture-c', configData.voice.texture, false); window.renderTags('vo-pitch-c', configData.voice.pitch, true); window.renderTags('vo-speed-c', configData.voice.speed, true); window.renderTags('vo-tone-c', configData.voice.tone, false);
    window.renderTags('nsfw-xp-c', configData.nsfw.xp, false); window.renderTags('nsfw-pos-c', configData.nsfw.pos, false);
}

// ================= ST 插件加载入口 =================
async function loadTemplate() {
    try {
        console.log(`[st-magic-maomaoyu] 正在从路径加载 HTML: ${extensionFolderPath}/template.html`);
        const response = await fetch(`${extensionFolderPath}/template.html`);
        if (!response.ok) throw new Error(`HTML Fetch Failed: ${response.status}`);
        const html = await response.text();
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);
        
        window.createBgDecorations();
        window.initGenUI('general','g-era-c','g-bg-c','g-hc-c','g-hs-c','g-ec-c','g-looks-c','g-clo-c','g-pers-c','g-job-c');
        window.initGenUI('modern','m-era-c','m-bg-c','m-hc-c','m-hs-c','m-ec-c','m-looks-c','m-clo-c','m-pers-c','m-job-c');
        window.initGenUI('ancient','a-era-c','a-bg-c','a-hc-c','a-hs-c','a-ec-c','a-looks-c','a-clo-c','a-pers-c','a-job-c');
        window.initExtUI();
        window.initLoadedItems();
        console.log(`[st-magic-maomaoyu] UI 加载成功！`);
    } catch (e) {
        console.error(`[st-magic-maomaoyu] 加载 HTML 失败:`, e);
    }
}

window.openMagicGenerator = function() {
    const app = document.getElementById('magic_generator_app');
    if (app) app.style.display = 'block';
    else alert('专属设定魔法工坊界面未加载成功，请检查 F12 控制台报错');
}

window.closeMagicGenerator = function() {
    const app = document.getElementById('magic_generator_app');
    if (app) app.style.display = 'none';
}

document.addEventListener('click', (e) => {
    const container = e.target.closest('.gen-container');
    if(container && (e.target.closest('.tag') || e.target.closest('.custom-add-btn') || e.target.closest('.npc-del') || e.target.closest('.slider-sw') || e.target.closest('.dual-identity-btn') || e.target.closest('.pool-tag'))) {
        setTimeout(() => window.updateSummary(container), 50);
    }
});
document.addEventListener('change', (e) => {
    const container = e.target.closest('.gen-container');
    if(container && (e.target.classList.contains('npc-select') || e.target.type === 'checkbox')) {
        setTimeout(() => window.updateSummary(container), 50);
    }
});

jQuery(async () => {
    try {
        await loadTemplate();

        // 在 ST 顶部栏添加扩展按钮
        const topBarHtml = `
            <div id="magic_generator_top_button" class="menu_button extensionsMenuExtensionButton" title="专属魔法设定生成器">
                <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
        `;
        $('#extensionsMenu').prepend(topBarHtml);
        $('#magic_generator_top_button').on('click', () => {
            window.openMagicGenerator();
        });

        // 在聊天输入框旁边的“魔法棒”中添加选项
        const context = getContext();
        if (context && context.addWandOption) {
            context.addWandOption({
                name: "魔法设定生成器",
                icon: "fa-wand-magic-sparkles",
                action: () => {
                    window.openMagicGenerator();
                }
            });
        }

        // ================= 防弹级动态导入 Slash Command =================
        // 即便导入失败也不会卡死整个脚本，保证上面的顶部按钮正常出来
        try {
            const slashModule = await import('../../../slash-commands.js');
            const slashClass = await import('../../../slash-commands/SlashCommand.js');
            
            if (slashModule && slashModule.SlashCommandParser && slashClass && slashClass.SlashCommand) {
                slashModule.SlashCommandParser.addCommandObject(slashClass.SlashCommand.fromProps({
                    name: 'magic',
                    callback: () => { window.openMagicGenerator(); return ""; },
                    helpString: '打开专属魔法设定生成器',
                }));
                console.log("[st-magic-maomaoyu] /magic 指令注册成功！");
            }
        } catch (err) {
            console.warn("[st-magic-maomaoyu] 当前 ST 版本无法动态注册 /magic 指令，已跳过，请使用顶部图标唤醒:", err);
        }

        console.log(`[st-magic-maomaoyu] 插件初始化完成！`);
    } catch (err) {
        console.error(`[st-magic-maomaoyu] 插件初始化发生致命错误:`, err);
    }
});
