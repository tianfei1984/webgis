package com.ltmonitor.web.action;

import com.ltmonitor.entity.DriverInfo;
import com.ltmonitor.entity.MemberInfo;
import com.ltmonitor.entity.Terminal;

public class MemberInfoAction extends PersistenceAction{


	protected Class getEntityClass() {
		entityClass = MemberInfo.class;
		return entityClass;
	}
}
