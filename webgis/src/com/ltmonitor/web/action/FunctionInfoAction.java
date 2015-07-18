package com.ltmonitor.web.action;

import com.ltmonitor.entity.FuncModel;
import com.ltmonitor.entity.TenantEntity;

public class FunctionInfoAction extends PersistenceAction{
	
	private int parentId ;


	protected Class getEntityClass() {
		entityClass = FuncModel.class;
		return entityClass;
	}
	
	/**
	 * 新增后的保存操作
	 * 
	 * @return
	 */
	public String save() throws Exception {

		try {
			entity = populateEntity();

			FuncModel bd = (FuncModel)entity;
			bd.setParentId(parentId);
			this.baseService.saveOrUpdate(bd);
			entityID = "" + ((TenantEntity) entity).getEntityId();

			this.setMessage("保存成功");
		} catch (Exception ex) {
			log.error(ex.getMessage(), ex);
			this.setMessage(ex.getMessage());
		}

		return SAVE_SUCCESS;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	} 
}
