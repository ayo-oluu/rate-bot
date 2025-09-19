const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

console.log('🔍 Debug: Checking environment variables...');
console.log('BOT_TOKEN exists:', !!process.env.BOT_TOKEN);
console.log('BOT_TOKEN length:', process.env.BOT_TOKEN ? process.env.BOT_TOKEN.length : 0);
console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('BOT') || key.includes('TOKEN')));

if (!process.env.BOT_TOKEN) {
  console.error('❌ BOT_TOKEN is required! Please set it in your .env file');
  console.error('Available environment variables:', Object.keys(process.env));
  console.error('Make sure to set BOT_TOKEN in Railway dashboard under Variables tab');
  process.exit(1);
}

console.log('✅ BOT_TOKEN found, initializing bot...');
const bot = new Telegraf(process.env.BOT_TOKEN);

const CONTRACT = "2wQ7b9uNdP7EUsKXguZqdD1PmrtBkoKwPCKySNMmpump";
const CHART = "https://www.dextools.io/app/en/solana/pair-explorer/HMkm7wCrhsPK8cX9F7SmEYQrTQcJZmjiG7ceysZDLgiu?t=1758312203818";
const WEBSITE = "https://www.ratecoinpump.fun/";
const WHITEPAPER = "https://www.ratecoinpump.fun/$RATE_Whitepaper.pdf";
const BURN = "https://solscan.io/tx/4ukaGKtFvSxmCL1h9kyLZ9rFU5GhFRgeQR8mGD2fwhA6JHBbbCc5Ex5NbC6piyxDepKmJao2gShKZvJ4nTbTuUFA";
const BURNSCHEDULE = "https://app.streamflow.finance/contract/solana/mainnet/96ciB9sb3SusoiHN5fMHKhjcHYsUHBX1fUMLi4FAMHCi";

function buttons() {
  return Markup.inlineKeyboard([
    [Markup.button.url("Buy $RATE", "https://jup.ag/tokens/2wQ7b9uNdP7EUsKXguZqdD1PmrtBkoKwPCKySNMmpump")]
  ]);
}

const lastUse = new Map();
function okToReply(userId, ms = 2000) {
  const now = Date.now();
  if (lastUse.has(userId) && now - lastUse.get(userId) < ms) return false;
  lastUse.set(userId, now);
  return true;
}

bot.command(["ca", "contract"], async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.sendChatAction("typing");
  const message = `<b>Contract address</b>\n<code>${CONTRACT}</code>\n\nTap to copy this address to your clipboard.\nYou don't want to be that guy pasting the wrong contract and crying on X.`;
  const msg = await ctx.reply(message, { parse_mode: "HTML", ...buttons() });
  return msg;
});

bot.command("chart", async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.sendChatAction("typing");
  const message = `<b>Chart</b>\n\n${CHART}\n\nTrack $RATE price, volume, and activity in real-time.\nWarning: staring too long may cause hopium overdose.`;
  const msg = await ctx.reply(message, { parse_mode: "HTML", ...buttons() });
  return msg;
});

bot.command("website", async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.sendChatAction("typing");
  const message = `<b>Website</b>\n\n${WEBSITE}\n\nDiscover everything about RateCoin.\nBasically our digital house — wipe your feet before entering.`;
  try {
    // Try to send with OG image first
    const msg = await ctx.replyWithPhoto("https://www.ratecoinpump.fun/og-image.png?v=2", {
      caption: message,
      parse_mode: "HTML",
      ...buttons()
    });
    return msg;
  } catch (error) {
    // Fallback to text message if image fails
    const msg = await ctx.reply(message, { parse_mode: "HTML", ...buttons() });
    return msg;
  }
});

bot.command("whitepaper", async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.sendChatAction("typing");
  const message = `<b>Whitepaper</b>\n\n${WHITEPAPER}\n\nDive deeper into the vision, and mechanics.\nLitepaper...if we're being fr`;
  const msg = await ctx.reply(message, { parse_mode: "HTML", ...buttons() });
  return msg;
});

bot.command("burn", async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.sendChatAction("typing");
  const message = `<b>Burn transaction</b>\n\n${BURN}\n\nCheck out the latest burn.\nJerome Powell could never.`;
  const msg = await ctx.reply(message, { parse_mode: "HTML", ...buttons() });
  return msg;
});

bot.command("burnschedule", async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.sendChatAction("typing");
  const message = `<b>Burn schedule</b>\n\n${BURNSCHEDULE}\n\nSee the timeline for future burns and commitments.\nLike a gym routine, except we're burning tokens not calories.`;
  const msg = await ctx.reply(message, { parse_mode: "HTML", ...buttons() });
  return msg;
});

bot.command(["help", "start"], async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.sendChatAction("typing");
  const helpMessage = `<b>🚀 Rate Bot Commands</b>

<b>📋 Available Commands:</b>
• <code>/ca</code> or <code>/contract</code> - Get contract address
• <code>/chart</code> - View price chart
• <code>/website</code> - Visit official website
• <code>/whitepaper</code> - Read whitepaper
• <code>/burn</code> - View burn transaction
• <code>/burnschedule</code> - Check burn schedule
• <code>/help</code> - Show this help message`;
  
  const msg = await ctx.reply(helpMessage, { 
    parse_mode: "HTML", 
    ...buttons() 
  });
  return msg;
});

bot.command("test", async ctx => {
  if (!okToReply(ctx.from.id)) return;
  await ctx.reply("✅ Bot is working! Command suggestions should appear when you type '/'");
});

bot.launch();

// Set bot commands after launch with retry
const setCommands = async () => {
  try {
    await bot.telegram.setMyCommands([
      { command: 'ca', description: 'Get contract address' },
      { command: 'contract', description: 'Get contract address' },
      { command: 'chart', description: 'View price chart' },
      { command: 'website', description: 'Visit official website' },
      { command: 'whitepaper', description: 'Read whitepaper' },
      { command: 'burn', description: 'View burn transaction' },
      { command: 'burnschedule', description: 'Check burn schedule' },
      { command: 'help', description: 'Show all commands' }
    ]);
    console.log('✅ Bot commands set successfully');
    
    // Verify commands were set
    const commands = await bot.telegram.getMyCommands();
    console.log('📋 Current bot commands:', commands);
  } catch (error) {
    console.error('❌ Error setting bot commands:', error);
  }
};

// Try immediately and also after a delay
setCommands();
setTimeout(setCommands, 3000);
