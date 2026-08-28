import { getContext } from "../../../extensions.js";
import { generateRaw } from "../../../script.js"; 
import { characters } from "../../../characters.js"; 

// 自动动态探测插件路径
const extensionFolderPath = new URL('.', import.meta.url).pathname.replace(/\/$/, '');
const extensionName = "st-magic-maomaoyu";

// 接管全局变量
window.savedItems = [];
window.savedCount = 0;
window.todayCount = 0;
window.totalChars = 0;
window.currentHeartTab = '全部';

// ==========================================
// 完整词库数据
// ==========================================
const HC_COMMON=["随机","樱花粉","银白霜雪","雾霾蓝","薄荷绿","玫瑰金","亚麻灰绿","琥珀茶棕","巧克力色","黑茶色","鸦青色","冰川蓝","极光紫","晨曦微光金","暮色橘","冷灰紫","香槟金","海王红","蜜桃粉","薰衣草紫","星空蓝紫渐变","奶茶棕","原生墨黑","白茶色","流沙金","深海蓝","复古红棕","青木亚麻","冷调铂金","暖阳橘棕","枫叶红","鸢尾紫","薄藤色","砂金","焦糖色","黑莓紫","极地银灰","初雪白","珊瑚橘","人鱼姬粉","冷翠绿","蓝莓色","香草金","栗子棕","粉紫渐变","黑白阴阳染","挂耳挑染银","裙摆染粉","奶霜白","星河银","孔雀蓝","酒红色","脏橘色","浅香槟","灰蓝渐变","樱花渐变白","曜石黑","深茶紫","奶茶灰棕","极昼白","暗夜紫"];
const EC_COMMON=["随机","曜石黑","琉璃蓝","翡翠绿","琥珀金","桃花粉","星空紫","异色瞳(蓝金)","异色瞳(红绿)","极地冰蓝","暮色橘","银灰霜雪","鸽血红","深海幽蓝","浅雾灰","茶棕色","薄荷青","紫水晶色","玫瑰红","流沙金","苍青色","猫眼金绿","孔雀蓝","红宝石色","清透水蓝","暖阳金","迷雾紫","初雪白","深空黑","冷月银","星芒异色瞳","碧水绿","琉璃浅棕","幽冥深紫","极光绿","幻彩人鱼瞳","樱花浅粉","黑珍珠色","深褐色","酒红色","琥珀澄黄","冷冽灰蓝","星辰大海色","温柔奶茶棕","魅惑狐金","冰湖蓝","月光石白","冷翡翠","血泊红","空灵浅紫","晶石蓝"];
const LOOKS_COMMON=["随机","清冷破碎感","清秀佳人","骨感纤细","雌雄莫辨","眼角泪痣","高冷厌世脸","完美建模脸","异域风情","精灵尖耳","桃花眼","丹凤眼","杏眼","狐狸眼","无辜狗狗眼","瑞凤眼","唇下痣","眉间雪","唇畔梨涡","可爱酒窝","俏皮虎牙","唇红齿白","浓颜系","淡颜系","混血感","冷白皮","健康小麦色","蜜香肤色","肌肉线条流畅","人鱼线/马甲线","天鹅颈","直角肩","漫画腿","九头身黄金比例","幼态娃娃脸","成熟御姐脸","清爽少年感","甜美少女感","贵气天成","慵懒风情","浓郁书卷气","英姿飒爽","温婉可人","甜美娇俏","痞帅","斯文败类金丝","泪眼盈盈","楚楚可怜","清瘦高挑","软萌可爱","奶凶奶凶","精致如洋娃娃","冰肌玉骨","容貌绝艳","清水出芙蓉","眉目如画","面如冠玉","剑眉星目","盛世美颜","病弱西子","战损斑驳的美感","神秘毛茸茸兽耳","柔软蓬松尾巴","锁骨纹身","冷艳高贵","纯欲风脸","又纯又钓","娇憨灵动","英气逼人","性感撩人"];
const PERS_COMMON=["随机","白切黑","清冷师尊","腹黑","傲娇","万人迷","高岭之花","毒舌","禁欲系","阳光开朗","温柔体贴","善解人意","纯真善良","热情似火","冰山冷酷","沉稳内敛","睿智从容","机智狡黠","呆萌可爱","天然黑","元气满满","慵懒散漫","随遇而安","执着坚韧","外柔内刚","飒爽利落","骄傲自信","自恋狂","戏精本精","小财迷","吃货属性","顶级颜控","声控","毛绒控","极致护短","妹控/弟控","宠妻狂魔","绝对事业脑","重度恋爱脑","傲骨铮铮","悲天悯人","乐天派","完美主义","重度洁癖","社恐透明人","社交悍匪","慢热","直球克星","刀子嘴豆腐心","极度闷骚","智性恋","纯情小白花","海王收心","忠犬护卫","小狼狗","温柔奶狗","爹系男友","知心大姐姐","顶级钓系","绿茶小作精","偏执疯狂","占有欲极强","缺乏安全感","敏感多疑","患得患失","理智至上","情感绝缘体","悲观厌世","享乐主义","无私奉献","极度慕强","慕弱保护欲","假正经","随心所欲乐子人","极致双标"];

const HS_COMMON=["高马尾", "低马尾", "双马尾", "侧马尾", "泡泡辫", "鱼骨辫", "蜈蚣辫", "拳击辫", "法式麻花辫", "荷兰辫", "瀑布辫", "脏辫", "侧麻花辫", "双麻花辫", "蝴蝶结编发", "丸子头", "半扎丸子头", "大波浪卷发", "云朵卷", "麦穗卷", "黑长直", "公主切", "狼尾发型", "水母头", "鲻鱼头", "空气刘海", "八字刘海", "男士三七分", "男士微分碎盖", "男士背头", "男士寸头"];
const HS_MODERN=["随机","黑长直","大波浪","羊毛卷","法式慵懒卷","利落高马尾","温婉低扎发","双马尾","公主切","锁骨发","一刀切短发","狼尾","水母头","鲻鱼头","丸子头","半扎花苞头","木马卷","蛋卷头","空气刘海","八字刘海","漫画刘海","龙须刘海","三七分偏分","大背头","微分碎盖","纹理烫","前刺","韩系中分","凌乱日系短发","湿发造型","高位丸子头","辫子盘发","精灵编发","清爽短碎发"];
const HS_ANCIENT=["随机","及踝长发","齐腰长发","高马尾","玉冠束发","垂挂髻","飞仙髻","随性披肩发","双环望仙髻","十字髻","凌云髻","流苏编发","木簪挽发","半扎披发","两把头","编发盘发","额饰点缀束发","散发","道士头","公子半束发","高高束起的马尾","长发及腰"];

const CLO_COMMON=["随机","魔法长袍","精灵装","修女服","神官服","基础日常装","冒险者轻甲"];
const CLO_MODERN=["随机","极简冷淡风","法式慵懒风","高定晚礼服","纯欲甜美风","千禧Y2K辣妹","新中式国潮","暗黑哥特风","废土机能风","赛博朋克装","复古港风","小香风","常青藤学院风","英伦绅士装","高街潮流","运动休闲装","洛丽塔茶会裙","JK/DK制服","美式复古风","波西米亚风","轻奢名媛风","干练职场OL装","白大褂制服","机车皮衣","工装酷盖","精致西装暴徒","丝绒睡衣风","居家服","重金属摇滚装","街头滑板风","清雅森系"];
const CLO_ANCIENT=["随机","交领右衽汉服","齐胸襦裙","明制马面裙","飞鱼服","锦衣卫制服","大袖衫","道袍","粗布麻衣","广袖流仙裙","刺客夜行衣","华丽宫廷装","窄袖骑射服","狐皮大氅","素雅对襟襦裙","织金蟒袍","铠甲战袍","劲装短打","异域风情舞服","苗疆银饰服","谪仙白衣","权臣紫袍","龙袍凤袍","素色道服","太极道袍","软烟罗裙","圆领袍","百迭裙"];

const configData = {
    general: {
        era: ["随机","跟随专属羁绊","现代繁华都市","古代架空乱世","西方奇幻大陆","赛博朋克近未来","蒸汽朋克机械城","废土末世绿洲","星际科幻宇宙","修真仙侠神界","无限流副本","欧式古典宫廷","维多利亚时代","昭和复古时代","平行多元宇宙","高魔剑与魔法","低魔位面世界","星际联邦统领","诸神黄昏纪元","大航海冒险时代","时空管理局","末日伊甸园"],
        bg: ["随机","顶级财阀唯一继承人","老牌簪缨世家","豪门科技新贵","破产千金/少爷","隐世修真宗门","孤儿院摸爬滚打","星际难民幸存者","普通温馨小康","天煞孤星命格","流浪天才歌手","顶级音乐世家","书香门第清流","铁血军人世家","顶尖科研家庭","皇室流落遗孤","商业联姻牺牲品","全息网游封神者"],
        hc: HC_COMMON, hs: HS_COMMON, ec: EC_COMMON, looks: LOOKS_COMMON, clo: CLO_COMMON, pers: PERS_COMMON,
        job: ["随机","霸道总裁","娱乐圈断层顶流","三金影帝/影后","红圈金牌律师","神外顶尖医师","排行榜第一黑客","电竞世界冠军","全能ACE练习生","首席法医","刑侦大队长","犯罪心理学教授","华尔街投行精英","知名鬼才导演","千万粉UP主","星际宇航员","魔法禁卫军首领"]
    },
    modern: {
        era: ["随机","跟随专属羁绊","顶级贵族私立学院","省重点全封闭高中","百年底蕴顶尖学府","硅谷高新科创园区","纸醉金迷不夜城","赛博朋克初显近未来","繁华一线都市CBD","宁静惬意大学城","国际顶尖艺术学院","偏远支教大山区","浪漫海滨旅游城市","旧工厂改造创意园","世界级电子竞技基地","顶流娱乐公司大楼","市中心高级律所"],
        bg: ["随机","京圈红墙大院子弟","跨国顶级财阀","互联网豪门新贵","真假千金/少爷纠葛","百年演艺世家","书香门第清流","小镇做题家逆袭","包租公/婆收租大户","煤老板低调二代","世代外交官家族","老牌军政世家","国内顶尖医学世家","一夜暴富暴发户","孤儿院奋斗逆袭"],
        hc: HC_COMMON, hs: HS_MODERN, ec: EC_COMMON, looks: LOOKS_COMMON, clo: CLO_MODERN, pers: PERS_COMMON,
        job: ["随机","霸道冷面总裁","娱乐圈断层顶流","三金影帝/影后","红圈金牌律师","神外顶尖主治医师","红客联盟天才黑客","电竞全明星大魔王","全能ACE练习生","市局首席法医","重案组刑警队长","犯罪心理学权威专家","华尔街投行精英","风投圈神话大佬","时尚界顶级超模","国际米其林三星大厨"]
    },
    ancient: {
        era: ["随机","跟随专属羁绊","隐世修真第一大宗门","九重天神界凌霄殿","幽冥忘川黄泉路","波谲云诡权谋朝堂","凡人修仙底层坊市","万国来朝盛世大唐","烟雨朦胧江南水乡","大漠孤烟铁血边关","诸侯割据烽火乱世","魏晋风骨名士时代","女尊帝国繁华皇都","仙魔交界无底深渊","十万大山妖族领地","昆仑瑶池缥缈仙境"],
        bg: ["随机","九五之尊皇室正统","没落前朝遗孤血脉","权倾朝野簪缨世家","剑宗掌门独生子/女","天生无暇剔透剑骨","镇国大将军之骄女","一手遮天丞相府嫡女/子","备受欺凌不受宠庶出","被掉包流落民间真千金/少爷","替嫁受辱新娘/郎","满门抄斩罪臣之后","隐世绝顶高人关门弟子"],
        hc: HC_COMMON, hs: HS_ANCIENT, ec: EC_COMMON, looks: LOOKS_COMMON, clo: CLO_ANCIENT, pers: PERS_COMMON,
        job: ["随机","剑尊","掌门","魔尊","摄政王","皇帝","女帝","锦衣卫","神捕","医师","琴师","将军","质子","公主/皇子","国师","世家千金"]
    }
};

// ==========================================
// 存储与读取
// ==========================================
async function loadSettings() {
    try {
        const context = getContext();
        const settings = context.extension_settings[extensionName] || {};
        window.savedItems = settings.savedItems || [];
        window.savedCount = settings.savedCount || 0;
        window.todayCount = settings.todayCount || 0;
        window.totalChars = settings.totalChars || 0;
    } catch(e) {}
}

function saveSettings() {
    try {
        const context = getContext();
        context.extension_settings[extensionName] = {
            savedItems: window.savedItems,
            savedCount: window.savedCount,
            todayCount: window.todayCount,
            totalChars: window.totalChars
        };
        if (typeof context.saveSettings === 'function') context.saveSettings();
    } catch(e) {}
}

window.syncLocalStorage = saveSettings;

// ==========================================
// 数据读取与生成
// ==========================================
function populateSillyTavernPresets() {
    const presetSelect = document.getElementById('global-prompt-preset');
    if (!presetSelect) return;
    presetSelect.innerHTML = ''; 
    if (window.instruct_presets && window.settings) {
        const currentPreset = window.settings.instruct_preset;
        for (const presetName of Object.keys(window.instruct_presets)) {
            const opt = document.createElement('option');
            opt.value = presetName;
            if (presetName === currentPreset) {
                opt.textContent = `✅ [当前使用中] ${presetName}`;
                opt.selected = true;
            } else {
                opt.textContent = presetName;
            }
            presetSelect.appendChild(opt);
        }
    } else {
        presetSelect.innerHTML = '<option value="">⚠️ 无法读取预设，使用默认设置</option>';
    }
}

function populateStCharacterSelect() {
    const charSelect = document.getElementById('st-char-select');
    if (!charSelect) return;
    charSelect.innerHTML = '<option value="">请选择要关联的角色...</option>';
    const charList = characters || []; 
    if (charList.length === 0) {
        charSelect.innerHTML = '<option value="">⚠️ 暂无可用角色卡</option>';
        return;
    }
    charList.forEach((char, index) => {
        const opt = document.createElement('option');
        opt.value = index; 
        opt.textContent = char.name;
        charSelect.appendChild(opt);
    });
}

function bindGlobalSettingsEvents() {
    const toggleBtn = document.getElementById('toggle-link-st-char');
    const charContainer = document.getElementById('st-char-select-container');
    if (toggleBtn && charContainer) {
        toggleBtn.addEventListener('change', (e) => {
            charContainer.style.display = e.target.checked ? 'block' : 'none';
            if(e.target.checked) populateStCharacterSelect();
        });
    }
}

window.executeApiRequest = async function(promptText, titleText, saveCategory, saveTitlePrefix, saveName) {
    const magicOverlay = document.getElementById('magic-overlay');
    const resultCard = document.getElementById('result-card');
    const resultTextArea = document.getElementById('result-text-area');
    document.getElementById('result-title-text').innerHTML = titleText;
    
    magicOverlay.style.display = 'flex';
    resultCard.classList.add('hidden');
    resultTextArea.innerHTML = '';

    const presetSelect = document.getElementById('global-prompt-preset');
    const selectedPreset = presetSelect ? presetSelect.value : null;
    let originalPreset = null;

    if (selectedPreset && window.settings && window.settings.instruct_preset !== selectedPreset) {
        originalPreset = window.settings.instruct_preset;
        window.settings.instruct_preset = selectedPreset; 
    }

    try {
        const responseText = await generateRaw(promptText, true); 
        let fullText = responseText.replace(/^```yaml/im, '').replace(/```$/m, '').trim();
        
        magicOverlay.style.display = 'none';
        resultCard.classList.remove('hidden');
        resultTextArea.innerText = fullText;
        window.showToast('魔法档案渲染完成!');
        window.saveToHeart(saveCategory, saveTitlePrefix, saveName, fullText, null);
    } catch (error) {
        magicOverlay.style.display = 'none';
        resultCard.classList.remove('hidden');
        resultTextArea.innerHTML = `<span style="color:var(--mc-coral)">生成失败: ${error.message}</span>`;
    } finally {
        if (originalPreset !== null && window.settings) {
            window.settings.instruct_preset = originalPreset; 
        }
    }
}

window.generatePersona = async function(type) {
    const prefix = type === 'general' ? 'g' : type === 'modern' ? 'm' : 'a';
    
    let stCharContext = "";
    const isLinkChecked = document.getElementById('toggle-link-st-char')?.checked;
    const selectedCharIndex = document.getElementById('st-char-select')?.value;
    if (isLinkChecked && selectedCharIndex !== "" && characters[selectedCharIndex]) {
        const targetChar = characters[selectedCharIndex];
        stCharContext = `
【深度关联酒馆角色卡指令】：
本次生成的人设，必须是与以下角色产生极强化学反应和深厚羁绊的存在！
目标角色姓名：${targetChar.name}
目标角色性格：${targetChar.personality || "未知"}
目标角色核心设定：${targetChar.description || "未知"}
请在下文的【Background】和【Relationships】部分，详细交代本次生成的角色与 ${targetChar.name} 是如何相识的，有怎样的爱恨情仇或宿命羁绊！绝对不能无视这条规则！
`;
    }

    const summaryTextarea = document.getElementById(`summary-gen-${type}`);
    const userSummary = summaryTextarea ? summaryTextarea.value.trim() : "";
    const wordCount = document.getElementById(`${prefix}-wordcount`) ? document.getElementById(`${prefix}-wordcount`).value : "1500";
    const nameVal = document.getElementById(`${prefix}-name`) ? document.getElementById(`${prefix}-name`).value : "";
    const finalNamePrompt = nameVal === '' ? '(由AI根据背景起名)' : `【名字：绝对必须是 ${nameVal}】`;

    let promptText = `请你作为一名拥有神级文笔的大神作家，为我生成一份角色设定。
【字数警告】：严格遵循大约 ${wordCount} 字的内容输出！
${stCharContext}

【最高强制指令】：本次生成【必须且只能】以《用户已选标签汇总》里的内容为唯一核心基准！
【用户已选标签汇总】：
${userSummary || "(用户未点选标签，请随机发散)"}

请严格输出为合法的 YAML 格式。
\`\`\`yaml
Basic_Info:
  name: "${finalNamePrompt}"
  age: "(推断年龄)"
  gender: "(推断性别)"
  identity_and_occupation:
    - "(严格依照标签里的职业扩写)"
  era_background: "(严格依照时代/主舞台背景扩写)"
Physical_Appearance:
  overall_vibe: "(气质总览)"
  face_and_features: "(依照标签外貌特征/瞳色扩写)"
  hair: "(依照标签发色/发型扩写)"
Attire:
  style_preference: "(依照穿搭风格扩写)"
Personality:
  core_traits: "(依照标签里的性格特征极尽扩写)"
  likes:
    - "(喜欢)"
  dislikes:
    - "(厌恶)"
Background:
  origin_family: "(依照标签里的原生家庭/出身扩写)"
  past_experience:
    - "(生平过往详细经历)"
Relationships:
  core_bonds: "(详细交代与其他人的核心社交关系，若有关联角色则必须重点写明)"
Capabilities:
  skills: "(技能/特长，若无则不写)"
\`\`\``;

    const titlePrefix = type==='general'?'通用档案':type==='modern'?'现代档案':'古风卷宗';
    const finalTitlePrefix = (isLinkChecked && stCharContext) ? `✨${titlePrefix}(羁绊版)` : titlePrefix;
    window.executeApiRequest(promptText, "专属设定魔法卷宗", "人设", finalTitlePrefix, nameVal || "未命名");
};

// ==========================================
// 辅助与 UI 函数
// ==========================================
window.showToast = function(msg){ const t = document.getElementById('toast'); if(t){ t.innerText = msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'), 3200); } }
window.goBack = function(){ document.querySelectorAll('.gen-container').forEach(el=>el.classList.add('hidden')); document.getElementById('menu-screen').classList.remove('hidden'); }
window.openGen = function(id){ document.getElementById('menu-screen').classList.add('hidden'); document.getElementById('result-card').classList.add('hidden'); document.getElementById(id).classList.remove('hidden'); }
window.openModal = function(id){ document.getElementById(id).style.display = 'flex'; }
window.closeModal = function(id){ document.getElementById(id).style.display = 'none'; }
window.copyResult = function(){ navigator.clipboard.writeText(document.getElementById('result-text-area').innerText).then(()=>window.showToast('复制成功!')); }

window.addCustomTag = function(btn, isRadio=false) {
    const input = btn.previousElementSibling; const val = input.value.trim();
    if(val) {
        const container = btn.closest('.tags-container');
        if(isRadio) Array.from(container.querySelectorAll('.tag')).forEach(t=>t.classList.remove('selected'));
        const tag = document.createElement('div'); tag.className = 'tag selected'; tag.innerText = val;
        tag.onclick = function() {
            if(isRadio) Array.from(container.querySelectorAll('.tag')).forEach(t=>t.classList.remove('selected'));
            this.classList.toggle('selected');
            updateSummary(container.closest('.gen-container'));
        };
        container.insertBefore(tag, btn.closest('.custom-input-group')); input.value = ''; window.showToast(`已添加：${val}`);
        updateSummary(container.closest('.gen-container'));
    }
}

function updateSummary(container) {
    if (!container) return;
    const summaryId = "summary-" + container.id;
    const textArea = document.getElementById(summaryId);
    if (!textArea) return;
    let summaryText = [];
    const tagsContainers = container.querySelectorAll('.tags-container');
    tagsContainers.forEach(tc => {
        let titleEl = tc.closest('details').querySelector('summary span');
        if(!titleEl) return;
        let title = titleEl.innerText;
        let selected = Array.from(tc.querySelectorAll('.tag.selected')).map(t => t.innerText);
        if(selected.length > 0) summaryText.push(`【${title}】：${selected.join('，')}`);
    });
    textArea.value = summaryText.join('\n');
}

function renderTags(containerId, dataArray, isRadio){
    const container = document.getElementById(containerId); if(!container) return;
    const inputGroup = container.querySelector('.custom-input-group');
    dataArray.forEach((text, index) => {
        const div = document.createElement('div');
        div.className = `tag ${index===0 && isRadio ? 'selected' : ''}`; div.innerText = text;
        div.onclick = function(){
            if(isRadio) Array.from(container.querySelectorAll('.tag')).forEach(t=>t.classList.remove('selected'));
            this.classList.toggle('selected');
            updateSummary(container.closest('.gen-container'));
        };
        container.insertBefore(div, inputGroup);
    });
}

function initGenUI(){
    renderTags('g-era-c', configData.general.era, true); renderTags('g-bg-c', configData.general.bg, false);
    renderTags('g-hc-c', configData.general.hc, true); renderTags('g-hs-c', configData.general.hs, true);
    renderTags('g-ec-c', configData.general.ec, true); renderTags('g-looks-c', configData.general.looks, false);
    renderTags('g-clo-c', configData.general.clo, false); renderTags('g-pers-c', configData.general.pers, false); 
    renderTags('g-job-c', configData.general.job, false);
    
    renderTags('m-era-c', configData.modern.era, true); renderTags('m-bg-c', configData.modern.bg, false);
    renderTags('m-hc-c', configData.modern.hc, true); renderTags('m-hs-c', configData.modern.hs, true);
    renderTags('m-ec-c', configData.modern.ec, true); renderTags('m-looks-c', configData.modern.looks, false);
    renderTags('m-clo-c', configData.modern.clo, false); renderTags('m-pers-c', configData.modern.pers, false); 
    renderTags('m-job-c', configData.modern.job, false);
    
    renderTags('a-era-c', configData.ancient.era, true); renderTags('a-bg-c', configData.ancient.bg, false);
    renderTags('a-hc-c', configData.ancient.hc, true); renderTags('a-hs-c', configData.ancient.hs, true);
    renderTags('a-ec-c', configData.ancient.ec, true); renderTags('a-looks-c', configData.ancient.looks, false);
    renderTags('a-clo-c', configData.ancient.clo, false); renderTags('a-pers-c', configData.ancient.pers, false); 
    renderTags('a-job-c', configData.ancient.job, false);
}

// ==========================================
// 设定集逻辑
// ==========================================
window.saveToHeart = function(category, titlePrefix, name, content, bindId) {
    const list = document.getElementById('saved-settings-list');
    const emptyMsg = document.getElementById('saved-empty-msg');
    if(emptyMsg) emptyMsg.style.display='none';
    const id = 'saved_'+Date.now();
    const fullTitle = name ? `${titlePrefix} - ${name}` : titlePrefix;
    window.savedCount++; window.totalChars+=content.length;
    window.savedItems.unshift({id, category, title: fullTitle, time: new Date().toLocaleTimeString(), content});
    window.syncLocalStorage();
    renderSavedList();
}

window.clearAllSaved = function() {
    if(confirm("确定清空所有存档吗？")) {
        window.savedItems = []; window.savedCount = 0; window.totalChars = 0;
        window.syncLocalStorage(); renderSavedList();
    }
}

function renderSavedList() {
    const list = document.getElementById('saved-settings-list');
    if(!list) return;
    list.innerHTML = '';
    const totalEl = document.getElementById('hs-total');
    const charsEl = document.getElementById('hs-chars');
    if(totalEl) totalEl.innerText = window.savedCount;
    if(charsEl) charsEl.innerText = window.totalChars;
    const emptyMsg = document.getElementById('saved-empty-msg');
    if(window.savedItems.length === 0) { if(emptyMsg) emptyMsg.style.display = 'block'; return; }
    
    window.savedItems.forEach(item => {
        const div = document.createElement('div');
        div.style.cssText = "background:white; border:2px solid rgba(160,210,240,0.2); padding:18px; border-radius:20px; margin-bottom:16px;";
        div.innerHTML = `
            <div style="font-weight:bold; margin-bottom:10px; color:var(--mc-text-dark);">[${item.category}] ${item.title} - <span style="color:var(--mc-text-light);font-size:0.8rem">${item.time}</span></div>
            <textarea readonly style="width:100%; height:100px; border:1px solid #ddd; border-radius:8px; padding:10px; font-size:0.85rem; color:var(--mc-text);">${item.content}</textarea>
        `;
        list.appendChild(div);
    });
}

// ==========================================
// 插件初始化 (安全巡检机制 + 菜单注入)
// ==========================================
async function setupExtension() {
    try {
        await loadSettings();

        // 加载前端界面
        const htmlResponse = await fetch(`${extensionFolderPath}/template.html`);
        const htmlText = await htmlResponse.text();
        
        const container = document.createElement('div');
        container.id = "magic-persona-plugin-container";
        container.style.cssText = "display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:99999; overflow-y:auto; background:var(--mc-grad-main);";
        container.innerHTML = htmlText;
        document.body.appendChild(container);

        const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = `${extensionFolderPath}/style.css`;
        document.head.appendChild(link);

        const closeAppBtn = document.createElement('div');
        closeAppBtn.innerHTML = "❌ 退出魔法工坊";
        closeAppBtn.style.cssText = "position:fixed; top:20px; left:20px; z-index:100000; cursor:pointer; background:rgba(255,255,255,0.9); padding:10px 20px; border-radius:30px; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.2); color:var(--mc-text-dark);";
        closeAppBtn.addEventListener('click', () => container.style.display = 'none');
        container.appendChild(closeAppBtn);

        initGenUI();
        setTimeout(() => bindGlobalSettingsEvents(), 500);

        // 打开工坊的动作
        const openApp = () => {
            container.style.display = 'block';
            renderSavedList();
            populateSillyTavernPresets();
            populateStCharacterSelect();
            // 收起原生弹窗
            if(window.$) {
                $('#extensions_popup, #chat_more_menu, #send_more_menu').hide();
            }
        };

        // 智能定时器：不断寻找酒馆的菜单DOM，找到为止
        if(window.$) {
            let injectAttempts = 0;
            const injectInterval = setInterval(() => {
                injectAttempts++;
                if (injectAttempts > 60) clearInterval(injectInterval); // 防止无限空转

                // 1. 注入扩展管理面板 (置顶插入)
                const extSettings = $('#extensions_settings');
                if (extSettings.length > 0 && $('#btn-open-magic-persona-ext').length === 0) {
                    const drawerHtml = `
                    <div class="inline-drawer">
                        <div class="inline-drawer-toggle inline-drawer-header">
                            <b>✨ 专属魔法设定工坊</b>
                            <div class="inline-drawer-icon fa-solid fa-chevron-down down"></div>
                        </div>
                        <div class="inline-drawer-content" style="display: none;">
                            <div style="padding: 15px; display: flex; justify-content: center;">
                                <div id="btn-open-magic-persona-ext" class="menu_button interactable" style="padding: 10px 20px; border-radius: 8px;">
                                    <i class="fa-solid fa-wand-magic-sparkles"></i> <span>点击打开工坊界面</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    extSettings.prepend(drawerHtml); // Prepend 保证在最上头
                    
                    $('#btn-open-magic-persona-ext').on('click', openApp);
                    extSettings.find('.inline-drawer-toggle').first().on('click', function() {
                        const content = $(this).next('.inline-drawer-content');
                        const icon = $(this).find('.inline-drawer-icon');
                        content.slideToggle(200);
                        icon.toggleClass('down up fa-chevron-down fa-chevron-up');
                    });
                }

                // 2. 注入聊天底部的魔法棒弹出菜单 (支持多个常见ID)
                const wandMenu = $('#extensions_popup, #chat_more_menu, #send_more_menu, #extensions_menu').last();
                if (wandMenu.length > 0 && $('#btn-open-magic-persona-menu').length === 0) {
                    const menuBtnHtml = `
                    <div id="btn-open-magic-persona-menu" class="list-group-item menu_button interactable" title="魔法人设工坊">
                        <div class="menu_button_icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div class="menu_button_text">魔法人设工坊</div>
                    </div>`;
                    
                    if (wandMenu.find('.list-group').length) {
                        wandMenu.find('.list-group').append(menuBtnHtml);
                    } else {
                        wandMenu.append(menuBtnHtml);
                    }
                    
                    $(document).on('click', '#btn-open-magic-persona-menu', openApp);
                }

                // 只要两个入口都找到了，就停止巡检
                if ($('#btn-open-magic-persona-ext').length > 0 && $('#btn-open-magic-persona-menu').length > 0) {
                    clearInterval(injectInterval);
                }

            }, 1000); // 每 1 秒检测一次
        }

    } catch(err) {
        console.error("[魔法人设工坊] 启动失败:", err);
    }
}

// 启动
setupExtension();
