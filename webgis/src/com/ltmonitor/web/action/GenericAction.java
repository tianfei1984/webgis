package com.ltmonitor.web.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import com.ltmonitor.entity.BasicData;
import com.ltmonitor.entity.Department;
import com.ltmonitor.entity.FuncModel;
import com.ltmonitor.entity.OperationLog;
import com.ltmonitor.entity.SystemConfig;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.service.IBaseService;
import com.ltmonitor.service.IBasicDataService;
import com.ltmonitor.service.IDepartmentService;
import com.ltmonitor.util.Constants;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 通用的Action，提供Request参数的获取。
 * 
 */
public class GenericAction extends ActionSupport implements ServletRequestAware {

	public static final String ONLINE_USER = "onlineUser";

	private static final String JSON_FORWARD = "jsonSuccess";

	protected Logger log = Logger.getLogger(getClass());

	protected IBasicDataService basicDataService;

	private HttpServletRequest request;

	private Map innerParameters;

	private String message = "";

	protected List results;

	protected String input;
	/**
	 * 存放当前在线用户信息的key
	 */
	protected static String ONLINE_USER_KEY = "currUserInfo";

	/**
	 * 存放授权部门Id map的可以
	 */
	protected static String SESSION_KEY_DEP = "session_key_department";
	/**
	 * session中存放地图工具栏权限菜单的key
	 */
	protected static String SESSION_MAP_TOOL_MENU = "MapToolMenu";
	

	/**
	 * session中存放地图工具栏权限菜单的key
	 */
	protected static String SESSION_WEB_FUNC = "WebFunc";
	

	/**
	 * session中存放命令工具栏权限菜单的key
	 */
	protected static String SESSION_COMMAND_TOOL_MENU = "CommandToolMenu";

	/**
	 * session中存放命令车辆树右键菜单的key
	 */
	protected static String SESSION_RIGHT_MENU = "RightMenu";

	/**
	 * session中存放快捷菜单的key
	 */
	protected static String SESSION_SHORT_CUT_MENU = "ShortCutMenu";
	/**
	 * session中存放主菜单的key
	 */
	protected static String SESSION_MAIN_MENU = "MainMenu";
	
	
	protected static String SESSION_KEY_SYSTEM_CONFIG = "systemConfig";
	//用户的权限以map的形式存放，便于查看是否有某一个权限
	protected static String SESSION_KEY_FUNCTION_MAP = "userFuncMap";

	/**
	 * 假删除调转名称
	 */
	protected static final String FAKE_DELETED = "fakeDeleted";

	protected static final String DELETED = "deleted";

	protected static final String VIEW = "view";

	protected static final String SAVE_SUCCESS = "save";

	protected static final String CREATE = "create";

	protected static final String LIST_ALL = "listAll";

	protected static final String LIST = "list";

	protected String queryID;

	protected String jsonForward;

	private JsonMessage jsonMessage;
	// 当前在线用户
	private UserInfo onlineUser;

	private IBaseService baseService;
	
	private IDepartmentService departmentService;
	/**
	 * 供弹出提示窗口页面用,retMethod为关闭弹出窗口时 要刷新主窗口页面所调用的主页面的script函数名
	 */
	private String retMethod;

	static {
		register();
	}

	/**
	 * 注册日期格式转换类 主要是为struts的BeanUtils的类，提供日期转换格式的插件。 否则，BeanUtils则将字符串转为日期时，会报错
	 */
	private static void register() {
		ConvertUtils.register(new DateConverter(), Date.class);
	}

	/**
	 * 获得Request的参数数据 之所以是Public方法，是为了单元测试时，可以直接拿到Map并注入模拟数据
	 * 
	 * @return
	 */
	public Map getParams() {
		Map parameters = ActionContext.getContext().getParameters();
		Map paraMap = new HashMap();
		for (Object key : parameters.keySet()) {
			String strKey = "" + key;
			int index = strKey.indexOf("[]") ;
			if(index > 0)
			{
				strKey = strKey.replaceAll("\\[\\]", "");
			}
			String[] values = (String[]) parameters.get(key);
			if (values.length == 1) {
				String strValue = values[0];
				if (strValue != null && strValue.isEmpty() == false)
					paraMap.put(strKey, strValue);
			} else
				paraMap.put(strKey, values);
		}
		return paraMap;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.setRequest(request);

	}

	/**
	 * 基础数据转换，将数据表中标志字段转换为文字描述
	 * 
	 * @param rowData
	 * @param field
	 * @param parentCode
	 * @return
	 */
	protected String convert(Map rowData, String field, String parentCode) {
		String fieldValue = "" + rowData.get(field);
		BasicData bd = getBasicDataService().getBasicDataByCode(fieldValue,
				parentCode);
		if (bd != null) {
			rowData.put(field, bd.getName());
			return bd.getName();
		}
		return "";
	}
	
	protected String convert(String fieldValue, String parentCode) {
		BasicData bd = getBasicDataService().getBasicDataByCode(fieldValue,
				parentCode);
		if (bd != null) {
			return bd.getName();
		}
		return "";
	}
	
	protected String getMapType()
	{
		UserInfo user = this.getOnlineUser();
		if(user != null)
		{
			return user.getMapType();
		}
		return Constants.MAP_BAIDU;
	}
	/**
	 * 用户是否有某个功能的权限
	 * @param funcName
	 * @return
	 */
	protected boolean isAuthorized(String funcName)
	{
		Map<String, FuncModel> funcMap = (Map<String, FuncModel>) getSession()
				.get(SESSION_KEY_FUNCTION_MAP);
		return funcMap != null && funcMap.containsKey(funcName);
	}
	
	/**
	 * 设置当前用户部门权限
	 * @param user
	 */
	protected void setAuthorizedDep(UserInfo user)
	{
		if(user == null)
			return;

		Map<Integer,Integer> authorizedDepIdMap = new HashMap<Integer,Integer>();
		Set<Department> depSet = user.getDepartments();

		if (user.getUserFlag() == UserInfo.USER_FLAG_SUPER_ADMIN && depSet.isEmpty()) {
			//如果是超级用户，将加所有权限,可以分配所有管理部门
			String hql ="from Department where deleted = ?";
			List allDepList = this.getBaseService().query(hql, false);
			for(Object obj : allDepList)
			{
				Department dep = (Department)obj;
				authorizedDepIdMap.put(dep.getEntityId(), dep.getEntityId());
			}
		} else {
			for (Department dep : depSet) {
				if (dep.getDeleted() == false) {
					authorizedDepIdMap.put(dep.getEntityId(), dep.getEntityId());
				}
			}
		}

		//授权管理的部门
		getSession().put(SESSION_KEY_DEP, authorizedDepIdMap);
	}

	/**
	 * public User getOnlineUser() { return (User)
	 * this.getFromSession(ONLINE_USER); }
	 * 
	 * public void setOnlineUser(User u) { this.putSession(ONLINE_USER, u); }
	 */

	/**
	 * 清除Session
	 */
	protected void clearSession() {

		ActionContext.getContext().getSession().clear();
	}

	/**
	 * 应当对此方法进行限制使用
	 * 
	 * @return
	 */
	protected Map getSession() {
		Map map = ActionContext.getContext().getSession();

		String sessionID = ServletActionContext.getRequest().getSession()
				.getId();

		map.put("sessionID", sessionID);

		return map;
	}

	protected void putSession(Object key, Object value) {
		getSession().put(key, value);
	}

	protected Object getFromSession(Object key) {
		return getSession().get(key);
	}

	// Json跳转
	protected String json(boolean success, Object data) {
		setJsonMessage(new JsonMessage(success, data));

		return JSON_FORWARD;
	}

	// Json跳转
	protected String json(boolean success, String msg) {
		setJsonMessage(new JsonMessage(success, msg));
		return JSON_FORWARD;
	}

	protected String jsonError(String error) {
		setJsonMessage(new JsonMessage(false, error));
		return JSON_FORWARD;
	}


	public void setInnerParameters(Map innerParameters) {
		this.innerParameters = innerParameters;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getRetMethod() {
		return retMethod;
	}

	public void setRetMethod(String retMethod) {
		this.retMethod = retMethod;
	}

	public List getResults() {
		return results;
	}

	public void setResults(List results) {
		this.results = results;
	}

	public String getJsonForward() {
		return jsonForward;
	}

	public void setJsonForward(String jsonForward) {
		this.jsonForward = jsonForward;
	}

	public JsonMessage getJsonMessage() {
		return jsonMessage;
	}

	public void setJsonMessage(JsonMessage jsonMessage) {
		this.jsonMessage = jsonMessage;
	}
	/**
	 * 每个用户会分配经过授权的车组,判断车组是否是用户的权限中所辖部门.
	 * @param depId
	 * @return
	 */
	protected boolean isAuthorizedDep(int depId) {
		Map<Integer, Integer> depIdMap = (Map<Integer, Integer>) getSession()
				.get(SESSION_KEY_DEP);
		return depIdMap != null && depIdMap.containsKey(depId);
	}
	
	protected List<Integer> getAuthorizedDepIdList()
	{
		Map<Integer, Integer> depIdMap = (Map<Integer, Integer>) getSession()
				.get(SESSION_KEY_DEP);
		if(depIdMap == null)
			return new ArrayList<Integer>();
		return new ArrayList<Integer>(depIdMap.values());
	}
	
	/**
     * 增加操作日志
     */
    public void LogOperation(String detail)
    {
        try
        {
            UserInfo u = this.getOnlineUser();
            if (u != null)
            {
                OperationLog log = new OperationLog();
                log.setUserId(u.getEntityId());
                log.setUserName(u.getName());
                log.setDetail(detail);
                HttpServletRequest r = this.getRequest();
                String uri = r.getRequestURI();
                log.setUrl(uri);
                String Agent = r.getHeader("User-Agent");  
                log.setIp(r.getRemoteAddr()+"["+Agent+"]");
                this.getBaseService().saveOrUpdate(log);
            }
        }
        catch (Exception ex)
        {
            log.error( ex.getMessage(),ex);
        }
    }
    

	public UserInfo getOnlineUser() {
		UserInfo userInfo = (UserInfo) getSession().get(ONLINE_USER_KEY);

		return userInfo;
	}
	
	
	public SystemConfig getSystemConfig()
	{
		SystemConfig config = (SystemConfig) getSession().get(SESSION_KEY_SYSTEM_CONFIG);
		if(config == null)
			return new SystemConfig();
		return config;
	}

	public void setOnlineUser(UserInfo onlineUser) {
		getSession().put(ONLINE_USER_KEY, onlineUser);
		this.onlineUser = onlineUser;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public IBaseService getBaseService() {
		return baseService;
	}

	public void setBaseService(IBaseService baseService) {
		this.baseService = baseService;
	}

	public IBasicDataService getBasicDataService() {
		return basicDataService;
	}

	public void setBasicDataService(IBasicDataService basicDataService) {
		this.basicDataService = basicDataService;
	}

	public IDepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(IDepartmentService departmentService) {
		this.departmentService = departmentService;
	}
	
	/** 
     * 获取请求主机IP地址,如果通过代理进来，则透过防火墙获取真实IP地址; 
     *  
     * @param request 
     * @return 
     * @throws IOException 
     */  
    public  String getIpAddress(HttpServletRequest request) {  
        // 获取请求主机IP地址,如果通过代理进来，则透过防火墙获取真实IP地址  
  
        String ip = request.getHeader("X-Forwarded-For");  
        if (log.isInfoEnabled()) {  
        	log.info("getIpAddress(HttpServletRequest) - X-Forwarded-For - String ip=" + ip);  
        }  
  
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("Proxy-Client-IP");  
                if (log.isInfoEnabled()) {  
                	log.info("getIpAddress(HttpServletRequest) - Proxy-Client-IP - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("WL-Proxy-Client-IP");  
                if (log.isInfoEnabled()) {  
                	log.info("getIpAddress(HttpServletRequest) - WL-Proxy-Client-IP - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("HTTP_CLIENT_IP");  
                if (log.isInfoEnabled()) {  
                	log.info("getIpAddress(HttpServletRequest) - HTTP_CLIENT_IP - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
                if (log.isInfoEnabled()) {  
                	log.info("getIpAddress(HttpServletRequest) - HTTP_X_FORWARDED_FOR - String ip=" + ip);  
                }  
            }  
            if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
                ip = request.getRemoteAddr();  
                if (log.isInfoEnabled()) {  
                	log.info("getIpAddress(HttpServletRequest) - getRemoteAddr - String ip=" + ip);  
                }  
            }  
        } else if (ip.length() > 15) {  
            String[] ips = ip.split(",");  
            for (int index = 0; index < ips.length; index++) {  
                String strIp = (String) ips[index];  
                if (!("unknown".equalsIgnoreCase(strIp))) {  
                    ip = strIp;  
                    break;  
                }  
            }  
        }  
        return ip;  
    }  
}
