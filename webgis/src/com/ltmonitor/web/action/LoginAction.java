package com.ltmonitor.web.action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import com.common.util.StringUtil;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.FuncModel;
import com.ltmonitor.entity.OperationLog;
import com.ltmonitor.entity.Role;
import com.ltmonitor.entity.SystemConfig;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.util.DateUtil;

public class LoginAction extends GenericAction {

	private static final long serialVersionUID = -2574252247068423156L;
	private String username;
	private String password;
	private String randomCode;
	// private Role role;
	List<FuncModel> authorizedFuncs = new ArrayList<FuncModel>();

	/**
	 * 用户登录					
	 * @return
	 */
	public String login() {
		/**
		 * if (!checkIp()) { saveMessage(getText("randomCode.required")); return
		 * "input"; }
		 */
		String sessRandomCode = (String) getSession().get("randomCode");

		if (StringUtil.isEmpty(this.username)) {
			setMessage("用户名不能为空");
			return "input";
		}
		if (this.password == null) {
			setMessage("密码不能为空");
			return "input";
		}
		//加载系统配置
		SystemConfig sc = (SystemConfig) this.getBaseService().load(
				SystemConfig.class, 1);
		//是否检测验证码
		if ("yes".equals(sc.getCheckValidateCode())) {

			if (StringUtil.isEmpty(this.randomCode)) {
				setMessage("验证码不能为空");
				return "input";
			}
			if (!this.randomCode.equals(sessRandomCode)) {
				setMessage("验证码不正确");
				return "input";
			}
		}
		try {
			String hsql = "from UserInfo where loginName = ? and userState <> ? and deleted = ?";

			UserInfo user = (UserInfo) this.getBaseService().find(hsql,
					new Object[] { username, UserInfo.STATE_SUSPEND, false });

			if (user == null) {
				setMessage("用户名或密码错误");
				this.log.info(this.username + " login fail");
				return "input";
			}
			String userpassword = null;

			userpassword = user.getPassword();

			if (!userpassword.equalsIgnoreCase(this.password)) {
				setMessage("用户名或密码不正确");
				return "input";
			} else if (UserInfo.STATE_NORMAL.equals(user.getUserState()) == false) {
				setMessage("该账户已被停用");
				return "input";
			}

			user.setLoginTime(new Date());
			// user.setUserType(this.userType);
			String hostName = getRequest().getRemoteHost();
			this.log.debug("hostip:" + hostName);
			user.setIp(hostName);
			if (user.getRoles().size() < 1) {
				Role role = new Role();
				role.setName("ROLE_ADMIN");
				user.getRoles().add(role);
			}
			super.setOnlineUser(user);
			super.setAuthorizedDep(user);

			Cookie cookie = new Cookie("w2qrs3t8ab3",
					StringUtil.encodePassword(user.getName(), "md5"));

			String contextPath = getRequest().getContextPath();
			cookie.setPath((contextPath != null) && (contextPath.length() > 0) ? contextPath
					: "/");
			
			this.LogOperation("登录");
		} catch (Exception e) {
			this.log.error("", e);
			this.setMessage("登录时发生错误");
			return "input";
		}

		return "success";
	}

	public void setMapInfo() {
		UserInfo user = getOnlineUser();
		if (user != null) {

			SystemConfig sc = (SystemConfig) this.getBaseService().load(
					SystemConfig.class, 1);
			if (StringUtil.isEmpty(user.getMapType())) {
				user.setMapType(sc.getMapType());
			}
			//用户显示信息
			Map<String, Comparable> userInfoMap = new HashMap<String, Comparable>();
			JSONObject jsonObject = new JSONObject();
			userInfoMap.put("id", user.getEntityId());
			userInfoMap.put("name", user.getName());
			userInfoMap.put("mapType", user.getMapType());
			userInfoMap.put("mapCenterLat", user.getMapCenterLat());
			if (user.getMapCenterLat() <= 0 || user.getMapCenterLng() <= 0
					|| user.getMapLevel() <= 0) {
				// sc.setInitZoomLevel(user.getMapLevel());
				user.setMapCenterLat(sc.getInitLat());
				user.setMapCenterLng(sc.getInitLng());
				user.setMapLevel(sc.getInitZoomLevel());
			}
			userInfoMap.put("mapCenterLng", user.getMapCenterLng());
			userInfoMap.put("mapCenterLat", user.getMapCenterLat());
			userInfoMap.put("mapLevel", user.getMapLevel());
			String strLoginTime = DateUtil.datetimeToString(user.getLoginTime());
			userInfoMap.put("loginTime", strLoginTime);

			if (user.getRoles().size() < 1) {
				Role role = new Role();
				// role.setDescription(getText("administrator"));
				role.setName("ROLE_ADMIN");
				user.getRoles().add(role);
			}
			Role r = user.getRole();
			if (r != null)
				userInfoMap.put("roleName", r.getName());

			// JSONArray roleArray = JSONArray.fromObject(user.getRoles(),
			// this.jsonConfig);
			//系统参数
			getSession().put(SESSION_KEY_SYSTEM_CONFIG, sc);

			// jsonObject.put("onlineUser", userInfoMap);
			getSession().put("onlineUserInfo",JSONObject.fromObject(userInfoMap));

		} else {
		}
	}

	public String main() {
		UserInfo user = this.getOnlineUser();
		if (user == null)
			return "input";
		//查询当前用户权限
		authorizedFuncs = new ArrayList<FuncModel>();
		if (user.getUserFlag() == UserInfo.USER_FLAG_SUPER_ADMIN) {
			// 如果是超级用户，将加所有权限,可以分配所有管理部门
			authorizedFuncs = this.getBaseService().loadAll(FuncModel.class);
		} else {
			Role r = user.getRole();
			if (r != null) {
				authorizedFuncs.addAll(r.getFuncs());
			}
		}

		Map<String, FuncModel> funcMap = new HashMap<String, FuncModel>();
		for (FuncModel f : authorizedFuncs) {
			if (!StringUtil.isEmpty(f.getFuncName())) {
				funcMap.put(f.getFuncName(), f);
			}
		}

		Collections.sort(this.authorizedFuncs, new SysFuncComparator());

		// 将功能权限数据以map的形式存放在session中，便于判断用户是否有某个功能的权限
		getSession().put(SESSION_KEY_FUNCTION_MAP, funcMap);

		// 前端功能权限
		String webFunc = this.convertFuncsToMenu(this.authorizedFuncs, FuncModel.FUNC_TYPE_WEB_FUNC);
		getSession().put(SESSION_WEB_FUNC, webFunc);

		// 根据用户分配的角色权限，得到系统顶部的主菜单，并生成菜单树在前台展现
		// 地图工具栏菜单权限
		String mapToolMenu = this.convertFuncsToMenu(this.authorizedFuncs,FuncModel.FUNC_TYPE_MAP_TOOL);
		getSession().put(SESSION_MAP_TOOL_MENU, mapToolMenu);

		// 终端命令工具栏菜单权限
		String commandToolMenu = this.convertFuncsToMenu(this.authorizedFuncs,FuncModel.FUNC_TYPE_COMMAND_TOOL);
		getSession().put(SESSION_COMMAND_TOOL_MENU, commandToolMenu);

		// 右键菜单权限
		String rightMenu = this.convertFuncsToMenu(this.authorizedFuncs,FuncModel.FUNC_TYPE_RIGHT_MENU);
		getSession().put(SESSION_RIGHT_MENU, rightMenu);

		// 主菜单权限
		String mainMenu = this.convertFuncsToMenu(this.authorizedFuncs,FuncModel.FUNC_TYPE_MAIN_MENU);
		getSession().put(SESSION_MAIN_MENU, mainMenu);

		// 快捷菜单权限
		String shortCutMenu = this.convertFuncsToMenu(this.authorizedFuncs,FuncModel.FUNC_TYPE_MAIN_SHORT_CURT);
		getSession().put(SESSION_SHORT_CUT_MENU, shortCutMenu);

		// 将用户信息放在sessoin中
		setMapInfo();

		return "success";
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRandomCode() {
		return this.randomCode;
	}

	public void setRandomCode(String randomCode) {
		this.randomCode = randomCode;
	}

	private List<FuncModel> findSubSyssFuncByParnetId(Integer id) {
		List<FuncModel> subSysFuncs = new ArrayList<FuncModel>();

		for (FuncModel sysFunc : this.authorizedFuncs) {
			if (sysFunc.getParentId() == id) {
				subSysFuncs.add(sysFunc);
			}
		}
		return subSysFuncs;
	}

	/**
	 * 将用户分配的权限转换成主菜单的JSON数据，输出到前台
	 * 
	 * @param authorizedFuncs
	 *            用户分配的功能权限
	 * @param funcType
	 *            主菜单
	 * @return
	 */
	private String convertFuncsToMenu(List<FuncModel> authorizedFuncs,
			Integer funcType) {
		String webPath = getRequest().getContextPath();

		/**
		 * 查找数据库的主菜单的顶级菜单项记录，然后将功能权限作为子菜单加入到顶级菜单中，如果顶级菜单下没有权限，将忽略不显示
		 */
		String hsql = "from FuncModel where parentId = ? and funcType = ? and deleted = ? order by menuSort";
		List<FuncModel> subSysFuncs = this.getBaseService().query(hsql,
				new Object[] { 0, funcType, false });
		JSONArray jsonArray = new JSONArray();
		for (FuncModel func : subSysFuncs) {
			List<FuncModel> childSysFuns = findChidFuncByParentId(
					func.getEntityId(), authorizedFuncs);
			JSONObject menuItem = new JSONObject();
			menuItem.put("id", "" + func.getEntityId());
			menuItem.put("text", func.getDescr());
			menuItem.put("icon", func.getIcon());
			menuItem.put("url", func.getUrl());
			menuItem.put("funcName", func.getFuncName());
			JSONObject attributes = new JSONObject();
			attributes.put("url", func.getUrl());
			menuItem.put("attributes", attributes);

			JSONArray childMenuItems = new JSONArray();
			for (FuncModel childSysFunc : childSysFuns) {
				JSONObject childItem = new JSONObject();
				childItem.put("id", "" + childSysFunc.getEntityId());
				childItem.put("text", childSysFunc.getDescr());

				childItem.put("funcName", childSysFunc.getFuncName());
				childItem.put("icon", childSysFunc.getIcon());
				String url = "";
				if (!StringUtil.isEmpty(childSysFunc.getUrl())) {
					url = webPath + "/" + childSysFunc.getUrl();
				}

				childItem.put("url", url);
				attributes = new JSONObject();
				attributes.put("url", url);
				childItem.put("attributes", attributes);
				childMenuItems.add(childItem);
			}
			if (childMenuItems.size() > 0) {
				HashMap ht = new HashMap();
				// ht.put("items", childMenuItems);
				// ht.put("width", 100);
				menuItem.put("items", childMenuItems);
				jsonArray.add(menuItem); // 如果父菜单下没有子菜单，就不显示在前台
			} else if (isAuthorized(func)) {
				jsonArray.add(menuItem);
			}

		}

		return jsonArray.toString();
	}

	private boolean isAuthorized(FuncModel f) {
		for (FuncModel fn : authorizedFuncs) {
			if (f.getEntityId() == fn.getEntityId() && fn.getDeleted() == false) {
				return true;
			}
		}
		return false;
	}

	private List<FuncModel> findChidFuncByParentId(Integer parentId,
			List<FuncModel> authorizedFuncs) {
		List<FuncModel> subSysFuncs = new ArrayList<FuncModel>();
		for (FuncModel sysFunc : authorizedFuncs) {
			if (sysFunc.getParentId() == parentId
					&& sysFunc.getDeleted() == false) {
				subSysFuncs.add(sysFunc);
			}
		}

		Collections.sort(authorizedFuncs, new SysFuncComparator());
		return subSysFuncs;
	}

	/**
	 * 退出登录
	 * 
	 * @return
	 */
	public String logout() {
		UserInfo user = getOnlineUser();

		this.LogOperation("退出登录");
		try {
			this.setOnlineUser(null);
			this.getSession().clear();
			HttpSession session = getRequest().getSession();
			session.invalidate();// 移出所有
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
		return "success";
	}

	public String getMapToolMenu() {
		JSONArray jsonArray = new JSONArray();
		for (FuncModel root : authorizedFuncs) {
			// FuncModel root = (FuncModel) iterator.next();
			if (root.getParentId() != 900200 || root.getDeleted())
				continue;

			JSONObject rootJsonObject = new JSONObject();
			rootJsonObject.put("id", "" + root.getEntityId());

			rootJsonObject.put("text", root.getDescr());
			rootJsonObject.put("icon", root.getIcon());
			rootJsonObject.put("code", root.getFuncName());
			/**
			 * if (this.selectUserFuncsMap.containsKey(root.getId()))
			 * rootJsonObject.put("checked", Boolean.valueOf(true)); else {
			 * rootJsonObject.put("checked", Boolean.valueOf(false)); }
			 */
			JSONObject attributes = new JSONObject();
			attributes.put("funcName", root.getFuncName());
			// attributes.put("style", root.getStyle());
			rootJsonObject.put("attributes", attributes);
			jsonArray.add(rootJsonObject);
		}
		return jsonArray.toString();
	}

	/**
	 * 终端命令菜单
	 * 
	 * @return
	 */
	private String terminalCommandMenuJson() {
		JSONArray jsonArray = new JSONArray();
		for (FuncModel root : authorizedFuncs) {
			// FuncModel root = (FuncModel) iterator.next();
			if (root.getParentId() != 900700 || root.getDeleted())
				continue;

			JSONObject rootJsonObject = new JSONObject();
			rootJsonObject.put("id", "" + root.getEntityId());

			rootJsonObject.put("text", root.getDescr());
			rootJsonObject.put("icon", root.getIcon());
			rootJsonObject.put("url", root.getUrl());
			rootJsonObject.put("type", root.getFuncType());
			/**
			 * if (this.selectUserFuncsMap.containsKey(root.getId()))
			 * rootJsonObject.put("checked", Boolean.valueOf(true)); else {
			 * rootJsonObject.put("checked", Boolean.valueOf(false)); }
			 */
			// JSONObject attributes = new JSONObject();
			rootJsonObject.put("funcName", root.getFuncName());
			// attributes.put("style", root.getStyle());
			// rootJsonObject.put("attributes", attributes);

			List subGroupInfos = findSubSyssFuncByParnetId(root.getEntityId());

			// genSubGroupsTreeJson(rootJsonObject, subGroupInfos);
			jsonArray.add(rootJsonObject);
		}
		return jsonArray.toString();
	}
	
	class SysFuncComparator implements Comparator<FuncModel> {
		SysFuncComparator() {
		}

		public int compare(FuncModel paramT1, FuncModel paramT2) {
			int sort1 = paramT1.getMenuSort();

			int sort2 = paramT2.getMenuSort();

			return sort1 - sort2;
		}
	}

}
