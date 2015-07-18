package com.ltmonitor.mobile.action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.common.util.StringUtil;
import com.ltmonitor.entity.FuncModel;
import com.ltmonitor.entity.OperationLog;
import com.ltmonitor.entity.Role;
import com.ltmonitor.entity.SystemConfig;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.web.action.GenericAction;

/**
 * 移动端登录
 * 
 * @author DELL
 * 
 */
public class MobileLoginAction extends GenericAction {

	private static final long serialVersionUID = -2574252247068423156L;
	private Integer bindStatus;
	private String username;
	private String password;
	private int userType;
	private String randomCode;
	private String checkSysfuncsStr;
	private Map<Short, String> useStateMap = new HashMap();
	List<FuncModel> authorizedFuncs = new ArrayList();

	// private String selectFunc;
	private List<UserInfo> userInfos;
	private Integer userId;
	private UserInfo userInfo;
	private List<Role> roles = new ArrayList();

	private Short useState;
	private String name;

	public String login() {

		if (StringUtil.isEmpty(this.username)) {
			setMessage("用户名不能为空");
			return json(false, super.getMessage());
		}
		if (this.password == null) {
			setMessage("密码不能为空");
			return json(false, super.getMessage());
		}

		try {
			String hsql = "from UserInfo where loginName = ? and userState <> ? and deleted = ?";

			UserInfo user = (UserInfo) this.getBaseService().find(hsql,
					new Object[] { username, UserInfo.STATE_SUSPEND, false });

			if (user == null) {
				setMessage("用户名或密码错误");
				return json(false, super.getMessage());
			}
			String userpassword = null;
			

			userpassword = user.getPassword();

			String pwd = StringUtil.encodePassword(userpassword, "md5");

			if (!userpassword.equalsIgnoreCase(this.password)) {
				setMessage("用户名或密码不正确");
				return json(false, super.getMessage());
			}

			// user.setUserType(this.userType);
			String hostName = getRequest().getRemoteHost();
			user.setIp(hostName);
			if (user.getRoles().size() < 1) {
				Role role = new Role();
				role.setName("ROLE_ADMIN");
				user.getRoles().add(role);
			}
			user.setLoginTime(new Date());
			MobileOnlineUser.onlineUserMap.put(user.getEntityId(), user);
			authorizedFuncs = new ArrayList();
			if (user.getUserFlag() == UserInfo.USER_FLAG_SUPER_ADMIN) {
				// 如果是超级用户，将加所有权限,可以分配所有管理部门
				authorizedFuncs = this.getBaseService()
						.loadAll(FuncModel.class);
			} else {
				Role r = user.getRole();
				if (r != null) {
					authorizedFuncs.addAll(r.getFuncs());
				}
			}
			// 移动端的权限
			List funcResult = new ArrayList();
			Map userInfoMap = new HashMap();
			//Map funcMap = new HashMap();
			for (FuncModel f : authorizedFuncs) {
				if (f.getFuncType() == FuncModel.FUNC_TYPE_MOBILE) {
					funcResult.add(f.getFuncName());
					//funcMap.put(f.getFuncName(), f.getFuncName());
				}
			}
			
			userInfoMap.put("funcs", funcResult);
			SystemConfig sc = (SystemConfig) this.getBaseService().load(
					SystemConfig.class, 1);

			userInfoMap.put("id", user.getEntityId());
			userInfoMap.put("name", user.getName());
			userInfoMap.put("loginName", user.getLoginName());

			userInfoMap.put("mapCenterLat", user.getMapCenterLat());
			if (user.getMapCenterLat() > 0) {
				sc.setInitLat(user.getMapCenterLat());
			}
			if (user.getMapCenterLng() > 0) {
				sc.setInitLng(user.getMapCenterLng());
			}

			userInfoMap.put("mapCenterLng", user.getMapCenterLng());

			if (user.getMapLevel() > 0) {
				userInfoMap.put("mapZoom", user.getMapLevel());

				sc.setInitZoomLevel(user.getMapLevel());
			} else {
				userInfoMap.put("mapZoom", 15);
			}

			if (user.getRoles().size() < 1) {
				// if (user.getUserType() == 0) {
				Role role = new Role();
				// role.setDescription(getText("administrator"));
				role.setName("ROLE_ADMIN");
				user.getRoles().add(role);
				// }
			}
			Role r = user.getRole();
			userInfoMap.put("roleName", r.getName());

			// JSONArray roleArray = JSONArray.fromObject(user.getRoles(),
			// this.jsonConfig);

			getSession().put(SESSION_KEY_SYSTEM_CONFIG, sc);

			super.setOnlineUser(user);
			super.setAuthorizedDep(user);
			
			this.LogOperation("移动端登录");

			return json(true, userInfoMap);
		} catch (Exception e) {
			this.log.error(e.getMessage(), e);
			return json(false, e.getMessage());
		}

	}

	public void fetchCurrUserInfo() {
		UserInfo user = getOnlineUser();
		if (user != null) {

		} else {
		}
	}

	public String main() {
		if (this.getOnlineUser() == null)
			return "input";
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
		List subSysFuncs = new ArrayList();

		for (FuncModel sysFunc : this.authorizedFuncs) {
			if (sysFunc.getParentId() == id) {
				subSysFuncs.add(sysFunc);
			}
		}
		System.setProperty("java.util.Arrays.useLegacyMergeSort", "true");
		Collections.sort(subSysFuncs, new SysFuncComparator());
		return subSysFuncs;
	}

	private void genSubGroupsTreeJson(JSONObject jsonObject,
			List<FuncModel> subSysFunc) {
		if (subSysFunc.size() > 0) {
			JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < subSysFunc.size(); i++) {
				FuncModel v = (FuncModel) subSysFunc.get(i);
				if (v.getDeleted())
					continue;

				JSONObject jsonObjectChild = new JSONObject();
				jsonObjectChild.put("id", "" + v.getEntityId());

				jsonObjectChild.put("icon", v.getIcon());

				jsonObjectChild.put("text", v.getDescr());// getText("menu." +
															// v.getId()));
				/**
				 * if ((this.selectUserFuncsMap.containsKey(v.getId())) &&
				 * (v.getLevel() != SysFunc.LEVEL_GROUT)) {
				 * jsonObjectChild.put("checked", Boolean.valueOf(true)); } else
				 * jsonObjectChild.put("checked", Boolean.valueOf(false));
				 */
				JSONObject attributes = new JSONObject();

				attributes.put("funcName", v.getFuncName());

				jsonObjectChild.put("attributes", attributes);
				List subGroupInfosChild = findSubSyssFuncByParnetId(v
						.getEntityId());

				genSubGroupsTreeJson(jsonObjectChild, subGroupInfosChild);
				jsonArray.add(jsonObjectChild);
			}
			jsonObject.put("menu", jsonArray);
		}
	}

	public String creatorUserFuncTree() {
		return "success";
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
		System.setProperty("java.util.Arrays.useLegacyMergeSort", "true");
		Collections.sort(authorizedFuncs, new Comparator<FuncModel>() {
			public int compare(FuncModel obj1, FuncModel obj2) {

				return obj2.getMenuSort() - obj1.getMenuSort();
			}
		});
		String webPath = getRequest().getContextPath();

		/**
		 * 查找数据库的主菜单的顶级菜单项记录，然后将功能权限作为子菜单加入到顶级菜单中，如果顶级菜单下没有权限，将忽略不显示
		 */
		String hsql = "from FuncModel where parentId = ? and funcType = ? and deleted = ? order by menuSort";
		List<FuncModel> subSysFuncs = this.getBaseService().query(hsql,
				new Object[] { Integer.valueOf(-1), 1, false });
		JSONArray jsonArray = new JSONArray();
		for (FuncModel func : subSysFuncs) {
			List<FuncModel> childSysFuns = findChidFuncByParentId(
					func.getEntityId(), authorizedFuncs);
			JSONObject menuItem = new JSONObject();
			menuItem.put("id", "" + func.getEntityId());
			menuItem.put("text", func.getDescr());
			menuItem.put("icon", func.getIcon());
			JSONObject attributes = new JSONObject();
			attributes.put("url", func.getUrl());
			menuItem.put("attributes", attributes);

			JSONArray childMenuItems = new JSONArray();
			for (FuncModel childSysFunc : childSysFuns) {
				JSONObject childItem = new JSONObject();
				childItem.put("id", "" + childSysFunc.getEntityId());
				childItem.put("text", childSysFunc.getDescr());

				childItem.put("icon", childSysFunc.getIcon());
				String url = "";
				if (!StringUtil.isEmpty(childSysFunc.getUrl())) {
					url = webPath + "/" + func.getUrl() + "/"
							+ childSysFunc.getUrl();
				}

				attributes = new JSONObject();
				attributes.put("url", url);
				childItem.put("attributes", attributes);
				childMenuItems.add(childItem);
			}
			if (childMenuItems.size() > 0) {
				menuItem.put("menu", childMenuItems);
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
		List subSysFuncs = new ArrayList();
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
		if (user != null) {
			OperationLog ol = new OperationLog();
			ol.setUserId(user.getEntityId());
			ol.setUserName(user.getName());
			ol.setDetail("login.action");
			ol.setUrl("logout.action");
			ol.setIp(getRequest().getRemoteAddr());
			try {
				this.getBaseService().save(ol);
			} catch (Exception ex) {
				log.error(ex.getMessage(), ex);
			}
		}
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

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public UserInfo getUserInfo() {
		return this.userInfo;
	}

	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}

	public List<UserInfo> getUserInfos() {
		return this.userInfos;
	}

	public void setUserInfos(List<UserInfo> userInfos) {
		this.userInfos = userInfos;
	}

	public Map<Short, String> getUseStateMap() {
		return this.useStateMap;
	}

	public void setUseStateMap(Map<Short, String> useStateMap) {
		this.useStateMap = useStateMap;
	}

	public String getCheckSysfuncsStr() {
		return this.checkSysfuncsStr;
	}

	public void setCheckSysfuncsStr(String checkSysfuncsStr) {
		this.checkSysfuncsStr = checkSysfuncsStr;
	}

	public Integer getBindStatus() {
		return this.bindStatus;
	}

	public void setBindStatus(Integer bindStatus) {
		this.bindStatus = bindStatus;
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
			/**
			 * if (this.selectUserFuncsMap.containsKey(root.getId()))
			 * rootJsonObject.put("checked", Boolean.valueOf(true)); else {
			 * rootJsonObject.put("checked", Boolean.valueOf(false)); }
			 */
			JSONObject attributes = new JSONObject();
			attributes.put("funcName", root.getFuncName());
			// attributes.put("style", root.getStyle());
			rootJsonObject.put("attributes", attributes);

			List subGroupInfos = findSubSyssFuncByParnetId(root.getEntityId());

			genSubGroupsTreeJson(rootJsonObject, subGroupInfos);
			jsonArray.add(rootJsonObject);
		}
		return jsonArray.toString();
	}

	public int getUserType() {
		return this.userType;
	}

	public void setUserType(int userType) {
		this.userType = userType;
	}

	public List<Role> getRoles() {
		return this.roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public Short getUseState() {
		return this.useState;
	}

	public void setUseState(Short useState) {
		this.useState = useState;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
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
