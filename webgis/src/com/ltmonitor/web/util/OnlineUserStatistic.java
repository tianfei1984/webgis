package com.ltmonitor.web.util;

import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * 在线用户数统计
 * @author DELL
 *
 */
public class OnlineUserStatistic {

	private static ConcurrentMap<Integer, Date> onlineMap = new ConcurrentHashMap<Integer, Date>();
	
	public static void UpdateOnlineTime(int userId)
	{
		onlineMap.put(userId, new Date());
	}
	
	public static int getOnlineUserNum()
	{
		int onlineNum = 0;
		Set<Integer> keys = onlineMap.keySet();
		Date today = new Date();
		for(Integer key : keys)
		{
			Date d = onlineMap.get(key);
			if(d != null)
			{
				double seconds = com.ltmonitor.util.DateUtil.getSeconds(d, today);
				if(seconds < 60){
					onlineNum++;
				} else {
					//如果用户已经不在线则删除记录
					onlineMap.remove(key);
				}
			}
		}
		return onlineNum;
	}

}
