import { extension_settings, getContext } from "../../../extensions.js";
import { characters, this_chid } from "../../../characters.js";
import { generateRaw } from "../../../generate.js";
import { SlashCommandParser } from "../../../slash-commands/SlashCommandParser.js";
import { SlashCommand } from "../../../slash-commands/SlashCommand.js";

// 扩展文件夹名称，必须和 manifest.json 里的 name 保持完全一致
const EXTENSION_NAME = "st-magic-maomaoyu"; 
const EXTENSION_PATH = `scripts/extensions/third-party/${EXTENSION_NAME}`;

// 初始化扩展设置（用于将你的设定集永久保存到酒馆的 settings.json 中）
if (!extension_settings[EXTENSION_NAME]) {
    extension_settings[EXTENSION_NAME] = { history: [], stats: {} };
}

// 打开全屏 UI 的函数
function openMagicModal() {
    if ($('#magic_persona_modal_wrapper').length > 0) return; // 避免重复打开

    const modalHtml = `
        <div id="magic_persona_modal_wrapper" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); z-index: 99999; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(5px);">
            <div style="position: relative; width: 95%; height: 95%; background: transparent; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                <!-- 关闭按钮 -->
                <div id="close_magic_modal" title="关闭工坊" style="position: absolute; top: 15px; right: 25px; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.9); display: flex; justify-content: center; align-items: center; cursor: pointer; font-size: 28px; font-weight: bold; z-index: 10000; color: #333; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: all 0.3s;">×</div>
                
                <!-- 你的 HTML 应用通过 iframe 加载 -->
                <iframe src="/${EXTENSION_PATH}/app.html" style="width: 100%; height: 100%; border: none; border-radius: 20px;"></iframe>
            </div>
        </div>
    `;
    
    $('body').append(modalHtml);

    // 关闭按钮事件
    $('#close_magic_modal').on('click', function() {
        $('#magic_persona_modal_wrapper').fadeOut(300, function() { $(this).remove(); });
    });
    
    // 关闭按钮悬停动画
    $('#close_magic_modal').hover(
        function() { $(this).css({ transform: 'scale(1.1) rotate(90deg)', background: '#F8A4B8', color: 'white' }); },
        function() { $(this).css({ transform: 'scale(1) rotate(0deg)', background: 'rgba(255,255,255,0.9)', color: '#333' }); }
    );
}

jQuery(async () => {
    // 1. 扩展面板按钮绑定 (拼图图标 🧩 里的按钮)
    $(document).on('click', '#btn_open_magic_workshop', function() {
        openMagicModal();
    });

    // 2. 注册斜杠命令 (在酒馆聊天框输入 /magicpersona 也能唤起)
    SlashCommandParser.addCommandObject(SlashCommandParser.commands.magicpersona = new SlashCommand("magicpersona",
        (args, value) => {
            openMagicModal();
            return "";
        }, [], "✨ 打开专属魔法设定生成器工坊", true, true
    ));

    // 3. 在魔法棒菜单中动态添加按钮
    const addWandButton = () => {
        if ($('#magic_wand_persona_btn').length === 0) {
            $('#chat_magic_wand_popup').append(`
                <div id="magic_wand_persona_btn" class="list-group-item flex-container flexGap5 interactable" title="生成设定、亲友、衣帽间等">
                    <span style="font-size: 1.2em;">✨</span> <span>打开人设生成器</span>
                </div>
            `);
            $('#magic_wand_persona_btn').on('click', function() {
                $('#chat_magic_wand_popup').hide(); // 点击后隐藏魔法棒菜单
                openMagicModal(); // 打开工坊
            });
        }
    };
    
    // 监听酒馆魔法棒弹窗的 DOM 变动，确保按钮被注入
    $('#chat_magic_wand_popup').on('DOMNodeInserted', addWandButton); 
    addWandButton();

    // ==========================================
    // 核心桥接：与 iframe (app.html) 进行数据交互
    // ==========================================
    window.addEventListener('message', async (event) => {
        const data = event.data;
        
        // 拦截生成请求，直接使用酒馆当前的 LLM 生成，无需配置 API Key
        if (data.type === 'MAGIC_GENERATE') {
            try {
                // generateRaw 是酒馆内置函数：(prompt, isQuiet, isSwipe)
                const result = await generateRaw(data.prompt, true, false);
                event.source.postMessage({ type: 'MAGIC_RESULT', result: result, context: data.context }, '*');
            } catch (err) {
                event.source.postMessage({ type: 'MAGIC_ERROR', error: err.toString() }, '*');
            }
        }
        
        // 读取当前酒馆聊天的角色卡，发送给前端提取设定
        if (data.type === 'MAGIC_GET_CHAR') {
            if (this_chid && characters[this_chid]) {
                event.source.postMessage({ type: 'MAGIC_CHAR_DATA', data: characters[this_chid] }, '*');
            } else {
                event.source.postMessage({ type: 'MAGIC_CHAR_DATA', data: null }, '*');
            }
        }
        
        // 接管持久化保存 (存入 extension_settings)
        if (data.type === 'MAGIC_SAVE') {
            extension_settings[EXTENSION_NAME].history = data.history;
            extension_settings[EXTENSION_NAME].stats = data.stats;
            getContext().saveSettings(); // 调用酒馆 API 保存到 settings.json
        }
        
        // 每次打开网页时，加载历史设定集
        if (data.type === 'MAGIC_LOAD') {
            event.source.postMessage({ 
                type: 'MAGIC_HISTORY_DATA', 
                history: extension_settings[EXTENSION_NAME].history || [],
                stats: extension_settings[EXTENSION_NAME].stats || {}
            }, '*');
        }
    });
});
