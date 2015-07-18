package com.ltmonitor.web.action;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;

import com.ltmonitor.dao.IBaseDao;
import com.ltmonitor.entity.TenantEntity;
import com.ltmonitor.entity.UserInfo;
import com.ltmonitor.service.IBaseService;
import com.ltmonitor.util.ClassInstantiateException;
import com.ltmonitor.util.ClassUtil;
import com.ltmonitor.util.StringUtil;

/**
 * 持久化Action 提供增、删、改、假删除的操作服务 1.创建一个空白页面：bussiness!create.action
 * 2.编辑并保存：bussiness!edit.action 3.新增并保存:bussiness!save.action
 * 4.查看:bussiness!view.action 5.删除：bussiness!delete.action
 * 6.假删除：bussiness!fakeDelete.action
 * 
 * @author zhengxin
 * 
 */
public abstract class PersistenceAction extends GenericAction {

	/**
	 * 实体ID
	 */
	protected String entityID;

	@SuppressWarnings("unused")
	private final static String ID = "ID";

	/**
	 * 实体类
	 */
	protected Class entityClass;

	/**
	 * 实体操作类
	 */
	// private IBaseDao baseDao;

	protected IBaseService baseService;

	/**
	 * 持久化实体
	 */
	protected Object entity;

	/**
	 * 表单
	 */
	private Object entityForm;

	private List entities;

	/**
	 * @return
	 */
	public String create() {
		entity = populateEntity();
		return CREATE;
	}

	/**
	 * 编辑并保存
	 * 
	 * @return
	 */
	public String edit() {
		/**
		 * 填充参数数据到实体
		 */
		if (entity == null) {
			entity = populateEntity();
		}
		baseService.saveOrUpdate(entity);

		entityForm = populateFormBean(entity);

		return SAVE_SUCCESS;
	}

	/**
	 * 新增后的保存操作
	 * 
	 * @return
	 */
	public String save() throws Exception {

		try {

			entity = populateEntity();

			if (entityID == null)
				baseService.save(entity);
			else
				baseService.saveOrUpdate(entity);
			entityID = "" + ((TenantEntity) entity).getEntityId();

			entityForm = populateFormBean(entity);

			this.setMessage("保存成功");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}

		return SAVE_SUCCESS;
	}

	protected Class getEntityClass() {
		return entityClass;
	}

	/**
	 * 假删除
	 * 
	 * @return
	 */
	public String fakeDelete() {
		int id = Integer.parseInt(entityID);
		baseService.removeByFake(getEntityClass(), id);
		super.json(true, "记录已被成功刪除!");
		return "jsonSuccess";
	}

	/**
	 * 真删除
	 * 
	 * @return
	 */
	public String delete() {

		try {
			Map params = super.getParams();
			if (entityID == null)
				return super.json(false, "entityID不能为空!,请传入entityID参数!");

			baseService.remove(getEntityClass(), Integer.parseInt(entityID));
			return super.json(true, "记录已被成功刪除!");
		} catch (Exception e) {
			return json(false, e.getMessage());
		}
	}

	/**
	 * 查看
	 * 
	 * @return
	 */
	public String view() {
		
		
		try {
			/**
			 * if (entityID == null) { String error =
			 * "entityID不能为空!，请传入entityID参数!";
			 * 
			 * return super.forwardError(error); }
			 */

			if (StringUtil.isValidStr(entityID) && !entityID.equals("0")) {
				entity = baseService.load(getEntityClass(), new Integer(entityID));
			} else {
				entity = ClassUtil.newInstance(getEntityClass());
				entityID = null;
			}

			if (entity == null) {
				String error = "找不到实体对象,id:" + entityID + "; 类：" + getEntityClass();
				//return super.forwardError(error);
			}

			entityForm = populateFormBean(entity);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			this.setMessage(e.getMessage());
		}

		return VIEW;
	}

	public String listAll() {
		entities = baseService.loadAll(getEntityClass());

		return LIST_ALL;
	}

	public String list() {
		return LIST;
	}

	/**
	 * 将表单数据填充到实体对象当中
	 * 
	 * @return
	 */
	protected Object populateEntity() {

		Object obj = null;

		if (StringUtil.isValidStr(entityID) && entityID.equals("0") == false) {
			obj = baseService.load(getEntityClass(), new Integer(entityID));
		} else {
			// 创建新对象
			obj = ClassUtil.newInstance(getEntityClass());
			if (obj instanceof TenantEntity) {
				TenantEntity te = (TenantEntity) obj;
				te.setCreateDate(new Date());
				UserInfo u = getOnlineUser();
				if (u != null) {
					te.setOwner(u.getName());
					te.setTenantId(u.getTenantId());
				}
			}
			entityID = null;
		}

		Map parameters = super.getParams();

		parameters.put("ID", entityID);

		if (obj != null){
			try {
				prepare();
				BeanUtils.copyProperties(obj, parameters);
			} catch (Exception e) {
				throw new ClassInstantiateException(e);
			}
		}

		return obj;
	}
	//如果参数被选中，在rquest参数中，就包含了参数值
	protected boolean isChecked(String paramName)
	{
		return this.getParams().containsKey(paramName);
	}

	/**
	 * 将实体对象填充到表单当中
	 * 
	 * @param obj
	 * @return
	 */
	protected Object populateFormBean(Object obj) {

		return obj;
	}

	/**
	 * 将实体对象，转化成Map的表单形式，供页面调用
	 * 
	 * @param obj
	 * @return
	 */
	protected Map simplePopulateFormBean(Object obj) {
		try {
			return BeanUtils.describe(obj);
		} catch (Exception e) {

			throw new ClassInstantiateException(e);

		}
	}

	public Object getEntity() {
		return entity;
	}

	public Object getEntity(Class _class, Serializable id) {
		return this.baseService.load(_class, id);
	}

	public void setEntity(Object entity) {
		this.entity = entity;
	}

	public Object getEntityForm() {
		return entityForm;
	}

	public void setEntityForm(Object entityForm) {
		this.entityForm = entityForm;
	}

	/**
	 * 用于子类的提供重写的方法，主要用于在接收参数后，对参数进行的一个处理
	 * 
	 */
	protected void prepare() {

	}

	public List getEntities() {
		return entities;
	}

	public void setEntities(List entities) {
		this.entities = entities;
	}

	public String getEntityID() {
		return entityID;
	}

	public void setEntityID(String entityID) {
		this.entityID = entityID;
	}

	/**
	 * public IBaseDao getBaseDao() { return baseDao; }
	 * 
	 * public void setBaseDao(IBaseDao baseDao) { this.baseDao = baseDao; }
	 */
	public IBaseService getBaseService() {
		return baseService;
	}

	public void setBaseService(IBaseService baseService) {
		this.baseService = baseService;
	}

}
