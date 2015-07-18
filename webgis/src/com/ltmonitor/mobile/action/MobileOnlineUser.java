package com.ltmonitor.mobile.action;

import java.util.Collection;
import java.util.HashMap;

import com.ltmonitor.entity.UserInfo;

public class MobileOnlineUser {
	
	public static HashMap<Integer,UserInfo> onlineUserMap = new HashMap<Integer,UserInfo>();
	
	public static Collection<UserInfo> getOnlineUserList()
	{
		return onlineUserMap.values();
	}

}
