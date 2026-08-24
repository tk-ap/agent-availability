const $=id=>document.getElementById(id);
const status=m=>{$('status').textContent=m};
$('sync').onclick=async()=>{
  status('Reading visible page…');$('result').textContent='';
  try{
    const tabs=await chrome.tabs.query({active:true,currentWindow:true});
    const tab=tabs[0];
    if(!tab?.id)throw Error('No active tab');
    const u=new URL(tab.url||'');
    if(!/chatgpt\.com|chat\.openai\.com|cto\.new$/.test(u.hostname))throw Error('Open a supported ChatGPT or cto.new page first.');
    const data=await chrome.tabs.sendMessage(tab.id,{type:'extract-capacity'});
    if(!data)throw Error('Could not read this page. Refresh the tab and try again.');

    const payload={
      provider:data.provider,
      account:$('account').value.trim()||'Unnamed account',
      interface:$('iface').value.trim()||'Current interface',
      source:'browser',
      observedAt:data.observedAt,
      urlOrigin:data.url,
      dailyUsagePercent:data.dailyUsagePercent,
      currentAvailablePercent:data.currentAvailablePercent,
      scheduledReturnPercent:data.scheduledReturnPercent,
      futureWindows:data.futureWindows,
      matches:data.matches
    };

    $('result').textContent=JSON.stringify(payload,null,2);
    if(data.dailyUsagePercent!==null){
      status(`● ${data.dailyUsagePercent}% used · ${data.currentAvailablePercent}% available now · ${data.futureWindows.length} return windows`);
    }else if(data.matches.length){
      status(`● Captured ${data.matches.length} visible capacity signal${data.matches.length===1?'':'s'}`);
    }else{
      status('⚠ Page captured, but no recognizable capacity signal was found.');
    }

    try{
      const endpoint=$('endpoint').value.trim();
      const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if(r.ok)status('● Synced realtime capacity to Agent Control');
      else status('Captured locally; sync endpoint returned '+r.status);
    }catch(e){status('Captured locally; deploy/configure Agent Control endpoint to sync.')}
  }catch(e){status(e.message||'Sync failed')}
};
